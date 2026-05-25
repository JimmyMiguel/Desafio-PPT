import { DataTypes, Model } from "sequelize";
import { sequelize } from "../bd/sequelize.ts";

export class Room extends Model {
  declare id: string;
  declare player1_name: string;
  declare readonly createdAt: Date;
}

Room.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    player1_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Room",
    tableName: "rooms",
    timestamps: true,
    updatedAt: false,
    underscored: true,
  }
);
