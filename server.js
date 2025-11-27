import express from "express"
import cors from "cors"

import configService from "./src/Utils/config.service.js";
import viewsRouter from "./src/Routes/views.routes.js";
import { requestLogs } from "../D3_node_profesorRepo/gestion-estudiantes/src/middlewares/request.logs.js";
import { fileLogger } from "../D3_node_profesorRepo/gestion-estudiantes/src/middlewares/file.logger.js";
import { handleServerErrors } from "../D3_node_profesorRepo/gestion-estudiantes/src/middlewares/handle.server.errors.js";

import cookieParser from "cookie-parser";

const app = express();

app.use(express.static('public'));

//Midlewares Globales
app.use(express.json());
app.use(requestLogs);
app.use(fileLogger);
app.use(cookieParser());

//CORS
app.use(cors);
app.use(viewsRouter);

//Manejar los errores del server
app.use(handleServerErrors);


//Rutas

//Rutas de las vistas
const host = configService.HOST;
const port = configService.PORT;

app.listen(port,host,()=>{
    console.log(`Servidor a las esucha en http://${host}:${port}`);
});