import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export { User };
