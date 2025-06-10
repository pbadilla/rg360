import { Client } from 'basic-ftp';
import { importCSVRollerblade } from '@/utils/importCSVRollerblade';

async function runImporter() {
  const localPath = './stocks.csv';
  const remotePath = '/stocks.csv';

  const ftpHost = process.env.IMPORTER_BMSPORTECH_FTP;
  const ftpUser = process.env.IMPORTER_BMSPORTECH_USER;
  const ftpPassword = process.env.IMPORTER_BMSPORTECH_PASSWORD;

  if (!ftpHost || !ftpUser || !ftpPassword) {
    throw new Error('Missing FTP credentials in environment variables.');
  }

  const auth = {
    user: ftpUser,
    password: ftpPassword,
  };

  try {
    const client = new Client();

    await client.access({
      host: ftpHost,
      user: auth.user,
      password: auth.password,
      secure: true,
      secureOptions: {
        rejectUnauthorized: false,
      },
    });

    await client.downloadTo(localPath, remotePath);
    await client.close();

    await importCSVRollerblade(localPath);
    console.log('File downloaded and processed successfully.');
  } catch (err: any) {
    console.error('Download or processing failed:', err.message);
    process.exit(1);
  }
}

runImporter();
