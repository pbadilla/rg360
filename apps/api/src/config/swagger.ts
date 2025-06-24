import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const yamlPath = path.join(__dirname, '../docs/openapi.yaml');
console.log('Swagger YAML path:', yamlPath);

// Check if file exists
if (!fs.existsSync(yamlPath)) {
  console.error('Swagger YAML file not found!');
  process.exit(1);
}

const file = fs.readFileSync(yamlPath, 'utf8');
const swaggerSpec = YAML.parse(file);

console.log('Swagger spec loaded with paths:', Object.keys(swaggerSpec.paths || {}));

export default swaggerSpec;
