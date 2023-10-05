import React from "react";
import "./curriculum.css";
import { Layout, Menu, Col, Row, Card, Select } from "antd";
import { Input } from "antd";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const { TextArea } = Input;
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;
const { Text, Link, Title } = Typography;

const fileList = [
    // {
    //   uid: '0',
    //   name: 'xxx.png',
    //   status: 'uploading',
    //   percent: 33,
    // },
    {
        uid: "-1",
        name: "yyy.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        thumbUrl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
        uid: "-2",
        name: "yyy.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        thumbUrl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    // {
    //   uid: '-2',
    //   name: 'zzz.png',
    //   status: 'error',
    // },
];

const Curriculum = () => {
    const [show, setShow] = useState(false);
    const [showCurriculum, setshowCurriculum] = useState(false);
    const [showLecture, setshowLecture] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCurriculum = () => setshowCurriculum(true);
    const handleCurriculumClose = () => setshowCurriculum(false);

    const handleshowLecture = () => setshowLecture(!showLecture);
    const handleshowLectureClose = () => setshowLecture(false);


    const onDrop = (data) => {
        console.log(data);
        // => banana
    };

    return ( <
        div className = "col-md-8" >
        <
        Card className = "py-2 my-2" >
        <
        Typography className = "p-3"
        variant = "h4"
        style = {
            { display: "flex", justifyContent: "space-between" }
        } >
        <
        span > Curriculum < /span> <Button> Bulk Uploader </Button > { " " } <
        /Typography>{" "} <
        hr / >
        <
        div className = "row" >
        <
        h6 className = "mb-3" > { " " }
        Start putting together your course by creating sections, lectures and practice(quizzes, coding exercises and assignments).Start putting together your course by creating sections, lectures and practice activities(quizzes, coding exercises and assignments).Use your course outline to structure your content and label your sections and lectures clearly.If you’ re intending to offer your course
        for free, the total length of video content must be less than 2 hours. { " " } <
        /h6>{" "} <
        Button className = "col-2 mb-3" > + < /Button>{" "} <
        div className = "bgc mb-3  flex-column" >
        <
        div className = "d-flex " >
        <
        span className = "fw-bold"
        style = {
            { marginRight: "10px" }
        } > { " " }
        New Section: { " " } <
        /span>{" "} <
        TextArea className = "" / >
        <
        /div>{" "} <
        div >
        <
        span className = "fw-bold" > { " " }
        What will students be able to do at the end of this section ? { " " } <
            /span>{" "} <
        TextArea className = "col-10" / >
        <
        /div>{" "} <
        div className = "text-end" >
        <
        Button > Cancel < /Button> <
        Button > Add Section < /Button> < /
        div > <
        /div>{" "} <
        div className = "bgc mb-3" >
        <
        span className = "fw-bold" >
        Section 1: < span > Intoduction < /span>{" "} < /
        span > { " " } <
        div className = "d-flex justify-content-between align-items-center bgc mb-3 mt-3" >
        <
        span >
        Lecture 1: < span > Introduction < /span>{" "} < /
        span > { " " } <
        Button > +Content < /Button>{" "} < /
        div > { " " } <
        Button > Curriculum Item < /Button>{" "} < /
        div > { " " } <
        Button className = "col-2 mt-3" > +Section < /Button>{" "} < /
        div > { " " } <
        /Card>{" "} < /
        div >
    );
};

export default Curriculum;