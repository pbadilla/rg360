const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/emailController');

/**
 * @swagger
 * /email:
 *   post:
 *     summary: Send email notification
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent
 */
router.post('/', sendEmail);

module.exports = router;
