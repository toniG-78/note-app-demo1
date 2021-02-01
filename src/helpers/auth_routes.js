const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  // Passport añade funciones a la aplicacion, 'isAuthenticated', para saber si la sesion pertenece al mismo usario auth... / se guardan en el 'req'
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "You most be Login first!");
  res.redirect("/users/signin");
};

module.exports = helpers;

// ver notes.routes.js
// proteger las rutas referentes a las notas para que sean vista solamente si estas loggeado y no permitir el acceso a traves del URL
