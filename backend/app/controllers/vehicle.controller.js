const {
    validateLaptop,
    Laptop
} = require("../models/laptop.model");
const {
    LaptopEmployee
} = require("../models/laptopOwner.model");
const {
    validateObjectId
} = require("../utils/imports");

/***
 * Get all laptops
 * @param req
 * @param res
 */
exports.getAllLaptops = async (req, res) => {
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

        const data = await Laptop.paginate({}, options)

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
exports.createLaptop = async (req, res) => {
    try {
        const {
            error
        } = validateLaptop(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        const dupplicate = await Laptop.findOne(req.body);
        if (dupplicate) return res.status(400).send({
            message: 'Laptop already exists'
        });

        const newLaptop = new Laptop(req.body);

        const result = await newLaptop.save();

        return res.status(201).send({
            message: 'CREATED',
            data: result
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
exports.updateLaptop = async (req, res) => {
    try {

        if (!validateObjectId(req.params.id))
            return res.status(400).send({
                message: 'Invalid id'
            });

        const {
            error
        } = validateLaptop(req.body);
        if (error) return res.status(400).send({
            message: error.details[0].message
        });

        const result = await Laptop.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        });

        if (!result)
            return res.status(404).send({
                message: 'Laptop Not found'
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
 *  updates's a new laptop
 * @param req
 * @param res
 */
exports.deleteLaptop = async (req, res) => {
    try {

        if (!validateObjectId(req.params.id))
            return res.status(400).send({
                message: 'Invalid id'
            });

        const result = await Laptop.findOneAndDelete({
            _id: req.params.id
        });
        if (!result)
            return res.status(404).send({
                message: 'Laptop not found'
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