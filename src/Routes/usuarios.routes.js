import { Router } from "express";
import { 
  getUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} from "../Controllers/usuarios.controller.js";
import { validarToken } from "../Middlewares/validar.token.js";
import { validarRol } from "../Middlewares/validar.rol.js";
import { Roles } from "../Types/roles.types.js";

const router = Router();

// Aplicar validación de token a todas las rutas de usuarios
router.use(validarToken);

// Rutas
router.get("/", [validarRol([Roles.ADMIN])], getUsers);
router.get("/:id", [validarRol([Roles.ADMIN, Roles.USER, Roles.OWNER])], getUserById);
router.post("/", [validarRol([])], createUser);
router.put("/:id", [validarRol([Roles.ADMIN, Roles.OWNER])], updateUser);
router.delete("/:id", [validarRol([Roles.ADMIN])], deleteUser);

export default router;