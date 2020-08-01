import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Int,
} from "type-graphql";
import axios from "axios";

@ObjectType()
class PostFields {
  @Field(() => Int)
  userId: number;
  @Field(() => Int)
  id: number;
  @Field()
  title: string;
  @Field()
  body: string;
}

@Resolver()
export class PostResolvers {
  @Query(() => [PostFields])
  async posts() {
    return await (
      await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=15")
    ).data;
  }
  @Query(() => PostFields)
  async post(@Arg("id") id: number): Promise<PostFields> {
    return await (
      await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    ).data;
  }
  @Mutation(() => PostFields)
  async addPost(
    @Arg("title") title: string,
    @Arg("body") body: string
  ): Promise<PostFields> {
    return await (
      await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body,
      })
    ).data;
  }
  @Mutation(() => PostFields)
  async updatePost(
    @Arg("id") id: number,
    @Arg("title") title: string,
    @Arg("body", { nullable: true }) body: string
  ): Promise<PostFields> {
    return await (
      await axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        title,
        body,
      })
    ).data;
  }
  @Mutation(() => String)
  async deletePost(@Arg("id") id: number) {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`); //returns: {}
    return `Post ${id} removed`;
  }
}
