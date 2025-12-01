import { Router } from 'express';
import { login, register, getMe } from '../Controllers/auth.controller.js';
import { validarToken } from '../Middlewares/validar.token.js';

const router = Router();

router.post('/login', login);

router.post('/register', register);

router.get('/me', validarToken, getMe);

export default router;
