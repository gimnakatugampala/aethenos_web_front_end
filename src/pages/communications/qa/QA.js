import React, { useEffect, useState } from "react";
import ScrollBarPage from "./ScrollBarPage";
import "./QA.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Questions from "./Questions";
import Button from '@mui/material/Button';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { AddAnswer, GetAllQuestions, GetCousesOfInstructror } from "../../../api";
import ErrorAlert from "../../../commonFunctions/Alerts/ErrorAlert";
import { Paper } from "@mui/material";


const QA = () => {

  const [courseCode, setcourseCode] = useState("")
  const [cmbCourses, setcmbCourses] = useState([])

  const [questions, setquestions] = useState([])

  //  ---------------- Select Question Room -------------
  const [questionItemCode, setquestionItemCode] = useState("")
  const [questionItemContent, setquestionItemContent] = useState("")
  const [answerContent, setanswerContent] = useState(null)
  //  ---------------- Select Question Room -------------


  // ---------- Submit Answer -------------------
  const [answer, setanswer] = useState("")
  // ---------- Submit Answer -------------------

  useEffect(() => {
    GetCousesOfInstructror(setcmbCourses)
    GetAllQuestions(courseCode,setquestions)
  }, [courseCode])
  
  // ---------- Select QA --------------
  const handleSelectQA = (e) =>{
    console.log(e.target.value)
    setcourseCode(e.target.value)
    setquestionItemCode("")
    setquestionItemContent("")

  }


  // -------------- Submit Answer
  const handlePublishAnswer = () =>{
    console.log(questionItemCode)
    console.log(answer)
    if(answer == ""){
      ErrorAlert("Error","Please Enter An Answer")
      return
    }

    AddAnswer(questionItemCode,answer,setanswer,courseCode,questions,setquestions,setanswerContent,setquestionItemContent)
    // GetAllQuestions()
  }

  return (
    <div className=" all-courses-container mb-5">
      <div className="row">
        <div className="col-md-2">
             <Typography variant="h4" gutterBottom>
             Q&A
            </Typography>
        </div>

        <div className="col-md-2">

        <FormControl fullWidth>
        <NativeSelect
          onChange={handleSelectQA}
          defaultValue={""}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
           <option value={""}>All Courses</option>
          {cmbCourses.length > 0 && cmbCourses.map((course,index) => (
            <option key={index} value={course.code}>{course.title}</option>
          ))}
        </NativeSelect>
      </FormControl>

        </div>

      </div>
{/*       
      <div className="container">
        <div className="row">
          <div className="col-3">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Unread"
              />
            </FormGroup>
          </div>
          <div className="col-3">
            <FormGroup>
              <FormControlLabel
                Notopanswer
                control={<Checkbox />}
                label={<span className="fs-7">No top answer</span>}
              />
            </FormGroup>
          </div>
          <div className="col-3">
            <FormGroup>
              <FormControlLabel
                noAnswer
                control={<Checkbox />}
                label={<span className="fs-6">No answers</span>}
              />
            </FormGroup>
          </div>
          <div className="col-3">
            <FormGroup>
              <FormControlLabel
                noIinstructorAnswer
                control={<Checkbox />}
                label={<span className="fs-8">No instructor answer</span>}
              />
            </FormGroup>
          </div>
          <div className="col-3 my-4">
          <FormControl fullWidth>
        <NativeSelect
          defaultValue={10}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>Newest to Oldest</option>
          <option value={20}>Oldest to Newest</option>
          <option value={30}>Price: Low to High</option>
          <option value={40}>Price: High to Low</option>
          <option value={50}>Rating: High to Low</option>
        </NativeSelect>
      </FormControl>

          </div>
        </div>
      </div> */}

      <Card>
        <div className="row">
          <div className="col-md-4">
            {questions.length > 0 ? (
              <Questions setanswerContent={setanswerContent} questions={questions} setquestionItemContent={setquestionItemContent} setquestionItemCode={setquestionItemCode} />
            ) : 
            <Paper square sx={{ height: "505px", overflow: "auto", pb: "50px" }}>
            <div className="d-flex justify-content-center align-items-center h-100" style={{height:'100vh'}}>
                 <h4>No Questions Found</h4>
            </div>
            </Paper>}
          </div>

          <div className="col-md-8">
            <div className="mb-3 d-flex align-items-start">
                {questionItemContent != "" && <ScrollBarPage answerContent={answerContent} questionItemContent={questionItemContent} />} 
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
              <div className="col-2">
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
      </Card>
    </div>
  );
};
export default QA;
