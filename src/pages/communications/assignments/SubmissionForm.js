import React from "react";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

const Submission = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <textarea
            className="form-control"
            placeholder="Add your Submission"
          ></textarea>
          <p className="font-weight-bold mt-3">
            2. Choose your sharing preference
          </p>
          <div className="pl-3">
            <FormControlLabel
              control={
                <Checkbox
                  name="feedbackCheckbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              }
              label="Yes, I want to get feedback from my fellow students."
            />
            <br />
            <Button variant="outlined" color="primary" className="mr-2">
              Save Draft
            </Button>

            <Button
              variant="contained"
              color="primary"
              className="mr-2"
              style={{ marginLeft: "10px" }}
            >
              Submit
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Submission;
