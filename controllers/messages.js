import { Message } from "../models/message.js";

const getAllMessage = async (req, res) => {
  try {
    const message = await Message.find({}).populate("ownedBy");
    res.status(200).json(message);
  } catch (error) {
    console.error(err);
    res.status(500).json(err);
  }
};

const createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(200).json(message);
  } catch (error) {
    console.error(err);
    res.status(500).json(err);
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findOneAndDelete(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error(err);
    res.status(405).json(err);
  }
};

export { getAllMessage, createMessage, deleteMessage as delete };
