const Note = require("../models/Note");

const notesController = {};

// Renderiza el formulario de las Notas **********************************************
notesController.renderNoteForm = (req, res) => {
  res.render("../views/notes/note_form.hbs");
};

// Envia un post con la Nueva Nota ****************************************************
notesController.createNewNote = async (req, res) => {
  console.log(req.body);

  const { title, description } = req.body; // el body del post
  const newNote = new Note({ title, description });
  await newNote.save(); // Salva el objeto en el database(MongoDB) con una funcion asincrona y crea un id fecha
  console.log(newNote);

  //flash-connect********
  req.flash("success_msg", "New Note Added");

  res.redirect("/notes");
  // res.send("new note");
};

// Regresa todas las notas desde el database *********************************************
notesController.getAllNotes = async (req, res) => {
  const notes = await Note.find().lean(); // retorna un array con las notas u objetos - PARLO A LA FUNCION  render() para usar el objeto en la view y pintar en pantalla todas las notas....
  res.render("../views/notes/all_notes.hbs", { notes }); // renderizar la view con todas las notas
};

// Renderiza el formulario para editar una nota
notesController.renderEditForm = async (req, res) => {
  // res.send("edit note");
  const note = await Note.findById(req.params.id).lean(); //Buscar los datos desde la base de datos para pintarlos en el form
  console.log(note);
  res.render("../views/notes/edit_note.hbs", { note });
};

// Envia un put con la Nota Editada
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

// Envia un delete con la Nota Eliminada
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
