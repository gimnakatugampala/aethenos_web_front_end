import React from "react";
import ScrollBarPage from "./ScrollBarPage";
import "./QA.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Questions from "./Questions";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";

const QA = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-1">
          <p className="fs-5 font-bold">Q&A</p>
        </div>
        <div className="col-2">
          <select className="form-select w-70">
            <option value="all_courses">All Courses</option>
            <option value="course_1">Course 1</option>
            <option value="course_2">Course 2</option>
            <option value="course_3">Course 3</option>
            <option value="course_4">Course 4</option>
          </select>
        </div>
      </div>
      <div className="container"></div>
      <div className="row">
        <div className="col-2">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Unread"
            />
          </FormGroup>
        </div>
        <div className="col-2">
          <FormGroup>
            <FormControlLabel
              Notopanswer
              control={<Checkbox />}
              label="No top answer"
            />
          </FormGroup>
        </div>
        <div className="col-2">
          <FormGroup>
            <FormControlLabel
              noAnswer
              control={<Checkbox />}
              label="No answers"
            />
          </FormGroup>
        </div>
        <div className="col-3">
          <FormGroup>
            <FormControlLabel
              noIinstructorAnswer
              control={<Checkbox />}
              label="No instructor answer"
            />
          </FormGroup>
        </div>
        <div className="col-3">
          <div className="row">
            <div className="col-3">
              <p>Sort by:</p>
            </div>
            <div className="col-9">
              <select className="form-select w-70">
                <option value="newestToOldest">Newest to Oldest</option>
                <option value="oldestToNewest">Oldest to Newest</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="ratingHighToLow">Rating: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <div className="row">
          <div className="col-3">
            <Questions />
          </div>
          <div className="col-9">
            <ScrollBarPage />
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Post a public answer"
                aria-label="Post a public answer"
                aria-describedby="basic-addon2"
              />
              <div className="col-2">
                <Button
                  className="w-90"
                  variant="outline-secondary bg-primary text-light"
                  id="button-addon2"
                >
                  Publish
                </Button>
              </div>
            </InputGroup>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default QA;
