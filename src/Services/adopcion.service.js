import SolicitudAdopcion from "../Models/adopcion.models.js";

class AdopcionService {
  async crearSolicitud(data) {
    const { solicitante, dueno } = data;

    if (solicitante === dueno) {
      throw new Error("No puedes solicitar adoptar tu propia mascota");
    }

    const solicitud = new SolicitudAdopcion(data);
    await solicitud.save();
    return solicitud;
  }

  async obtenerSolicitudPorId(id) {
    const solicitud = await SolicitudAdopcion.findById(id)
      .populate("mascota")
      .populate("solicitante", "-password")
      .populate("dueno", "-password");

    if (!solicitud || solicitud.isDeleted) {
      throw new Error("Solicitud no encontrada");
    }

    return solicitud;
  }


  async obtenerSolicitudesUsuario(userId) {
    return await SolicitudAdopcion.find({
      solicitante: userId,
      isDeleted: false
    })
      .populate("mascota")
      .populate("dueno", "-password");
  }

  async obtenerSolicitudesComoSolicitante(userId) {
    const solicitudes = await SolicitudAdopcion.find({
      solicitante: userId,
      isDeleted: false
    })
      .populate("mascota")
      .populate("dueno", "-password");
    
    return solicitudes;
  }

  async obtenerSolicitudesMascota(petId) {
    return await SolicitudAdopcion.find({
      mascota: petId,
      isDeleted: false
    })
      .populate("solicitante", "-password")
      .populate("dueno", "-password");
  }

  async actualizarEstado(id, estado) {
    if (!["pendiente", "aceptada", "rechazada"].includes(estado)) {
      throw new Error("Estado inválido");
    }

    const solicitud = await SolicitudAdopcion.findById(id);

    if (!solicitud || solicitud.isDeleted) {
      throw new Error("Solicitud no encontrada");
    }

    solicitud.estado = estado;
    await solicitud.save();

    return solicitud;
  }

  async eliminarSolicitud(id) {
    const solicitud = await SolicitudAdopcion.findById(id);

    if (!solicitud || solicitud.isDeleted) {
      throw new Error("Solicitud no encontrada");
    }

    solicitud.isDeleted = true;
    solicitud.deletedAt = new Date();
    await solicitud.save();

    return true;
  }
}

export default new AdopcionService();
