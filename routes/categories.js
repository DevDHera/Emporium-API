const express = require('express');
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categories');

const Category = require('../models/Category');
const advancedResults = require('../middleware/advancedResults');

const { protect, authorize } = require('../middleware/auth');

// Include other resource routers
const productsRouter = require('./products');

const router = express.Router();

// Re-route into other resource routers
/**
 * @swagger
 * path:
 *  /categories/{categoryId}/products:
 *    get:
 *      parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *             type: string
 *         required: true
 *         description: Id of the category to get specified products
 *      summary: Get products for a category
 *      tags: [Categories]
 *      responses:
 *         "200":
 *           description: A category
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Product'
 */
router.use('/:categoryId/products', productsRouter);

router
    .route('/')
    /**
     * @swagger
     * path:
     *  /categories:
     *    get:
     *      summary: Get all categories
     *      tags: [Categories]
     *      responses:
     *        "200":
     *          description: An array of categories
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Category'
     */
    .get(advancedResults(Category, 'products'), getCategories)

    /**
     * @swagger
     * path:
     *  /categories:
     *    post:
     *      requestBody:
     *        required: true
     *        content:
     *         application/json:
     *          schema:
     *            $ref: '#/components/schemas/Category'
     *      summary: Create a new category
     *      tags: [Categories]
     *      security:
     *          - bearerAuth: []
     *      responses:
     *        "201":
     *          description: A category object
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Category'
     */
    .post(protect, authorize('seller', 'admin'), createCategory);

router
    .route('/:id')
    /**
     * @swagger
     * path:
     *  /categories/{id}:
     *    get:
     *      parameters:
     *       - in: path
     *         name: id
     *         schema:
     *             type: string
     *         required: true
     *         description: Id of the category to get details
     *      summary: Get category by id
     *      tags: [Categories]
     *      security:
     *          - bearerAuth: []
     *      responses:
     *         "200":
     *           description: A category
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/schemas/Category'
     */
    .get(protect, authorize('seller', 'admin'), getCategory)

    /**
     * @swagger
     * path:
     *  /categories/{id}:
     *    put:
     *      parameters:
     *       - in: path
     *         name: id
     *         schema:
     *             type: string
     *         required: true
     *         description: Id of the category to update
     *      requestBody:
     *        required: true
     *        content:
     *         application/json:
     *          schema:
     *            $ref: '#/components/schemas/Category'
     *      summary: update category by id
     *      tags: [Categories]
     *      security:
     *          - bearerAuth: []
     *      responses:
     *         "200":
     *           description: A category
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/schemas/Category'
     */
    .put(protect, authorize('seller', 'admin'), updateCategory)

    /**
     * @swagger
     * path:
     *  /categories/{id}:
     *    delete:
     *      parameters:
     *       - in: path
     *         name: id
     *         schema:
 *                 type: string
     *         required: true
     *         description: Id of the category to delete
     *      summary: delete category by id
     *      tags: [Categories]
     *      security:
     *          - bearerAuth: []
     *      responses:
     *         "200":
     *           description: A category
     *           content:
     *             application/json:
     *               schema:
     *                 $ref: '#/components/schemas/Category'
     */
    .delete(protect, authorize('seller', 'admin'), deleteCategory);

module.exports = router;
