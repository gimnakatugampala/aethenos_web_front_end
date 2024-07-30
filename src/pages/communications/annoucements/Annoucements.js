import React, { useEffect, useState } from "react";
import "./Annoucements.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Card } from "antd";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import MaterialTable from "material-table";
import Dropdown from "react-bootstrap/Dropdown";
import RichTextEditor from "../../../components/RichTextEditor";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";

import {
  AddAnnoucement,
  GetAllAnnoucement,
  GetCousesOfInstructror,
} from "../../../api";
import JoditEditor from "jodit-react";
import ErrorAlert from "../../../commonFunctions/Alerts/ErrorAlert";
import { Select, Space, Table } from "antd";

const Annoucements = () => {
  const [isComposeVisible, setComposeVisible] = useState(false);
  const [cmbCourses, setcmbCourses] = useState([]);

  const [selectedCourse, setselectedCourse] = useState("");
  const [announcementTitle, setannouncementTitle] = useState("");
  const [AnnoucementDesc, setAnnoucementDesc] = useState("");

  const [courseCode, setcourseCode] = useState("");
  const [annoucements, setannoucements] = useState([]);


  // Add Annoucement
  const handleAddAnnouncement = () => {
    console.log(announcementTitle);
    console.log(AnnoucementDesc);

    if (announcementTitle == "") {
      ErrorAlert("Empty Field", "Please Enter Annoucement Title");
      return;
    }

    if (selectedCourse == "") {
      ErrorAlert("Error", "Please Select Course");
      return;
    }

    if (AnnoucementDesc == "<p><br></p>") {
      ErrorAlert("Empty Field", "Please Enter Annoucement Description");
      return;
    }

    AddAnnoucement(
      courseCode,
      selectedCourse,
      announcementTitle,
      AnnoucementDesc,
      setComposeVisible,
      setannouncementTitle,
      setAnnoucementDesc,
      setannoucements
    );
    return;
  };

  const toggleCompose = () => {
    setComposeVisible(!isComposeVisible);
  };

  useEffect(() => {
    GetCousesOfInstructror(setcmbCourses);
    GetAllAnnoucement(courseCode, setannoucements);
  }, [courseCode]);

  // Get All Annoucements
  const handleSelectAnnoucement = (value) => {
    console.log(value);

    setcourseCode(value);
  };

  const handleSelectCourseName = (e) => {
    console.log(e.target.value);
    setselectedCourse(e.target.value);
  };

  return (
    <div className="all-courses-container  mb-5">
      <div
        className="row mb-4 mx-2"
        style={{ justifyContent: "space-between" }}
      >
        <div className="col-md-4">
          <Typography variant="h4" gutterBottom>
            Announcements
          </Typography>
        </div>

        <div className="col-md-2">
          <FormControl fullWidth>
            <Select
              onChange={handleSelectAnnoucement}
              defaultValue={""}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
            >
              <option value={""}>All courses</option>
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

      <Card>
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab
            eventKey="home"
            title={
              <div className="tab-title">
                <div>Educational announcement</div>
              </div>
            }
          >
            {/* Education Announcement */}
            <>
              <div>
                <div className="d-flex align-items-center my-3">
                  {isComposeVisible ? (
                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="float-end"
                      onClick={toggleCompose}
                    >
                      <i class="fa-solid fa-xmark"></i> Cancel
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="danger"
                      className="float-end"
                      onClick={toggleCompose}
                    >
                      <i class="fa-solid fa-plus"></i> Compose
                    </Button>
                  )}
                </div>

                {isComposeVisible && (
                  <div>
                    <div>
                      <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                          onChange={(e) => setannouncementTitle(e.target.value)}
                          type="text"
                          placeholder="Announcement and email title (55 character max)"
                        />
                      </Form.Group>

                      <div className="my-3">
                        <Form.Label>Select Course</Form.Label>
                        <Form.Select
                          onChange={handleSelectCourseName}
                          defaultValue={""}
                          aria-label="Default select example"
                        >
                          <option value={""}>All courses</option>
                          {cmbCourses.length > 0 &&
                            cmbCourses.map((course, index) => (
                              <option key={index} value={course.code}>
                                {course.title}
                              </option>
                            ))}
                        </Form.Select>
                      </div>

                      <JoditEditor onChange={(e) => setAnnoucementDesc(e)} />

                      <br></br>
                      <div className="d-flex align-items-center px-3">
                        <Button
                          onClick={handleAddAnnouncement}
                          variant="danger"
                          className="mb-3"
                        >
                          <i class="fa-regular fa-paper-plane"></i> Send
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {!isComposeVisible && (
                <p>
                  You can send educational announcements to your students here.
                  Students will get these announcements via their Aethenos
                  account dashboard.
                </p>
              )}

              <MaterialTable
                title=""
                columns={[
                  { title: "Announcement Title", field: "tittle" },
                  { title: "Announcement Content", field: "content" },
                  { title: "Created Date", field: "createdDate" },
                ]}
                data={annoucements}
                options={{
                  exportButton: true,
                }}
              />

          
            </>
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
};

export default Annoucements;
