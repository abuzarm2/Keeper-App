import React, { useState } from "react";

function CreateArea(props) {
  const [newNote, setNote] = useState({
    title: "",
    content: ""
  });

  function submitNote(event) {
    props.onAdd(newNote);
    setNote(() => {
      return { title: "", content: "" };
    });
    event.preventDefault();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={newNote.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={newNote.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
