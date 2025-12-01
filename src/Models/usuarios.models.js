import { Schema, model, Types } from "mongoose";
import { hashPassword, compareHashedPassword } from "../Utils/password.helper.js"


const UserSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'El email no es válido'],
    },
    password:{
        type: String,
        required: true
    },
    apellidoPaterno: {
        type: String,
        required: false,
        trim: true,
    },
    rol: {
        type: Types.ObjectId,
        ref: 'Rol',
        required: true
    },
    telefono: {
        tipo: {
            type: String,
            enum: ['celular', 'casa', 'trabajo'],
            default: 'celular'
        },
        numero: {
            type: String,
            required: false,
            trim: true,
            unique: false,
        }
    },
    perfil:{
        type: String, //URL de la imagen
        default: null
    },
    ciudad:{
        type: String,
        trim: true,
        default: null
    },
    estado:{
        type: String,
        trim: true,
        default: null
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    deletedAt: {
        type: Date,
        default: null,
        select: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

UserSchema.pre('find', function(next) {
    this.populate('rol', 'nombre -_id');
    this.where({ isDeleted: false });
});

UserSchema.pre('findOne', function(next) {
    this.populate('rol', 'nombre -_id');
    this.where({ isDeleted: false });
    // next()
});

UserSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    // next();
});

// Update the save middleware to handle next properly
UserSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    // next(); 
});

UserSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return; 
    }

    try {
        this.password = await hashPassword(this.password);
    } catch (error) {
        throw error;
    }
});

UserSchema.methods.tieneRol = function(roles) {
    if (!Array.isArray(roles)) {
        roles = [roles];
    }
    return roles.includes(this.rol?.nombre);
};

UserSchema.methods.compararPassword = compareHashedPassword;

export default model('User', UserSchema);