import MascotaModel from "../Models/mascotas.models.js";

class MascotaRepository {
    async obtenerMascotas(filters){
        try {
            const mascotas = await MascotaModel.find(filters);
            return mascotas;
        } catch (error) {
            throw error;
        }
    }

    async crearMascota(mascota){
        try {
            const nuevaMascota = new MascotaModel(mascota);
            return await nuevaMascota.save();
        } catch (error) {
            throw error;
        }
    }

    async buscarMascota(id){
        try {
           return await MascotaModel.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async actualizarMascota(id, mascota){
        try {
            const mascotaActualizada = await MascotaModel.findByIdAndUpdate(id, mascota, {new: true, runValidators: true});
            return mascotaActualizada;
        } catch (error) {
            throw error;
        }
    }

    async eliminarMascota(id){
        try {
            const softDelete = {
                isDeleted: true,
                deletedAt: new Date()
            };

            return await MascotaModel.findByIdAndUpdate(id, softDelete, {new: true});
        } catch (error) {
            throw error;
        }
    }
}
    
export default new MascotaRepository();