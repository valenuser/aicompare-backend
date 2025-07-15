const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AICompare API',
      version: '1.0.0',
      description: 'API para el backend de AICompare',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Cambia el puerto si usas otro
      },
    ],
  },
  apis: ['./src/routes/user/controller/userController.js','./src/routes/comment/controller/commentController.js','./src/routes/prompt/controller/promptController.js','./src/routes/comparison/controller/comparisonController.js','./src/routes/vote/controller/voteController.js'], // Ruta donde estarán tus endpoints con anotaciones
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
