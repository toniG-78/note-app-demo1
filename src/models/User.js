const { Mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, //Para que se pueda validar el usario durante el SignUp
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// encriptar password al salvarla en el database
UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); //algoritmo para encriptar y a mayor numero mas seguro pero mas trabajo por el servidor
  return await bcrypt.hash(password, salt);
};

// comparar passwords, almacenada y al loggearse
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password); // boolean
};

module.exports = model("User", UserSchema);
