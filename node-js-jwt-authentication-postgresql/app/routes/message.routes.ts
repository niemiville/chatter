import { Express } from 'express';
import { authJwt } from "../middleware";
import * as  controller from "../controllers/message.controller";

export function messageRoutes(app: Express) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/message",
    [authJwt.verifyToken],
    controller.sendMessage
  );

};
