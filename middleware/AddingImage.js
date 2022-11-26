import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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
    sendImageToS3Bucket(req.body.uuid);
    res.sendStatus(200);
  } catch (error) {
    if (error) res.send(error);
  }
};

export async function sendImageToS3Bucket(tempUUID) {
  try {
    const GetImageParams = {
      Bucket: bucketName,
      Key: tempUUID,
    };
    const command = new GetObjectCommand(GetImageParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 571000 });
    const ticket = await Ticket.findOne({ tempUUID: tempUUID });
    ticket.imageUrl = url;
    console.log(ticket);
    ticket.save();
  } catch (error) {
    if (error) console.log(error);
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

export const getAllTicketImage = async (tickets) => {
  try {
    for (const ticket of tickets) {
      const getAllTicketToImageParams = {
        Bucket: bucketName,
        Key: ticket.tempUUID,
      };
      const command = new GetObjectCommand(getAllTicketToImageParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 571000 });
      ticket.imageUrl = url;
      return [...tickets];
    }
  } catch (error) {
    if (error) console.log(error);
  }
};
