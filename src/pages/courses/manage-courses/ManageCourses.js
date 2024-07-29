import React, { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Persona from "persona";
import { Space, Typography } from "antd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SettingsIcon from "@mui/icons-material/Settings";
import "./ManageCourses.css";
import { Layout, Menu, Col, Row, Card, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";

import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LayersIcon from "@mui/icons-material/Layers";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ForumIcon from "@mui/icons-material/Forum";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import LoadingOverlay from "react-loading-overlay";

import IntendedLearners from "./intended-learners/IntendedLearners";
import Curriculum from "./curriculum/Curriculum";
import Basics from "./basics/Basics";
import Pricing from "./pricing/Pricing";
import CourseMessages from "./messages/courseMessages";
import Promotion from "./promotions/Promotion";
import Settings from "./settings/Settings";
import AddCoupon from "./promotions/AddCoupon";
import {
  InstructorVerify,
  GetCourseTitle,
  OwnThisContent,
  RequestSubmitReview,
  CheckInstructorVerify,
  ChangeInstructorVerify,
  CheckOwnershipOfContent,
  checkCourseCompletionStatus,
  GetCheckPricingAllStatus,
} from "../../../api";
import ErrorAlert from "../../../commonFunctions/Alerts/ErrorAlert";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;
const { Text, Link, Title } = Typography;

const headerStyle = {
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "normal",
  backgroundColor: "#000",
};

const ManageCourses = () => {
  // course code
  let { code } = useParams();

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectTab, setselectTab] = useState(window.history.state);
  const location = useLocation();

  const [show, setShow] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const [title_loading, settitle_loading] = useState(true);

  const [course_title, setcourse_title] = useState("");
  const [status_type, setstatus_type] = useState("");
  const [courseVideoLength, setcourseVideoLength] = useState(0);

  const [checkInstructorVerification, setcheckInstructorVerification] =
    useState(null);
  const [btn_loading, setbtn_loading] = useState(false);

  // ================= STATUS ==========================

  const [IntendedLearnersCheck, setIntendedLearnersCheck] = useState(false);
  const [SyllabusCheck, setSyllabusCheck] = useState(false);
  const [PricingCheck, setPricingCheck] = useState(false);
  const [CourseMessagesCheck, setCourseMessagesCheck] = useState(false);
  const [PromotionsCheck, setPromotionsCheck] = useState(false);
  const [CourseLandingPageCheck, setCourseLandingPageCheck] = useState(false);

  // ================= STATUS ==========================

  const [courseOwnership, setcourseOwnership] = useState(0);
  const [checkOnwership, setcheckOnwership] = useState(false);
  // -------- PERSONA ---------------
  const [options, setOptions] = useState({
    templateId: "itmpl_Sk2RjhY2ZzsfQd7Q3UMCCFfk",
  });

  // tmpl_JAZjHuAT738Q63BdgCuEJQre

  const [flowType, setFlowType] = useState("embedded");

  const embeddedClientRef = useRef(null);

  // ==================== INSTRUCTOR =================
  const [checkPricingStatus, setcheckPricingStatus] = useState(false);

  const handleClose = () => setShow(false);

  // SUBMIT FOR REVIEW
  const handleShow = () => {
    setbtn_loading(true);

    //  == Fill the Section ===
    if (IntendedLearnersCheck == false) {
      ErrorAlert("Empty section", "Please Complete Intended Learners");
      setbtn_loading(false);
      return;
    }

    if (SyllabusCheck == false) {
      ErrorAlert("Empty section", "Please Complete Syllabus Section");
      setbtn_loading(false);
      return;
    }

    if (CourseLandingPageCheck == false) {
      ErrorAlert(
        "Empty section",
        "Please Complete Course Landing Page Section"
      );
      setbtn_loading(false);
      return;
    }

    if (PricingCheck == false) {
      ErrorAlert("Empty section", "Please Complete Pricing Section");
      setbtn_loading(false);
      return;
    }

    if (CourseMessagesCheck == false) {
      ErrorAlert("Empty section", "Please Complete Course Message Section");

      setbtn_loading(false);
      return;
    }

    //  == Fill the Section ===

    // === Check if the Intructor details are filled =====

    if (checkPricingStatus == false) {
      // ErrorAlert("Error","Please fill instructor details and payment details")
      Swal.fire({
        title: "<strong>Information Required!</strong>",
        icon: "info",
        html: `
        Please visit your profile page and fill the profile details, accept the instructor terms and complete the payout details if this is a paid course.
        `,
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: `
          <a  style="color:white" href="/profile?code=${code}"><b>Go to My Profile</b></a>
        `,
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: `
          <i class="fa fa-thumbs-down"></i>
        `,
        cancelButtonAriaLabel: "Thumbs down",
      });
      setbtn_loading(false);
      return;
    }

    // === Check if the Intructor details are filled =====

    // If the Instructor is Verfied
    // ========= Content Ownership ======
    // Get Content Ownership
    if (courseOwnership == 0) {
      setShow(true);
      setbtn_loading(false);
      return;
    }
    // ========= Content Ownership ======

    if (checkInstructorVerification == 0) {
      // PERSONA
      const client = new Persona.Client({
        ...options,
        environment: "sandbox",
        onLoad: (error) => {
          if (error) {
            setbtn_loading(false);
            console.error(
              `Failed with code: ${error.code} and message ${error.message}`
            );
          }

          client.open();
        },
        onStart: (inquiryId) => {
          console.log(`Started inquiry ${inquiryId}`);
        },
        onComplete: (inquiryId) => {
          console.log(`Sending finished inquiry ${inquiryId} to backend`);
          setbtn_loading(false);

          // Verify Instructor
          ChangeInstructorVerify(code);

          // ========= Content Ownership ======
          // Get Content Ownership
          // if(courseOwnership == 0){
          //   setShow(true)
          //   setbtn_loading(false)
          //   return
          // }
          // ========= Content Ownership ======

          // Send to Request
          RequestSubmitReview(code, setbtn_loading);

          fetch(`/server-handler?inquiry-id=${inquiryId}`);
        },
        onEvent: (name, meta) => {
          switch (name) {
            case "start":
              console.log(`Received event: start`);
              break;
            default:
              console.log(
                `Received event: ${name} with meta: ${JSON.stringify(meta)}`
              );
              setbtn_loading(false);
          }
        },
      });
      embeddedClientRef.current = client;

      window.exit = (force) =>
        client ? client.exit(force) : alert("Initialize client first");
      return;
    }

    // Send to Request
    RequestSubmitReview(code, setbtn_loading);
  };

  // Content Ownership - Accept
  const handleShowVerification = () => {
    if (checkOnwership == 0 || checkOnwership == false) {
      ErrorAlert("Unchecked Ownership", "Please Accept the Content Ownership");
      return;
    }

    // Send Ownersship
    OwnThisContent(
      code,
      setbtn_loading,
      setcheckOnwership,
      setShow,
      checkInstructorVerification,
      options,
      embeddedClientRef
    );
  };

  // console.log(InstructorVerify())
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);

    if (index == "intended-learners") {
      setselectTab("intended-learners");
      setSelectedIndex(0);
      window.history.pushState(
        "intended-learners",
        "Manage Course",
        `#intended-learners`
      );
    } else if (index == "syllabus") {
      setselectTab("syllabus");
      setSelectedIndex(1);
      window.history.pushState("syllabus", "Manage Course", `#syllabus`);
    } else if (index == "course-landing-page") {
      setselectTab("course-landing-page");
      setSelectedIndex(2);
      window.history.pushState(
        "course-landing-page",
        "Manage Course",
        `#course-landing-page`
      );
    } else if (index == "pricing") {
      setselectTab("pricing");
      setSelectedIndex(3);
      window.history.pushState("pricing", "Manage Course", `#pricing`);
    } else if (index == "course-messages") {
      setselectTab("course-messages");
      setSelectedIndex(4);
      window.history.pushState(
        "course-messages",
        "Manage Course",
        `#course-messages`
      );
    } else if (index == "promotions") {
      setselectTab("promotions");
      setSelectedIndex(5);
      window.history.pushState("promotions", "Manage Course", `#promotions`);
    } else if (index == "settings") {
      setselectTab("settings");
      setSelectedIndex(6);
      window.history.pushState("settings", "Manage Course", `#settings`);
    } else {
      setselectTab("intended-learners");
      setSelectedIndex(0);
      window.history.pushState(
        "intended-learners",
        "Manage Course",
        `#intended-learners`
      );
    }
  };

  React.useEffect(() => {
    setselectTab(window.history.state);

    if (
      window.location.href
        .replace(window.location.pathname, "")
        .replace(/.*#/, "") == "intended-learners"
    ) {
      setSelectedIndex(0);
    } else if (
      window.location.href
        .replace(window.location.pathname, "")
        .replace(/.*#/, "") == "syllabus"
    ) {
      setSelectedIndex(1);
    } else if (
      window.location.href
        .replace(window.location.pathname, "")
        .replace(/.*#/, "") == "course-landing-page"
    ) {
      setSelectedIndex(2);
    } else if (
      window.location.href
        .replace(window.location.pathname, "")
        .replace(/.*#/, "") == "pricing"
    ) {
      setSelectedIndex(3);
    } else if (
      window.location.href
        .replace(window.location.pathname, "")
        .replace(/.*#/, "") == "course-messages"
    ) {
      setSelectedIndex(4);
    } else if (
      window.location.href
        .replace(window.location.pathname, "")
        .replace(/.*#/, "") == "promotions"
    ) {
      setSelectedIndex(5);
    } else if (
      window.location.href
        .replace(window.location.pathname, "")
        .replace(/.*#/, "") == "settings"
    ) {
      setSelectedIndex(6);
    } else {
      setSelectedIndex(0);
    }

    if (window.history.state == null) {
      setselectTab(
        window.location.href
          .replace(window.location.pathname, "")
          .replace(/.*#/, "")
      );

      if (
        window.location.href
          .replace(window.location.pathname, "")
          .replace(/.*#/, "") == "intended-learners"
      ) {
        setSelectedIndex(0);
      } else if (
        window.location.href
          .replace(window.location.pathname, "")
          .replace(/.*#/, "") == "syllabus"
      ) {
        setSelectedIndex(1);
      } else if (
        window.location.href
          .replace(window.location.pathname, "")
          .replace(/.*#/, "") == "course-landing-page"
      ) {
        setSelectedIndex(2);
      } else if (
        window.location.href
          .replace(window.location.pathname, "")
          .replace(/.*#/, "") == "pricing"
      ) {
        setSelectedIndex(3);
      } else if (
        window.location.href
          .replace(window.location.pathname, "")
          .replace(/.*#/, "") == "course-messages"
      ) {
        setSelectedIndex(4);
      } else if (
        window.location.href
          .replace(window.location.pathname, "")
          .replace(/.*#/, "") == "promotions"
      ) {
        setSelectedIndex(5);
      } else if (
        window.location.href
          .replace(window.location.pathname, "")
          .replace(/.*#/, "") == "settings"
      ) {
        setSelectedIndex(6);
      } else {
        setSelectedIndex(0);
      }
    }

    if (!window.location.href.includes("#")) {
      setselectTab("intended-learners");
      setSelectedIndex(0);
      window.history.pushState(
        "intended-learners",
        "Manage Course",
        `#intended-learners`
      );
    }

    // console.log(code)

    // GetCourseTitle(code,setcourse_title,setstatus_type,setcourseVideoLength,settitle_loading)
  }, [window.history.state]);

  useEffect(() => {
    CheckInstructorVerify(code, setcheckInstructorVerification);
    CheckOwnershipOfContent(code, setcourseOwnership);
    // console.log(checkInstructorVerification)
    // console.log(courseOwnership)

    GetCheckPricingAllStatus(setcheckPricingStatus);
  }, [code, checkInstructorVerification, options, courseOwnership]);

  useEffect(() => {
    setInterval(() => {
      checkCourseCompletionStatus(
        code,
        setIntendedLearnersCheck,
        setSyllabusCheck,
        setPricingCheck,
        setCourseMessagesCheck,
        setPromotionsCheck,
        setCourseLandingPageCheck
      );

      GetCourseTitle(
        code,
        setcourse_title,
        setstatus_type,
        setcourseVideoLength,
        settitle_loading
      );
    }, 3000);
  }, [code]);

  return (
    <Layout>
      <Header
        style={{
          color: "#fff",
          height: 64,
          paddingInline: 50,
          lineHeight: "normal",
          backgroundColor: "#000",
        }}    
      >
        <div className="d-flex justify-content-between">
          <Space size={30}>
            <a className="link-back" href="/courses">
              <ArrowBackIosIcon fontSize="small" /> Back to Courses
            </a>
            {title_loading ? (
              <Spinner size="sm" animation="border" variant="light" />
            ) : (
              <>
                <span className="course-title">{course_title}</span>
                <span className="course-title-status">{status_type}</span>
              </>
            )}
          </Space>

          <Space size={10}>
            <span className="course-subtitle">
              {(courseVideoLength / 60).toFixed(2)} min of video content
              uploaded
            </span>
          </Space>
        </div>
      </Header>

      {/* Content */}

      <Row>
        <div className="col-md-2 p-4">
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) =>
                handleListItemClick(event, "intended-learners")
              }
            >
              <ListItemIcon>
                <LocalLibraryIcon />
              </ListItemIcon>
              <ListItemText primary="Target Audience" />

              {IntendedLearnersCheck ? (
                <CheckCircleOutlineIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
            </ListItemButton>

            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, "syllabus")}
            >
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary="Syllabus" />

              {SyllabusCheck ? (
                <CheckCircleOutlineIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
            </ListItemButton>

            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) =>
                handleListItemClick(event, "course-landing-page")
              }
            >
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Course Landing Page" />

              {CourseLandingPageCheck ? (
                <CheckCircleOutlineIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
            </ListItemButton>

            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, "pricing")}
            >
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Pricing" />

              {PricingCheck ? (
                <CheckCircleOutlineIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
            </ListItemButton>

            <ListItemButton
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, "course-messages")}
            >
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText primary="Courses Messages" />

              {CourseMessagesCheck ? (
                <CheckCircleOutlineIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
            </ListItemButton>

            <ListItemButton
              selected={selectedIndex === 5}
              onClick={(event) => handleListItemClick(event, "promotions")}
            >
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <ListItemText primary="Promotions" />

              {PromotionsCheck ? (
                <CheckCircleOutlineIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
            </ListItemButton>

            <ListItemButton
              selected={selectedIndex === 6}
              onClick={(event) => handleListItemClick(event, "settings")}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>

            <ListItemText style={ {textAlign: "center"}}>
              {btn_loading ? (
                <Button className="mx-4 w-75 my-3 py-2" variant="contained">
                  <Spinner size="sm" animation="border" variant="light" />{" "}
                </Button>
              ) : (
                <Button
                  onClick={handleShow}
                  className="mx-4 w-75 my-3"
                  variant="contained"
                >
                  Submit For Review
                </Button>
              )}
            </ListItemText>
          </List>
        </div>

        {/* HERE */}
        {/*  */}
        {selectTab == "intended-learners" ? (
          <IntendedLearners code={code} />
        ) : selectTab == "syllabus" ? (
          <Curriculum code={code} />
        ) : selectTab == "course-landing-page" ? (
          <Basics code={code} />
        ) : selectTab == "pricing" ? (
          <Pricing code={code} />
        ) : selectTab == "course-messages" ? (
          <CourseMessages code={code} />
        ) : selectTab == "promotions" ? (
          <Promotion code={code} />
        ) : selectTab == "settings" ? (
          <Settings code={code} />
        ) : selectTab == "add-coupon" ? (
          <AddCoupon code={code} />
        ) : (
          ""
        )}
      </Row>

      {/* Content Copyrights */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Content Ownership</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="my-4">
            <b>Confirm your ownership rights to the course content.</b>
          </h6>

          <div className="form-check my-3">
            <Checkbox
              checked={checkOnwership}
              onChange={(e) => setcheckOnwership(e.target.checked)}
              className="form-check-input"
              defaultChecked
              size="small"
            />
            <label className="form-check-label mx-1">
              <p>
                <b>
                  I created most or all of the content of this course, and I
                  have properly secured all of the rights necessary to publish
                  all of the content of this course on Aethenos.
                </b>
              </p>
            </label>
          </div>

          <div className="d-flex justify-content-end">
            <Button
              onClick={handleShowVerification}
              className="my-4"
              variant="contained"
            >
              Accept
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default ManageCourses;
