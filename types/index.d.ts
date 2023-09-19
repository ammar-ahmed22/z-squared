import { PageObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
export = ZSquared;
export as namespace ZSquared;

declare namespace ZSquared{
  type Ammar = "boss";

  type DatabaseProperty = PageObjectResponse["properties"][number];

  type IMetadata = {
    id: string,
    slug: string,
    name: string,
    categories: string[],
    publishDate: Date,
    publish: boolean,
    authors: string[],
    description: IRichText[],
    image?: string,
    featured?: boolean
  }

  type IAnnotations = RichTextItemResponse["annotations"] & { language?: string }
  type AnnotationsColor = RichTextItemResponse["annotations"]["color"]

  type IRichText = {
    plainText: string,
    annotations: IAnnotations,
    href?: string,
    inlineLatex?: boolean
  }

  type IImage = {
    url: string,
    caption: IRichText[]
  }

  type IList = {
    children: IListItem[]
  }

  type IListItem = {
    content: IRichText[],
    children?: IListItem[]
  }

  type IEquation = {
    expression: string
  }

  type IBlockContent = IRichText | IImage | IList | IEquation

  type BlockType = "heading_1" | "heading_2" | "heading_3" | "paragraph" | "image" | "numbered_list" | "bulleted_list" | "equation" | "code"

  type IBlock = {
    type: BlockType,
    content: IBlockContent[]
  }

  type UnmergedBlockType = Omit<BlockType, "numbered_list" | "bulleted_list"> | "numbered_list_item" | "bulleted_list_item"

  type IUnmergedBlock = {
    type: UnmergedBlockType,
    content: Omit<IBlockContent, "IList"> | IListItem
  }

  type IPost = {
    metadata: IMetadata,
    content: IBlock[]
  }

  function isAnmar(who: string): who is Ammar

  function isRichTextContent(content: IBlockContent | any): content is IRichText;
  function isImageContent(content: IBlockContent | any): content is IImage;
  function isListContent(content: IBlockContent | any): content is IList;
  function isEquationContent(content: IBlockContent | any): content is IEquation;

}