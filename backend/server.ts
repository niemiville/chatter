import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
import { db } from "./app/models";
import { authRoutes } from "./app/routes/auth.routes";
import { userRoutes } from "./app/routes/user.routes";
import { messageRoutes } from "./app/routes/message.routes";
import { contactRoutes } from "./app/routes/contact.routes";
const Role = db.role;
const ContactStatus = db.contactStatus;

// db.sequelize.sync();
// force: true will drop the table if it already exists
/* db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
}); */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
authRoutes(app);
userRoutes(app);
messageRoutes(app);
contactRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });

  ContactStatus.create({
    id: 1,
    name: "open"
  });
  
  ContactStatus.create({
    id: 2,
    name: "accepted"
  });
  
  ContactStatus.create({
    id: 3,
    name: "rejected"
  });

  ContactStatus.create({
    id: 4,
    name: "blocked"
  });

}