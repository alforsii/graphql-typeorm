import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Todo, TodoFields } from "../entity/Todo.model";

// Readings - GET
@Resolver()
export class TodoResolvers {
  @Query(() => [TodoFields])
  async todos() {
    return await Todo.find();
  }
  @Query(() => TodoFields)
  async todo(@Arg("id") id: string) {
    return await Todo.findById(id);
  }
  @Mutation(() => TodoFields)
  async addTodo(@Arg("title") title: string) {
    return await Todo.create({ title });
  }
  @Mutation(() => TodoFields)
  async removeTodo(@Arg("id") id: string) {
    return await Todo.findByIdAndRemove(id);
  }
  @Mutation(() => TodoFields)
  async updateTodo(
    @Arg("id") id: string,
    @Arg("title") title: string,
    @Arg("completed") completed: boolean
  ) {
    return await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );
  }
}
