import express from "express"
import cors from "cors"
import mascotasRouter from "./src/Routes/mascotas.routes.js"
import userRouter from "./src/Routes/usuarios.routes.js"
import configService from "./src/Utils/config.service.js";
import viewsRouter from "./src/Routes/views.routes.js";
import { requestLogs } from "./src/Middlewares/reques.log.js"
import { fileLogger } from "./src/Middlewares/file.logger.js"
import { handleServerErrors } from "./src/Middlewares/handle.server.errors.js"
import cookieParser from "cookie-parser";
import database from "./src/Config/database.js";

const app = express();
database.conectar();

app.use(express.static('public'));

//Midlewares Globales
app.use(express.json());
app.use(requestLogs);
app.use(fileLogger);
app.use(cookieParser());

//CORS
app.use(cors);
app.use(viewsRouter);
app.use("/api/Mascotas", mascotasRouter);
app.use("/api/User", userRouter);
//Manejar los errores del server
app.use(handleServerErrors);


//Rutas

//Rutas de las vistas
const host = configService.HOST;
const port = configService.PORT;

app.listen(port,host,()=>{
    console.log(`Servidor a las esucha en http://${host}:${port}`);
});