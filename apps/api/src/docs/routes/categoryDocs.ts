/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Operations related to category management
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *
 *   delete:
 *     summary: Delete all categories
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: All categories deleted
 */

/**
 * @swagger
 * /categories/{category}:
 *   get:
 *     summary: Get main category by name
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Main category name
 *     responses:
 *       200:
 *         description: Category found
 *   patch:
 *     summary: Update a main category
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category updated
 *   delete:
 *     summary: Delete a main category
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 */

// Repeat similar blocks for subcategory and item-level routes...
