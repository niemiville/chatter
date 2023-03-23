import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./user.model";

export class Message extends Model {
  senderId!: number;
  receiverId!: number;
  body!: string;
}

export function initMessages(sequelize: Sequelize) {
  Message.init({
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: "messages"
  });
}
