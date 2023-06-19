const {
  getAllLaptopEmployees,
  createLaptopEmployee,
  updateLaptopEmployee,
  deleteLaptopEmployee
} = require("../controllers/laptopEmployee.controller");
const {
  auth
} = require("../middlewares/auth.middleware");

module.exports = (app) => {

  var router = require("express").Router();

  // Create a new User
  router.route("/")
    /**
     * @swagger
     * /laptopEmployees:
     *   get:
     *     tags:
     *       - LaptopEmployee
     *     description: Returns all LaptopEmployees
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: page
     *         description: page number
     *         in: query
     *         type: string
     *       - name: limit
     *         description: elements per page
     *         in: query
     *         type: string
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .get([auth, getAllLaptopEmployees])
    /**
     * @swagger
     * /laptopEmployees:
     *   post:
     *     tags:
     *       - LaptopEmployee
     *     description: Create a laptopEmployee
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: body
     *         description: Fields for a laptopEmployee
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/LaptopEmployee'
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .post([auth, createLaptopEmployee]);

  // Create a new User
  router.route("/:id")
    /**
     * @swagger
     * /laptopEmployees/{id}:
     *   put:
     *     tags:
     *       - LaptopEmployee
     *     description: Create a ehicleEmployee
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: laptopEmployee id
     *         in: path
     *         type: string
     *         required: true
     *       - name: body
     *         description: Fields for a laptopEmployee
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/LaptopEmployee'
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .put([auth, updateLaptopEmployee])
    /**
     * @swagger
     * /laptopEmployees/{id}:
     *   delete:
     *     tags:
     *       - LaptopEmployee
     *     description: Delete laptopEmployee
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: laptopEmployee id
     *         in: path
     *         type: string
     *         required: true
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .delete([auth, deleteLaptopEmployee]);

  app.use("/api/laptopEmployees", router);
};