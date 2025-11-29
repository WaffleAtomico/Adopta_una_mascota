import { response, Router, request } from "express";
import { Rutas } from "../Types/routes.types.js";

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
route.get("/dashboard", (req = request, res = response) => {
  const path = Rutas.Main['/dashboard'];
  res.sendFile(path);
});

route.get("/mascotas", (req = request, res = response) => {
  const path = Rutas.Main['/mascotas'];
  res.sendFile(path);
});

route.get("/mascotas/nueva", (req = request, res = response) => {
  const path = Rutas.Main['/mascotas/nueva'];
  res.sendFile(path);
});

route.get("/mascotas/:id", (req = request, res = response) => {
  const path = Rutas.Main['/mascotas/:id'];
  res.sendFile(path);
});

route.get("/perfil", (req = request, res = response) => {
  const path = Rutas.Main['/perfil'];
  res.sendFile(path);
});

route.get("/contacto", (req = request, res = response) => {
  const path = Rutas.Main['/contacto'];
  res.sendFile(path);
});

route.get("/postulacion", (req = request, res = response) => {
  const path = Rutas.Main['/postulacion'];
  res.sendFile(path);
});

route.get("/estado", (req = request, res = response) => {
  const path = Rutas.Main['/estado'];
  res.sendFile(path);
});

route.get("/contacto-dueno", (req = request, res = response) => {
  const path = Rutas.Main['/contacto-dueno'];
  res.sendFile(path);
});

export default route;