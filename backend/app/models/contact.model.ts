import { DataTypes, Model, Sequelize } from "sequelize";
import { ContactStatus } from "./contact-status.model";

export class Contact extends Model {
  senderId!: number;
  receiverId!: string;
  status!: number;
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
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ContactStatus,
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: "contacts"
  });
}
