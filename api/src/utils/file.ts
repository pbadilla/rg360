const fs = require('fs');
const csv = require('csv-parser');
const { procesarProducto } = require('./productUtils');

function removeFirstRow(filePath) {
  const data = fs.readFileSync(filePath, 'utf8').split('\n');
  data.shift();
  fs.writeFileSync(filePath, data.join('\n'));
}

function importFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  let rowCount = 0;
  fs.createReadStream(filePath)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
      rowCount++;
      if (rowCount > 1) {
        procesarProducto(row);
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}

module.exports = { removeFirstRow, importFile };
