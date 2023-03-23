import { Express } from 'express';
import { authJwt } from "../middleware";
import * as  controller from "../controllers/contact.controller";

export function contactRoutes(app: Express) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/contact-request",
    [authJwt.verifyToken, authJwt.verifyUser],
    controller.sendContactRequest
  );

  app.get(
    "/api/contact-request",
    [authJwt.verifyToken, authJwt.verifyUser],
    controller.getOpenContactRequests
  );

  app.put(
    "/api/contact-request",
    [authJwt.verifyToken, authJwt.verifyUser],
    controller.updateContactRequest
  );

};
