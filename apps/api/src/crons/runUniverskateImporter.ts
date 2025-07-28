import axios from 'axios';
import fs from 'fs';
import basicAuth from 'basic-auth-header';
import { removeFirstRow, importCSVUniverskate } from 'src/scripts/universkate/importCSVUniverskate';

async function runImporter() {
  const url = process.env.IMPORTER_UNIVERSKATE_URL;
  const path = './universkate.csv';
  const user = process.env.IMPORTER_UNIVERSKATE_USER;
  const password = process.env.IMPORTER_UNIVERSKATE_PASSWORD;
  if (!url) {
    throw new Error('IMPORTER_UNIVERSKATE_URL is not set');
  }
  if (!user || !password) {
    throw new Error('IMPORTER_UNIVERSKATE_USER or IMPORTER_UNIVERSKATE_PASSWORD is not set');
  }
  const auth = basicAuth(user, password);

  try {
    const response = await axios.get(url, {
      responseType: 'stream',
      headers: { Authorization: auth },
    });

    // Write the file
    const writer = fs.createWriteStream(path);

    response.data.pipe(writer);

    // Wait until writing finishes
    await new Promise<void>((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Process CSV
    await removeFirstRow(path);
    await importCSVUniverskate(path);

    console.log('File downloaded and processed successfully.');
  } catch (err: any) {
    console.error('Download or processing failed:', err.message);
    process.exit(1);
  }
}

runImporter();
