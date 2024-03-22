const { DataTypes, Sequelize } = require("sequelize");
const dbConnection = require("../../config/dbConfig");

const UserSecurity = dbConnection.define(
  "usersecurity",
  {
    us_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      comment: "user_id from user table",
    },
    Role_Coll: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    usmsg: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "7 Days Trail",
    },
    Str_Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    End_Date: {
      type: DataTypes.DATE,
    },
    Assig_Date: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    Assig_By: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = UserSecurity;
