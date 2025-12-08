import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Mascotas',
      version: '1.0.0',
      description: 'Documentación de la API para gestión de mascotas',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: [
    path.join(__dirname, '../Routes/*.js'),
    './swagger.yaml'
  ],
};

const specs = swaggerJsdoc(options);

export default specs;
