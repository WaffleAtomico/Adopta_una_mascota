import usuarioRepository from "../Repositories/usuario.repository.js";

class UsuarioService {
    async getUsers() {
        try {
            const { users } = await usuarioRepository.getUsers();
            return { users };
        } catch (error) {
            throw error;
        }
    }

    async createUser(userData) {
        try {
            // Verificar si el usuario ya existe
            const existingUser = await usuarioRepository.getUserByEmail(userData.email);
            if (existingUser) {
                throw new Error('El correo electrónico ya está registrado', 400);
            }

            const newUser = await usuarioRepository.createUser(userData);
            
            const userObj = newUser.toObject();
            delete userObj.password;
            
            return userObj;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id) {
        try {
            const user = await usuarioRepository.getUserById(id);
            
            if (!user || user.isDeleted) {
                throw new Error('Usuario no encontrado', 404);
            }
            
            return user;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id, userData) {
        try {
            // Verificar si el usuario existe
            const existingUser = await usuarioRepository.getUserById(id);
            if (!existingUser || existingUser.isDeleted) {
                throw new Error('Usuario no encontrado', 404);
            }

            if (userData.email && userData.email !== existingUser.email) {
                const emailInUse = await usuarioRepository.getUserByEmail(userData.email);
                if (emailInUse) {
                    throw new Error('El correo electrónico ya está en uso', 400);
                }
            }

            const updatedUser = await usuarioRepository.updateUser(id, userData);
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const user = await usuarioRepository.getUserById(id);
            
            if (!user || user.isDeleted) {
                throw new Error('Usuario no encontrado', 404);
            }
            
            const deletedUser = await usuarioRepository.deleteUser(id);
            return { message: 'Usuario eliminado correctamente' };
        } catch (error) {
            throw error;
        }
    }
}

export default new UsuarioService();