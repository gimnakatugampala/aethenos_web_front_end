import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { LineChart } from "@mui/x-charts/LineChart";
import Link from "@mui/material/Link";
import MaterialTable from "material-table";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TranslateIcon from "@mui/icons-material/Translate";
import LanguageIcon from "@mui/icons-material/Language";
import AddIcon from "@mui/icons-material/Add";
import ForumIcon from "@mui/icons-material/Forum";
import FormControl from "@mui/material/FormControl";
import { Select, Space } from 'antd';
import Map from "./Map";
import Card from "@mui/material/Card";
import {
  GetCousesOfInstructror,
  GetStudentsOfInstructor,
  StudentsEnrolled,
} from "../../../api";

const Students = () => {
  const headerCellStyle = {
    fontWeight: "bold",
  };
  const handleButtonClick = (rowData) => {
    window.location.href = "/communications/messages";
    console.log("Button clicked for row with data:", rowData);
  };

  const [cmbCourses, setcmbCourses] = useState([]);
  const [students, setstudents] = useState([]);
  const [courseCode, setcourseCode] = useState("all");

  // ---------- Select QA --------------
  const handleSelectQA = (value) => {
    console.log(value);
    setcourseCode(value);
  };

  // Get Courses
  useEffect(() => {
    GetCousesOfInstructror(setcmbCourses);
  }, [cmbCourses]);
 
  useEffect(() => {
    StudentsEnrolled(setstudents, courseCode);
  }, [courseCode]);

  return (
    <div className="mb-5 all-courses-container">
      <div
        className="row mb-4 mx-2"
        style={{ justifyContent: "space-between" }}
      >
        <div className="col-md-2">
          <Typography variant="h4" gutterBottom>
            Student
          </Typography>
        </div>

        <div className="col-md-2 mt-3 mt-md-2" style={{ float: "right" }}>
          <FormControl fullWidth>
            <Select
              onChange={handleSelectQA}
              defaultValue={"all"}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
            >
              <option value={"all"}>All Courses</option>
              {cmbCourses.length > 0 &&
                cmbCourses.map((course) => (
                  <option value={course.code}>{course.title}</option>
                ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <Card className="border-rad-20">
    
       <div className="m-3">
            {/* Education Announcement */} 
            <>
        <MaterialTable
          className="border-rad-20 mx-5"
          title="Student List"
          columns={[
            {
              title: "Profile Image",
              field: "profileImgTag",
              headerStyle: headerCellStyle,
            },
            {
              title: "Student Name",
              field: "studentName",
              headerStyle: headerCellStyle,
            },
            {
              title: "Email",
              field: "email",
              headerStyle: headerCellStyle,
            },
            {
              title: "Country",
              field: "country",
              headerStyle: headerCellStyle,
            },
            {
              title: "Course Title",
              field: "courseTitle",
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
            },
            {
              title: "Message",
              field: "messageButton",
              render: (rowData) => (
                <button
                  className="btn btn-success"
                  onClick={() => {
                    // handleButtonClick(rowData)

                    window.location.href = "/communications/messages";
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
            rowStyle: {
              fontSize: 'calc(12px + 0.2vw)',  
            },
            headerStyle: {
              fontSize: 'calc(14px + 0.2vw)',
              fontWeight: 'bold',
            },
          }}
        />
    </>

    </div>

      </Card>
    </div>
  );
};

export default Students;
