const Note = require("../models/Note");

const notesController = {};

// Renderiza el formulario de las Notas **********************************************
notesController.renderNoteForm = (req, res) => {
  console.log(req.user);
  res.render("../views/notes/note_form.hbs");
};

// Envia un POST con la Nueva Nota ****************************************************
notesController.createNewNote = async (req, res) => {
  console.log(req.body);

  const { title, description } = req.body; // parametros del body del post
  const newNote = new Note({ title, description });
  newNote.user = req.user.id; //id del usuario que mantiene la session - Passport - Nota privada
  await newNote.save(); // Salva el objeto en el database(MongoDB) con una funcion asincrona y crea un id fecha
  console.log(newNote);

  //flash-connect********
  req.flash("success_msg", "New Note Added");

  res.redirect("/notes");
  // res.send("new note");
};

// Regresa todas las notas desde el database *********************************************
notesController.getAllNotes = async (req, res) => {
  // Filtramos las notas primero para asi mostrar las notas que les corresponde al usuario
  const notes = await Note.find({ user: req.user.id })
    .sort({ createdAt: "desc" })
    .lean(); // retorna un array con las notas u objetos - PARLO A LA FUNCION  render() para usar el objeto en la view y pintar en pantalla todas las notas....
  res.render("../views/notes/all_notes.hbs", { notes }); // renderizar la view con todas las notas
};

// Renderiza el formulario para editar una nota - GETs
notesController.renderEditForm = async (req, res) => {
  // res.send("edit note");
  const note = await Note.findById(req.params.id).lean(); //Buscar los datos desde la base de datos para pintarlos en el form
  console.log(note);

  // Validar ruta para evitar otro conozca el url
  if (note.user != req.user.id) {
    req.flash("error_msg", "Not Authorized for Edit this Note...");
    return res.redirect("/notes");
  }

  res.render("../views/notes/edit_note.hbs", { note });
};

// Envia un PUT (method-override) con la Nota Editada
notesController.updateNote = async (req, res) => {
  const { title, description } = req.body; // el body del post
  await Note.findByIdAndUpdate(req.params.id, {
    title,
    description,
  });

  //flash-connect*******
  req.flash("success_msg", "Note Updated");

  res.redirect("/notes");
};

// Envia un DELETE(method-override) con la Nota Eliminada
notesController.deleteNote = async (req, res) => {
  console.log(req.params.id);
  //
  await Note.findByIdAndDelete(req.params.id);

  //flash-connect********
  req.flash("success_msg", "Note delected");

  res.redirect("/notes");
  // res.send("note delected");
};

module.exports = notesController;
