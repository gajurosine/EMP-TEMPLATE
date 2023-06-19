const {
    Employee
} = require("../models/employee.model");
const {
    Laptop
} = require("../models/laptop.model");
const {
    validateLaptopEmployee,
    LaptopEmployee
} = require("../models/employee.model");
const {
    validateObjectId
} = require("../utils/imports");

const { isValid } = require("rwandan-plate-number");

/***
 * Get all laptopEmployees
 * @param req
 * @param res
 */
exports.getAllLaptopEmployees = async (req, res) => {
    try {
        let {
            limit,
            page
        } = req.query;

        if (!page || page < 1) page = 1;

        if (!limit) limit = 10;

        const options = {
            page: page,
            limit: limit,
            populate: ['laptop', 'employee']
        };

        const data = await LaptopEmployee.paginate({}, options)

        res.send({
            data
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}



/***
 *  Create's a new laptop
 * @param req
 * @param res
 */
exports.createLaptopEmployee = async (req, res) => {
    try {
        const {
            error
        } = validateLaptopEmployee(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        if (!isValid(req.body.laptopPlateNumber))
            return res.status(400).send({
                message: 'Invalid Plate Number'
            });

        if (!validateObjectId(req.body.laptop))
            return res.status(400).send({
                message: 'Invalid laptop id'
            });

        if (!validateObjectId(req.body.employee))
            return res.status(400).send({
                message: 'Invalid employee id'
            });

        const laptop = await Laptop.findById(req.body.laptop);

        if (!laptop)
            return res.status(404).send({
                message: 'Laptop Not found'
            });

        const employee = await Employee.findById(req.body.employee);

        if (!employee)
            return res.status(404).send({
                message: 'Employee Not found'
            });

        const isDupplicate = await LaptopEmployee.findOne({
            laptopPlateNumber: req.body.laptopPlateNumber
        });

        if (isDupplicate)
            return res.status(404).send({
                message: 'LaptopPlateNumber is already used'
            });

        const newLaptopEmployee = new LaptopEmployee(req.body);

        const result = await newLaptopEmployee.save();

        return res.status(201).send({
            message: 'CREATED',
            data: { ...result._doc, employee, laptop }
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}

/***
 *  updates's a new laptop
 * @param req
 * @param res
 */
exports.updateLaptopEmployee = async (req, res) => {
    try {

        if (!validateObjectId(req.params.id))
            return res.status(400).send({
                message: 'Invalid id'
            });

        const {
            error
        } = validateLaptopEmployee(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        if (!isValid(req.body.laptopPlateNumber))
            return res.status(400).send({
                message: 'Invalid Plate Number'
            });

        if (!validateObjectId(req.body.laptop))
            return res.status(400).send({
                message: 'Invalid laptop id'
            });

        if (!validateObjectId(req.body.employee))
            return res.status(400).send({
                message: 'Invalid employee id'
            });

        const laptop = await Laptop.findById(req.body.laptop);

        if (!laptop)
            return res.status(404).send({
                message: 'Laptop Not found'
            });

        const employee = await Employee.findById(req.body.employee);

        if (!employee)
            return res.status(404).send({
                message: 'Employee Not found'
            });

        const isDupplicate = await LaptopEmployee.findOne({
            _id: {
                $ne: req.params.id
            },
            laptopPlateNumber: req.body.laptopPlateNumber
        });

        if (isDupplicate)
            return res.status(404).send({
                message: 'LaptopPlateNumber is already used'
            });

        const result = await LaptopEmployee.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        });
        if (!result)
            return res.status(404).send({
                message: 'LaptopEmployee Not found'
            });

        return res.status(200).send({
            message: 'UPDATED',
            data: { ...result, employee, laptop }
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}

/***
 *  updates's a new laptop
 * @param req
 * @param res
 */
exports.deleteLaptopEmployee = async (req, res) => {
    try {

        if (!validateObjectId(req.params.id))
            return res.status(400).send({
                message: 'Invalid id'
            });

        const result = await LaptopEmployee.findOneAndDelete({
            _id: req.params.id
        });
        if (!result)
            return res.status(404).send({
                message: 'laptopEmployee not found'
            });

        return res.send({
            message: 'DELETED',
            data: result
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}