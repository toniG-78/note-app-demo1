const User = require("../models/User");

const usersController = {};

// Renderiza el Form para el registro de usuario ***************************************************************************
usersController.renderSignUpForm = (req, res) => {
  res.render("../views/users/signup.hbs");
};

//Envia el POST con los datos del registro del usuario para guardar en el database *****************************************
usersController.signup = async (req, res) => {
  //Tomo los parametros del body
  const { name, email, password, confirm_password } = req.body;

  // Validate SignUp form
  const errors = [];
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match" });
  }
  if (password.length < 6) {
    errors.push({ text: "Password must be at least 6 characters" });
  }
  if (errors.length > 0) {
    res.render("../views/users/signup.hbs", {
      errors,
      name,
      email,
    });
    // Si el array errors tiene minimo un objeto creado es enviado a la plantilla para pintar en pantalla
    // Se envian tambien los datos ya escritos por el usuario para llenar los campos del form nuevamente para que no vuelvan a tipearlos...
  } else {
    //res.send("sign up received");
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "Sorry, the user already exists.");
      res.redirect("/users/signup");
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "New user register!");
      res.redirect("/users/signin");
    }
    // Chequear en el database si ya existe el usuario, enviar mensaje de error o bien guardar el nuevo usario en el database
  }
};

// Renderiza el Form para el login del usuario ****************************************************************************
usersController.renderSignInForm = (req, res) => {
  res.render("../views/users/signin.hbs");
};

//Envia el POST con los datos del login del usuario para comparar con el registro en la base de datos *************************
usersController.signin = (req, res) => {
  res.send("user login");
};

//Log out *******************************************************
usersController.logout = (req, res) => {
  res.send("user log out");
};

module.exports = usersController;
