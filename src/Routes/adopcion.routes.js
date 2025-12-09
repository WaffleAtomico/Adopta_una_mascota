import { Router } from "express";
import {
  crearSolicitud,
  obtenerSolicitudPorId,
  obtenerSolicitudesUsuario,
  obtenerSolicitudesComoSolicitante,
  obtenerSolicitudesMascota,
  actualizarEstadoSolicitud,
  eliminarSolicitud
} from "../Controllers/adopcion.controller.js";

import { crearSolicitudAdopcionDTO } from "../DTOs/crear.adopcion.DTO.js";
import { Roles } from '../Types/roles.types.js';
import { validarRol } from '../Middlewares/validar.rol.js';
import { validarToken } from '../Middlewares/validar.token.js';


const router = Router();


router.get("/:id", validarToken(), validarRol([Roles.ADMIN, Roles.OWNER]), obtenerSolicitudPorId);

router.get("/user/:id", validarToken(), validarRol([Roles.ADMIN, Roles.OWNER]), obtenerSolicitudesUsuario);

router.get("/solicitante/:id", validarToken(), validarRol([Roles.ADMIN, Roles.OWNER, Roles.USER]), obtenerSolicitudesComoSolicitante);

router.get("/mascota/:id", validarToken(), validarRol([Roles.ADMIN, Roles.OWNER]), obtenerSolicitudesMascota);

router.post("/", validarToken(), validarRol([Roles.ADMIN, Roles.OWNER, Roles.USER]), crearSolicitudAdopcionDTO, crearSolicitud);

router.put("/:id/estado", validarToken(), validarRol([Roles.ADMIN, Roles.OWNER]), actualizarEstadoSolicitud);

router.delete("/:id", validarToken(), validarRol([Roles.ADMIN, Roles.OWNER]), eliminarSolicitud);

export default router;
