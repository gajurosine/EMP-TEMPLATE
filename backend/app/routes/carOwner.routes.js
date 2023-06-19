const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require("../controllers/employee.controller");
const {
  auth
} = require("../middlewares/auth.middleware");

module.exports = (app) => {

  var router = require("express").Router();

  // Create a new User
  router.route("/")
    /**
     * @swagger
     * /employees:
     *   get:
     *     tags:
     *       - Employee
     *     description: Returns all Employees
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
    .get([auth, getAllEmployees])
    /**
     * @swagger
     * /employees:
     *   post:
     *     tags:
     *       - Employee
     *     description: Create a employee
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: body
     *         description: Fields for a employee
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Employee'
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
    .post([auth, createEmployee]);

  // Create a new User
  router.route("/:id")
    /**
     * @swagger
     * /employees/{id}:
     *   put:
     *     tags:
     *       - Employee
     *     description: Create a employee
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: employee id
     *         in: path
     *         type: string
     *         required: true
     *       - name: body
     *         description: Fields for a employee
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Employee'
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
    .put([auth, updateEmployee])
    /**
     * @swagger
     * /employees/{id}:
     *   delete:
     *     tags:
     *       - Employee
     *     description: Delete Employee
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: employee id
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
    .delete([auth, deleteEmployee]);

  app.use("/api/employees", router);
};