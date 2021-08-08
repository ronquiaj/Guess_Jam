import mongoose, { Schema } from "mongoose";
import User from "../interfaces/user";
import bcrypt from "bcrypt";

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profile_picture: { type: String, required: false }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<User>("User", userSchema);
