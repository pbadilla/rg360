import { Client } from 'basic-ftp';
import { Request, Response } from 'express';
import { importCSVRollerblade } from '@/utils/importCSVRollerblade';

const importerRollerblade = async (req: Request, res: Response): Promise<void> => {
  const localPath = './stocks.csv';
  const remotePath = '/stocks.csv';
  const ftpHost = 'bmsportech.com';
  const auth = {
    user: 'cliente_rollergrind360',
    password: 'aue9kpr@DPV.hgp7ufz',
  };

  const isLocalEnv = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local';

  if (isLocalEnv) {
    try {
      // Directly import from local file
      await importCSVRollerblade(localPath);
      res.send('Local file processed.');
    } catch (err: any) {
      res.status(500).send('Local file processing failed: ' + err.message);
    }
    return;
  }

  const client = new Client();

  try {
    // Connect to the FTP server using FTPS with disabled certificate validation
    await client.access({
      host: ftpHost,
      user: auth.user,
      password: auth.password,
      secure: true,
      secureOptions: {
        rejectUnauthorized: false,
      },
    });

    // Download the file
    await client.downloadTo(localPath, remotePath);

    await client.close();

    // Process the downloaded file
    await importCSVRollerblade(localPath);
    res.send('File downloaded and processed.');
  } catch (err: any) {
    res.status(500).send('Download failed: ' + err.message);
  }
};

export { importerRollerblade };
