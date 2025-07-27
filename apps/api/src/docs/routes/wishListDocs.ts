/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management
 */

/**
 * @swagger
 * /wishlist/getWishlist:
 *   get:
 *     summary: Get the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's wishlist retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /wishlist/addToWishlist:
 *   post:
 *     summary: Add a product to the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Product to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product added to wishlist successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /wishlist/{productId}:
 *   delete:
 *     summary: Remove a product from the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to remove
 *     responses:
 *       200:
 *         description: Product removed from wishlist successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in wishlist
 */
