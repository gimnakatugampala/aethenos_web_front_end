import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
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
import { Rating } from 'react-simple-star-rating'
import StarRatings from 'react-star-ratings'
import moment from 'moment'
import { Paper } from "@mui/material";



const Reviews = () => {

  const handleRate = (rating) => {
    // Handle rating logic here (e.g., send it to the server).
    console.log(`Rated with ${rating} stars`);
  };

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [rating, setRating] = useState(0)

  const page = parseInt(query.get("page") || "1", 10);

  const [courseCode, setcourseCode] = useState("")
  const [cmbCourses, setcmbCourses] = useState([])

  const [SelectedCourse, setSelectedCourse] = useState(null)



  useEffect(() => {
    GetCousesOfInstructror(setcmbCourses)
  }, [courseCode])

  const handleSelectReviews = (e) =>{
    console.log(e.target.value)
    setcourseCode(e.target.value)
    GetReviewByCourse(e.target.value,setSelectedCourse)
  }

  return (
    <div>
      <div className="contariner">
        <div className="row">
        <Typography className="mb-4" variant="h4" gutterBottom>
             Reviews
        </Typography>
          <div
            className="col-3 bg-white pt-4 mt-0"
            // style={{ height: "1000vh" }}
          >
            <div className="combo-box mb-4">
              <select onChange={handleSelectReviews} className="form-select">
              <option value={""}>All Courses</option>
              {cmbCourses.length > 0 && cmbCourses.map((course,index) => (
            <option key={index} value={course.code}>{course.title}</option>
          ))}
              </select>
            </div>

            {/* <div>
              <Form>
                <Form.Check
                  type="checkbox"
                  label="No Responsive"
                  id="checkboxId"
                />
              </Form>
            </div>
            <div>
              <Form>
                <Form.Check
                  type="checkbox"
                  label="Has a Comment"
                  id="checkboxId"
                />
              </Form>
            </div>
            <hr />
            <div>
              <Form>
                <Form.Check type="checkbox" label="1 Star" id="checkboxId" />
              </Form>
            </div>
            <div>
              <Form>
                <Form.Check type="checkbox" label="2 Star" id="checkboxId" />
              </Form>
            </div>
            <div>
              <Form>
                <Form.Check type="checkbox" label="3 Star" id="checkboxId" />
              </Form>
            </div>
            <div>
              <Form>
                <Form.Check type="checkbox" label="4 Star" id="checkboxId" />
              </Form>
            </div>
            <div>
              <Form>
                <Form.Check type="checkbox" label="5 Star" id="checkboxId" />
              </Form>
            </div>
            <hr />
            Sort By:
            <div className="combo-box">
              <select className="form-select">
                <option value="newestToOldest">Newest to Oldest</option>
                <option value="oldestToNewest">Oldest to Newest</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="ratingHighToLow">Rating: High to Low</option>
              </select>
            </div>
            <hr />
            
            <Button variant="contained" color="success">
            <i class="fa-solid fa-download mx-3"></i>    Export to CSV...
            </Button> */}

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
                      <h6 className="card-title m-0 p-0">{SelectedCourse.courseTitle}</h6>
                      <p style={{fontSize:'13px'}} className="my-2 p-0">{parseFloat(SelectedCourse.rating).toFixed(2)} Course Rating</p>
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
                SelectedCourse.reviewResponses.map((review,index) =>(
                <Card key={index} className="p-1 my-1 mb-3">
                <CardContent>
                  <div className="row mr-5">
                    <div className="col-9 d-flex justify-content-start">
                      <img
                        src={review.userProfile == null ? "../images/user-profile.png" : `${FILE_PATH}${SelectedCourse.courseImg}`}
                        style={{ width: "70px" ,borderRadius:50,height:'70px',marginRight:20}}
                        alt="Sample"
                      />
                    <div>
                        <h6 className="text-primary m-0 p-0">
                          {review.fullName}
                        </h6>
                        <p className="m-0 p-0">{moment(review.date, "YYYYMMDD").fromNow()}</p>
                      <Rating size={20} iconsCount={5} readonly initialValue={review.rating} />
                    </div>
                    </div>
                  </div>
                  <div className="row  ml-5 mr-5">
                
                  
                <div className="col-md-12 p-2">
                  {review.comment}
                </div>
            
                  </div>
                  <div className="pl-5">
                    <CommentBox setcmbCourses={setcmbCourses} replies={review.replies} reviewCode={review.reviewCode} />
                  </div>
                </CardContent>
              </Card>
                ))
              ) : 
              <Card className="p-2">
              <CardContent>
                <h3>No Reviews Found</h3>
              </CardContent>
              </Card>}
              </>
              ) : (
              <Paper elevation={1} className="p-3 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh", overflowY: "auto" }}>
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

           
            
            {/* <Card className="p-5 my-1 mb-3">
              <CardContent>
                <div className="row mr-5">
                  <div className="col-9 d-flex justify-content-start">
                    <img
                      src="https://media.istockphoto.com/id/1366428092/photo/webinar-e-learning-skills-business-internet-technology-concepts-training-webinar-e-learning.webp?b=1&s=170667a&w=0&k=20&c=qjK4h0qt4W_NNG8TmboGw8RDRv8TNzEoFM_JEDZ1Ah0="
                      
                      style={{ width: "70px" ,borderRadius:50,height:'70px',marginRight:20}}
                      alt="Sample"
                    />
                  <div>
                      <h6 className="text-primary m-0 p-0">
                        John Karter
                      </h6>
                      <p className="m-0 p-0">Updated 6 hours ago</p>
                  </div>
                  </div>
                </div>
                <div className="rating p-3">
                  <span className="star" onClick={() => handleRate(1)}>
                    <i className="fa fa-star" style={{ color: "yellow" }}></i>
                  </span>
                  <span className="star" onClick={() => handleRate(2)}>
                    <i className="fa fa-star" style={{ color: "yellow" }}></i>
                  </span>
                  <span className="star" onClick={() => handleRate(3)}>
                    <i className="fa fa-star" style={{ color: "yellow" }}></i>
                  </span>
                  <span className="star" onClick={() => handleRate(4)}>
                    <i className="fa fa-star" style={{ color: "yellow" }}></i>
                  </span>
                  <span className="star" onClick={() => handleRate(5)}>
                    <i className="fa fa-star" style={{ color: "yellow" }}></i>
                  </span>
                </div>
                <div className="row  ml-5 mr-5">
              
                
               <div className="col-md-12">
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
               </div>
          
                </div>
                <div className="pl-5">
                  <CommentBox />
                </div>
              </CardContent>
            </Card> */}

            {/* <div className="container">
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  <Pagination
                    page={page}
                    count={10}
                    renderItem={(item) => (
                      <PaginationItem
                        component={Link}
                        to={`/inbox${
                          item.page === 1 ? "" : `?page=${item.page}`
                        }`}
                        {...item}
                      />
                    )}
                  />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reviews;
