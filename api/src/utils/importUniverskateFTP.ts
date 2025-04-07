const express = require('express');
const fs = require('fs');
const axios = require('axios');
const nodemailer = require('nodemailer');
const csv = require('csv-parser');
const basicAuth = require('basic-auth-header');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
app.use(express.json());

const PORT = 3000;

// Swagger config
const swaggerSpec = swaggerJsdoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'CSV Import API',
      version: '1.0.0',
      description: 'API to import and process a CSV file',
    },
  },
  apis: ['./index.js'], // Point to this file for annotations
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /email:
 *   post:
 *     summary: Send email notification
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
app.post('/email', async (req, res) => {
  const { subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rollergrind360@gmail.com',
      pass: 'yourpassword', // Replace securely
    },
  });

  try {
    await transporter.sendMail({
      from: 'rollergrind360@gmail.com',
      to: 'ventasonline@rollergrind360.com',
      subject,
      text: message,
    });
    res.send('Email sent successfully!');
  } catch (err) {
    res.status(500).send('Failed to send email: ' + err.message);
  }
});

/**
 * @swagger
 * /download:
 *   get:
 *     summary: Download CSV from Universkate and process it
 *     responses:
 *       200:
 *         description: File processed
 */
app.get('/download', async (req, res) => {
  const url = 'https://csvshops.universkate.com/UniverskateStock.csv';
  const path = './universkate.csv';
  const auth = basicAuth('csvuniverskate', 'ZeF1@TENbu');

  try {
    const response = await axios.get(url, {
      responseType: 'stream',
      headers: { Authorization: auth },
    });

    const writer = fs.createWriteStream(path);
    response.data.pipe(writer);

    writer.on('finish', () => {
      removeFirstRow(path);
      importFile(path);
      res.send('File downloaded and processed.');
    });

    writer.on('error', () => {
      res.status(500).send('Error writing file.');
    });
  } catch (err) {
    res.status(500).send('Download failed: ' + err.message);
  }
});

function removeFirstRow(filePath) {
  const data = fs.readFileSync(filePath, 'utf8').split('\n');
  data.shift(); // Remove the first line
  fs.writeFileSync(filePath, data.join('\n'));
}

function importFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File not found');
    return;
  }

  const results = [];
  let headers = [];

  let rowCount = 0;
  fs.createReadStream(filePath)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
      rowCount++;
      if (rowCount === 1) {
        headers = Object.keys(row);
      } else {
        procesarProducto(row);
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}

function procesarProducto(row) {
  const csvreference = `US-${row["Reference"]}`;
  const csvean = row["Ean"];
  const csvprix = row["Prix"];
  const csvstock = row["Stock"];
  const csvimage = row["Image"];
  const csvmarque = row["Marque"];
  const csvrefmere = row["Refmere"];

  // Simulated database/product logic
  console.log(`Processing product ${csvreference} - stock: ${csvstock}`);
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
