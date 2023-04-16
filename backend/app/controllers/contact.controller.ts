import { RequestHandler } from "express";
import { db } from "../models";
import { Op } from "sequelize";

const Contact = db.contact;
const ContactStatus = db.STATUS;

export const sendContactRequest: RequestHandler = (req, res) => {
    Contact.create({
        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
        status: ContactStatus.indexOf("open") + 1
    })
    .then(() => res.status(200).send({ message: "Contact request sent successfully!"}))
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

export const getOpenContactRequests: RequestHandler = (req, res) => {
    Contact.findAll({
        where: {       
            receiverId: req.query.senderId, //contact requests received by the sender (requester) user
            status: ContactStatus.indexOf("open") + 1
        }
    })
    .then((contactRequests) => res.status(200).send({ contactRequests }))
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

export const updateContactRequest: RequestHandler = (req, res) => {
    Contact.findOne({
        where: {
            senderId: req.body.receiverId,
            receiverId: req.body.senderId
        }
    })
    .then(contact => contact?.update({ status: ContactStatus.indexOf(req.body.status) + 1 }))
    .then(contact => contact?.save())
    .then(() => res.status(200).send({ message: "Contact request updated successfully!"}))
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

export const getContacts: RequestHandler = (req, res) => {
    Contact.findAll({
        where: {       
            [Op.or]: [
                {senderId: (req as any).userId},
                {receiverId: (req as any).userId}
            ],
            status: ContactStatus.indexOf("accepted") + 1
        }
    })
    .then((contacts) => res.status(200).send({ contacts }))
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};