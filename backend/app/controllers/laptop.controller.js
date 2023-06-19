const { validateLaptop } = require("../models/laptop.model");
const Laptop = require("../models/laptop.model");
const { LaptopEmployee } = require("../models/laptopEmployee.model");
const { validateObjectId } = require("../utils/imports");

/***
 * Get all laptops
 * @param req
 * @param res
 */
exports.getAllLaptops = async (req, res) => {
  try {
    let { limit, page } = req.query;

    if (!page || page < 1) page = 1;
    if (!limit) limit = 10;

    const options = {
      offset: (page - 1) * limit,
      limit: parseInt(limit),
    };

    const laptops = await Laptop.findAndCountAll(options);

    res.send({ data: laptops });
  } catch (e) {
    return res.status(500).send(e.toString().split('\"').join(''));
  }
};

/***
 * Create a new laptop
 * @param req
 * @param res
 */
exports.createLaptop = async (req, res) => {
  try {
    const { error } = validateLaptop(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const duplicate = await Laptop.findOne({ where: { laptopSerialNumber: req.body.laptopSerialNumber }});
    if (duplicate) return res.status(400).send({ message: 'Laptop already exists' });

    const newLaptop = await Laptop.create(req.body);

    return res.status(201).send({ message: 'CREATED', data: newLaptop });
  } catch (e) {
    return res.status(500).send(e.toString().split('\"').join(''));
  }
};

/***
 * Update a laptop
 * @param req
 * @param res
 */
exports.updateLaptop = async (req, res) => {
  try {
    if (!validateObjectId(req.params.id))
      return res.status(400).send({ message: 'Invalid id' });

    const { error } = validateLaptop(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const updatedLaptop = await Laptop.findByPk(req.params.id);
    if (!updatedLaptop) return res.status(404).send({ message: 'Laptop not found' });

    await updatedLaptop.update(req.body);

    return res.status(200).send({ message: 'UPDATED', data: updatedLaptop });
  } catch (e) {
    return res.status(500).send(e.toString().split('\"').join(''));
  }
};

/***
 * Delete a laptop
 * @param req
 * @param res
 */
exports.deleteLaptop = async (req, res) => {
  try {
    if (!validateObjectId(req.params.id))
      return res.status(400).send({ message: 'Invalid id' });

    const deletedLaptop = await Laptop.findByPk(req.params.id);
    if (!deletedLaptop) return res.status(404).send({ message: 'Laptop not found' });

    await deletedLaptop.destroy();

    await LaptopEmployee.destroy({ where: { laptop: req.params.id } });

    return res.send({ message: 'DELETED', data: deletedLaptop });
  } catch (e) {
    return res.status(500).send(e.toString().split('\"').join(''));
  }
};
