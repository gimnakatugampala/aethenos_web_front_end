import React from "react";
import { Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircleRounded";

const Reviews = () => {
  const handleRate = (rating) => {
    // Handle rating logic here (e.g., send it to the server).
    console.log(`Rated with ${rating} stars`);
  };

  return (
    <div>
      <div className="contariner">
        <div className="row">
          <p className="fs-5 font-bold">Review</p>
          <div className="col-3 bg-white pt-4 mt-0">
            <div className="combo-box mb-4">
              <select className="form-select">
                <option value="option1">All Courses</option>
                <option value="option2">Course 1</option>
                <option value="option3">Course 2</option>
                <option value="option4">Course 3</option>
                <option value="option5">Course 4</option>
              </select>
            </div>
            <div>
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
            <button
              type="button"
              class="btn btn-outline-success btn-block"
              style={{ width: "100%" }}
            >
              Export to CSV...
            </button>
          </div>

          <div className="col-9">
            <div className="card p-2">
              <div className="row p-3 ml-5 mr-5">
                <div className="col-3">
                  <img
                    src="https://media.istockphoto.com/id/1366428092/photo/webinar-e-learning-skills-business-internet-technology-concepts-training-webinar-e-learning.webp?b=1&s=170667a&w=0&k=20&c=qjK4h0qt4W_NNG8TmboGw8RDRv8TNzEoFM_JEDZ1Ah0="
                    className="card-img"
                    alt="Sample"
                  />
                </div>
                <div className="col-6">
                  <div className="card-body">
                    <h5 className="card-title">Course Name</h5>
                    <p className="card-text">4.55 Course Rating</p>
                  </div>
                </div>
                <div className="col-3 mt-3 mr-4">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-block"
                    style={{ width: "100%" }}
                  >
                    View Summery
                  </button>
                </div>
              </div>
            </div>

            <Card className="p-5">
              <Card.Body>
                <div className="row  ml-5 mr-5">
                  <div className="col-2">
                    <img
                      src="https://media.istockphoto.com/id/1366428092/photo/webinar-e-learning-skills-business-internet-technology-concepts-training-webinar-e-learning.webp?b=1&s=170667a&w=0&k=20&c=qjK4h0qt4W_NNG8TmboGw8RDRv8TNzEoFM_JEDZ1Ah0="
                      className="mr-3 rounded-circle"
                      style={{ maxWidth: "100px" }}
                      alt="Sample"
                    />
                  </div>
                  <div className="col-9">
                    <div className="card-body">
                      <h5 className="card-title fs-4 text-primary">
                        John Karter
                      </h5>
                      <p className="card-text">Updated 6 hours ago</p>
                    </div>
                  </div>
                  <div className="col-1">
                    <i
                      className="fa fa-flag fa-2x fs-6"
                      style={{ color: "black" }}
                    ></i>
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
                  <div className="col-1">
                    <AddCircleIcon
                      style={{ color: "green", cursor: "pointer" }}
                    />
                  </div>
                  <div className="col-3">Clear Explaination</div>
                  <div className="col-1">
                    <AddCircleIcon
                      style={{ color: "green", cursor: "pointer" }}
                    />
                  </div>
                  <div className="col-3">Engaging Delivery</div>
                  <div className="col-1">
                    <RemoveCircleIcon
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </div>
                  <div className="col-3">Valubal Infomation</div>
                </div>
                <div className="row mt-2  ml-5 mr-5">
                  <div className="col-1">
                    <AddCircleIcon
                      style={{ color: "green", cursor: "pointer" }}
                    />
                  </div>
                  <div className="col-3">Helpful Practice Activities</div>
                  <div className="col-1">
                    <AddCircleIcon
                      style={{ color: "green", cursor: "pointer" }}
                    />
                  </div>
                  <div className="col-3">Accurate Course Description</div>
                  <div className="col-1">
                    <AddCircleIcon
                      style={{ color: "green", cursor: "pointer" }}
                    />
                  </div>
                  <div className="col-3">Knowledgable Instruction</div>
                </div>
                <div className="pl-5">
                  <button
                    type="button"
                    className="btn btn-outline-success btn-block ml-5"
                    style={{ width: "20%" }}
                  >
                    Respond
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Reviews;
