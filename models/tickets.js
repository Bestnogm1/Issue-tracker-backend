import mongoose from "mongoose";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);
const Schema = mongoose.Schema;

const ticketsSchema = new Schema(
  {
    Summary: String,
    Description: String,
    Issue: {
      type: String,
      enum: ["Task", "Bug", "Story"],
      default: "Task",
    },
    Priority: {
      type: String,
      enum: ["Urgent", "High", "Normal", "Low"],
      default: "Low",
    },
    Status: {
      type: String,
      enum: ["Open Ticket", "In Progress", "On Hold", "Completed"],
      default: "Open Ticket",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    assignedTo: {
      Assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
    },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketsSchema);

export { Ticket };
