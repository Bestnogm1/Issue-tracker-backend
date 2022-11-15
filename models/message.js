import mongoose from "mongoose";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    content: String,
    ownedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    ticketId: String,
    tempUUID: String,
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export { Message };
