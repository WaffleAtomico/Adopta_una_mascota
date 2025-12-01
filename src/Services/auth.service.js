import usuarioRepository from "../Repositories/usuario.repository.js";
import { generarJWT } from "../Utils/jwt.generator.js";
import { Roles } from "../Types/roles.types.js";
import Rol from "../Models/rol.model.js";

class AuthService {
  async login(credenciales) {
    try {
      const { email, password } = credenciales;

      if (!email || !password) {
        return { error: "Correo y contraseña son requeridos" };
      }

      const user = await usuarioRepository.getUserByEmail(email.toLowerCase());

      if (!user) {
        return {
          error: "Credenciales inválidas"
        };
      }

      const isMatch = await user.compararPassword(password);
      
      if (!isMatch) {
        return { error: "Credenciales inválidas" };
      }

      // Generar token JWT
      const token = generarJWT({ 
        id: user._id, 
        email: user.email, 
        role: user.tipo 
      });

      return { 
        token,
        user: {
          id: user._id,
          email: user.email,
          nombre: user.nombre,
          tipo: user.tipo
        }
      };
    } catch (error) {
      console.error('Error en el servicio de autenticación:', error);
      throw new Error("Error al procesar la autenticación");
    }
  }

  async register(userData) {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await usuarioRepository.getUserByEmail(userData.email);
      if (existingUser) {
        return { error: "El correo ya está registrado" };
      }
      const defaultRole = await Rol.findOne({ nombre: userData.rol || Roles.USER });
      if (!defaultRole) {
        return { error: "Rol no válido" };
      }

      const newUser = await usuarioRepository.createUser({
        ...userData,
        rol: defaultRole._id,
      });

      const token = generarJWT({ 
        id: newUser._id, 
        email: newUser.email, 
        role: newUser.tipo 
      });

      return { 
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
          nombre: newUser.nombre,
          tipo: newUser.tipo
        }
      };
    } catch (error) {
      console.error('Error en el registro de usuario:', error);
      throw new Error("Error al registrar el usuario");
    }
  }
}

export default new AuthService();
