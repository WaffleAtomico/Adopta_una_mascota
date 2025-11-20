import express from "express"

import cors from "cors"

const app = express();



app.use(express.static('public'));

//Midlewares Globales
app.use(express.json());
app.use(cors);

//Rutas

//Rutas de las vistas
