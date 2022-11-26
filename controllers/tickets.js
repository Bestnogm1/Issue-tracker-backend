import { Ticket } from "../models/tickets.js";
import { Message } from "../models/message.js";
import { Profile } from "../models/profile.js";
import {
  deleteImageFromS3,
  getAllTicketImage,
} from "../middleware/AddingImage.js";

const index = async (req, res) => {
  try {
    const allTicket = await Ticket.find({}).populate(["owner", "assignees"]);
    const ticketWithImage = await getAllTicketImage(allTicket);
    res.json(ticketWithImage);
  } catch (err) {
    res.status(500).json(err);
  }
};

function create(req, res) {
  Ticket.create(req.body.ticketForm)
    .then((createdTicket) => {
      createdTicket.populate(["owner"]).then((tickets) => {
        tickets.assignees.forEach((profile) => {
          Profile.findById({ _id: profile._id }).then((profiles) => {
            profiles.ticketAssignedToMe.push(tickets);
            profiles.save();
          });
        });
      });
      res.status(200).json(createdTicket);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function updateStatus(req, res) {
  console.log();
  const { _id, status } = req.body;
  Ticket.findByIdAndUpdate({ _id: _id }, { status: status }).then((ticket) =>
    ticket.save().then(() => res.sendStatus(200))
  );
}

function deleteTicket(req, res) {
  Ticket.findById(req.params.id)
    .then((tickets) => {
      deleteImageFromS3(tickets);
      deleteMessageAssignedWithTicket(req.params.id);
      Ticket.findByIdAndDelete(req.params.id)
        .then((deletedTicket) => {
          deletedTicket.assignees.forEach((id) => {
            Profile.findByIdAndUpdate(id).then((profile) => {
              profile.ticketAssignedToMe.remove({ _id: deletedTicket._id });
              profile.save();
            });
          });
        })
        .then(() => res.sendStatus(200));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
}

function deleteMessageAssignedWithTicket(ticketId) {
  Message.deleteMany({ ticketId: ticketId }).catch((err) => console.error(err));
}

function update(req, res) {
  Ticket.findOneAndDelete(req.params.id, req.body, { new: true })
    .populate(["owner"])
    .then((ticket) => res.json(ticket))
    .catch((err) => res.json(err));
}

function show(req, res) {
  Ticket.findById(req.params.id)
    .populate(["owner", "messages"])
    .then((ticket) => {
      res.status(200).json(ticket);
    })
    .catch((err) => res.json(err));
}

//completed
export { index, create, deleteTicket, update, show, updateStatus };
