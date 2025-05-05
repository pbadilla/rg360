import { Client } from 'basic-ftp';
import fs from 'fs';
import { Request, Response } from 'express';

import { importCSVRollerblade } from '@/utils/importCSVRollerblade';

const importerRollerblade = async (req: Request, res: Response): Promise<void> => {
  const url = 'ftp://bmsportech.com/stocks.csv'; // The complete FTP URL with the file path
  const path = './stocks.csv';
  const auth = {
    user: 'cliente_rollergrind360',
    password: 'aue9kpr@DPV.hgp7ufz',
  };

  const client = new Client();

  try {
    // Connect to the FTP server using FTPS with disabled certificate validation
    await client.access({
      host: 'bmsportech.com',
      user: auth.user,
      password: auth.password,
      secure: true, // Enable FTPS
      secureOptions: {
        rejectUnauthorized: false, // Disable certificate validation for self-signed certificates
      },
    });

    // Download the file
    await client.downloadTo(path, '/stocks.csv'); // The second argument is the file path on the FTP server

    await client.close();

    // Process the downloaded file 
    importCSVRollerblade(path);
    res.send('File downloaded and processed.');
  } catch (err: any) {
    res.status(500).send('Download failed: ' + err.message);
  }
};

export { importerRollerblade };
