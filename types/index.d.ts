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
    authors: string[]
  }

  type IAnnotations = RichTextItemResponse["annotations"]
  type AnnotationsColor = RichTextItemResponse["annotations"]["color"]

  type IRichText = {
    plainText: string,
    annotations: IAnnotations,
    href?: string
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

  type IBlockContent = IRichText | IImage | IList

  type IBlock = {
    type: string,
    content: IBlockContent[]
  }

  type IUnmergedBlock = {
    type: string,
    content: Omit<IBlockContent, "IList"> | IListItem
  }
}