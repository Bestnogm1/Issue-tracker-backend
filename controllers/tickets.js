import { Ticket } from "../models/tickets.js";
import { Message } from "../models/message.js";
import { Profile } from "../models/profile.js";
import {
  deleteImageFromS3,
  getAllTicketImage,
} from "../middleware/AddingImage.js";

const getAllTicket = async (req, res) => {
  try {
    const allTicket = await Ticket.find({}).populate(["owner", "assignees"]);
    const ticketWithImage = await getAllTicketImage(allTicket);
    res.json(ticketWithImage);
  } catch (error) {
    console.error(error);
    res.status(500).json(err);
  }
};

const create = async (req, res) => {
  try {
    const createdTicket = await Ticket.create(req.body.ticketForm);
    const tickets = await createdTicket.populate(["owner"]);
    for (const ticket of tickets.assignees) {
      const profiles = await Profile.findById({ _id: ticket._id });
      profiles.ticketAssignedToMe.push(createdTicket);
      profiles.save();
    }
    res.status(200).json(createdTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json(err);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(
      { _id: _id },
      { status: status }
    );
    ticket.save();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json(err);
  }
};

const deleteTicket = async (req, res) => {
  try {
    const tickets = await Ticket.findById(req.params.id);
    deleteImageFromS3(tickets);
    deleteMessageAssignedWithTicket(req.params.id);
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    for (const id of deletedTicket.assignees) {
      const profile = await Profile.findByIdAndUpdate(id);
      profile.ticketAssignedToMe.remove({ _id: deletedTicket._id });
      profile.save();
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json(err);
  }
};

const deleteMessageAssignedWithTicket = async (ticketId) => {
  try {
    Message.deleteMany({ ticketId: ticketId });
  } catch (error) {
    console.error(error);
    res.status(500).json(err);
  }
};

export { getAllTicket, create, deleteTicket, updateStatus };
