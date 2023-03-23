import { DataTypes, Model, Sequelize } from 'sequelize';

export class ContactStatus extends Model {
  id!: number;
  name!: string;
}

export function initContactStatus(sequelize: Sequelize) {
  ContactStatus.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  },
    {
      sequelize,
      tableName: 'contactstatus'
    });
  return ContactStatus;
};
