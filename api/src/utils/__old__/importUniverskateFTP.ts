import express, { Request, Response } from 'express';
import fs from 'fs';
import axios from 'axios';
import nodemailer from 'nodemailer';
import csv from 'csv-parser';
import 'basic-auth-header';
import { getDb } from '@/db/mongoClient'; 

import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractColor, extractCSizes } from '@/utils/transforms';
import { swaggerSpec } from '@/docs/swagger';

const app = express();
app.use(express.json());

const PORT = 3000;

// ESM workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

async function importFile(filePath: string): Promise<void> {
  if (!fs.existsSync(filePath)) {
    console.log('File not found');
    return;
  }

  let rowCount = 0;
  const stream = fs.createReadStream(filePath).pipe(csv({ separator: ';' }));

  for await (const row of stream) {
    rowCount++;
    if (rowCount > 1) {
      await productProcessing(row); // Await to ensure sequential inserts
    }
  }

  console.log('CSV file successfully processed');
}

async function productProcessing(row: Record<string, string>): Promise<void> {
  const csvreference = `US-${row["Reference"]}`;
  const csvean = row["Ean"];
  const csvprix = row["Prix"];
  const csvstock = row["Stock"];
  const csvimage = row["Image"];
  const csvmarque = row["Marque"];
  const csvrefmere = row["Refmere"];
  const csvcolors = extractColor(row["Reference"]);
  const csvsizes = extractCSizes(row["Reference"]);

  const productDoc = {
    reference: csvreference,
    ean: csvean,
    price: csvprix,
    stock: csvstock,
    image: csvimage,
    brand: csvmarque,
    parentReference: csvrefmere,
    colors: csvcolors,
    sizes: csvsizes,
    createdAt: new Date(),
  };

  try {
    const db = await getDb();
    await db.collection('products').insertOne(productDoc);
    console.log(`Inserted ${csvreference} into MongoDB`);
  } catch (err) {
    console.error(`MongoDB insert error for ${csvreference}:`, err);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
