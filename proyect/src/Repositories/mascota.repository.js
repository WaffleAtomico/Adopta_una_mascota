import MascotaModel from "../Models/mascotas.models.js";
import User from "../Models/usuarios.models.js";

class MascotaRepository {
    async obtenerMascotas(query = {}) {
        try {
          const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', ...filters } = query;

          const pageNumber = Number(page) || 1;
          const limitNumber = Number(limit) || 10;
          const skip = (pageNumber - 1) * limitNumber;

          const sortOptions = {};
          sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

          const totalMascotas = await MascotaModel.countDocuments(filters);
          const mascotas = await MascotaModel.find(filters)
            .skip(skip)
            .limit(limitNumber)
            .sort(sortOptions);

          const totalPaginas = Math.ceil(totalMascotas / limitNumber) || 1;

          return {
            mascotas,
            totalMascotas,
            totalPaginas,
            paginaActual: pageNumber,
          };
        } catch (error) {
          throw error;
        }
    }

    async crearMascota(mascota){
        try {
            if (mascota?.publicadoPor) {
                const usuario = await User.findById(mascota.publicadoPor);

                if (!usuario) {
                    throw new Error("El usuario especificado en 'publicadoPor' no existe");
                }
            }

            const nuevaMascota = new MascotaModel(mascota);
            return await nuevaMascota.save();
        } catch (error) {
            throw error;
        }
    }

    async crearMultiplesMascotas(mascotas){
        try {
            const resultados = [];
            
            for (const mascota of mascotas) {
                if (mascota?.publicadoPor) {
                    const usuario = await User.findById(mascota.publicadoPor);

                    if (!usuario) {
                        throw new Error(`El usuario especificado en 'publicadoPor' no existe para la mascota: ${mascota.nombre || 'sin nombre'}`);
                    }
                }

                const nuevaMascota = new MascotaModel(mascota);
                const mascotaGuardada = await nuevaMascota.save();
                resultados.push(mascotaGuardada);
            }

            return resultados;
        } catch (error) {
            throw error;
        }
    }

    async buscarMascota(id){
        try {
            const mascota = await MascotaModel.findById(id);
            return mascota;
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