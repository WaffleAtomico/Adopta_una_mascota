import { request, response } from 'express';
import authService from '../Services/auth.service.js';

export const login = async (req = request, res = response) => {
  try {
    const { token, user, error } = await authService.login(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        msg: error
      });
    }

    res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    console.error('Error en el controlador de login:', error);
    res.status(500).json({
      success: false,
      msg: 'Error al procesar la solicitud'
    });
  }
};

export const register = async (req = request, res = response) => {
  try {
    const { token, user, error } = await authService.register(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        msg: error
      });
    }

    res.status(201).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    console.error('Error en el controlador de registro:', error);
    res.status(500).json({
      success: false,
      msg: 'Error al procesar el registro'
    });
  }
};

export const getMe = async (req = request, res = response) => {
  try {

    const user = {
      id: req.usuario.id,
      email: req.usuario.email,
      nombre: req.usuario.nombre,
      tipo: req.usuario.role
    };

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error al obtener información del usuario:', error);
    res.status(500).json({
      success: false,
      msg: 'Error al obtener la información del usuario'
    });
  }
};
