import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import PersonIcon from "@mui/icons-material/Person";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

function Instruction() {
  const [inputText, setInputText] = useState("");
  const [displayedTexts, setDisplayedTexts] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleDisplayText = () => {
    if (inputText.trim() !== "") {
      if (editIndex !== -1) {
        // Edit the existing text
        const updatedTexts = [...displayedTexts];
        updatedTexts[editIndex] = inputText;
        setDisplayedTexts(updatedTexts);
        setEditIndex(-1);
      } else {
        // Add the new text to the list of displayed texts
        setDisplayedTexts([...displayedTexts, inputText]);
      }

      // Clear the text field
      setInputText("");
    }
  };

  const handleEdit = (index) => {
    // Set the text to edit in the input field and set the editIndex
    setInputText(displayedTexts[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    // Remove the text at the given index
    const updatedTexts = [...displayedTexts];
    updatedTexts.splice(index, 1);
    setDisplayedTexts(updatedTexts);
  };

  return (
    <Card className="m-3">
      <Card>
        <div className="continer p-4">
          <h5>Assignment instructions</h5>
          <p>
            <WatchLaterIcon /> 30 minutes to complete |<PersonIcon />
            one student solution
          </p>
        </div>
        <Card>
          <Card.Body>
            <Card.Title className="fs-6">
              Briefly outline the role of the Roman Senate during the Republic
            </Card.Title>
            <br />
            <Card.Text style={{ fontWeight: "bold" }}>
              Question for this assignment
            </Card.Text>
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
              label="Enter your Question"
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
              {editIndex !== -1 ? "Save Edit" : "Submit Question"}
            </Button>
          </Card.Body>
        </Card>
      </Card>
    </Card>
  );
}

export default Instruction;
