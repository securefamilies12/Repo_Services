const { DataTypes } = require("sequelize");
const dbConnection = require("../../config/dbConfig");

const Users = dbConnection.define(
  "users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_key: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    user_pass: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_phone: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    user_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    user_verify: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    // profile_pic: {
    //   type: DataTypes.STRING(200),
    //   allowNull: false,
    // },
    created_on: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Users;
