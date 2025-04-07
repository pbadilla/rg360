const express = require('express');
const router = express.Router();
const { downloadAndProcessCSV } = require('../controllers/csvController');

/**
 * @swagger
 * /csv:
 *   get:
 *     summary: Download CSV and process it
 *     tags: [CSV]
 *     responses:
 *       200:
 *         description: File processed
 */
router.get('/', downloadAndProcessCSV);

module.exports = router;
