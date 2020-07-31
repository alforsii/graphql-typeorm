import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  // _id: string;
  email: string;
  password: string;
  tokenVersion: Date;
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: mongoose.SchemaTypes.Date, required: true },
});

export const User = mongoose.model<IUser>("User", UserSchema);

export default User;
