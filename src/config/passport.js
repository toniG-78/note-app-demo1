const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      // Interactuar con el database para confirmar el usuario
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, {
          /*  usa un flash para retornar el mensaje de error, ver 'errors.hbs' y en middlewares de 'server.js' */
          message: "Not User Found",
        });
      } else {
        // Validar la Password cuando el usuario existe
        const passwMatch = await user.matchPassword(password); // true or false
        if (passwMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Incorrect Password",
          });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Ver server.js
// ver el users.controller en el metodo post signin
