const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connectionPool");
const Joi = require('joi');

/**
 * @swagger
 * definitions:
 *   Laptop:
 *     properties:
 *       id:
 *         type: string
 *       laptopSerialNumber:
 *         type: string
 *       manufactureCompany:
 *         type: string
 *       modelName:
 *         type: string
 *     required:
 *       - laptopSerialNumber
 *       - manufactureCompany
 *       - modelName
 */

const Laptop = sequelize.define("laptops", {
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
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
});

// Sync laptop model with the database
(async () => {
  try {
    await Laptop.sync();
    console.log("Laptop table created successfully");
  } catch (err) {
    console.error("Error syncing Laptop table:", err);
  }
})();

module.exports = Laptop;

module.exports.validateLaptop = (body) => {
  return Joi.object({
    laptopSerialNumber: Joi.string().required(),
    manufactureCompany: Joi.string().required(),
    modelName: Joi.string().required(),
  }).validate(body);
};
