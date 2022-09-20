import mongoose from "mongoose";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);
const Schema = mongoose.Schema;

const ticketsSchema = new Schema(
  {
    assingedTo: String,
    details: String,
    subject: String,
    problems: {
      type: String,
      enum: ["Software", "Hardware", "Bug", "Documentation"],
      default: "Software",
    },
    severity: {
      type: String,
      enum: ["Urgent", "High", "Normal", "Low"],
      default: "Low",
    },
    newDate: {
      type: String,
    },
    date: Date.parse(),
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketsSchema);

export { Ticket };
