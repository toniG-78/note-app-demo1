const { Router } = require("express");
const router = Router();

// Controlers
const {
  renderNoteForm,
  createNewNote,
  getAllNotes,
  renderEditForm,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

// Add New Note *************************************
router.get("/notes/add", renderNoteForm); // renderiza la view del formulario para crear una nueva nota desde el btn de la home

router.post("/notes/new-note", createNewNote); // en la view del formulario al hacer click se envia la request de tipo Post al server para guarda la nueva nota en el database (mongo)

// Get All Notes ************************************
router.get("/notes", getAllNotes); // renderiza una view con todas las notas tanto como para visualizarlas asi como respuesta luego de crear una nueva nota

//:id ---> parametro

// Edit Note ****************************************
router.get("/notes/edit/:id", renderEditForm); // render form for edit note

router.put("/notes/edit/:id", updateNote); // send post request and save the edited note in the database

// Delete Note **************************************
router.delete("/notes/delete/:id", deleteNote);

module.exports = router;

/* **************************************************************************************************************************************
METODOS PUT O EDIT NO ES FACIL CON FORMULARIOS - USAMOS metodo-override (dependencias) - PARA PETICIONES DE ESTE TIPO --> VER server.js, all_notes.hbs,  */
