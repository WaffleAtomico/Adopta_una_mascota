import { Router } from "express";
import { crearMascotas, conseguirMascotas, buscarMascota, actualizarMascota } from "../Controllers/mascotas.controller.js";
import { validarToken } from "../Middlewares/validar.token.js";
import { validarRol } from '../Middlewares/validar.rol.js';
import { Roles } from '../Types/roles.types.js';

const router = Router();

router.use(validarToken);

router.get("/mascotas", conseguirMascotas);

router.post("/mascotas",[validarRol([Roles.ADMIN])], crearMascotas);

router.get("/mascotas/:id",[validarRol([Roles.ADMIN, Roles.USER])] ,buscarMascota);

router.put("/mascotas/:id",[validarRol([Roles.ADMIN, Roles.OWNER])] ,actualizarMascota);

router.delete("/mascotas/:id", [validarRol([Roles.ADMIN])], borrarMascota);

export default router;

