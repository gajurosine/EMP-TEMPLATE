const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connectionPool");
const Joi = require('joi');

/**
 * @swagger
 * definitions:
 *   LaptopEmployee:
 *     properties:
 *       _id:
 *         type: string
 *       employee:
 *         type: string
 *       laptop:
 *         type: string
 *       laptopSerialNumber:
 *         type: string
 *     required:
 *       - employee
 *       - laptop
 *       - laptopSerialNumber
 */

var LaptopEmployee = sequelize.define("laptopEmployees", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  employee: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  laptop: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  laptopSerialNumber: {
    type: DataTypes.STRING(255),
    allowNull: false,
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

// sync user model with database
(async () => {
  try {
    await LaptopEmployee.sync();
    console.log("LaptopEmployee table created successfully");
  } catch (err) {
    console.error("Error syncing LaptopEmployee table:", err);
  }
})();

module.exports = LaptopEmployee;
module.exports.validateLaptopEmployee = (body) => {
  return Joi.object({
    employee: Joi.string().required(),
    laptop: Joi.string().required(),
    laptopSerialNumber: Joi.string().required()
  }).validate(body);
};