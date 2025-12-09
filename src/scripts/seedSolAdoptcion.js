import mongoose from 'mongoose';

const { Schema } = mongoose;

const solicitudAdopcionSchema = new Schema(
  {
    mascota: {
      type: Schema.Types.ObjectId,
      ref: 'Mascota',
      required: true
    },

    solicitante: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    },

    dueno: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    },

    estado: {
      type: String,
      enum: ["pendiente", "aceptada", "rechazada"],
      default: "pendiente",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('SolicitudAdopcion', solicitudAdopcionSchema);
