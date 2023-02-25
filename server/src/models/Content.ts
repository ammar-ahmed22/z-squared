import { ObjectType, Field, createUnionType } from "type-graphql";
import { 
  IRichText, 
  IAnnotations, 
  AnnotationsColor, 
  IImage,
  IListItem,
  IList,
  IBlock,
  IBlockContent 
} from "@z-squared/types";


@ObjectType()
export class Annotations implements IAnnotations{
  @Field()
  public bold: boolean;

  @Field()
  public strikethrough: boolean;

  @Field()
  public italic: boolean;

  @Field()
  public underline: boolean;

  @Field()
  public code: boolean;

  @Field(returns => String)
  public color: AnnotationsColor;
  
}

@ObjectType()
export class RichText implements IRichText{
  @Field()
  public plainText: string

  @Field(returns => Annotations)
  public annotations: IAnnotations

  @Field({ nullable: true })
  public href?: string
}


@ObjectType()
export class Image implements IImage{
  @Field()
  public url: string

  @Field(returns => [RichText])
  public caption: IRichText[]
}


@ObjectType()
export class ListItem implements IListItem{
  @Field(returns => [RichText])
  public content: IRichText[]

  @Field(returns => [ListItem], { nullable: true })
  public children?: IListItem[]
}

@ObjectType()
export class List implements IList{
  @Field(returns => [ListItem])
  public children: IListItem[]
}


export const BlockContent = createUnionType({
  name: "BlockContent",
  types: () => [Image, List, RichText] as const,
  resolveType: (value) => {
    if ("plainText" in value){
      return RichText
    }
    if ("children" in value){
      return List
    }
    if ("url" in value){
      return Image
    }
    return undefined;
  }
})


@ObjectType()
export class Block implements IBlock{
  @Field()
  public type: string;

  @Field(returns => [BlockContent])
  public content: IBlockContent[]
}

