import { DataTypes, Model, Sequelize } from "sequelize";
import { ContactStatus } from "./contact-status.model";

export class Contact extends Model {
  senderId!: number;
  receiverId!: string;
  setStatus!: (status: (ContactStatus | number)[]) => Promise<void>;
  getStatus!: () => Promise<ContactStatus[]>
}

export function initContacts(sequelize: Sequelize) {
  Contact.init({
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: "contacts"
  });
}
