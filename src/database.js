const mongoose = require("mongoose");

/* const NOTES_APP_MONGODB_HOST = process.env.NOTES_APP_MONGODB_HOST;
const NOTES_APP_MONGODB_DATABASE = process.env.NOTES_APP_MONGODB_DATABASE; */
const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;

// EN PRODUCCION -> HABRA UN user Y UNA password QUE AGREGAR, EX. MONGODB ATLAS
const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("Database is connected"))
  .catch((err) => console.log("Database is not connected"));

/*
   - Ir a la terminal y llamar a la shell de mongodb
   mongo

   - Mostrar las bases de datos
   show dbs

   - Entra en la base de datos
   use notes-app

   - Ver la coleccion de notas
   show colletions

   - Mostrar los objetos o documentos de la coleccion
   db.notes.find()  o  db.notes.find().pretty()

   db.notes.drop() BORRA TODO!!!
  */
