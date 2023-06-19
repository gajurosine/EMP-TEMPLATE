const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connectionPool");
const Joi = require('joi');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       _id:
 *         type: string
 *       First name:
 *         type: string
 *       Last name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       phone:
 *         type: string
 *       nationalId:
 *         type: string
 *       department:
 *         type: string
 *       position:
 *         type: string
 *     required:
 *       - names
 *       - email
 *       - password
 *       - phone
 *       - nationalId
 *       - department
 *       - position
 */

var User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
},
first_name: {
  type: DataTypes.STRING(255),
  allowNull: false,
},
last_name: {
  type: DataTypes.STRING(255),
  allowNull: false,
},
NID: {
  type: DataTypes.STRING(255),
  allowNull: false,
},
department: {
  type: DataTypes.STRING(255),
  allowNull: false,
},
position: {
  type: DataTypes.STRING(255),
  allowNull: false,
},
  email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
  },
  password: {
      type: Sequelize.STRING(255),
      allowNull: false,
  },
});

// sync user model with database
(async () => {
  try {
      await User.sync();
      console.log("Users table created successfully");
  } catch (err) {
      console.error("Error syncing Users table:", err);
  }
})();

module.exports.NationalIdPattern = /(?<!\d)\d{16}(?!\d)/;
module.exports.PhoneRegex = /(?<!\d)\d{10}(?!\d)/

module.exports = User;
module.exports.validateUser = (body,isUpdating=false) => {
  return Joi.object({
    names: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(this.PhoneRegex).required(), // validate phone
    password: isUpdating ? Joi.string().min(6) : Joi.string().min(6).required(),
    nationalId: Joi.string().pattern(this.NationalIdPattern).length(16).required(),
  }).validate(body);
};

module.exports.validateUserLogin = (body) => {
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }).validate(body);
};