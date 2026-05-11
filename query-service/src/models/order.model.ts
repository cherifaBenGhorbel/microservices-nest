import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Order {

  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  productId!: number;

  @Field(() => Int)
  quantity!: number;

  @Field()
  status!: string;

  @Field()
  customerEmail!: string;
}