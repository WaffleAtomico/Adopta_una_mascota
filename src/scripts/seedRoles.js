import mongoose from 'mongoose';
import Rol from '../Models/rol.model.js';
import { Roles } from '../Types/roles.types.js';
import configService from '../Utils/config.service.js';

async function seedRoles() {
  try {
    await mongoose.connect(configService.DATABASE_URI);
    console.log('Connected to MongoDB');

    const roles = [
      { nombre: Roles.ADMIN, descripcion: 'Administrador del sistema' },
      { nombre: Roles.OWNER, descripcion: 'Dueño de la Mascota' },
      { nombre: Roles.USER, descripcion: 'Usuario estandar' }
    ];

    for (const role of roles) {
      await Rol.findOneAndUpdate(
        { nombre: role.nombre },
        role,
        { upsert: true, new: true }
      );
      console.log(`Role ${role.nombre} creado/actualizado`);
    }

    console.log('Roles creados exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error al crear roles:');
    console.error(error);
    process.exit(1);
  }
}

seedRoles();