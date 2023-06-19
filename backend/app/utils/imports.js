const bcrypt = require('bcryptjs');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectionPool');

/***
 * @param id
 * @returns {boolean}
 */
 exports.validateObjectId = (id) => {
  if(!id)
    return false;
  return true;
 };

/**
 *  Encrypt password
 * @param {String} password 
 */
 exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(password, salt)
  return hashed;
}