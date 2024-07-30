import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircleRounded";
import {
  Link,
  MemoryRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import CommentBox from "./CommentBox";
import { GetCousesOfInstructror, GetReviewByCourse } from "../../../api";
import { FILE_PATH } from "../../../commonFunctions/FilePaths";
import { Rating } from "react-simple-star-rating";
import StarRatings from "react-star-ratings";
import moment from "moment";
import { Paper } from "@mui/material";
import { Select, Space } from 'antd';

const Reviews = () => {
  const handleRate = (rating) => {
    // Handle rating logic here (e.g., send it to the server).
    console.log(`Rated with ${rating} stars`);
  };

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [rating, setRating] = useState(0);

  const page = parseInt(query.get("page") || "1", 10);

  const [courseCode, setcourseCode] = useState("");
  const [cmbCourses, setcmbCourses] = useState([]);

  const [SelectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    GetCousesOfInstructror(setcmbCourses);
  }, [courseCode]);

  const handleSelectReviews = (value) => {
    console.log(value);
    setcourseCode(value);
    GetReviewByCourse(value, setSelectedCourse);
  };

  return (
    <div>
      <div className="all-courses-container mb-5">
        <div className="row mx-2" style={{justifyContent: "space-between"}}>
          <Typography className="mb-4" variant="h4" gutterBottom>
            Reviews
          </Typography>
        </div>
        <Card className="border-rad-20" style={{ padding: "2%" }}>
          <div className="row">
            <div
              className="col-3 bg-white pt-4 mt-0"
              // style={{ height: "1000vh" }}
            >
              <div className="combo-box mb-4">
                <Select onChange={handleSelectReviews}
                  placeholder="All Courses"
                  size='large'
                  style={{width:'100%'}}>
                  
                  {/* <option value={""}>All Courses</option> */}
                  {cmbCourses.length > 0 &&
                    cmbCourses.map((course, index) => (
                      <option key={index} value={course.code}> 
                        {course.title}
                      </option>
                    ))}
                </Select>
              </div>
            </div>

            {/* second column */}
            <div className="col-md-9">
              {/* 1st card */}
              {SelectedCourse != null ? (
                <>
                  <Card>
                    <CardContent>
                      <div className="row p-1 ml-5 mr-5">
                        <div className="col-3">
                          <img
                            src={`${FILE_PATH}${SelectedCourse.courseImg}`}
                            className="card-img"
                            alt="Sample"
                          />
                        </div>
                        <div className="col-md-9">
                          <div className="card-body">
                            <h6 className="card-title m-0 p-0">
                              {SelectedCourse.courseTitle}
                            </h6>
                            <p
                              style={{ fontSize: "13px" }}
                              className="my-2 p-0"
                            >
                              {parseFloat(SelectedCourse.rating).toFixed(2)}{" "}
                              Course Rating
                            </p>
                            <StarRatings
                              starDimension="30px"
                              rating={SelectedCourse.rating}
                              starRatedColor="rgb(255, 188, 11)"
                              numberOfStars={5}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {SelectedCourse.reviewResponses.length > 0 ? (
                    SelectedCourse.reviewResponses.map((review, index) => (
                      <Card key={index} className="p-1 my-1 mb-3">
                        <CardContent>
                          <div className="row mr-5">
                            <div className="col-9 d-flex justify-content-start">
                              <img
                                src={
                                  review.userProfile == null
                                    ? "../images/user-profile.png"
                                    : `${FILE_PATH}${SelectedCourse.courseImg}`
                                }
                                style={{
                                  width: "70px",
                                  borderRadius: 50,
                                  height: "70px",
                                  marginRight: 20,
                                }}
                                alt="Sample"
                              />
                              <div>
                                <h6 className="text-primary m-0 p-0">
                                  {review.fullName}
                                </h6>
                                <p className="m-0 p-0">
                                  {moment(review.date, "YYYYMMDD").fromNow()}
                                </p>
                                <Rating
                                  size={20}
                                  iconsCount={5}
                                  readonly
                                  initialValue={review.rating}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row  ml-5 mr-5">
                            <div className="col-md-12 p-2">
                              {review.comment}
                            </div>
                          </div>
                          <div className="pl-5">
                            <CommentBox
                              setcmbCourses={setcmbCourses}
                              replies={review.replies}
                              reviewCode={review.reviewCode}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-2">
                      <CardContent>
                        <h3>No Reviews Found</h3>
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <Paper
                  elevation={1}
                  className="p-3 d-flex justify-content-center align-items-center"
                  style={{ minHeight: "70vh", overflowY: "auto" }}
                >
                  <div className="text-center">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <h3 className="m-0">Select course to see reviews</h3>
                  </div>
                </Paper>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Reviews;
