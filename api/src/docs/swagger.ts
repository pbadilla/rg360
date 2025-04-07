const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSV Import API',
      version: '1.0.0',
      description: 'API to import and process a CSV file',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['@/routes/*.js'], // Path to the API docs in JSDoc comments
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
