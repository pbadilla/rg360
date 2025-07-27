/**
 * @swagger
 * tags:
 *   name: Shipping
 *   description: Shipping management endpoints
 */

/**
 * @swagger
 * /shippings:
 *   get:
 *     summary: Get all shipping records
 *     tags: [Shipping]
 *     responses:
 *       200:
 *         description: List of all shipping records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shipping'
 * 
 *   delete:
 *     summary: Delete shipping records (criteria in request body or all)
 *     tags: [Shipping]
 *     responses:
 *       200:
 *         description: Shipping records deleted
 */

/**
 * @swagger
 * /shippings/{shippingId}:
 *   get:
 *     summary: Get shipping by ID
 *     tags: [Shipping]
 *     parameters:
 *       - in: path
 *         name: shippingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Shipping record unique ID
 *     responses:
 *       200:
 *         description: Shipping record found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipping'
 *       404:
 *         description: Shipping not found
 * 
 *   patch:
 *     summary: Update shipping by ID
 *     tags: [Shipping]
 *     parameters:
 *       - in: path
 *         name: shippingId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Shipping data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shipping'
 *     responses:
 *       200:
 *         description: Shipping updated
 *       400:
 *         description: Invalid input
 * 
 *   delete:
 *     summary: Delete shipping by ID
 *     tags: [Shipping]
 *     parameters:
 *       - in: path
 *         name: shippingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shipping deleted
 *       404:
 *         description: Shipping not found
 */

/**
 * @swagger
 * /shippings/user/{userId}:
 *   get:
 *     summary: Get shipping info by user ID
 *     tags: [Shipping]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User unique ID
 *     responses:
 *       200:
 *         description: Shipping info for user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipping'
 *       404:
 *         description: Shipping info not found
 */

/**
 * @swagger
 * /shippings/updateShipping:
 *   post:
 *     summary: Save or update shipping info
 *     tags: [Shipping]
 *     requestBody:
 *       description: Shipping data to save or update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shipping'
 *     responses:
 *       200:
 *         description: Shipping info saved or updated
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /shippings/addShipping:
 *   post:
 *     summary: Add new shipping info
 *     tags: [Shipping]
 *     requestBody:
 *       description: Shipping data to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shipping'
 *     responses:
 *       201:
 *         description: Shipping info added successfully
 *       400:
 *         description: Invalid input
 */
