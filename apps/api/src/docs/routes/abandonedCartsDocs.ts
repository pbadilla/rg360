/**
 * @swagger
 * tags:
 *   - name: AbandonedCarts
 *     description: Operations related to abandonedCarts management
 */

/**
 * @swagger
 * /abandonedCarts:
 *   get:
 *     summary: Get all abandoned carts
 *     tags:
 *       - Abandoned Carts
 *     responses:
 *       200:
 *         description: A list of abandoned carts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AbandonedCart'
 */