import { Router } from "express";
import {
  crearSolicitud,
  obtenerSolicitudPorId,
  obtenerSolicitudesUsuario,
  obtenerSolicitudesMascota,
  actualizarEstadoSolicitud,
  eliminarSolicitud
} from "../Controllers/adopcion.controller.js";

import { crearSolicitudAdopcionDTO } from "../DTOs/crear.adopcion.DTO.js";
import { Roles } from '../Types/roles.types.js';
import { validarRol } from '../Middlewares/validar.rol.js';


const router = Router();


router.get("/:id", validarRol([Roles.ADMIN, Roles.OWNER]), obtenerSolicitudPorId);

router.get("/user/:id", validarRol([Roles.ADMIN, Roles.OWNER]), obtenerSolicitudesUsuario);

router.get("/mascota/:id", validarRol([Roles.ADMIN, Roles.OWNER]), obtenerSolicitudesMascota);

router.post("/", validarRol([Roles.ADMIN, Roles.OWNER]), crearSolicitudAdopcionDTO, crearSolicitud);

router.put("/:id/estado", validarRol([Roles.ADMIN, Roles.OWNER]), actualizarEstadoSolicitud);

router.delete("/:id", validarRol([Roles.ADMIN, Roles.OWNER]), eliminarSolicitud);

export default router;
