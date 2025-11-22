import express from "express"
import configService from "./src/Utils/config.service.js";
import cors from "cors"

const app = express();



app.use(express.static('public'));

//Midlewares Globales
app.use(express.json());
app.use(cors);

//Rutas

//Rutas de las vistas
const host = configService.HOST;
const port = configService.PORT;

app.listen(port,host,()=>{
    console.log(`Servidor a las esucha en http://${host}:${port}`);
});