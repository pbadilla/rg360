const axios = require('axios');
const fs = require('fs');
const basicAuth = require('basic-auth-header');
const { removeFirstRow, importFile } = require('../utils/fileUtils');

const downloadAndProcessCSV = async (req, res) => {
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
};

module.exports = { downloadAndProcessCSV };
