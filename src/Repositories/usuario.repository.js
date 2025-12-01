import User from "../Models/usuarios.models.js";

class UsuarioRepository {
    async getUsers() {
        try {
            const query = { isDeleted: false };
            const users = await User.find(query).select('-password');
            return { users };
        } catch (error) {
            throw error;
        }
    }
    
    async getUserById(id) {
        try {
            return await User.findById(id)
                .select('-password')
                .populate('rol', 'nombre');
        } catch (error) {
            throw error;
        }
    }
    
    async getUserByEmail(email) {
        try {
            return await User.findOne({ email })
                .populate('rol', 'nombre');
        } catch (error) {
            throw error;
        }
    }
    
    async createUser(userData) {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            throw error;
        }
    }
    
    async updateUser(id, userData) {
        try {
            if (userData.password) {
                delete userData.password;
            }
            
            return await User.findByIdAndUpdate(
                id,
                { ...userData, updatedAt: Date.now() },
                { new: true, runValidators: true }
            ).select('-password');
        } catch (error) {
            throw error;
        }
    }
    
    async deleteUser(id) {
        try {
            return await User.findByIdAndUpdate(
                id,
                { 
                    isDeleted: true,
                    deletedAt: Date.now() 
                },
                { new: true }
            ).select('-password');
        } catch (error) {
            throw error;
        }
    }
}

export default new UsuarioRepository();