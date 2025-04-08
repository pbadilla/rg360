import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rollergrind360 Swagger API documentation',
      version: '1.0.0',
      description:'Document for the Rollergrind360 API, which includes endpoints for managing products, orders, and users. The API is designed to be RESTful and follows standard conventions for HTTP methods and status codes. The documentation provides details on request and response formats, authentication, and error handling.',
    },
  },
  apis: [path.join(__dirname, 'routes/*.yaml')],
});
