import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ticketsSchema = new Schema(
  {
  assingedTo: String,
  details: String,
  problems:{
    type: String,
    enum: ['Software','Hardware']
  },
  severity:{
    type: String,
    enum: ['Urgent', 'High', 'Normal', 'Low']
  },
  date: Date.parse(),
  owner: {
    type: mongoose.Schema.Types.ObjectId, 'ref': 'Profile'
  },
  
  },{
  timestamps: true
})

const Ticket = mongoose.model('Ticket', ticketsSchema)

export {
  Ticket
}