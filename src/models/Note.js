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
  },
  {
    timestamps: true,
    //created at, updated at
  }
);

module.exports = model("Note", NoteSchema, "notes"); //"notes" se refiere a una coleccion o tabla
