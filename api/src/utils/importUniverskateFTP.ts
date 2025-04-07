import express, { Request, Response } from 'express';
import fs from 'fs';
import axios from 'axios';
import nodemailer from 'nodemailer';
import csv from 'csv-parser';
import 'basic-auth-header';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());

const PORT = 3000;

// ESM workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  apis: [path.join(__dirname, 'index.ts')],
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
app.post('/email', async (req: Request, res: Response) => {
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
  } catch (err: any) {
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
app.get('/download', async (req: Request, res: Response) => {
  const url = 'https://csvshops.universkate.com/UniverskateStock.csv';
  const filePath = path.join(__dirname, 'universkate.csv');
  const auth = basicAuth('csvuniverskate', 'ZeF1@TENbu');

  try {
    const response = await axios.get(url, {
      responseType: 'stream',
      headers: { Authorization: auth },
    });

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    writer.on('finish', () => {
      removeFirstRow(filePath);
      importFile(filePath);
      res.send('File downloaded and processed.');
    });

    writer.on('error', () => {
      res.status(500).send('Error writing file.');
    });
  } catch (err: any) {
    res.status(500).send('Download failed: ' + err.message);
  }
});

function removeFirstRow(filePath: string): void {
  const data = fs.readFileSync(filePath, 'utf8').split('\n');
  data.shift(); // Remove header
  fs.writeFileSync(filePath, data.join('\n'));
}

function importFile(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    console.log('File not found');
    return;
  }

  let rowCount = 0;

  fs.createReadStream(filePath)
    .pipe(csv({ separator: ';' }))
    .on('data', (row: Record<string, string>) => {
      rowCount++;
      if (rowCount > 1) {
        producProcessing(row);
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}

function producProcessing(row: Record<string, string>): void {
  const csvreference = `US-${row["Reference"]}`;
  const csvean = row["Ean"];
  const csvprix = row["Prix"];
  const csvstock = row["Stock"];
  const csvimage = row["Image"];
  const csvmarque = row["Marque"];
  const csvrefmere = row["Refmere"];

  // Simulated logic
  console.log(`Processing product ${csvreference} - stock: ${csvstock}`);
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
