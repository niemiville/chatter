import { RequestHandler } from "express";
import { db } from "../models";

const Message = db.message;

export const sendMessage: RequestHandler = (req, res) => {
    Message.create({
        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
        body: req.body.body
    })
    .then(() => res.status(200).send({ message: "Message sent successfully!"}))
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};
