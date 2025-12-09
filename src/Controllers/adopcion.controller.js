import AdopcionService from "../Services/adopcion.service.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export const crearSolicitud = async (req, res) => {
  try {
    const solicitud = await AdopcionService.crearSolicitud(req.body);
    return res.status(201).json({
      ok: true,
      msg: "Solicitud creada exitosamente",
      solicitud
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error.message
    });
  }
};

export const obtenerSolicitudPorId = async (req, res) => {
  try {
    const solicitud = await AdopcionService.obtenerSolicitudPorId(req.params.id);
    return res.json({
      ok: true,
      solicitud
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      msg: error.message
    });
  }
};

export const obtenerSolicitudesUsuario = async (req, res) => {
  try {
    const solicitudes = await AdopcionService.obtenerSolicitudesUsuario(req.params.id);
    return res.json({
      ok: true,
      solicitudes
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error.message
    });
  }
};

export const obtenerSolicitudesComoSolicitante = async (req, res) => {
  try {
    const solicitudes = await AdopcionService.obtenerSolicitudesComoSolicitante(req.params.id);
    
    return res.json({
      ok: true,
      solicitudes
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error.message
    });
  }
};

export const obtenerSolicitudesMascota = async (req, res) => {
  try {
    const solicitudes = await AdopcionService.obtenerSolicitudesMascota(req.params.id);
    return res.json({
      ok: true,
      solicitudes
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error.message
    });
  }
};

export const actualizarEstadoSolicitud = async (req, res) => {
  try {
    const solicitud = await AdopcionService.actualizarEstado(
      req.params.id,
      req.body.estado
    );

    return res.json({
      ok: true,
      msg: "Estado actualizado correctamente",
      solicitud
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error.message
    });
  }
};

export const eliminarSolicitud = async (req, res) => {
  try {
    await AdopcionService.eliminarSolicitud(req.params.id);

    return res.json({
      ok: true,
      msg: "Solicitud eliminada correctamente"
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      msg: error.message
    });
  }
};
