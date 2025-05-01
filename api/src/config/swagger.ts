import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Rollergrind360 Swagger API documentation',
    version: '1.0.0',
    description:'Document for the Rollergrind360 API, which includes endpoints for managing products, orders, and users. The API is designed to be RESTful and follows standard conventions for HTTP methods and status codes. The documentation provides details on request and response formats, authentication, and error handling.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    './src/docs/routes/*.ts', 
    './src/docs/components/*.ts',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;