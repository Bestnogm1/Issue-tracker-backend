import { Message } from "../models/message.js";
import { Ticket } from "../models/tickets.js";

function getAllMessage(req, res) {
  Message.find({})
    .populate("ownedBy")
    .then((messages) => res.json(messages))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}

function createMessage(req, res) {
  Message.create(req.body)
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
}

function deleteMessage(req, res) {
  Message.findByIdAndDelete(req.params.messageId)
    .then((message) => {
      Ticket.findById(req.params.ticketId).then((ticket) => {
        ticket.messages.remove(message);
        ticket.save().then(() => {
          res.sendStatus(200).json(message);
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(405).json(err);
    });
}

export { getAllMessage, createMessage, deleteMessage as delete };
