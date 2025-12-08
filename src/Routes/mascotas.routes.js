import { Router } from "express";
import { crearMascotas, conseguirMascotas, buscarMascota, actualizarMascota, borrarMascota, crearMultiplesMascotas } from "../Controllers/mascotas.controller.js";
import { validarToken } from "../Middlewares/validar.token.js";
import { validarRol } from '../Middlewares/validar.rol.js';
import { Roles } from '../Types/roles.types.js';
import { crearMascotaDTO } from '../DTOs/crear.mascotas.DTO.js';
import { handleSchemaErrors } from '../Middlewares/handle.schema.errors.js';

const router = Router();

// Aplicar validación de token a todas las rutas de mascotas excepto la pública
router.use((req, res, next) => {
    if (req.path === '/' && req.method === 'GET') {
        return next(); // Ruta pública, no requiere token
    }
    return validarToken()(req, res, next);
});

// Ruta pública para obtener todas las mascotas
router.get('/', conseguirMascotas);

router.post("/", crearMascotaDTO, handleSchemaErrors, validarRol([Roles.ADMIN, Roles.OWNER]), crearMascotas);

router.post("/multiple", validarRol([Roles.ADMIN]), crearMultiplesMascotas);

router.get("/:id", validarRol([Roles.ADMIN, Roles.USER, Roles.OWNER]), buscarMascota);

router.put("/:id", validarRol([Roles.ADMIN, Roles.OWNER]), actualizarMascota);

router.delete("/:id", validarRol([Roles.ADMIN]), borrarMascota);

export default router;

