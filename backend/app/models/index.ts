import { config } from "../config/db.config";

import { Dialect, Sequelize } from "sequelize";
import { initRole, Role } from "./role.model";
import { initUsers, User } from "./user.model";
import { initMessages, Message} from "./message.model";
import { initContactStatus, ContactStatus } from "./contact-status.model"
import { initContacts, Contact } from "./contact.model"

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect as Dialect,
    //operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

export const db = {
  user: User,
  role: Role,
  message: Message,
  contactStatus: ContactStatus,
  contact: Contact,
  sequelize,
  ROLES: ["user", "admin", "moderator"],
  STATUS: ["open", "accepted", "rejected", "blocked"]
};

initUsers(sequelize);
initRole(sequelize);
initMessages(sequelize);
initContactStatus(sequelize);
initContacts(sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

