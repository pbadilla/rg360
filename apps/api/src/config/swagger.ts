import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Rollergrind360 API',
    version: '1.0.0',
    description: 'Documentation for the Rollergrind360 API',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/**/*.ts', './src/docs/schemas/swaggerSchemas.ts', './src/docs/**/*.ts'], // ⬅️ Scan for JSDoc in all route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
