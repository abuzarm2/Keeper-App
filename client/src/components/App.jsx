import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(Note) {
    setNotes((prevNotes) => {
      return [...prevNotes, Note];
    });
  }

  useEffect(() => {
    fetch("https://cwzn3g-8000.csb.app")
      .then((response) => response.json())
      .then((data) => setNotes(data));
  });

  function deleteNote(id) {
    const notes2 = notes.filter((index) => {
      return index !== id;
    });
    setNotes(notes2);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
