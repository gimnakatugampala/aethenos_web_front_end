import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import { Select } from "antd";
import { Input, Space, Badge, Image, Col, Divider, Row } from "antd";
import { Card } from "antd";
import { Button, Progress } from "antd";
import Modal from "react-bootstrap/Modal";
import CourseItem from "../../../components/course-item/CourseItem";
import Colors from "../../../commonFunctions/Colors";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { GetAllCourses, VideoStreaming } from "../../../api";
import MainLoader from "../../../commonFunctions/loaders/MainLoader/MainLoader";
import Spinner from "react-bootstrap/Spinner";
import "./AllCourses.css";
import LoadingSpinner from "../../../commonFunctions/loaders/Spinner/LoadingSpinner";
const { Search } = Input;

const AllCourses = () => {
  const [courses, setcourses] = useState([]);

  useEffect(() => {
    GetAllCourses(setcourses);

    
  }, []);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log(value);

    if (value == "") {
      GetAllCourses(setcourses);
    }

    setcourses(
      courses.filter((courseData) => {
        const courseTitle = courseData.course.courseTitle.toLowerCase();
        return courseTitle.includes(value.toLowerCase());
      })
    );
  };

  return (
    <div className="all-courses-container">
      <div className="all-coueses-control-items ">

    
        <Search
        className="w-100 mx-4 custom-search"
          placeholder="Search Courses"
          onSearch={onSearch}
          enterButton
          
        />

        <Button type="primary" className="add-course" danger>
          <a className="icon-container" href="/add-courses">
            <PlusOutlined className="icon" />
            Add Course
          </a>
        </Button>
      </div>

      <div className=" my-3 main-1">
        {courses != null ? (
          courses.length > 0 ? (
            courses.map((course, key) => (
              <CourseItem
                key={key}
                course={course}
                filledPercent={course.progress}
              />
            ))
          ) : (
            <LoadingSpinner w={"40%"} h={"100%"} wpclass={"m-5"} />
          )
        ) : (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <h4>No Courses Found</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
