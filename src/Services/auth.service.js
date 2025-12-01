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
        console.log(user)
        return {
          error: "Credenciales inválidas"
        };
      }

      const isMatch = await user.compararPassword(password);
      
      if (!isMatch) {
        console.log(isMatch)
        return { error: "Credenciales inválidas" };
      }

      // Generar token JWT
      const token = generarJWT({ 
        id: user._id, 
        email: user.email, 
        rol: user.rol.nombre 
      });

      return { 
        token,
        user: {
          id: user._id,
          email: user.email,
          nombre: user.nombre,
          rol: user.rol
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

      console.log(userData)

      const defaultRole = await Rol.findOne({ nombre: userData.rol });
      if (!defaultRole) {
        return { error: "Rol no válido" };
      }
      
      const newUser = await usuarioRepository.createUser({
        ...userData,
        rol: defaultRole._id,  
      });

      const userWithRole = await usuarioRepository.getUserById(newUser._id);
      
      const token = generarJWT({ 
        id: newUser._id, 
        email: newUser.email, 
        rol: userWithRole.rol.nombre // Use the role name for the JWT
      });

      return { 
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
          nombre: newUser.nombre,
          rol: newUser.rol
        }
      };
    } catch (error) {
      console.error('Error en el registro de usuario:', error);
      throw new Error("Error al registrar el usuario");
    }
  }
}

export default new AuthService();
