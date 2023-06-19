const { Op } = require('sequelize');
const LaptopEmployee = require("../models/laptopEmployee.model");
const Employee = require("../models/employee.model");
const Laptop = require("../models/laptop.model");
const { validateObjectId } = require('../utils/imports');
const { validateLaptopEmployee } = require("../models/laptopEmployee.model");

/***
 * Get all laptopEmployees
 * @param req
 * @param res
 */
exports.getAllLaptopEmployees = async (req, res) => {
  try {
    let { limit, page } = req.query;

    if (!page || page < 1) page = 1;
    if (!limit) limit = 10;

    const options = {
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      include: [Laptop, Employee],
    };

    const { count, rows } = await LaptopEmployee.findAndCountAll(options);

    res.send({
      data: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page),
        itemsPerPage: Number(limit),
        items: rows,
      },
    });
  } catch (e) {
    return res.status(500).send(e.toString());
  }
};

/***
 *  Create a new laptopEmployee
 * @param req
 * @param res
 */
exports.createLaptopEmployee = async (req, res) => {
  try {
    const { error } = validateLaptopEmployee(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    if (!req.body.laptopSerialNumber)
      return res.status(400).send({ message: 'Invalid Serial Number' });

    if (!validateObjectId(req.body.laptopId))
      return res.status(400).send({ message: 'Invalid laptop id' });

    if (!validateObjectId(req.body.employeeId))
      return res.status(400).send({ message: 'Invalid employee id' });

    const laptop = await Laptop.findByPk(req.body.laptopId);
    if (!laptop) return res.status(404).send({ message: 'Laptop not found' });

    const employee = await Employee.findByPk(req.body.employeeId);
    if (!employee) return res.status(404).send({ message: 'Employee not found' });

    const isDuplicate = await LaptopEmployee.findOne({
      where: {
        laptopSerialNumber: req.body.laptopSerialNumber,
      },
    });
    if (isDuplicate)
      return res.status(400).send({ message: 'Laptop Serial Number is already used' });

    const newLaptopEmployee = await LaptopEmployee.create(req.body);

    return res.status(201).send({
      message: 'CREATED',
      data: {
        ...newLaptopEmployee.toJSON(),
        employee: employee.toJSON(),
        laptop: laptop.toJSON(),
      },
    });
  } catch (e) {
    return res.status(500).send(e.toString());
  }
};

/***
 * Update a laptopEmployee
 * @param req
 * @param res
 */
exports.updateLaptopEmployee = async (req, res) => {
  try {
    if (!validateObjectId(req.params.id))
      return res.status(400).send({ message: 'Invalid Id' });

    const { error } = validateLaptopEmployee(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    if (!req.body.laptopSerialNumber)
      return res.status(400).send({ message: 'Invalid Serial Number' });

    if (!validateObjectId(req.body.laptopId))
      return res.status(400).send({ message: 'Invalid laptop Id' });

    if (!validateObjectId(req.body.employeeId))
      return res.status(400).send({ message: 'Invalid employee Id' });

    const laptop = await Laptop.findByPk(req.body.laptopId);
    if (!laptop) return res.status(404).send({ message: 'Laptop not found' });

    const employee = await Employee.findByPk(req.body.employeeId);
    if (!employee) return res.status(404).send({ message: 'Employee not found' });

    const isDuplicate = await LaptopEmployee.findOne({
      where: {
        id: { [Op.ne]: req.params.id },
        laptopSerialNumber: req.body.laptopSerialNumber,
      },
    });
    if (isDuplicate)
      return res.status(400).send({ message: 'laptopSerialNumber is already used' });

    const updatedLaptopEmployee = await LaptopEmployee.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (updatedLaptopEmployee[0] === 0)
      return res.status(404).send({ message: 'LaptopEmployee not found' });

    return res.status(200).send({
      message: 'UPDATED',
      data: {
        ...updatedLaptopEmployee[1][0].toJSON(),
        employee: employee.toJSON(),
        laptop: laptop.toJSON(),
      },
    });
  } catch (e) {
    return res.status(500).send(e.toString());
  }
};

/***
 * Delete a laptopEmployee
 * @param req
 * @param res
 */
exports.deleteLaptopEmployee = async (req, res) => {
  try {
    if (!validateObjectId(req.params.id))
      return res.status(400).send({ message: 'Invalid Id' });

    const deletedLaptopEmployee = await LaptopEmployee.destroy({
      where: { id: req.params.id },
    });

    if (!deletedLaptopEmployee)
      return res.status(404).send({ message: 'Laptop-Employee not found' });

    return res.send({
      message: 'DELETED',
      data: deletedLaptopEmployee,
    });
  } catch (e) {
    return res.status(500).send(e.toString());
  }
};
