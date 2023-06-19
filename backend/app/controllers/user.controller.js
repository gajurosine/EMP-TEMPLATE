const bcrypt = require('bcryptjs');
const { validateUser, validateUserLogin } = require('../models/user.model');
const User = require('../models/user.model');
const { hashPassword } = require('../utils/imports');

/***
 *  Create a new user
 * @param req
 * @param res
 */
exports.createUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    let count = await User.count();
    if (count) return res.status(400).send({ message: 'Admin is already created' });

    req.body.password = await hashPassword(req.body.password);

    const newUser = await User.create(req.body);

    return res.status(201).send({ message: 'CREATED', data: newUser });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(''));
  }
};

/***
 * Get the current user
 * @param req
 * @param res
 */
exports.getCurrentUser = async (req, res) => {
  try {
    const result = await User.findOne({ where: { id: req.user.id } });

    return res.status(200).send({ message: 'OK', data: result });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(''));
  }
};

/**
 * Login User
 * @param req
 * @param res
 */
exports.userLogin = async (req, res) => {
  try {
    const { error } = validateUserLogin(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).send({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(404).send({ message: 'Invalid credentials' });

    const token = user.generateAuthToken();

    return res.status(200).send({ message: 'OK', token });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(''));
  }
};

/***
 * Update a user
 * @param req
 * @param res
 */
exports.updateUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body, true);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const { email, nationalId, phone } = req.body;

    const duplicateUser = await User.findOne({
      where: {
        id: { [Op.not]: req.user.id },
        [Op.or]: [{ email }, { nationalId }, { phone }],
      },
    });

    if (duplicateUser) {
      const phoneFound = phone === duplicateUser.phone;
      const emailFound = email === duplicateUser.email;
      return res.status(400).send({
        message: `User with the same ${phoneFound ? 'phone' : emailFound ? 'email' : 'nationalId'} already exists`,
      });
    }

    const result = await User.update(req.body, { where: { id: req.user.id }, returning: true });

    return res.status(200).send({ message: 'UPDATED', data: result[1][0] });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(''));
  }
};

/***
 * Delete a user
 * @param req
 * @param res
 */
exports.deleteUser = async (req, res) => {
  try {
    const result = await User.destroy({ where: { id: req.user.id } });
    if (!result) return res.status(404).send({ message: 'User not found' });

    return res.send({ message: 'DELETED', data: result });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(''));
  }
};
