const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connectionPool");
const Employee = require("./employee.model");
const Laptop = require("./laptop.model");
const Joi = require('joi');

/**
 * @swagger
 * definitions:
 *   LaptopEmployee:
 *     properties:
 *       id:
 *         type: string
 *       employeeId:
 *         type: string
 *       laptopId:
 *         type: string
 *       laptopSerialNumber:
 *         type: string
 *     required:
 *       - employeeId
 *       - laptopId
 *       - laptopSerialNumber
 */

const LaptopEmployee = sequelize.define("laptopEmployee", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee, // Referencing the Employee model
      key: 'id'
    }
  },
  laptopId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Laptop, // Referencing the Laptop model
      key: 'id'
    }
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

// Define associations
LaptopEmployee.belongsTo(Employee, { foreignKey: 'employeeId' });
LaptopEmployee.belongsTo(Laptop, { foreignKey: 'laptopId' });

// Sync laptopEmployee model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log("Database synchronized successfully");
  } catch (err) {
    console.error("Error syncing database:", err);
  }
})();

module.exports = LaptopEmployee;

module.exports.validateLaptopEmployee = (body) => {
  return Joi.object({
    employeeId: Joi.number().required(),
    laptopId: Joi.number().required(),
    laptopSerialNumber: Joi.string().required(),
  }).validate(body);
};
