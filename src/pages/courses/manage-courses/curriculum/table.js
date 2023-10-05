import React, { useState } from "react";
import { Card, Typography, Button } from "@mui/material";

const Curriculum = () => {
    const [showContent, setShowContent] = useState(false);

    const toggleContent = () => {
        setShowContent(!showContent);
    };

    return ( <
        div className = "col-md-8" >
        <
        Card className = "py-2 my-2" >
        <
        Typography className = "p-3"
        variant = "h4"
        style = {
            { display: "flex", justifyContent: "space-between" } } >
        <
        span > Curriculum < /span> <Button> Bulk Uploader </Button > { " " } <
        /Typography>{" "} <
        hr / >
        <
        div className = "row" >
        <
        h6 className = "mb-3" >
        Start putting together your course by creating sections, lectures,
        and practice(quizzes, coding exercises, and assignments).Start putting together your course by creating sections, lectures, and practice activities(quizzes, coding exercises, and assignments).Use your course outline to structure your content and label your sections and lectures clearly.If you 're intending to offer your
        course
        for free, the total length of video content must be less than 2 hours. { " " } <
        /h6>{" "} <
        Button onClick = { toggleContent }
        className = "col-2 mb-3" > { " " } +
        { " " } <
        /Button>{" "} {
            showContent && ( <
                div className = "bgc mb-3" >
                <
                span >
                Section 1: < span > Introduction < /span>{" "} <
                /span>{" "} <
                div className = "d-flex justify-content-between align-items-center bgc mb-3 mt-3" >
                <
                span >
                Lecture 1: < span > Introduction < /span>{" "} <
                /span>{" "} <
                Button > +Content < /Button>{" "} <
                /div>{" "} <
                Button > Curriculum Item < /Button>{" "} <
                /div>
            )
        } { " " } <
        Button className = "col-2 mt-3" > +Section < /Button>{" "} <
        /div>{" "} <
        /Card>{" "} <
        /div>
    );
};

export default Curriculum;