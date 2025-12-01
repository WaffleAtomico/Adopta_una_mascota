import mascotaRepository from "../Repositories/mascota.repository.js";

class MascotasService {
    async conseguirMascotas(filters){
        try {
            const {mascotas, totalMascotas, totalPaginas, paginaActual} = await mascotaRepository.obtenerMascotas(filters);
            
            return {mascotas, totalMascotas, totalPaginas, paginaActual};
        } catch (error) {
            throw error;
        }
    }

    async crearMascota(mascota) {
        try {
            const nuevaMascota = await mascotaRepository.crearMascota(mascota);
                
            return nuevaMascota;
        } catch (error) {
            throw error;
        }
    }

    async buscarMascota(id) {
        try {
            const mascota = await mascotaRepository.buscarMascota(id);

            return mascota;
        } catch (error) {
            throw error;
        }
    }

    async actualizarMascota(id, mascota) {
        try {
            const mascotaActualizada = await mascotaRepository.actualizarMascota(id, mascota);
            
            return mascotaActualizada;
        } catch (error) {
            throw error;
        }
    }

    async borrarMascota(id) {
        try {
            const mascotaEliminada = await mascotaRepository.eliminarMascota(id);
            
            return mascotaEliminada;
        } catch (error) {
            throw error;
        }
    }
}

export default new MascotasService();