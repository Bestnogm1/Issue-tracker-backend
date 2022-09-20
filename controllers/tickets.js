import { Ticket } from "../models/tickets.js";

function index(req, res) {
  Ticket.find({})
    .populate(["owner"])
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
      ticket
        .populate("owner")
        .then((ticket) => res.json(ticket))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch((err) => res.json(err));
}

function deleteTicket(req, res) {
  Ticket.findByIdAndDelete(req.params.id)
    .populate("owner")
    .then((ticket) => res.json(ticket))
    .catch((err) => res.status(500).json(err));
}

function update(req, res) {
  Ticket.findOneAndDelete(req.params.id, req.body, { new: true })
    .populate("owner")
    .then((ticket) => res.json(ticket))
    .catch((err) => res.json(err));
}

function show(req, res) {
  Ticket.findById(req.params.id)
    .populate("owner")
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
  ).populate("owner");
}

export { index, create, deleteTicket, update, show, completedOrNot };
