const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connectionPool");
const Joi = require('joi');
const { NationalIdPattern, PhoneRegex } = require("./user.model");

/**
 * @swagger
 * definitions:
 *   Employee:
 *     properties:
 *       _id:
 *         type: string
 *       First name:
 *         type: string
 *       Last name:
 *         type: string
 *       email:
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
 *       - phone
 *       - nationalId
 *       - department
 *       - position
 */

var Employee = sequelize.define("employees", {
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
  nationalId: {
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
  phone: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true,
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal(
      "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ),
    allowNull: false,
  },
});

// sync employee model with database
(async () => {
  try {
    await Employee.sync();
    console.log("Employee table created successfully");
  } catch (err) {
    console.error("Error syncing Employee table:", err);
  }
})();

module.exports = Employee;

module.exports.validateEmployee = (body) => {
  return Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(PhoneRegex).required(), // validate phone
    department: Joi.string().required(),
    position: Joi.string().required(),
    nationalId: Joi.string().pattern(NationalIdPattern).length(16).required(),
  }).validate(body);
};