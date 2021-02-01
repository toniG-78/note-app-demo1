const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      // Passport mantiene el id del User durante la sesion, al guardar una nota -> guardar el id correspondiente al usuario tambien... Nota Privada
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    //created at, updated at
  }
);

module.exports = model("Note", NoteSchema, "notes"); //"notes" se refiere a una coleccion o tabla
