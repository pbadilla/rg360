import ftp from 'basic-ftp';
import fs from 'fs';

const PRODUCT_CSV = './rollerbladeProducts.csv';
const STOCK_CSV = './rollerbladeStock.csv';

export async function fetchRollerbladeCSV() {
  const ftpOptions = {
    host: "ftp.bmsportech.com",
    user: "cliente_rollergrind360",
    password: "aue9kpr@DPV.hgp7ufz",
    port: 21,
    secure: true,
    secureOptions: { rejectUnauthorized: false },
  };

  const client = new ftp.Client();
  try {
    await client.access(ftpOptions);
    await client.downloadTo(PRODUCT_CSV, "./pricats/Pricat_ss25_rollerblade.csv");
    await client.downloadTo(STOCK_CSV, "./stocks.csv");
  } finally {
    client.close();
  }

  return { PRODUCT_CSV, STOCK_CSV };
}
