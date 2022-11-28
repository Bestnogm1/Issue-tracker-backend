import mongoose from "mongoose";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);
const Schema = mongoose.Schema;

const ticketsSchema = new Schema(
  {
    issue: {
      type: String,
      enum: ["Task", "Bug", "Story"],
      default: "Task",
    },
    title: String,
    description: String,
    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
    priority: {
      type: String,
      enum: ["Urgent", "High", "Normal", "Low"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Open Ticket", "In Progress", "On Hold", "Completed"],
      default: "Open Ticket",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    completed: { type: Boolean, default: false },
    tempUUID: String,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketsSchema);

export { Ticket };
