import mongoose from "mongoose";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);
const Schema = mongoose.Schema;

const CommentsSchema = new Schema(
  {
    comments: String,
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("Comments", CommentsSchema);

export { Comments };
