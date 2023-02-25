import { Resolver, Query, Arg } from "type-graphql";
import { Client } from "@notionhq/client";
import { isFullPage } from "@notionhq/client";
import { PageObjectResponse, BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { 
  IMetadata,
  IListItem,
  IBlock,
  IUnmergedBlock,
} from "@z-squared/types";
import { 
  extractPropertyValue,
  mapRichText,
  getAllListChildren,
  mergeListItems
} from "../helpers/notion";
import { Metadata } from "../models/Metadata";
import { Block } from "../models/Content";


@Resolver()
export class BlogResolver{
  constructor(
    private notion = new Client({
      auth: process.env.NOTION_TOKEN
    }),
    private db_id = process.env.BLOG_DB_ID as string,
  ){}

  /**
   * Creates metadata from Notion database entry
   *
   * @async
   * @param {PageObjectResponse} page Notion database entry
   * @returns {Promise<IMetadata>}
   */
  private createMetadata = async (page: PageObjectResponse) : Promise<IMetadata> => {
    const { Name, Authors, Categories, PublishDate, Publish, Slug } = page.properties;
    const name = extractPropertyValue(Name) as string;
    let slug = extractPropertyValue(Slug) as string;
    if (slug === ""){
      slug = name.toLowerCase().split(" ").join("-");
      await this.notion.pages.update({
        page_id: page.id,
        properties: {
          Slug: {
            rich_text: [
              {
                text: {
                  content: slug
                }
              }
            ]
          }
        }
      })
    }

    return {
      id: page.id,
      name,
      slug,
      authors: extractPropertyValue(Authors) as string[],
      categories: extractPropertyValue(Categories) as string[],
      publishDate: (extractPropertyValue(PublishDate) as { start: Date, end: Date | undefined }).start,
      publish: extractPropertyValue(Publish) as boolean
    }
  }

  private createBlocks = async (blocks: BlockObjectResponse[]) : Promise<IBlock[]> => {
    const unmerged = await Promise.all(blocks.map(async (block) : Promise<IUnmergedBlock> => {
      if (
        block.type === "heading_1" || 
        block.type === "heading_2" || 
        block.type === "heading_3" || 
        block.type === "paragraph"
      ){
        const type = block.type;
        return {
          type: block.type,
          content: block[type].rich_text.map(mapRichText)
        }
      }

      if (block.type === "image"){
        if (block.image.type === "external"){
          return {
            type: "image",
            content: [{
              url: block.image.external.url,
              caption: block.image.caption.map(mapRichText)
            }]
          }
        }
        if (block.image.type === "file"){
          return {
            type: "image",
            content: [{
              url: block.image.file.url,
              caption: block.image.caption.map(mapRichText)
            }]
          }
        }
      }

      if (
        block.type === "bulleted_list_item" ||
        block.type === "numbered_list_item"
      ){
        const type = block.type;
        const listItem : IListItem = {
          content: block[type].rich_text.map(mapRichText)
        }
        await getAllListChildren(this.notion, block, listItem);
        return { 
          type, 
          content: listItem
        };
      }
    }).filter( b => b ));
    return mergeListItems(unmerged);
  }

  private getAllPaginatedBlocks = async (blockId: string) => {
    let hasNext = true;
    let startCursor = undefined;
    let result : (PartialBlockObjectResponse | BlockObjectResponse)[] = []
    while(hasNext){
      const resp = await this.notion.blocks.children.list({
        block_id: blockId,
        start_cursor: startCursor,
        page_size: 100
      })

      hasNext = resp.has_more;
      startCursor = resp.next_cursor;
      result = result.concat(resp.results);
    }
    return result;
  }

  @Query(returns => [Metadata])
  async metadata(){
    const resp = await this.notion.databases.query({
      database_id: this.db_id,
    })
  
    const result = await Promise.all(resp.results.map(async (page) => {
      if (isFullPage(page)){
        const metadata = await this.createMetadata(page)
        return new Metadata(metadata);
      }
    }))

    return result;
  }

  @Query(returns => Metadata)
  async metadataBySlug(
    @Arg("slug") slug: string
  ){
    const resp = await this.notion.databases.query({
      database_id: this.db_id,
      filter: {
        and: [
          {
            property: "Slug",
            rich_text: {
              equals: slug
            }
          }
        ]
      }
    });
    if (!resp.results.length){
      throw new Error("Could not find post!")
    }

    const [ page ] = resp.results;
    if (isFullPage(page)){
      const metadata = await this.createMetadata(page)
      return new Metadata(metadata);
    }
  }

  @Query(returns => [Block])
  async content(
    @Arg("id") id: string
  ): Promise<IBlock[]>{

    const blocks = await this.getAllPaginatedBlocks(id);
    const parsed = await this.createBlocks(blocks as BlockObjectResponse[]);
    return parsed
  }
}