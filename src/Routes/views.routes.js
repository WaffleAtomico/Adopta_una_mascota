import { response, Router, request } from "express";
import { Rutas } from "../Types/routes.types.js";
import { validarToken } from "../Middlewares/validar.token.js";

const route = Router();



// Ruta para la página de inicio
route.get("/", (req = request, res = response) => {
  const path = Rutas.Main['/'];
  res.sendFile(path);
});

// Rutas de autenticación
route.get("/login", (req = request, res = response) => {
  const path = Rutas.Auth['/login'];
  res.sendFile(path);
});

route.get("/registro", (req = request, res = response) => {
  const path = Rutas.Auth['/registro'];
  res.sendFile(path);
});

// Rutas principales de la aplicación
route.get("/dashboard", validarToken(['ADMIN','USER','OWNER']), (req = request, res = response) => {
  const path = Rutas.Main['/dashboard'];
  res.sendFile(path);
});

route.get("/mascotas",validarToken(['ADMIN','USER','OWNER']), (req = request, res = response) => {
  const path = Rutas.Main['/mascotas'];
  res.sendFile(path);
});

route.get("/mascotas-registrar/",validarToken(['ADMIN','USER','OWNER']), (req = request, res = response) => {
  const path = Rutas.Main['/mascotas-registrar'];
  res.sendFile(path);
});

route.get("/mascotas/:id",validarToken(['ADMIN','USER','OWNER']), (req = request, res = response) => {
  const path = Rutas.Main['/mascotas/:id'];
  res.sendFile(path);
});

route.get("/perfil",validarToken(['ADMIN','USER','OWNER']), (req = request, res = response) => {
  const path = Rutas.Main['/perfil'];
  res.sendFile(path);
});

route.get("/contacto",validarToken(['ADMIN','USER','OWNER']), (req = request, res = response) => {
  const path = Rutas.Main['/contacto'];
  res.sendFile(path);
});

route.get("/postulacion",validarToken(['ADMIN','USER','OWNER']), (req = request, res = response) => {
  const path = Rutas.Main['/postulacion'];
  res.sendFile(path);
});

route.get("/estado",validarToken(['ADMIN','USER','OWNER']), (req = request, res = response) => {
  const path = Rutas.Main['/estado'];
  res.sendFile(path);
});

route.get("/adopcion",validarToken(['ADMIN','USER','OWNER']), (req = request, res = response) => {
  const path = Rutas.Main['/adopcion'];
  res.sendFile(path);
});

route.get("/contacto-dueno/:id",validarToken(['ADMIN','USER','OWNER']), (req = request, res = response) => {
  const path = Rutas.Main['/contacto-dueno/:id'];
  res.sendFile(path);
});

export default route;