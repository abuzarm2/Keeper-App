const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://newuser1:Abuzarm2@cluster0.qqe5xei.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(cors());
app.use(express.json());

const port = 8000;
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", noteSchema);

app.get("/", (req, res) => {
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

  Note.find()
    .then((notes) => {
      res.json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to retrieve posts" });
    });
});

app.listen(port, (req, res) => {
  console.log("App is listening at port 8000");
});
