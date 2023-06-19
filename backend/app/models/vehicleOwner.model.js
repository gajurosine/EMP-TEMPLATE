const mongoose = require("mongoose");
const Joi = require('joi');
const mongoosePaginate = require('mongoose-paginate-v2');

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
 *       laptopPlateNumber:
 *         type: string
 *     required:
 *       - employee
 *       - laptop
 *       - laptopPlateNumber
 */

var schema = mongoose.Schema({
  employee: {
    type: String,
    required: true,
    ref: "employee"
  },
  laptop: {
    type: String,
    required: true,
    ref: "laptop"
  },
  laptopPlateNumber: {
    type: String,
    unique: true,
    required: true,
  }
}, {
  timestamps: true
});
schema.plugin(mongoosePaginate);

const Model = mongoose.model("laptopOwner", schema);

module.exports.LaptopEmployee = Model;
module.exports.validateLaptopEmployee = (body) => {
  return Joi.object({
    employee: Joi.string().required(),
    laptop: Joi.string().required(),
    laptopPlateNumber: Joi.string().required()
  }).validate(body);
};