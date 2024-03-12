import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { LineChart } from "@mui/x-charts/LineChart";
import Card from "react-bootstrap/Card";
import Link from "@mui/material/Link";
import MaterialTable from "material-table";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import TranslateIcon from "@mui/icons-material/Translate";
import LanguageIcon from "@mui/icons-material/Language";
import AddIcon from '@mui/icons-material/Add';
import ForumIcon from '@mui/icons-material/Forum';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Map from "./Map";
import { GetCousesOfInstructror, GetStudentsOfInstructor, StudentsEnrolled } from "../../../api";

const Students = () => {
  const headerCellStyle = {
    fontWeight: "bold",
  };
  const handleButtonClick = (rowData) => {
    window.location.href = "/communications/messages"
    console.log("Button clicked for row with data:", rowData);
  };

  const [cmbCourses, setcmbCourses] = useState([])
  const [students, setstudents] = useState([])
  const [courseCode, setcourseCode] = useState("all")


    // ---------- Select QA --------------
    const handleSelectQA = (e) =>{
      console.log(e.target.value)
      setcourseCode(e.target.value)  
    }

  // Get Courses
  useEffect(() => {
    GetCousesOfInstructror(setcmbCourses)
    console.log(cmbCourses)
  }, [cmbCourses])

  useEffect(() => {
    StudentsEnrolled(setstudents,courseCode)
  }, [courseCode])
  
  

  return (
    <div>
      <div className="d-flex justify-content-between p-2">
      <div className="row mb-2">
        <div className="col-md-5">
             <Typography variant="h4" gutterBottom>
              Student
            </Typography>
        </div>

        <div className="col-md-6">

        <FormControl fullWidth>
        <NativeSelect
        onChange={handleSelectQA}
          defaultValue={"all"}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={"all"}>All Courses</option>
          {cmbCourses.length > 0 && cmbCourses.map((course) => (
            <option value={course.code}>{course.title}</option>
          ))}
        </NativeSelect>
      </FormControl>

        </div>

      </div>
        {/* <div className="btn btn-danger">
         <AddIcon /> Invite Students
        </div> */}
      </div>

      <MaterialTable
        title="Student List"
        columns={[
          {
            title: "Student Name",
            field: "studentName",
            headerStyle: headerCellStyle,
          },
          {
            title: "Enrolled",
            field: "enrolledDate",
            headerStyle: headerCellStyle,
          },
          {
            title: "Last Visited",
            field: "lastVisited",
            headerStyle: headerCellStyle,
          },
          {
            title: "Progress (%)",
            field: "progress",
            headerStyle: headerCellStyle,
          },
          {
            title: "Questions Asked",
            field: "questionAskedCount",
            headerStyle: headerCellStyle,
          },
          {
            title: "Questions Answered",
            field: "questionsAnsweredCount",
            headerStyle: headerCellStyle,
          }
          ,
          {
            title: "Message",
            field: "messageButton",
            render: (rowData) => (
              <button
                className="btn btn-success"
                onClick={() => {
                  // handleButtonClick(rowData)

                  window.location.href = "/communications/messages"
                }}
              >
                <ForumIcon />
              </button>
            ),
            headerStyle: headerCellStyle,
          },
        ]}
        data={students}
        options={{
          sorting: true,
          exportButton: true,
        }}
      />

      {/* <Card className="mt-5">
        <Map />
      </Card> */}
      {/* <div className="container">
        <div className="row">
          <div className="col-6">
            <Card className="mt-5">
              <div className="bg-danger text-light p-2 mb-1">
                <LanguageIcon />
                Countries
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-8">
                    <p>United State</p>
                    <p>Canada</p>
                    <p>United Kingdom</p>
                    <p>Australia</p>
                    <p>Germany</p>
                    <p>France</p>
                    <p>Japan</p>
                    <p>China</p>
                  </div>
                  <div className="col-4">
                    {" "}
                    <p>45%</p>
                    <p>65%</p>
                    <p>23%</p>
                    <p>66%</p>
                    <p>97%</p>
                    <p>99%</p>
                    <p>22%</p>
                    <p>65%</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-6">
            <Card className="mt-5">
              <div className="bg-danger text-light p-2 mb-1">
                <TranslateIcon />
                Languages
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-8">
                    <p>English</p>
                    <p>Mandarin</p>
                    <p>Chinese</p>
                    <p>Spanish</p>
                    <p>Hindi</p>
                    <p>Arabic</p>
                    <p>French</p>
                    <p>Russian</p>
                  </div>
                  <div className="col-4">
                    {" "}
                    <p>45%</p>
                    <p>65%</p>
                    <p>23%</p>
                    <p>66%</p>
                    <p>97%</p>
                    <p>99%</p>
                    <p>22%</p>
                    <p>65%</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Students;
