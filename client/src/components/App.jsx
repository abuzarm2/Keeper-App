import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(note) {
    fetch("https://cwzn3g-8000.csb.app/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNotes((prevNotes) => [...prevNotes, data]);
      })
      .catch((error) => console.error("Error adding note:", error));
  }

  useEffect(() => {
    fetch("https://cwzn3g-8000.csb.app")
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  function deleteNote(id) {
    const updatedNotes = notes.filter((note) => {
      return note._id != id;
    });
    setNotes(updatedNotes);
    fetch(`https://cwzn3g-8000.csb.app/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Note deleted successfully");
          return response.json();
        } else {
          console.error("Failed to delete note:", response.statusText);
        }
      })
      .then((data) => {
        // Access the response message from the parsed JSON data
        const message = data.message;
        alert(message);
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
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
