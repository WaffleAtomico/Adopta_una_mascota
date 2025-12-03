import { request, response } from "express";
import usuarioService from "../Services/usuario.service.js";

export const getUsers = async (req = request, res = response) => {
    try {
        const { users } = await usuarioService.getUsers();
        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            msg: "Error al obtener usuarios"
        });
    }
};

export const getUserById = async (req = request, res = response) => {
    try {
        const user = await usuarioService.getUserById(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "Usuario no encontrado"
            });
        }
        
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            msg: "Error al obtener el usuario"
        });
    }
};

export const createUser = async (req = request, res = response) => {
    try {
        const newUser = await usuarioService.createUser(req.body);
        res.status(201).json({
            success: true,
            user: newUser
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            msg: "Error al crear el usuario"
        });
    }
};

export const updateUser = async (req = request, res = response) => {
    try {
        
        const updatedUser = await usuarioService.updateUser(req.params.id, req.body);
        
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                msg: "Usuario no encontrado"
            });
        }
        
        res.status(200).json({
            success: true,
            user: updatedUser
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            msg: "Error al actualizar el usuario"
        });
    }
};

export const deleteUser = async (req = request, res = response) => {
    try {
        const deletedUser = await usuarioService.deleteUser(req.params.id);
        
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                msg: "Usuario no encontrado"
            });
        }
        
        res.status(200).json({
            success: true,
            msg: "Usuario eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            msg: "Error al eliminar el usuario"
        });
    }
};
