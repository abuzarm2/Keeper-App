const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://newuser1:Abuzarm2@cluster0.qqe5xei.mongodb.net/keeper?retryWrites=true&w=majority";

const app = express();
app.use(
  cors({
    origin: "https://cwzn3g-3000.csb.app", // Replace with your client's domain
  })
);
app.use(express.json());

const port = 8000;
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", noteSchema, "notes");

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  Note.find()
    .then((notes) => {
      res.json(notes);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to retrieve posts" });
    });
});

app.post("/add", (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({
    title,
    content,
  });
  console.log(newNote);
  newNote
    .save()
    .then((savedNote) => {
      res.status(201).json(savedNote);
    })
    .catch((error) => {
      console.error("Error saving note:", error);
      res.status(500).json({ error: "Failed to save note" });
    });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  Note.findByIdAndDelete(id)
    .then((deletedNote) => {
      if (deletedNote) {
        console.log("Note deleted successfully:", deletedNote);
        res
          .status(200)
          .json({ success: true, message: "Note deleted successfully" });
      } else {
        console.log("Note not found");
        res.status(404).json({ success: false, message: "Note not found" });
      }
    })
    .catch((error) => {
      console.error("Error deleting note:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to delete note" });
    });
});

app.listen(port, (req, res) => {
  console.log("App is listening at port 8000");
});
