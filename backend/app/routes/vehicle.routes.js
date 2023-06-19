const {
  getAllLaptops,
  createLaptop,
  updateLaptop,
  deleteLaptop
} = require("../controllers/laptop.controller");
const {
  auth
} = require("../middlewares/auth.middleware");

module.exports = (app) => {

  var router = require("express").Router();

  router.route("/")
    /**
     * @swagger
     * /laptops:
     *   get:
     *     tags:
     *       - Laptop
     *     description: Returns all Laptops
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
    .get([auth, getAllLaptops])
    /**
     * @swagger
     * /laptops:
     *   post:
     *     tags:
     *       - Laptop
     *     description: Create a laptop
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: body
     *         description: Fields for a laptop
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Laptop'
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
    .post([auth, createLaptop]);

  router.route("/:id")
    /**
     * @swagger
     * /laptops/{id}:
     *   put:
     *     tags:
     *       - Laptop
     *     description: Create a laptop
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: laptop id
     *         in: path
     *         type: string
     *         required: true
     *       - name: body
     *         description: Fields for a laptop
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Laptop'
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
    .put([auth, updateLaptop])
    /**
     * @swagger
     * /laptops/{id}:
     *   delete:
     *     tags:
     *       - Laptop
     *     description: Delete Laptop
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: laptop id
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
    .delete([auth, deleteLaptop]);

  app.use("/api/laptops", router);
};