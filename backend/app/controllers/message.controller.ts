import { RequestHandler } from "express";
import { db } from "../models";
import { Op } from "sequelize";

const Message = db.message;

export const sendMessage: RequestHandler = (req, res) => {
    Message.create({
        senderId: req.query.senderId,
        receiverId: req.query.receiverId,
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
                [Op.or]: [req.query.senderId, req.query.receiverId]
            },
            receiverId: {
                [Op.or]: [req.query.receiverId, req.query.senderId]
            }
        }
    })
    .then((messages) => res.status(200).send({ messages }))
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};
