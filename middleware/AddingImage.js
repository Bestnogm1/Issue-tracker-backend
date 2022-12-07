import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { Ticket } from "../models/tickets.js";

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
});

export const addImagesToTicket = async (req, res) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: req.body.uuid,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
    await sendImageToS3Bucket(req.body.uuid, res);
    res.sendStatus(200);
  } catch (error) {
    if (error) res.send(error);
  }
};

export async function sendImageToS3Bucket(tempUUID, res) {
  try {
    const ticket = await Ticket.findOneAndUpdate(
      { tempUUID: tempUUID },
      {
        imageUrl: `https://issuetrackerimage.s3.amazonaws.com/${tempUUID}`,
      }
    );
    ticket.save();
  } catch (error) {
    console.error(error);
    res.status(500).json(err);
  }
}

export const deleteImageFromS3 = async (tickets) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: tickets.tempUUID,
    };
    const command = new DeleteObjectCommand(params);
    await s3.send(command);
  } catch (error) {
    if (error) console.error(error);
  }
};
