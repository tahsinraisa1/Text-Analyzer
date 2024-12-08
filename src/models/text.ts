import mongoose, { Schema, Document } from "mongoose";

interface IText extends Document {
  data: string;
  author: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const textSchema = new Schema<IText>({
  data: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IText>("Text", textSchema);
