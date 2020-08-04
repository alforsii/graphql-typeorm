import { Schema, model, Document } from "mongoose";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class UserFields {
  @Field(() => ID)
  _id: number;

  @Field()
  email: string;
}

// Whatever is inside interface all fields are required to pass
//when creating this Object(from front-end)
export interface IUser extends Document {
  email: string;
  password: string;
  tokenVersion?: number;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  tokenVersion: { type: Number, default: 0 },
});

export const User = model<IUser>("User", UserSchema);

export default User;
