import { RequestHandler } from "express";
import { db } from "../models";
import { Op } from "sequelize";

const User = db.user;

export const allAccess: RequestHandler = (req, res) => {
  res.status(200).send("Public Content.");
};

export const userBoard: RequestHandler = (req, res) => {
  res.status(200).send("User Content.");
};

export const adminBoard: RequestHandler = (req, res) => {
  res.status(200).send("Admin Content.");
};

export const moderatorBoard: RequestHandler = (req, res) => {
  res.status(200).send("Moderator Content.");
};

export const getContactNames: RequestHandler = (req, res) => {
  console.log(req.body.idList);
  User.findAll({
    attributes: ["id", "username"],
    where: {       
      id: req.body.idList
    }
  })
  .then((usernames) => res.status(200).send({ usernames }))
  .catch(err => {
      res.status(500).send({ message: err.message });
  });
};

export const getUserId: RequestHandler = (req, res) => {
  console.log(req.body.username);
  User.findOne({
    attributes: ["id", "username"],
    where: {       
      username: req.body.username
    }
  })
  .then((user) => res.status(200).send({ user }))
  .catch(err => {
      res.status(500).send({ message: err.message });
  });
};
