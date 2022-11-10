import { Ticket } from "../models/tickets.js";
import { Message } from "../models/message.js";
import { Profile } from "../models/profile.js";

function index(req, res) {
  Ticket.find({})
    .populate(["owner", "messages", "assignedTo"])
    .then((ticket) => {
      res.json(ticket.reverse());
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function create(req, res) {
  req.body.owner = req.user.profile;
  Ticket.create(req.body)
    .then((ticket) => {
      ticket.populate(["owner", "assignedTo"]).then((ticket) => {
        const profileId = ticket.assignedTo;
        Profile.findById(profileId).then((profile) => {
          profile.ticketAssignedToMe.push(ticket);
          profile.save();
        });
      });
      res.status(200).json(ticket);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function deleteTicket(req, res) {
  Ticket.findById(req.params.id)
    .then((ticket) => {
      Ticket.findByIdAndDelete(req.params.id).then((ticket) => {
        Profile.findByIdAndUpdate(ticket.assignedTo).then((profile) => {
          profile.ticketAssignedToMe.remove({ _id: ticket._id });
          console.log(req.params.id, "ticket id");
          profile.save().then(() => res.sendStatus(200));
        });
        // Message.find()
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
}

function update(req, res) {
  Ticket.findOneAndDelete(req.params.id, req.body, { new: true })
    .populate(["owner", "messages"])
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

function completedOrNot(req, res) {
  Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, result) => {
      res.send(result);
      if (error) console.log(error);
    }
  ).populate(["owner", "messages"]);
}

export { index, create, deleteTicket, update, show, completedOrNot };
