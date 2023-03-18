import { RequestHandler } from "express";
import { db } from "../models";
import { Op } from "sequelize";

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

export const getMessagesFromChat: RequestHandler = (req, res) => {
    Message.findAll({
        where: {       
            senderId: {
                [Op.or]: [req.body.senderId, req.body.receiverId]
            },
            receiverId: {
                [Op.or]: [req.body.receiverId, req.body.senderId]
            }
        }
    })
    .then((messages) => res.status(200).send({ messages }))
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};
