import React, { useState } from "react";
import Face6Icon from "@mui/icons-material/Face6";
import Card from "react-bootstrap/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Announcements = () => {
  const [inputText, setInputText] = useState("");
  const [displayedTexts, setDisplayedTexts] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleDisplayText = () => {
    if (inputText.trim() !== "") {
      if (editIndex !== -1) {
        const updatedTexts = [...displayedTexts];
        updatedTexts[editIndex] = inputText;
        setDisplayedTexts(updatedTexts);
        setEditIndex(-1);
        setInputText("");
      } else {
        setDisplayedTexts([...displayedTexts, inputText]);
        setInputText("");
      }
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setInputText(displayedTexts[index]);
  };

  const handleDelete = (index) => {
    const updatedTexts = [...displayedTexts];
    updatedTexts.splice(index, 1);
    setDisplayedTexts(updatedTexts);
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Text style={{ fontWeight: "bold" }}>Give Feedback</Card.Text>
          <Card.Title className="fs-6">
            What went well? What could be improved?
          </Card.Title>
          <br />
          {displayedTexts.map((text, index) => (
            <div key={index}>
              <p>{text}</p>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(index)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(index)}
              >
                Delete
              </Button>
            </div>
          ))}
          <TextField
            id="inputText"
            label="Add Feedback..."
            variant="outlined"
            fullWidth
            value={inputText}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleDisplayText}
          >
            {editIndex !== -1 ? "Save Edit" : "Add Feedback"}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Announcements;
