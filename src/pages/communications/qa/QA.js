import React, { useEffect, useState } from "react";
import ScrollBarPage from "./ScrollBarPage";
import {
  Container,
  Row,
} from "react-bootstrap";
import "./QA.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Questions from "./Questions";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {
  AddAnswer,
  GetAllQuestions,
  GetCousesOfInstructror,
} from "../../../api";
import ErrorAlert from "../../../commonFunctions/Alerts/ErrorAlert";
import { Select, Space } from 'antd';
import { Paper } from "@mui/material";

const QA = () => {
  const [courseCode, setcourseCode] = useState("");
  const [cmbCourses, setcmbCourses] = useState([]);

  const [questions, setquestions] = useState([]);

  //  ---------------- Select Question Room -------------
  const [questionItemCode, setquestionItemCode] = useState("");
  const [questionItemContent, setquestionItemContent] = useState("");
  const [answerContent, setanswerContent] = useState(null);
  //  ---------------- Select Question Room -------------

  // ---------- Submit Answer -------------------
  const [answer, setanswer] = useState("");
  // ---------- Submit Answer -------------------

  useEffect(() => {
    GetCousesOfInstructror(setcmbCourses);
    GetAllQuestions(courseCode, setquestions);
  }, [courseCode]);

  // ---------- Select QA --------------
  const handleSelectQA = (value) => {
    console.log(value);
    setcourseCode(value);
    setquestionItemCode("");
    setquestionItemContent("");
  };

  // -------------- Submit Answer
  const handlePublishAnswer = () => {
    console.log(questionItemCode);
    console.log(answer);
    if (answer == "") {
      ErrorAlert("Error", "Please Enter An Answer");
      return;
    }

    AddAnswer(
      questionItemCode,
      answer,
      setanswer,
      courseCode,
      questions,
      setquestions,
      setanswerContent,
      setquestionItemContent
    );
    // GetAllQuestions()
  };

  return (
    <div className=" all-courses-container mb-5">
      <div className="row mb-4 mx-2" style={{justifyContent: "space-between"}}>
        <div className=" col-md-2 ">
          <Typography variant="h4" gutterBottom>
            Q&A
          </Typography>
        </div>

        <div className="col-md-2" style={{float: "right"}}>
          <FormControl fullWidth>
            <Select
              onChange={handleSelectQA}
              defaultValue={""}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
            >
              <option value={""}>All Courses</option>
              {cmbCourses.length > 0 &&
                cmbCourses.map((course, index) => (
                  <option key={index} value={course.code}>
                    {course.title}
                  </option>
                ))}
            </Select>
          </FormControl>
        </div>
      </div>
    

      <Card className="border-rad-20 p-2">
      <Container fluid className="p-3 ">
      <Row  className="vh-130 ">

        <div className="row ">
          <div className="col-md-4 bg-light p-3">
            {questions.length > 0 ? (
              <Questions
                setanswerContent={setanswerContent}
                questions={questions}
                setquestionItemContent={setquestionItemContent}
                setquestionItemCode={setquestionItemCode}
               
              />
            ) : (
              <Paper
             
                square
                sx={{ height: "505px", overflow: "auto", pb: "50px" }}
              >
                <div
                  className="d-flex justify-content-center align-items-center h-100"
                  style={{ height: "100vh" }}
                >
                  <h4>No Questions Found</h4>
                </div>
              </Paper>
            )}
          </div>

          <div className="col-md-8">
            <div className="mb-3 d-flex align-items-start">
              {questionItemContent != "" && (
                <ScrollBarPage
                  answerContent={answerContent}
                  questionItemContent={questionItemContent}
                />
              )}
            </div>

            <div className="d-flex align-items-end">
              {questionItemContent != "" && (
                <InputGroup className="mb-3 d-flex align-items-end">
                  <Form.Control
                    as="textarea"
                    value={answer}
                    onChange={(e) => setanswer(e.target.value)}
                    placeholder="Post a public answer"
                    aria-label="Post a public answer"
                    aria-describedby="basic-addon2"
                  />
                  <div className="col-2"  style={{display: "contents"}}>
                    <Button
                      onClick={handlePublishAnswer}
                      variant="contained"
                      className="w-90 p-3 m-1"
                     
                    >
                      Publish
                    </Button>
                  </div>
                </InputGroup>
              )}
            </div>
          </div>
        </div>
        </Row>
              </Container>
            
      </Card>
    </div>
  );
};
export default QA;
