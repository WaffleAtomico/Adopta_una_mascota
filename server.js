
import express from "express";
import cors from 'cors';
import mascotasRouter from "./src/Routes/mascotas.routes.js";
import userRouter from "./src/Routes/usuarios.routes.js";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from "./src/Routes/auth.routes.js"
import configService from "./src/Utils/config.service.js";
import viewsRouter from "./src/Routes/views.routes.js";
import { requestLogs } from "./src/Middlewares/reques.log.js"
import { fileLogger } from "./src/Middlewares/file.logger.js"
import { handleServerErrors } from "./src/Middlewares/handle.server.errors.js"
import cookieParser from "cookie-parser";
import database from './src/Config/database.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
database.conectar();

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

app.use(express.static(path.join(__dirname, 'mascotasFront')));

app.use(requestLogs);
app.use(fileLogger);

//Midlewares Globales
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// Ruta para la documentación de la API
app.use('/api-docs', 
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Documentación de la API de Mascotas',
    customfavIcon: '/favicon.ico'
  })
);

app.use(viewsRouter);

app.use("/api/auth", authRouter);
app.use("/api/Mascotas", mascotasRouter);
app.use("/api/User", userRouter);

//Manejar los errores del server
app.use(handleServerErrors);

const host = configService.HOST;
const port = configService.PORT;

app.listen(port,host,()=>{
    console.log(`Servidor a las escucha en http://${host}:${port}`);
});