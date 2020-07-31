import { Schema, model, Document } from "mongoose";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class TodoFields {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field()
  completed?: boolean;
  @Field()
  date: Date;
}

// Whatever is inside interface all fields are required to pass
//when creating this Object(from front-end)
export interface ITodo extends Document {
  title: String;
}

const TodosSchema: Schema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

export const Todo = model<ITodo>("Todo", TodosSchema);

export default Todo;
