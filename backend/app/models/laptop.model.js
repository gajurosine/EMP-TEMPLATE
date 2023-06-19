const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connectionPool");
const Joi = require('joi');

/**
 * @swagger
 * definitions:
 *   Laptop:
 *     properties:
 *       _id:
 *         type: string
 *       serialNumber:
 *         type: string
 *       manufactureCompany:
 *         type: string
 *       modelName:
 *         type: string
 *     required:
 *       - serialNumber
 *       - manufactureCompany
 *       - modelName
 */

var Laptop = sequelize.define("laptop", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  modelName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  manufactureCompany: {
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

// sync laptop model with database
(async () => {
  try {
    await Laptop.sync();
    console.log("Laptop table created successfully");
  } catch (err) {
    console.error("Error syncing Laptop table:", err);
  }
})();

module.exports = Laptop;

module.exports = Laptop;
module.exports.validateLaptop = (body) => {
  return Joi.object({
    serialNumber: Joi.string().required(),
    manufactureCompany: Joi.string().required(),
    modelName: Joi.string().required(),
  }).validate(body);
};