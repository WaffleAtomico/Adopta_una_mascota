import { request, response } from "express";
import mascotasService from "../Services/mascotas.service.js";

export const conseguirMascotas = async(req = request, res = response) => {
    try{
        const {mascotas, totalMascotas, totalPaginas, paginaActual} = await mascotasService.conseguirMascotas(req.query);
        return res.status(200).json({
            success: true,
            mascotas,
            totalMascotas,
            totalPaginas,
            paginaActual
        });
    } catch (error) {
        return res.status(500).json({ 
            msg: "Error al obtener mascotas",
            success: false,
            error: error.message 
        });
    }
}

export const crearMascotas = async(req = request, res = response) => {
    try {
        const {pet} = req.body;
        const mascota = await mascotasService.crearMascota(pet);
        return res.status(201).json({
            success: true,
            mascota
        });
    } catch (error) {
        return res.status(500).json({ 
            msg: "Error al crear mascota",
            success: false,
            error: error.message 
        });
    }
}

export const buscarMascota = async(req = request, res = response) => {
    try{
        const mascota = await mascotasService.buscarMascota(req.params.id);
    
        if(mascota === null){
            return res.status(404).json({
                success: false, 
                msg: "Mascota no encontrada"
            });
        }

        res.status(200).json({
            success: true,
            mascota
        });
    } catch (error) {
        return res.status(500).json({ 
            msg: "Error al buscar mascota",
            success: false,
            error: error.message 
        });
    }
}

export const actualizarMascota = async(req = request, res = response) => {
    try{
        const mascota = await mascotasService.actualizarMascota(req.params.id, req.body);
    
        if(mascota === null){
            return res.status(404).json({
                success: false, 
                msg: "Mascota no encontrada"
            });
        }
    
        res.status(200).json({
            success: true,
            mascota
        });
    } catch (error) {
        return res.status(500).json({ 
            msg: "Error al actualizar mascota",
            success: false,
            error: error.message 
        });
    }  
}

export const borrarMascota = async(req = request, res = response) => {
    try{
        const mascota = await mascotasService.borrarMascota(req.params.id);
    
        if(mascota === null){
            return res.status(404).json({
                success: false, 
                msg: "Mascota no encontrada"
            });
        }
    
        res.status(200).json({
            success: true,
            mascota
        });
    } catch (error) {
        return res.status(500).json({ 
            msg: "Error al borrar mascota",
            success: false,
            error: error.message 
        });
    }
}