/**
 * @swagger
 * tags:
 *   name: Vendors
 *   description: Vendor management
 */

/**
 * @swagger
 * /vendors:
 *   post:
 *     summary: Create a new vendor
 *     tags: [Vendors]
 *     requestBody:
 *       description: Vendor object to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vendor'
 *     responses:
 *       201:
 *         description: Vendor created successfully
 *
 *   get:
 *     summary: Get all vendors
 *     tags: [Vendors]
 *     responses:
 *       200:
 *         description: List of all vendors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vendor'
 */

/**
 * @swagger
 * /vendors/{vendorId}:
 *   get:
 *     summary: Get a vendor by ID
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Vendor ID
 *     responses:
 *       200:
 *         description: Vendor found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendor'
 *       404:
 *         description: Vendor not found
 *
 *   put:
 *     summary: Update vendor by ID
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated vendor object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vendor'
 *     responses:
 *       200:
 *         description: Vendor updated successfully
 *
 *   delete:
 *     summary: Delete vendor by ID
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vendor deleted successfully
 */
