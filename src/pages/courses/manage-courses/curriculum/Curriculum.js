import React, { useState } from "react";
import { Card, Typography, Button } from "@mui/material";
import "./curriculum.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Dropdown from "react-bootstrap/Dropdown";

const Curriculum = () => {
        const [showSection, setShowSection] = useState(false);

        const toggleSection = () => {
            setShowSection(!showSection);
        };

        return ( <
                div className = "col-md-8" >
                <
                Card className = "py-2 my-2" >
                <
                Typography className = "p-4"
                variant = "h4"
                style = {
                    { display: "flex", justifyContent: "space-between" }
                } >
                <
                span > Curriculum < /span> <Button> Bulk Uploader </Button > { " " } <
                /Typography>{" "} <
                hr / >
                <
                div className = "row col-10 offset-1" >
                <
                h6 className = "mb-3 p-3" >
                Start putting together your course by creating sections, lectures,
                and practice(quizzes, coding exercises, and assignments).Start putting together your course by creating sections, lectures, and practice activities(quizzes, coding exercises, and assignments).Use your course outline to structure your content and label your sections and lectures clearly.If you 're intending to offer your
                course
                for free, the total length of video content must be less than 2 hours. { " " } <
                /h6>{" "} <
                Button className = "col-2 mb-3"
                onClick = { toggleSection } > { " " } + { " " } <
                /Button>{" "} {
                showSection && ( <
                    div className = "bgc mb-3 flex-column" >
                    <
                    div className = "d-flex" >
                    <
                    span className = "fw-bold mt-4"
                    style = {
                        { marginRight: "10px" }
                    } > { " " }
                    New Section: { " " } <
                    /span>{" "} <
                    textarea className = "col-10 tex1 mt-4"
                    rows = "" / >
                    <
                    /div>{" "} <
                    div >
                    <
                    span className = "fw-bold" > { " " }
                    What will students be able to do at the end of this section ? { " " } <
                        /span>{" "} <
                    textarea className = "col-10 tex1"
                    rows = "" / >
                    <
                    /div>{" "} <
                    div className = "text-end" >
                    <
                    Button > Cancel < /Button> <Button> Add Section </Button > { " " } <
                    /div>{" "} < /
                    div >
                )
            } { " " } <
            div className = "bgc mb-3" >
            <
            span className = "fw-bold" > { " " }
        Section 1: < span > Introduction < /span>{" "} < /
        span > { " " } <
            div className = "d-flex justify-content-between align-items-center bgc mb-3 mt-3" >
            <
            span > { " " }
        Lecture 1: < span > Introduction < /span>{" "} < /
        span > { " " } <
            Button className = "text-end" > +Content < /Button>{" "} <
        Dropdown >
            <
            Dropdown.Toggle variant = "success"
        id = "dropdown-basic" > { " " } <
            /Dropdown.Toggle>{" "} <
        Dropdown.Menu >
            <
            Dropdown.Item href = "#/action-1" > { " " } +
            Discription { " " } <
            /Dropdown.Item>{" "} <
        Dropdown.Item href = "#/action-2" > { " " } +
            Resources { " " } <
            /Dropdown.Item>{" "} < /
        Dropdown.Menu > { " " } <
            /Dropdown>{" "} < /
        div > { " " } <
            Button > Curriculum Item < /Button>{" "} < /
        div > { " " } <
            Button className = "col-2 mt-3" > +Section < /Button>{" "} {
            /* {showSection && (
                                                                                                                            <div className="bgc mb-3 flex-column">
                                                                                                                              <div className="d-flex">
                                                                                                                                <span className="fw-bold" style={{ marginRight: "10px" }}>
                                                                                                                                  {" "}
                                                                                                                                  New Section:{" "}
                                                                                                                                </span>{" "}
                                                                                                                                <textarea className="col-11 tex1" rows="" />
                                                                                                                              </div>{" "}
                                                                                                                              <div>
                                                                                                                                <span className="fw-bold">
                                                                                                                                  {" "}
                                                                                                                                  What will students be able to do at the end of this section ?{" "}
                                                                                                                                </span>{" "}
                                                                                                                                <textarea className="col-10 tex1" rows="" />
                                                                                                                              </div>{" "}
                                                                                                                              <div className="text-end">
                                                                                                                                <Button> Cancel </Button> <Button> Add Section </Button>{" "}
                                                                                                                              </div>{" "}
                                                                                                                            </div>
                                                                                                                          )}{" "} */
    } { " " } <
    /div>{" "} < /
Card > { " " } <
    /div>
);
};

export default Curriculum;