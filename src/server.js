const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");

console.log(__dirname);

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
app.use(flash()); // mensajes al usuario para confirmar eventos - Necesita de 'express-session' !!!!

// GLOBAL VARIABLES  ------------------------------------------------------------------------------------------------------
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  // PODREMOS USAR EL VALOR DE LOS MENSAJES DE 'flash-connect' YA QUE SE HAN SALVADO COMO VARIABLES GLOBALES DEL SERVIDOR _-> res.locals.success_msg , USARLOS EN CUALQUIER VISTA POR EJEMPLO /  (ver el file de los controladores para cada mensaje)
  next();
});

// ROUTES  ----------------------------------------------------------------------------------------------------------------
/* app.get("/", (req, res) => {
  res.render("index");
}); */
app.use(require("./routes/index.routes")); // pages
app.use(require("./routes/notes.routes")); // notes

// STATIC FILES  -----------------------------------------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
