const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

console.log(__dirname);
require("./config/passport"); // login session

// INITIALIZATIONS  ----------------------------------------------------------------------------------------------------
const app = express();
const port = 4000;

// SETTINGS  ------------------------------------------------------------------------------------------------------------
app.set("port", process.env.PORT || port);
app.set("views", path.join(__dirname, "views"));
// - Definir la renderizacion de las plantillas - handlebars
app.engine(
  ".hbs",
  exphbs({
    // partials(trozos de codigo html, ex: navbar, modal) y layouts(ex:html que se repite en cada pag) --- carpeta views
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// MIDDLEWARES  (funciones que procesan una peticion cuando llegan al server)----------------------------------------------
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // para procesar 'put' y 'delete' por medio de una query - Ver--> 'all_notes.hbs' para 'delete' y '' para 'put'
app.use(
  session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: true,
  })
);
// Passport debe ir luego de express.session ya que se basa en dicho modulo / tambien se debe importar el file del folder -> config: 'passport.js'
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // mensajes al usuario para confirmar eventos - flash-connect --- Necesita de 'express-session' !!!!

// GLOBAL VARIABLES  ------------------------------------------------------------------------------------------------------
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error"); // --> para el mensaje de error que pueda retornar Passport (por defecto el nombre es 'error')
  // ******************************
  // PODREMOS USAR EL VALOR DE LOS MENSAJES DE 'flash-connect' YA QUE SE HAN SALVADO COMO VARIABLES GLOBALES DEL SERVIDOR _-> res.locals.success_msg , USARLOS EN CUALQUIER VISTA POR EJEMPLO /  (ver el file de los controladores para cada mensaje)
  // *****************************
  res.locals.user = req.user || null; // variable que usa Passport para mantener la sesion de usuario(id), se va a usar para mostrar la ruta de todas las notas si el Usuario esta ya autentificado, en caso contrario No... y tambien para no mostrar login y signup icons en el nav, solo logout! --- ver -> config folder (auth_routes.js)
  // Tambien se usara el 'req.user' para guardar la nueva nota junto con el id del usuario asi podra ver sus notas desde la base de datos siendo privadas obviamente
  next();
});

// ROUTES  ----------------------------------------------------------------------------------------------------------------
/* app.get("/", (req, res) => {
  res.render("index");
}); */
app.use(require("./routes/index.routes")); // pages
app.use(require("./routes/notes.routes")); // notes
app.use(require("./routes/users.routes"));

// STATIC FILES  -----------------------------------------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
