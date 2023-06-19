const {Sequelize} = require('sequelize');

const { validateEmployee } = require("../models/employee.model");
const Employee = require("../models/employee.model");
const LaptopEmployee = require("../models/laptopEmployee.model");
const { validateObjectId } = require("../utils/imports");

/***
 * Get all employees
 * @param req
 * @param res
 */
exports.getAllEmployees = async (req, res) => {
  try {
    let { limit, page } = req.query;

    if (!page || page < 1) page = 1;

    if (!limit) limit = 10;

    const options = {
      offset: (page - 1) * limit,
      limit: limit,
    };

    const data = await Employee.findAll(options);

    res.send({ data });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

/***
 *  Create a new employee
 * @param req
 * @param res
 */
exports.createEmployee = async (req, res) => {
  try {
    const { error } = validateEmployee(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { nationalId, phone } = req.body;

    const employee = await Employee.findOne({
      where: { [Sequelize.Op.or]: [{ nationalId }, { phone }] },
    });

    if (employee) {
      const phoneFound = phone === employee.phone;
      return res.status(400).send({
        message: `Employee with the same ${
          phoneFound ? "phone" : "national ID"
        } already exists`,
      });
    }

    const newEmployee = await Employee.create(req.body);

    return res.status(201).send({ message: "CREATED", data: newEmployee });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

/***
 *  Update an employee
 * @param req
 * @param res
 */
exports.updateEmployee = async (req, res) => {
  try {
    if (!validateObjectId(req.params.id))
      return res.status(400).send({ message: "Invalid id" });

    const { error } = validateEmployee(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { nationalId, phone } = req.body;

    const duplicateEmployee = await Employee.findOne({
      where: {
        id: { [Sequelize.Op.ne]: req.params.id },
        [Sequelize.Op.or]: [{ nationalId }, { phone }],
      },
    });

    if (duplicateEmployee) {
      const phoneFound = phone === duplicateEmployee.phone;
      return res.status(400).send({
        message: `Employee with the same ${
          phoneFound ? "phone" : "national ID"
        } already exists`,
      });
    }

    const employee = await Employee.findByPk(req.params.id);
    if (!employee)
      return res.status(404).send({ message: "Employee not found" });

    await employee.update(req.body);

    return res.status(200).send({ message: "UPDATED", data: employee });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

/***
 *  Delete an employee
 * @param req
 * @param res
 */
exports.deleteEmployee = async (req, res) => {
  try {
    if (!validateObjectId(req.params.id))
      return res.status(400).send({ message: "Invalid id" });

    const employee = await Employee.findByPk(req.params.id);
    if (!employee)
      return res.status(404).send({ message: "Employee not found" });

    await employee.destroy();

    return res.send({ message: "DELETED", data: employee });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};
