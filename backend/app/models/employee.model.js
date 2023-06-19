const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connectionPool");
const Joi = require('joi');
const { NationalIdPattern, PhoneRegex } = require("./user.model");

/**
 * @swagger
 * definitions:
 *   Employee:
 *     properties:
 *       id:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
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
 *       - firstName
 *       - lastName
 *       - email
 *       - phone
 *       - nationalId
 *       - department
 *       - position
 */

const Employee = sequelize.define("employees", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  lastName: {
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
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
});

// Sync employee model with the database
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
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(PhoneRegex).required(),
    department: Joi.string().required(),
    position: Joi.string().required(),
    nationalId: Joi.string().pattern(NationalIdPattern).length(16).required(),
  }).validate(body);
};
