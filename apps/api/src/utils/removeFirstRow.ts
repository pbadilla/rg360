import fs from 'fs';

export function removeFirstRow(filePath: string): void {
  const data = fs.readFileSync(filePath, 'utf8').split('\n');
  data.shift(); // remove first line (metadata)
  fs.writeFileSync(filePath, data.join('\n'));
}