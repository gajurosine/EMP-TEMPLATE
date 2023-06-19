const {
    validateEmployee,
    Employee
} = require("../models/employee.model");
const { LaptopEmployee } = require("../models/laptopOwner.model");
const { validateObjectId } = require("../utils/imports");

/***
 * Get all employees
 * @param req
 * @param res
 */
exports.getAllEmployees = async (req, res) => {
    try {
        let {
            limit,
            page
        } = req.query;

        if (!page || page < 1) page = 1;

        if (!limit) limit = 10;

        const options = {
            page: page,
            limit: limit
        };

        const data = await Employee.paginate({}, options)

        res.send({
            data
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}



/***
 *  Create's a new employee
 * @param req
 * @param res
 */
exports.createEmployee = async (req, res) => {
    try {
        const {
            error
        } = validateEmployee(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        let {
            nationalId,
            phone
        } = req.body

        let employee = await Employee.findOne({
            $or: [{
                nationalId
            }, {
                phone
            }],
        })

        if (employee) {
            const phoneFound = phone == employee.phone
            return res.status(400).send({
                message: `Employee with same ${phoneFound ? 'phone ' : 'nationalId '} arleady exist`
            });
        }

        const newEmployee = new Employee(req.body);

        const result = await newEmployee.save();

        return res.status(201).send({
            message: 'CREATED',
            data: result
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}

/***
 *  updates's a new employee
 * @param req
 * @param res
 */
exports.updateEmployee = async (req, res) => {
    try {

        if (!validateObjectId(req.params.id))
            return res.status(400).send({
                message: 'Invalid id'
            });

        const {
            error
        } = validateEmployee(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        let {
            nationalId,
            phone
        } = req.body

        let dupplicate_employee = await Employee.findOne({
            _id: {
                $ne: req.params.id
            },
            $or: [{
                nationalId: nationalId
            }, {
                phone: phone
            }],
        })

        if (dupplicate_employee) {
            const phoneFound = phone == dupplicate_employee.phone
            return res.status(400).send({
                message: `Employee with same ${phoneFound ? 'phone ' : 'nationalId '} arleady exist`
            });
        }

        const result = await Employee.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        });

        if (!result)
            return res.status(404).send({
                message: 'Employee Not found'
            });

        return res.status(200).send({
            message: 'UPDATED',
            data: result
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}

/***
 *  updates's a new employee
 * @param req
 * @param res
 */
exports.deleteEmployee = async (req, res) => {
    try {

        if (!validateObjectId(req.params.id))
            return res.status(400).send({
                message: 'Invalid id'
            });

        const result = await Employee.findOneAndDelete({
            _id: req.params.id
        });
        if (!result)
            return res.status(404).send({
                message: 'Employee not found'
            });

        await LaptopEmployee.deleteMany({
            laptop: req.params.id
        });

        return res.send({
            message: 'DELETED',
            data: result
        });
    } catch (e) {
        return res.status(500).send(e.toString().split('\"').join(''))
    }
}