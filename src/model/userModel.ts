import mongoose, { Document, Model, Schema } from "mongoose";

// 1️⃣ Define Todo type
interface Todo {
  title: string;
  completed: boolean;
  createdAt: Date;
}

// 2️⃣ Define User document type
export interface IUser extends Document {
  email: string;
  name?: string;
  image?: string; // profile picture (for OAuth)
  emailVerified: boolean;
  todos: Todo[];
  createdAt: Date;
  updatedAt: Date;
}

// 3️⃣ Define schema
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  image: { type: String }, // only for OAuth users
  emailVerified: { type: Boolean, default: false },
  todos: [
    {
      title: { type: String, required: true },
      completed: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
}, {
  timestamps: true, // automatically adds createdAt & updatedAt
});

// 4️⃣ Export model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
