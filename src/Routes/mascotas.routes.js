import { Router } from "express";
import { crearMascotas, conseguirMascotas, buscarMascota, actualizarMascota, borrarMascota } from "../Controllers/mascotas.controller.js";
import { validarToken } from "../Middlewares/validar.token.js";
import { validarRol } from '../Middlewares/validar.rol.js';
import { Roles } from '../Types/roles.types.js';

const router = Router();

router.use(validarToken);

router.get("/", conseguirMascotas);

router.post("/",[validarRol([Roles.ADMIN])], crearMascotas);

router.get("/:id",[validarRol([Roles.ADMIN, Roles.USER])] ,buscarMascota);

router.put("/:id",[validarRol([Roles.ADMIN, Roles.OWNER])] ,actualizarMascota);

router.delete("/:id", [validarRol([Roles.ADMIN])], borrarMascota);

export default router;

