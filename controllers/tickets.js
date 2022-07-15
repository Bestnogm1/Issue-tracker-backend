import { Ticket } from '../models/tickets.js'
function index(req, res) {
  Ticket.find({})
  .populate(["owner"])
  .then(ticket => res.json(ticket))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
}

export {
  index
}