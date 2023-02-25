import { ID, ObjectType, Field } from "type-graphql";
import { IMetadata } from "@z-squared/types";

@ObjectType()
export class Metadata implements IMetadata{
  constructor(params?: IMetadata){
    Object.assign(this, params);
  }
  @Field(returns => ID)
  public id: string

  @Field()
  public name: string

  @Field(returns => [String])
  public categories: string[]

  @Field()
  public publishDate: Date

  @Field()
  public publish: boolean

  @Field(returns => [String])
  public authors: string[]

  @Field()
  public slug: string
}