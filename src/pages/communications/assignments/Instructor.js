import React, { useState } from "react";
import Face6Icon from "@mui/icons-material/Face6";
import Card from "react-bootstrap/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Inputs from "./Inputs";

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
      <div>
        <div className="p-4">
          <p>
            <Face6Icon />
            <span>Jessica Lee</span>
          </p>
          <p>
            01. Briefly, I would like the role of the Roman Senate during the
            Republic
          </p>
        </div>
        <Card>
          <Card.Body>
            <Card.Text style={{ fontWeight: "bold" }}>
              You haven't answered the assignment yet.
            </Card.Text>
            <Card.Title className="fs-6">
              Submit your work to get constructive feedback from your instructor
              and peers.
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
            <Inputs />
            <Button
              variant="contained"
              color="primary"
              onClick={handleDisplayText}
            >
              {editIndex !== -1 ? "Save Edit" : "Add Your Answer"}
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Announcements;
