/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Email notification endpoints
 */

/**
 * @swagger
 * /notifications/email/order-cancellation:
 *   post:
 *     summary: Send order cancellation email
 *     tags: [Notifications]
 *     requestBody:
 *       description: Email details for order cancellation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               userEmail:
 *                 type: string
 *             required:
 *               - orderId
 *               - userEmail
 *     responses:
 *       200:
 *         description: Order cancellation email sent successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /notifications/email/order-confirmation:
 *   post:
 *     summary: Send order confirmation email
 *     tags: [Notifications]
 *     requestBody:
 *       description: Email details for order confirmation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               userEmail:
 *                 type: string
 *             required:
 *               - orderId
 *               - userEmail
 *     responses:
 *       200:
 *         description: Order confirmation email sent successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /notifications/email/order-shipped:
 *   post:
 *     summary: Send order shipped email
 *     tags: [Notifications]
 *     requestBody:
 *       description: Email details for shipped order
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               userEmail:
 *                 type: string
 *             required:
 *               - orderId
 *               - userEmail
 *     responses:
 *       200:
 *         description: Order shipped email sent successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /notifications/email/password-reset:
 *   post:
 *     summary: Send password reset email
 *     tags: [Notifications]
 *     requestBody:
 *       description: Email details for password reset
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *             required:
 *               - userEmail
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /notifications/email/promotional:
 *   post:
 *     summary: Send promotional email
 *     tags: [Notifications]
 *     requestBody:
 *       description: Details for promotional email
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userEmail:
 *                 type: string
 *               promotionCode:
 *                 type: string
 *             required:
 *               - userEmail
 *     responses:
 *       200:
 *         description: Promotional email sent successfully
 *       400:
 *         description: Bad request
 */