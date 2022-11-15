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
  Message.findOneAndDelete(req.body)
    .then((message) => {
      console.log(message);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(405).json(err);
    });
}

export { getAllMessage, createMessage, deleteMessage as delete };
