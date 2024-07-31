import React, { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { CardContent } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Form from "react-bootstrap/Form";
import RichTextEditor from "../../../../components/RichTextEditor";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import JoditEditor from "jodit-react";
import DnsIcon from "@mui/icons-material/Dns";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { updateSectionData } from "../../../../api";

import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import HelpIcon from "@mui/icons-material/Help";
import ArticleIcon from "@mui/icons-material/Article";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import {
  AddCurriculumArticle,
  AddCurriculumDescription,
  AddCurriculumDownloadable,
  AddCurriculumExternalResourses,
  AddCurriculumQnAQuiz,
  AddCurriculumQuiz,
  AddCurriculumSection,
  AddCurriculumSourceCode,
  AddCurriculumVideo,
  AddLectureTitle,
  AssignmentDelete,
  AssignmentSave,
  CodingExerciseDelete,
  CodingExerciseSave,
  DeleteResourcesFile,
  ExternalResoucesDelete,
  GetCurriculum,
  LectureDelete,
  PracticeTestDelete,
  PracticeTestSave,
  QuizDelete,
  SectionDelete,
  SetVideoPreviewAPI,
  UpdateAssignmentName,
  UpdateCodingExerciseName,
  UpdateLectureName,
  UpdatePraticeTestName,
  UpdateQuizName,
  UpdateSectionName,
  VideoDelete,
} from "../../../../api";
import "./curriculum.css";
import ErrorAlert from "../../../../commonFunctions/Alerts/ErrorAlert";
import removeHtmlTags from "../../../../commonFunctions/RemoveHTML";
import ListGroup from "react-bootstrap/ListGroup";
import LaunchIcon from "@mui/icons-material/Launch";
import LargeSpinner from "../../../../commonFunctions/loaders/Spinner/LoadingSpinner";
import InputGroup from "react-bootstrap/InputGroup";
import CreateIcon from "@mui/icons-material/Create";
import QuizIcon from "@mui/icons-material/Quiz";
import BugReportIcon from "@mui/icons-material/BugReport";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CodeIcon from "@mui/icons-material/Code";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Switch } from "antd";
import Badge from "react-bootstrap/Badge";

import "sweetalert2/src/sweetalert2.scss";

const syllabusIcon = {
  fontSize: "17px",
};

const Curriculum = ({ code }) => {
  console.log(code);

  let counter = 1;

  const [showContentAdd, setshowContentAdd] = useState(null);
  const [showMain, setshowMain] = useState(null);
  const [showDescRes, setshowDescRes] = useState(true);
  const [curriculumvisiblity, setcurriculumvisiblity] = useState("");
  const [curriculumvisiblitymc, setcurriculumvisiblitymc] = useState("");
  const [extracurriculum, setextracurriculum] = useState("");

  const [uploadingVideo, setUploadingVideo] = useState(null);
  const [uploadingVideoName, setuploadingVideoName] = useState("");

  const [showSectionInput, setshowSectionInput] = useState(false);

  const [question, setquestion] = useState("");

  const [answerOptionOne, setanswerOptionOne] = useState("ans1");
  const [answerOptionTwo, setanswerOptionTwo] = useState("ans2");
  const [answerOptionThree, setanswerOptionThree] = useState("ans3");
  const [answerOptionFour, setanswerOptionFour] = useState("ans4");
  const [answerOptionFive, setanswerOptionFive] = useState("ans5");
  const [answerOption, setanswerOption] = useState("");

  const [answerOne, setanswerOne] = useState("");
  const [answerTwo, setanswerTwo] = useState("");
  const [answerThree, setanswerThree] = useState("");
  const [answerFour, setanswerFour] = useState("");
  const [answerFive, setanswerFive] = useState("");

  const [answerExplainOne, setanswerExplainOne] = useState("");
  const [answerExplainTwo, setanswerExplainTwo] = useState("");
  const [answerExplainThree, setanswerExplainThree] = useState("");
  const [answerExplainFour, setanswerExplainFour] = useState("");
  const [answerExplainFive, setanswerExplainFive] = useState("");

  const [section, setsection] = useState("");
  const [lecturetitle, setlecturetitle] = useState("");

  // Section ID
  const [mainSectionID, setmainSectionID] = useState(null);
  const [btn_section_loading, setbtn_section_loading] = useState(false);
  const [showSectionEditInput, setshowSectionEditInput] = useState(null);

  // Get Section data
  const [sectionData, setsectionData] = useState([]);

  // Curriculum Item Data
  const [article, setarticle] = useState("");
  const [curriculum_desc, setcurriculum_desc] = useState("");
  const [curriclum_ex_res_tile, setcurriclum_ex_res_tile] = useState("");
  const [curriculum_ex_res_link, setcurriculum_ex_res_link] = useState("");

  const [quizTitle, setquizTitle] = useState("");
  const [quizDesc, setquizDesc] = useState("");

  const [showCurriculumItem, setshowCurriculumItem] = useState(null);

  const [showLecInput, setshowLecInput] = useState(null);
  const [showQuizInput, setshowQuizInput] = useState(null);

  const [showEditQuizInput, setshowEditQuizInput] = useState(null);

  const [showEditAssignmentInput, setshowEditAssignmentInput] = useState(null);

  const [showPracticeTestInput, setshowPracticeTestInput] = useState(null);
  const [showCodingExecInput, setshowCodingExecInput] = useState(null);
  const [showAssignmentInput, setshowAssignmentInput] = useState(null);
  const [showEditPraticeTestInput, setshowEditPraticeTestInput] =
    useState(null);
  const [showEditCodingExerciseInput, setshowEditCodingExerciseInput] =
    useState(null);

  const [showDescription, setshowDescription] = useState(null);
  const [showResources, setshowResources] = useState(null);

  const [showEditTitleInput, setshowEditTitleInput] = useState(null);
  const [updateSectionName, setupdateSectionName] = useState("");

  const [updateLectureName, setupdateLectureName] = useState("");
  const [updateQuizName, setupdateQuizName] = useState("");
  const [updateQuizDescription, setupdateQuizDescription] = useState("");
  const [updateAssignmentName, setupdateAssignmentName] = useState("");
  const [updatePraticeTestName, setupdatePraticeTestName] = useState("");
  const [updateCodingExerciseName, setupdateCodingExerciseName] = useState("");

  // ======== PRACTICE TEST ==================
  const [PraticeTestCode, setPraticeTestCode] = useState("");
  const [PracticeTestTitle, setPracticeTestTitle] = useState("");
  const [PracticeTestDesc, setPracticeTestDesc] = useState("");
  const [PracticeTestDuration, setPracticeTestDuration] = useState("");
  const [PracticeTestInstructions, setPracticeTestInstructions] = useState("");
  const [PracticeTestMinPassMark, setPracticeTestMinPassMark] = useState("");
  const [PracticeTestExLink, setPracticeTestExLink] = useState("");

  const [PracticeTestQuestionFile, setPracticeTestQuestionFile] =
    useState(null);
  const [PracticeTestQuestionExLink, setPracticeTestQuestionExLink] =
    useState("");

  const [PracticeTestSolutionsFile, setPracticeTestSolutionsFile] =
    useState(null);
  const [PraticeTestSolutionsExLink, setPraticeTestSolutionsExLink] =
    useState("");

  const [btnLoadingPracticeTest, setbtnLoadingPracticeTest] = useState(false);

  // ======== PRACTICE TEST ==================

  // ======== CODING EXEC ==================
  const [CodingExerciseCode, setCodingExerciseCode] = useState("");
  const [CodingExerciseTitle, setCodingExerciseTitle] = useState("");
  const [CodingExerciseDesc, setCodingExerciseDesc] = useState("");
  const [CodingExerciseInstructions, setCodingExerciseInstructions] =
    useState("");

  const [CodingExerciseVideo, setCodingExerciseVideo] = useState(null);
  const [CodingExerciseDResourses, setCodingExerciseDResourses] =
    useState(null);
  const [CodingExerciseExLink, setCodingExerciseExLink] = useState("");

  const [CodingExerciseUploadEx, setCodingExerciseUploadEx] = useState(null);
  const [CodingExerciseExternalLink, setCodingExerciseExternalLink] =
    useState("");
  const [CodingExerciseQVideo, setCodingExerciseQVideo] = useState(null);

  const [CodingExercisesSolutionsFile, setCodingExercisesSolutionsFile] =
    useState(null);
  const [CodingExercisesExLinkSolutions, setCodingExercisesExLinkSolutions] =
    useState("");
  const [CodingExercisesSolutionsVideo, setCodingExercisesSolutionsVideo] =
    useState(null);

  const [btnLoadingCodingExcercise, setbtnLoadingCodingExcercise] =
    useState(false);
  // ======== CODING EXEC ==================

  // ============ ASSIGNMENT =============
  const [AssignmentCode, setAssignmentCode] = useState("");
  const [AssignmentTitle, setAssignmentTitle] = useState("");
  const [AssignmentDesc, setAssignmentDesc] = useState("");
  const [AssignmentDuration, setAssignmentDuration] = useState("");
  const [AssignmentInstructors, setAssignmentInstructors] = useState("");
  const [AssignmentVideo, setAssignmentVideo] = useState(null);
  const [AssignmentDResourses, setAssignmentDResourses] = useState(null);
  const [AssignmentExLink, setAssignmentExLink] = useState("");

  const [AssignmentQuestion, setAssignmentQuestion] = useState("");
  const [AssignmentQuestionFile, setAssignmentQuestionFile] = useState(null);
  const [AssignmentQuestionLink, setAssignmentQuestionLink] = useState("");

  const [AssignmentSolutions, setAssignmentSolutions] = useState("");
  const [AssignmentSolutionsVideo, setAssignmentSolutionsVideo] =
    useState(null);
  const [AssignmentSolutionsFile, setAssignmentSolutionsFile] = useState(null);
  const [AssignmentSolutionsExLink, setAssignmentSolutionsExLink] =
    useState("");

  const [btnLoadingAssignment, setbtnLoadingAssignment] = useState(false);
  // ============ ASSIGNMENT =============

  const handleContentshow = () => setshowContentAdd(!showContentAdd);

  const showAddSectionInput = () => setshowSectionInput(!showSectionInput);

  // Add Section
  const handleSubmitSection = () => {
    console.log(section);

    setbtn_section_loading(true);

    if (section == "") {
      ErrorAlert("Empty field", "Please fill the section title");
      setbtn_section_loading(false);
      return;
    }

    AddCurriculumSection(
      code,
      section,
      setshowSectionInput,
      setsection,
      setsectionData,
      setbtn_section_loading
    );

    // setsection("")
  };

  // Show Curriculum Item
  const handleshowCurriculumItems = () => {
    setshowCurriculumItem(!showCurriculumItem);
  };

  // Show Lecture Input
  const handleshowLectureInput = () => {
    setshowLecInput(!showLecInput);
    setshowCurriculumItem(false);
  };

  // Update Section
  const handleUpdateSection = (section) => {
    UpdateSectionName(code, section, updateSectionName);
  };

  // update lecture
  const handleUpdateLectureName = (lecture, section) => {
    console.log(lecture);
    console.log(section);
    console.log(updateLectureName);

    UpdateLectureName(code, lecture, updateLectureName, section);
  };
  // update Quiz Name
  const handleUpdateQuizName = (quiz, section) => {
    console.log(updateQuizDescription);
    UpdateQuizName(code, quiz, updateQuizName, updateQuizDescription, section);

    // console.log(section)
    // console.log(quiz)
  };

  // update Assignment Name
  const handleUpdateAssignmentName = (assignment, section) => {
    UpdateAssignmentName(code, assignment, updateAssignmentName, section);
  };

  // update Pratice test Name
  const handleUpdatePraticeTestName = (pt, section) => {
    UpdatePraticeTestName(code, pt, updatePraticeTestName, section);
  };

  // update Coding Exercise Name
  const handleUpdateExerciseName = (codingExercise, section) => {
    UpdateCodingExerciseName(
      code,
      codingExercise,
      updateCodingExerciseName,
      section
    );
  };

  // Delete Downloable File
  const handleDeleteDownloableFilesLecture = (item) => {
    console.log(item);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteResourcesFile(
          code,
          item.url,
          setcurriculumvisiblitymc,
          setshowMain,
          setsectionData,
          setshowDescRes,
          setshowContentAdd,
          setcurriculumvisiblity
        );
      }
    });
  };

  // Save Lecture
  const handleSaveLecture = (courseID) => {
    // setshowLecInput(false)
    if (lecturetitle == "") {
      ErrorAlert("Empty field", "Please enter lecture title");
      return;
    }

    AddLectureTitle(
      code,
      lecturetitle,
      courseID,
      setlecturetitle,
      setshowLecInput,
      setshowCurriculumItem,
      setsectionData
    );

    console.log(lecturetitle, courseID);
  };

  // Cancel Lecture
  const handleCancelLectureInput = () => {
    setshowLecInput(false);
    setshowCurriculumItem(true);
  };

  const handleVideoDelete = (video) => {
    console.log(video);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        VideoDelete(
          video.url,
          code,
          setcurriculumvisiblitymc,
          setshowMain,
          setsectionData,
          setshowDescRes,
          setshowContentAdd,
          setcurriculumvisiblity
        );
      }
    });
  };

  // ----------------

  // ====== SUBMIT PRACTICE TEST ======
  const handlePracticetestSave = () => {
    console.log(mainSectionID);
    console.log(PraticeTestCode);
    console.log(PracticeTestTitle);
    console.log(PracticeTestDesc);
    console.log(PracticeTestDuration);
    console.log(PracticeTestMinPassMark);
    console.log(PracticeTestInstructions);
    console.log(PracticeTestExLink);
    console.log(PracticeTestQuestionFile);
    console.log(PracticeTestQuestionExLink);
    console.log(PracticeTestSolutionsFile);
    console.log(PraticeTestSolutionsExLink);

    if (PracticeTestTitle == "") {
      ErrorAlert("Empty field", "Please fill the title");
      return;
    }

    if (PracticeTestDesc == "") {
      ErrorAlert("Empty field", "Please fill the description");
      return;
    }

    if (PracticeTestDuration == "") {
      ErrorAlert("Empty field", "Please fill the duration");
      return;
    }

    if (PracticeTestMinPassMark == "") {
      ErrorAlert("Empty field", "Please fill the min pass mark");
      return;
    }

    if (PracticeTestInstructions == "") {
      ErrorAlert("Empty field", "Please fill the instructors");
      return;
    }

    PracticeTestSave(
      mainSectionID,
      PraticeTestCode,
      PracticeTestTitle,
      PracticeTestDesc,
      PracticeTestDuration,
      PracticeTestMinPassMark,
      PracticeTestInstructions,
      PracticeTestExLink,
      PracticeTestQuestionFile,
      PracticeTestQuestionExLink,
      PracticeTestSolutionsFile,
      PraticeTestSolutionsExLink,
      setshowPracticeTestInput,
      setshowCurriculumItem,
      setbtnLoadingPracticeTest,
      setPracticeTestTitle,
      setPracticeTestDesc,
      setPracticeTestDuration,
      setPracticeTestInstructions,
      setPracticeTestMinPassMark,
      setPracticeTestExLink,
      setPracticeTestQuestionFile,
      setPracticeTestQuestionExLink,
      setPracticeTestSolutionsFile,
      setPraticeTestSolutionsExLink,
      setPraticeTestCode,
      setshowContentAdd,
      setshowMain,
      code,
      setsectionData
    );
  };

  // ======= SUBMIT CODING EXEC =======
  const handleCodingExecSave = () => {
    console.log(CodingExerciseTitle);
    console.log(CodingExerciseCode);
    console.log(CodingExerciseDesc);
    console.log(CodingExerciseInstructions);
    console.log(CodingExerciseVideo);
    console.log(CodingExerciseDResourses);
    console.log(CodingExerciseExLink);

    console.log(CodingExerciseUploadEx);
    console.log(CodingExerciseExternalLink);
    console.log(CodingExerciseQVideo);

    console.log(CodingExercisesSolutionsFile);
    console.log(CodingExercisesExLinkSolutions);
    console.log(CodingExercisesSolutionsVideo);

    if (CodingExerciseTitle == "") {
      ErrorAlert("Empty field", "Please fill the title");
      return;
    }

    if (CodingExerciseDesc == "") {
      ErrorAlert("Empty field", "Please fill the description");
      return;
    }

    if (CodingExerciseInstructions == "") {
      ErrorAlert("Empty field", "Please fill the instructors");
      return;
    }

    CodingExerciseSave(
      mainSectionID,
      CodingExerciseTitle,
      CodingExerciseCode,
      CodingExerciseDesc,
      CodingExerciseInstructions,
      CodingExerciseVideo,
      CodingExerciseDResourses,
      CodingExerciseExLink,
      CodingExerciseUploadEx,
      CodingExerciseExternalLink,
      CodingExerciseQVideo,
      CodingExercisesSolutionsFile,
      CodingExercisesExLinkSolutions,
      CodingExercisesSolutionsVideo,
      setCodingExerciseTitle,
      setCodingExerciseDesc,
      setCodingExerciseInstructions,
      setCodingExerciseVideo,
      setCodingExerciseDResourses,
      setCodingExerciseExLink,
      setCodingExerciseUploadEx,
      setCodingExerciseExternalLink,
      setCodingExerciseQVideo,
      setCodingExercisesSolutionsFile,
      setCodingExercisesExLinkSolutions,
      setCodingExercisesSolutionsVideo,
      setbtnLoadingCodingExcercise,
      setshowCodingExecInput,
      setshowCurriculumItem,
      setCodingExerciseCode,
      setshowContentAdd,
      setshowMain,
      code,
      setsectionData
    );
  };

  // ======== SUBMIT ASSIGNMENT =======
  const handleAssignmentSave = () => {
    console.log(mainSectionID);
    console.log(AssignmentCode);
    console.log(AssignmentTitle);
    console.log(AssignmentDesc);
    console.log(AssignmentDuration);
    console.log(AssignmentInstructors);
    console.log(AssignmentVideo);
    console.log(AssignmentDResourses);
    console.log(AssignmentExLink);
    console.log(AssignmentQuestion);
    console.log(AssignmentQuestionFile);
    console.log(AssignmentQuestionLink);
    console.log(AssignmentSolutions);
    console.log(AssignmentSolutionsVideo);
    console.log(AssignmentSolutionsFile);
    console.log(AssignmentSolutionsExLink);

    if (AssignmentTitle == "") {
      ErrorAlert("Empty field", "Please fill title");
      return;
    }

    if (AssignmentDesc == "") {
      ErrorAlert("Empty field", "Please fill description");
      return;
    }

    if (AssignmentDuration == "") {
      ErrorAlert("Empty field", "Please fill duration");
      return;
    }

    if (AssignmentInstructors == "") {
      ErrorAlert("Empty field", "Please fill instructions");
      return;
    }

    AssignmentSave(
      mainSectionID,
      AssignmentCode,
      AssignmentTitle,
      AssignmentDesc,
      AssignmentDuration,
      AssignmentInstructors,
      AssignmentVideo,
      AssignmentDResourses,
      AssignmentExLink,
      AssignmentQuestion,
      AssignmentQuestionFile,
      AssignmentQuestionLink,
      AssignmentSolutions,
      AssignmentSolutionsVideo,
      AssignmentSolutionsFile,
      AssignmentSolutionsExLink,
      setshowAssignmentInput,
      setshowCurriculumItem,
      setAssignmentTitle,
      setAssignmentDesc,
      setAssignmentDuration,
      setAssignmentInstructors,
      setAssignmentVideo,
      setAssignmentDResourses,
      setAssignmentExLink,
      setAssignmentQuestion,
      setAssignmentQuestionFile,
      setAssignmentQuestionLink,
      setAssignmentSolutions,
      setAssignmentSolutionsVideo,
      setAssignmentSolutionsFile,
      setAssignmentSolutionsExLink,
      setbtnLoadingAssignment,
      setAssignmentCode,
      setshowContentAdd,
      setshowMain,
      code,
      setsectionData
    );
  };

  // ============= DELETE ==============

  const handleSectionDelete = (section) => {
    // console.log(section.courseSection.sectionId)

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        SectionDelete(section.courseSection.sectionId);
      }
    });
  };

  const handleLectureDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        LectureDelete(item.id);
      }
    });

    // console.log(item.id)
  };

  const handleQuizDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        QuizDelete(item.id);
      }
    });

    console.log(item);
  };

  const handleAssignmentDelete = (item) => {
    // console.log(item.getAssignment[0].assignmentCode)

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        AssignmentDelete(item.getAssignment[0].assignmentCode);
      }
    });
  };

  const handlePracticeTestDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        PracticeTestDelete(item.getPracticeTests[0].practiceTestCode);
      }
    });

    // console.log(item.getPracticeTests[0].practiceTestCode)
  };

  const handleCodingExercisesDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // PracticeTestDelete(item.getPracticeTests[0].practiceTestCode)
        CodingExerciseDelete(item.getCodingExercises[0].codingExerciseCode);
      }
    });

    // console.log(item.getCodingExercises[0].codingExerciseCode)
  };

  const handleDeleteExternalResources = (link) => {
    console.log(link);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        ExternalResoucesDelete(link.id);
      }
    });
  };

  useEffect(() => {
    GetCurriculum(code, setsectionData);
  }, []);

  useEffect(() => {
    sectionData.forEach((f) => {
      console.log(f);
    });
  }, []);

  // Save Description in Lecture
  const handleSaveDescription = (ID) => {
    console.log(ID);
    console.log(curriculum_desc);

    if (curriculum_desc == "") {
      ErrorAlert("Empty field", "Please enter description");
      return;
    }

    // setcurriculum_desc
    AddCurriculumDescription(
      code,
      ID,
      curriculum_desc,
      setcurriculum_desc,
      setshowDescription,
      setsectionData
    );
  };

  // Save Resources > Downloadable
  const handleDownloadbaleFile = (e, ID) => {
    console.log(e.target.files[0]);

    // setcurriculum_download_file(e.target.files[0])
    AddCurriculumDownloadable(
      code,
      ID,
      e.target.files[0],
      setshowResources,
      setsectionData
    );
  };

  // Save Resources > External Reourses
  const handleExternalResources = (ID) => {
    // console.log(ID)

    if (curriclum_ex_res_tile == "") {
      ErrorAlert("Empty field", "Please enter title");
      return;
    } else if (curriculum_ex_res_link == "") {
      ErrorAlert("Empty field", "Please enter link");
      return;
    } else {
      AddCurriculumExternalResourses(
        code,
        ID,
        curriclum_ex_res_tile,
        curriculum_ex_res_link,
        setcurriclum_ex_res_tile,
        setcurriculum_ex_res_link,
        setsectionData
      );
    }
  };

  //  Save Resource > Source Code
  const handleSaveSourceCode = (ID, e) => {
    console.log(ID);
    console.log(e.target.files[0]);

    AddCurriculumSourceCode(code, ID, e.target.files[0], setsectionData);
  };

  //  Save Article > Article
  const handleSaveArticle = (ID) => {
    if (article == "") {
      ErrorAlert("Empty field", "Please enter text content");
      return;
    }

    AddCurriculumArticle(
      code,
      ID,
      article,
      setsectionData,
      setarticle,
      setshowMain,
      setshowDescRes,
      setshowContentAdd
    );
  };

  // Save Video > Video
  const handleSaveVideo = (video, ID) => {
    console.log(video);
    setuploadingVideoName(video.name);
    console.log(ID);

    // console.log(e.target.files)

    const reader = new FileReader();

    reader.onload = function (event) {
      const video1 = document.createElement("video");

      video1.onloadedmetadata = function () {
        // Get the duration of the video in seconds
        const duration = Math.round(video1.duration);
        console.log("Video duration:", duration, "seconds");

        AddCurriculumVideo(
          code,
          ID,
          video,
          duration,
          setsectionData,
          setshowMain,
          setshowDescRes,
          setshowContentAdd,
          setcurriculumvisiblity,
          setUploadingVideo,
          setuploadingVideoName
        );
      };

      video1.src = event.target.result;
    };

    reader.readAsDataURL(video);
  };

  //  Set Video preview
  const handleSetVideoPreview = (status, item) => {
    GetCurriculum(code, setsectionData);

    {
      item.curriculumItemFiles.length > 0 &&
        item.curriculumItemFiles.some((video) => video.filetype === "Video") &&
        item.curriculumItemFiles
          .filter((video) => video.filetype === "Video")
          .map((video) => {
            console.log(video.url);
            console.log(status);
            SetVideoPreviewAPI(code, video.url, status, setsectionData);
          });
    }
  };

  //  Save Quiz > First Step
  // Show Quiz Input
  const handleShowQuizInput = () => {
    setshowQuizInput(!showQuizInput);
    setshowCurriculumItem(false);
  };

  // Save Quiz
  const handleSaveQuiz = (sectionID) => {
    // setshowQuizInput(null)

    console.log(sectionID);
    console.log(quizTitle);
    console.log(quizDesc);

    if (quizTitle == "") {
      ErrorAlert("Empty field", "Please enter quiz title");
    } else if (quizDesc == "") {
      ErrorAlert("Empty field", "Please enter quiz description");
    } else {
      AddCurriculumQuiz(
        code,
        setsectionData,
        sectionID,
        quizTitle,
        quizDesc,
        setshowQuizInput,
        setshowCurriculumItem,
        setquizTitle,
        setquizDesc
      );
    }
  };

  // Save > Answer & Question
  const handleQuestionsAnswer = (item) => {
    // console.log(item.id)

    let ID = item.id; // Lect ID
    let curriculumID = item.getQuizs.length == 0 ? "" : item.getQuizs[0].id; // Curriculum ID
    // console.log(item.getQuizs.length)
    console.log(ID);
    console.log(curriculumID);

    console.log(answerOptionOne);
    console.log(answerOptionTwo);
    console.log(answerOptionThree);
    console.log(answerOptionFour);
    console.log(answerOptionFive);
    console.log(answerOption);

    if (question == "") {
      ErrorAlert("Empty field", "Please enter a question");
      return;
    } else if (answerOption == "") {
      ErrorAlert("Empty field", "Please select correct answer");
      return;
    } else if (answerOne == "") {
      ErrorAlert("Empty field", "Please enter answer one");
      return;
    } else {
      if (answerOption == "ans1") {
        if (answerOne == "") {
          ErrorAlert("Empty field", "Please add answer");
          return;
        }
      } else if (answerOption == "ans2") {
        if (answerTwo == "") {
          ErrorAlert("Empty field", "Please add answer");
          return;
        }
      } else if (answerOption == "ans3") {
        if (answerThree == "") {
          ErrorAlert("Empty field", "Please add answer");
          return;
        }
      } else if (answerOption == "ans4") {
        if (answerFour == "") {
          ErrorAlert("Empty field", "Please add answer");
          return;
        }
      } else if (answerOption == "ans5") {
        if (answerFive == "") {
          ErrorAlert("Empty field", "Please add answer");
          return;
        }
      }

      AddCurriculumQnAQuiz(
        code,
        curriculumID,
        question,
        ID,
        answerOne,
        answerTwo,
        answerThree,
        answerFour,
        answerFive,
        answerExplainOne,
        answerExplainTwo,
        answerExplainThree,
        answerExplainFour,
        answerExplainFive,
        answerOption,
        setcurriculumvisiblitymc,
        setshowMain,
        setsectionData
      );
    }
  };

  // Cancel Quiz
  const handleCancelQuizInput = () => {
    setshowQuizInput(false);
    setshowCurriculumItem(true);
  };

  // Get Quiz Data
  const handleFillQuiz = (item) => {
    console.log(item);
    setquestion(item.getQuizs.length == 0 ? "" : item.getQuizs[0].question);

    setanswerOne(
      item.getQuizs.length == 0 ? "" : item.getQuizs[0].getAnswers[0].name
    );
    setanswerTwo(
      item.getQuizs.length == 0 ? "" : item.getQuizs[0].getAnswers[1].name
    );
    setanswerThree(
      item.getQuizs.length == 0 ? "" : item.getQuizs[0].getAnswers[2].name
    );
    setanswerFour(
      item.getQuizs.length == 0 ? "" : item.getQuizs[0].getAnswers[3].name
    );
    setanswerFive(
      item.getQuizs.length == 0 ? "" : item.getQuizs[0].getAnswers[4].name
    );

    setanswerExplainOne(
      item.getQuizs.length == 0
        ? ""
        : item.getQuizs[0].getAnswers[0].explanation
    );
    setanswerExplainTwo(
      item.getQuizs.length == 0
        ? ""
        : item.getQuizs[0].getAnswers[1].explanation
    );
    setanswerExplainThree(
      item.getQuizs.length == 0
        ? ""
        : item.getQuizs[0].getAnswers[2].explanation
    );
    setanswerExplainFour(
      item.getQuizs.length == 0
        ? ""
        : item.getQuizs[0].getAnswers[3].explanation
    );
    setanswerExplainFive(
      item.getQuizs.length == 0
        ? ""
        : item.getQuizs[0].getAnswers[4].explanation
    );

    if (item.getQuizs.length != 0) {
      if (item.getQuizs[0].getAnswers[0].correctAnswer == true) {
        setanswerOption("ans1");
      } else if (item.getQuizs[0].getAnswers[1].correctAnswer == true) {
        setanswerOption("ans2");
      } else if (item.getQuizs[0].getAnswers[2].correctAnswer == true) {
        setanswerOption("ans3");
      } else if (item.getQuizs[0].getAnswers[3].correctAnswer == true) {
        setanswerOption("ans4");
      } else if (item.getQuizs[0].getAnswers[4].correctAnswer == true) {
        setanswerOption("ans5");
      }
    } else {
      setanswerOption("");
    }
  };

  const [curriculumSections, setCurriculumSections] = useState(sectionData);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const dragItem = useRef();
  const dragOverItem = useRef();

  let dragOverItemNo = useRef();

  const setDragOverNo = (i) => {
    dragOverItemNo = i + 1;
  };

  const handledragStart = (e) => {
    e.currentTarget.style.opacity = "0.9";
  };

  const handleSort = (e, sectionIndex, section, item) => {
    if (dragOverItem.current !== null && dragItem.current !== null) {
      console.log("ok");
      const updatedSections = [...sectionData];

      const currentSection =
        updatedSections[sectionIndex].courseSection.sectionCurriculumItem;

      const draggedItemContent = currentSection.splice(dragItem.current, 1)[0];

      currentSection.splice(dragOverItem.current, 0, draggedItemContent);

      updateSectionData(
        code,
        section.courseSection.sectionId,
        item,
        dragOverItemNo
      );

      setCurriculumSections(updatedSections);

      dragItem.current = null;
      dragOverItem.current = null;
      setDraggingIndex(null);
      dragOverItemNo = null;
    }
  };

  const newCounters = {
    Lecture: 0,
    Quiz: 0,
    Assignment: 0,
    CodingExercise: 0,
    PracticeTest: 0,
  };

  return (
    <div className="col-md-10 px-4 mb-4   course-landing-page-responsive">
      <Card className="py-2 my-2 p-4">
        <div className="d-flex justify-content-between">
          <Typography className="p-3" variant="h4">
            Create your course
          </Typography>
        </div>

        <hr />

        <p>You can start creating and uploading your course here.</p>
        <p>
          Create separate sections for lessons and include lectures, quizzes,
          practice tests, assignments and coding exercises.
        </p>
        <p>
          Have a clear structure to your course content by following a good
          course outline and clearly label your sections and lectures.
        </p>

        <p>
          <b>IMPORTANT NOTICE:</b>
        </p>
        <ul>
          <li>
            <b>
              Please note that the maximum video content length on free courses
              is 2.5 hours.
            </b>
          </li>
          <li>
            <b>
              For a paid course the minimum video content length should be 45
              minutes and the minimum number of lectures should be 5.
            </b>
          </li>
          <li>
            <b>
              HD video quality (720p or 1080p) is required on all video content.
            </b>
          </li>
        </ul>

        <p>
          Resources can be added to course lectures help students learn more
          effectively and to enhance the learning experience.
        </p>

        <ol>
          <li>
            Downloadable resources: can be virtually any filetype such as .PDF,
            .PPTX, .DOCX, .XLS, .JPG, .ZIP, .MP3. MP4, .MOV etc.{" "}
          </li>
          <li>External resources: these are hyperlinks to websites.</li>
          <li>
            Source code: all forms of source code files can be uploaded for
            development courses.{" "}
          </li>
        </ol>

        {/* Section 1 */}
        {sectionData != null ? (
          sectionData.length > 0 ? (
            sectionData.map((section, index) => (
              <div key={index} className="card p-2 my-3">
                <CardContent>
                  <div className="d-flex justify-content-between section-container">
                    <Typography variant="subtitle1">
                      <b>{index + 1}. Section:</b>{" "}
                      <DnsIcon sx={{ fontSize: 15 }} />{" "}
                      {/* When Clicked Edit */}
                      {showSectionEditInput == index ? (
                        <div className="d-flex">
                          <Form.Control
                            className="mx-1"
                            value={updateSectionName}
                            onChange={(e) =>
                              setupdateSectionName(e.target.value)
                            }
                            type="text"
                            placeholder="Large text"
                          />

                          <Button
                            onClick={(e) => {
                              if (showSectionEditInput == index) {
                                setshowSectionEditInput(null);
                                setupdateSectionName(
                                  section.courseSection.sectionName
                                );
                              } else {
                                setshowSectionEditInput(index);
                                setupdateSectionName(
                                  section.courseSection.sectionName
                                );
                              }
                            }}
                            className="mx-1"
                            variant="outlined"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              handleUpdateSection(section.courseSection);
                            }}
                            className="mx-1"
                            variant="contained"
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span>{section.courseSection.sectionName}</span>
                          <EditIcon
                            style={syllabusIcon}
                            onClick={(e) => {
                              if (showSectionEditInput == index) {
                                setshowSectionEditInput(null);
                                setupdateSectionName("");
                              } else {
                                setshowSectionEditInput(index);
                                setupdateSectionName(
                                  section.courseSection.sectionName
                                );
                              }
                            }}
                            className="mx-1"
                          />
                          <DeleteIcon
                            style={syllabusIcon}
                            className="mx-1"
                            onClick={() => handleSectionDelete(section)}
                          />
                        </>
                      )}
                    </Typography>
                  </div>

                  {/* Lecture > Quiz > Assignment */}
                  {section.courseSection.sectionCurriculumItem.length > 0 &&
                    section.courseSection.sectionCurriculumItem.map(
                      (item, i) => {
                        if (item.type == "Lecture") {
                          newCounters.Lecture += 1;
                        } else if (item.type == "Quiz") {
                          newCounters.Quiz += 1;
                        } else if (item.type == "Assignment") {
                          newCounters.Assignment += 1;
                        } else if (item.type == "Coding Exercise") {
                          newCounters.CodingExercise += 1;
                        } else if (item.type == "Practice Test") {
                          newCounters.PracticeTest += 1;
                        }

                        const isExpanded =
                          expandedIndex === index + i + item.id;
                        return (
                          <div
                            className={`my-2 ${
                              draggingIndex === i ? "dragging" : "draggable"
                            }`}
                            key={i}
                            draggable
                            onDragStart={(e) => {
                              dragItem.current = i;
                              setDraggingIndex(i);
                              handledragStart(e);
                            }}
                            onDragEnter={(e) => {
                              dragOverItem.current = i;
                              setDragOverNo(i);
                            }}
                            onDragEnd={(e) =>
                              handleSort(e, index, section, item.id)
                            }
                            onDragOver={(e) => {
                              e.preventDefault();
                            }}
                            style={{ cursor: isExpanded ? "default" : "move" }}
                          >
                            <>
                              {item.type == "Lecture" && (
                                <>
                                  {/* Edit Lecture */}

                                  {showEditTitleInput == index + i + item.id ? (
                                    <div className="d-flex">
                                      <Form.Control
                                        className="mx-1"
                                        value={updateLectureName}
                                        onChange={(e) =>
                                          setupdateLectureName(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Large text"
                                      />
                                      <Button
                                        onClick={(e) => {
                                          if (
                                            showEditTitleInput ==
                                            index + i + item.id
                                          ) {
                                            setshowEditTitleInput(null);
                                            setupdateLectureName("");
                                          } else {
                                            setshowEditTitleInput(
                                              index + i + item.id
                                            );
                                            setupdateLectureName(item.title);
                                          }
                                        }}
                                        className="mx-1"
                                        variant="outlined"
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        onClick={(e) => {
                                          handleUpdateLectureName(
                                            item,
                                            section
                                          );
                                        }}
                                        className="mx-1"
                                        variant="contained"
                                      >
                                        Save
                                      </Button>
                                    </div>
                                  ) : (
                                    <>
                                      {/* Get Lecture */}
                                      <Card
                                        key={index + i + item.id}
                                        className="my-3"
                                      >
                                        <div className="d-flex justify-content-between align-items-center p-2">
                                          <span>
                                            <Typography>
                                              <CheckCircleIcon fontSize="small" />
                                              {i + 1}. Lesson:{" "}
                                              {newCounters.Lecture}{" "}
                                              {item.article != "N/A" ? (
                                                <FileCopyIcon
                                                  sx={{ fontSize: 15 }}
                                                />
                                              ) : (
                                                <PlayCircleIcon
                                                  sx={{ fontSize: 15 }}
                                                />
                                              )}{" "}
                                              {item.title}
                                              <span className="mx-5">
                                                <EditIcon
                                                  style={syllabusIcon}
                                                  onClick={(e) => {
                                                    if (
                                                      showEditTitleInput ==
                                                      index + i + item.id
                                                    ) {
                                                      setshowEditTitleInput(
                                                        null
                                                      );
                                                      setupdateLectureName("");
                                                    } else {
                                                      setshowEditTitleInput(
                                                        index + i + item.id
                                                      );
                                                      setupdateLectureName(
                                                        item.title
                                                      );
                                                    }
                                                  }}
                                                />
                                                <DeleteIcon
                                                  style={syllabusIcon}
                                                  onClick={() =>
                                                    handleLectureDelete(item)
                                                  }
                                                />
                                              </span>
                                            </Typography>
                                          </span>

                                          {/* + Content Action Card */}
                                          <span>
                                            {showContentAdd ==
                                            index + i + item.id ? (
                                              <Button
                                                onClick={() => {
                                                  setshowDescRes(true);
                                                  setshowMain(null);
                                                  console.log(
                                                    index + i + item.id
                                                  );
                                                  setshowContentAdd(null);
                                                  setcurriculumvisiblity("");
                                                }}
                                                className="mx-2"
                                                size="small"
                                                variant="contained"
                                              >
                                                <CloseIcon /> Cancel
                                              </Button>
                                            ) : (
                                              <Button
                                                onClick={() => {
                                                  setExpandedIndex(
                                                    isExpanded
                                                      ? null
                                                      : index + i + item.id
                                                  );
                                                  setshowDescRes(false);
                                                  setshowMain(
                                                    showMain ==
                                                      index + i + item.id
                                                      ? null
                                                      : index + i + item.id
                                                  );
                                                  console.log(
                                                    index + i + item.id
                                                  );
                                                  console.log(item);
                                                  setarticle(
                                                    item.article == "N/A"
                                                      ? ""
                                                      : item.article
                                                  );
                                                  setcurriculum_desc(
                                                    item.description == "N/A"
                                                      ? ""
                                                      : item.description
                                                  );
                                                  setshowContentAdd(
                                                    showContentAdd ==
                                                      index + i + item.id
                                                      ? null
                                                      : index + i + item.id
                                                  );
                                                }}
                                                className="mx-2"
                                                size="small"
                                                variant="outlined"
                                              >
                                                <AddIcon /> Content
                                              </Button>
                                            )}
                                          </span>
                                          {/* + Content Action Card */}
                                        </div>

                                        {/* Show the Articles If Filled */}
                                        {item.article != "N/A" &&
                                          showMain == index + i + item.id && (
                                            <div className="p-3">
                                              <div className="my-3">
                                                <JoditEditor
                                                  value={article}
                                                  onChange={(content) =>
                                                    setarticle(content)
                                                  }
                                                />
                                                <div className="d-flex flex-start my-2">
                                                  <Button
                                                    onClick={() =>
                                                      handleSaveArticle(item.id)
                                                    }
                                                    variant="contained"
                                                  >
                                                    SAVE
                                                  </Button>
                                                </div>
                                              </div>

                                              <div className="my-3">
                                                {/* List of Resources / External Link */}
                                                {item.description != "N/A" && (
                                                  <p className="m-0 p-0">
                                                    <b>Description</b>
                                                  </p>
                                                )}
                                                <p>
                                                  {item.description != "N/A" &&
                                                    removeHtmlTags(
                                                      item.description
                                                    )}
                                                </p>

                                                <>
                                                  {showDescription ==
                                                    index + i + item.id && (
                                                    <>
                                                      {/* <Button onClick={() => setshowDescription(null)}  className="m-2" variant="contained"><CloseIcon /> Cancel</Button> */}
                                                      <Button
                                                        onClick={() => {
                                                          setcurriculum_desc(
                                                            item.description ==
                                                              "N/A"
                                                              ? ""
                                                              : item.description
                                                          );
                                                          setshowDescription(
                                                            showDescription ==
                                                              index +
                                                                i +
                                                                item.id
                                                              ? null
                                                              : index +
                                                                  i +
                                                                  item.id
                                                          );
                                                        }}
                                                        className="m-2"
                                                        variant="contained"
                                                      >
                                                        <AddIcon /> Description
                                                      </Button>
                                                      <Button
                                                        onClick={() =>
                                                          setshowResources(null)
                                                        }
                                                        className="m-2"
                                                        variant="outlined"
                                                      >
                                                        <AddIcon /> Resourses
                                                      </Button>
                                                      <JoditEditor
                                                        value={curriculum_desc}
                                                        onChange={(value) =>
                                                          setcurriculum_desc(
                                                            value
                                                          )
                                                        }
                                                      />

                                                      <div className="d-flex my-2">
                                                        <Button
                                                          onClick={() =>
                                                            setshowDescription(
                                                              null
                                                            )
                                                          }
                                                          className="mx-1"
                                                          variant="outlined"
                                                        >
                                                          Cancel
                                                        </Button>
                                                        <Button
                                                          onClick={() =>
                                                            handleSaveDescription(
                                                              item.id
                                                            )
                                                          }
                                                          className="mx-1"
                                                          variant="contained"
                                                        >
                                                          Save
                                                        </Button>
                                                      </div>
                                                    </>
                                                  )}

                                                  {/* Add Description & Resourses */}
                                                  {showMain ==
                                                    index + i + item.id &&
                                                    showDescription !=
                                                      index + i + item.id && (
                                                      <div className="d-flex justify-content-center p-2">
                                                        <Button
                                                          onClick={() => {
                                                            setcurriculum_desc(
                                                              item.description ==
                                                                "N/A"
                                                                ? ""
                                                                : item.description
                                                            );
                                                            setshowDescription(
                                                              showDescription ==
                                                                index +
                                                                  i +
                                                                  item.id
                                                                ? null
                                                                : index +
                                                                    i +
                                                                    item.id
                                                            );
                                                          }}
                                                          className="m-2"
                                                          variant="outlined"
                                                        >
                                                          <AddIcon />{" "}
                                                          Description
                                                        </Button>

                                                        {showResources ==
                                                        index + i + item.id ? (
                                                          <Button
                                                            onClick={() =>
                                                              setshowResources(
                                                                null
                                                              )
                                                            }
                                                            className="m-2"
                                                            variant="contained"
                                                          >
                                                            <CloseIcon />{" "}
                                                            Resourses
                                                          </Button>
                                                        ) : (
                                                          <Button
                                                            onClick={() =>
                                                              setshowResources(
                                                                showResources ==
                                                                  index +
                                                                    i +
                                                                    item.id
                                                                  ? null
                                                                  : index +
                                                                      i +
                                                                      item.id
                                                              )
                                                            }
                                                            className="m-2"
                                                            variant="outlined"
                                                          >
                                                            <AddIcon />{" "}
                                                            Resourses
                                                          </Button>
                                                        )}
                                                      </div>
                                                    )}

                                                  {showResources ==
                                                    index + i + item.id && (
                                                    <div>
                                                      {/* <Button onClick={() => setshowResources(null)}  className="m-2" variant="contained"><CloseIcon /> Cancel</Button> */}

                                                      {/* Tabs */}
                                                      <Tabs
                                                        defaultActiveKey="d-file"
                                                        id="uncontrolled-tab-example"
                                                        className="my-3"
                                                      >
                                                        <Tab
                                                          eventKey="d-file"
                                                          title="Downloadable File"
                                                        >
                                                          <Form.Group
                                                            controlId="formFile"
                                                            className="mb-3"
                                                          >
                                                            {/* (e) =>  */}
                                                            <Form.Control
                                                              onChange={(e) =>
                                                                handleDownloadbaleFile(
                                                                  e,
                                                                  item.id
                                                                )
                                                              }
                                                              type="file"
                                                            />
                                                            <Form.Label
                                                              style={{
                                                                fontSize: 11,
                                                              }}
                                                            >
                                                              <b>Note:</b>{" "}
                                                              Resource files can
                                                              be any file type
                                                              that will help
                                                              students with
                                                              their learning.
                                                            </Form.Label>
                                                          </Form.Group>
                                                        </Tab>
                                                        <Tab
                                                          eventKey="e-r"
                                                          title="External Resources"
                                                        >
                                                          <Form>
                                                            <Form.Group
                                                              className="mb-3"
                                                              controlId="exampleForm.ControlInput1"
                                                            >
                                                              <Form.Label>
                                                                Title
                                                              </Form.Label>
                                                              <Form.Control
                                                                value={
                                                                  curriclum_ex_res_tile
                                                                }
                                                                onChange={(e) =>
                                                                  setcurriclum_ex_res_tile(
                                                                    e.target
                                                                      .value
                                                                  )
                                                                }
                                                                type="text"
                                                                placeholder="A Descriptive Title"
                                                              />
                                                            </Form.Group>

                                                            <Form.Group
                                                              className="mb-3"
                                                              controlId="exampleForm.ControlInput1"
                                                            >
                                                              <Form.Label>
                                                                URL
                                                              </Form.Label>
                                                              <Form.Control
                                                                value={
                                                                  curriculum_ex_res_link
                                                                }
                                                                onChange={(e) =>
                                                                  setcurriculum_ex_res_link(
                                                                    e.target
                                                                      .value
                                                                  )
                                                                }
                                                                type="text"
                                                                placeholder="https://externallink.com"
                                                              />
                                                            </Form.Group>
                                                            <Button
                                                              onClick={() =>
                                                                handleExternalResources(
                                                                  item.id
                                                                )
                                                              }
                                                              variant="contained"
                                                            >
                                                              Add Link
                                                            </Button>
                                                          </Form>
                                                        </Tab>
                                                        <Tab
                                                          eventKey="source-code"
                                                          title="Source Code"
                                                        >
                                                          <Form.Group
                                                            onChange={(e) =>
                                                              handleSaveSourceCode(
                                                                item.id,
                                                                e
                                                              )
                                                            }
                                                            controlId="formFile"
                                                            className="mb-3"
                                                          >
                                                            <Form.Control type="file" />
                                                            {/* <Form.Label style={{fontSize:11}}><b>Note:</b>  Only available for Python and Ruby for now. You can upload .py and .rb files.</Form.Label> */}
                                                          </Form.Group>
                                                        </Tab>
                                                      </Tabs>
                                                    </div>
                                                  )}
                                                </>

                                                {/* Downloadable Files */}
                                                {item.curriculumItemFiles.some(
                                                  (downloaditem) =>
                                                    downloaditem.filetype ==
                                                    "Downloadable Items"
                                                ) && (
                                                  <div className="p-2">
                                                    <h6>
                                                      <b>Downloadable Files</b>
                                                    </h6>
                                                    <ListGroup>
                                                      {item.curriculumItemFiles.some(
                                                        (downloaditem) =>
                                                          downloaditem.filetype ==
                                                          "Downloadable Items"
                                                      ) ? (
                                                        item.curriculumItemFiles
                                                          .filter(
                                                            (downloaditem) =>
                                                              downloaditem.filetype ==
                                                              "Downloadable Items"
                                                          )
                                                          .map(
                                                            (
                                                              downloaditem,
                                                              index
                                                            ) => (
                                                              <ListGroup.Item
                                                                className="d-flex justify-content-between"
                                                                key={index}
                                                              >
                                                                <span>
                                                                  {
                                                                    downloaditem.title
                                                                  }
                                                                </span>
                                                                <span>
                                                                  <Button
                                                                    onClick={() => {
                                                                      handleDeleteDownloableFilesLecture(
                                                                        downloaditem
                                                                      );
                                                                    }}
                                                                    className="p-0"
                                                                    // variant="contained"
                                                                  >
                                                                    <DeleteIcon />
                                                                  </Button>
                                                                </span>
                                                              </ListGroup.Item>
                                                            )
                                                          )
                                                      ) : (
                                                        // <p>No Downloadable Items</p>
                                                        <></>
                                                      )}
                                                    </ListGroup>
                                                  </div>
                                                )}

                                                {/* External Resources */}
                                                {item.curriculumItemFiles.some(
                                                  (link) =>
                                                    link.filetype ===
                                                    "External Resourses"
                                                ) && (
                                                  <div className="p-2">
                                                    <h6>
                                                      <b>External Resources</b>
                                                    </h6>
                                                    <ListGroup>
                                                      {item.curriculumItemFiles
                                                        .filter(
                                                          (link) =>
                                                            link.filetype ===
                                                            "External Resourses"
                                                        )
                                                        .map((link, index) => (
                                                          <ListGroup.Item
                                                            className="d-flex justify-content-between"
                                                            key={index}
                                                          >
                                                            <span>
                                                              <a
                                                                target="_blank"
                                                                href={link.url}
                                                              >
                                                                <LaunchIcon fontSize="10" />
                                                                {link.title}
                                                              </a>
                                                            </span>
                                                            <span>
                                                              <Button
                                                                className="p-0"
                                                                // variant="contained"
                                                              >
                                                                <DeleteIcon />
                                                              </Button>
                                                            </span>
                                                          </ListGroup.Item>
                                                        ))}
                                                    </ListGroup>
                                                  </div>
                                                )}

                                                {/* Source Code */}
                                                {item.curriculumItemFiles.some(
                                                  (source) =>
                                                    source.filetype ===
                                                    "Source Code"
                                                ) && (
                                                  <div className="p-2">
                                                    <h6>
                                                      <b>Source Code</b>
                                                    </h6>
                                                    <ListGroup>
                                                      {item.curriculumItemFiles.some(
                                                        (source) =>
                                                          source.filetype ===
                                                          "Source Code"
                                                      ) ? (
                                                        item.curriculumItemFiles
                                                          .filter(
                                                            (source) =>
                                                              source.filetype ===
                                                              "Source Code"
                                                          )
                                                          .map(
                                                            (source, index) => (
                                                              <ListGroup.Item
                                                                className="d-flex justify-content-between"
                                                                key={index}
                                                              >
                                                                <span>
                                                                  {source.title}
                                                                </span>
                                                                <span>
                                                                  <Button
                                                                    onClick={() => {
                                                                      handleDeleteDownloableFilesLecture(
                                                                        source
                                                                      );
                                                                    }}
                                                                    className="p-0"
                                                                    // variant="contained"
                                                                  >
                                                                    <DeleteIcon />
                                                                  </Button>
                                                                </span>
                                                              </ListGroup.Item>
                                                            )
                                                          )
                                                      ) : (
                                                        // <p>No Source Code</p>
                                                        <></>
                                                      )}
                                                    </ListGroup>
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          )}

                                        {/* Main Video Card & Text Based Card */}
                                        {item.article == "N/A" &&
                                          item.curriculumItemFiles.length ==
                                            0 &&
                                          (showMain == index + i + item.id ? (
                                            curriculumvisiblity == "video" ? (
                                              <div className="p-3">
                                                {/* Upload Input */}
                                                <Form.Group
                                                  controlId="formFile"
                                                  className="my-3"
                                                >
                                                  <Form.Control
                                                    accept="video/*"
                                                    onChange={(e) => {
                                                      setUploadingVideo(
                                                        index + i + item.id
                                                      );
                                                      handleSaveVideo(
                                                        e.target.files[0],
                                                        item.id
                                                      );
                                                    }}
                                                    placeholder="Add a Video"
                                                    type="file"
                                                  />
                                                  <Form.Label
                                                    style={{ fontSize: 11 }}
                                                  >
                                                    <b>Note:</b> Video file
                                                    should be High Definition
                                                    (HD) quality, with a minimum
                                                    resolution of 720p and
                                                    maximum resolution of 1080p.
                                                  </Form.Label>
                                                </Form.Group>

                                                {/* Before Video Upload */}
                                                <Table striped bordered hover>
                                                  <thead>
                                                    <tr>
                                                      <th>Filename</th>
                                                      <th>Status</th>
                                                      <th>Type</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    {uploadingVideo ==
                                                      index + i + item.id && (
                                                      // item.curriculumItemFiles.some(video => video.filetype === "Video") ? (
                                                      // item.curriculumItemFiles
                                                      // .filter(video => video.filetype === "Video")
                                                      // .map((video, index) => (
                                                      <tr>
                                                        <td>
                                                          {uploadingVideo ==
                                                          index + i + item.id
                                                            ? uploadingVideoName
                                                            : ""}
                                                        </td>
                                                        <td>
                                                          <td>
                                                            {uploadingVideo ==
                                                            index +
                                                              i +
                                                              item.id ? (
                                                              <Badge bg="info">
                                                                Uploading
                                                              </Badge>
                                                            ) : (
                                                              <Badge bg="success">
                                                                Completed
                                                              </Badge>
                                                            )}
                                                          </td>
                                                        </td>
                                                        <td>Video</td>
                                                      </tr>
                                                      // ))
                                                      // ) : (
                                                      //     <p>No Video</p>
                                                      // )
                                                    )}
                                                  </tbody>
                                                </Table>

                                                {/* List of Resources / External Link */}
                                                <>
                                                  {showDescription ==
                                                    index + i + item.id && (
                                                    <>
                                                      <Button
                                                        onClick={() =>
                                                          setshowDescription(
                                                            null
                                                          )
                                                        }
                                                        className="m-2"
                                                        variant="contained"
                                                      >
                                                        <CloseIcon /> Cancel
                                                      </Button>
                                                      <Button
                                                        onClick={() =>
                                                          setshowResources(null)
                                                        }
                                                        className="m-2"
                                                        variant="outlined"
                                                      >
                                                        <AddIcon /> Resourses
                                                      </Button>
                                                      <JoditEditor
                                                        value={curriculum_desc}
                                                        onChange={(value) =>
                                                          setcurriculum_desc(
                                                            value
                                                          )
                                                        }
                                                      />

                                                      <div className="d-flex my-2">
                                                        <Button
                                                          onClick={() =>
                                                            setshowDescription(
                                                              null
                                                            )
                                                          }
                                                          className="mr-1"
                                                          variant="outlined"
                                                        >
                                                          Cancel
                                                        </Button>
                                                        <Button
                                                          onClick={() =>
                                                            handleSaveDescription(
                                                              item.id
                                                            )
                                                          }
                                                          className="ml-1"
                                                          variant="contained"
                                                        >
                                                          Save
                                                        </Button>
                                                      </div>
                                                    </>
                                                  )}

                                                  {/* Add Description & Resourses */}
                                                  {showMain ==
                                                    index + i + item.id &&
                                                    showDescription !=
                                                      index + i + item.id && (
                                                      <div className="d-flex justify-content-center p-2">
                                                        <Button
                                                          onClick={() =>
                                                            setshowDescription(
                                                              showDescription ==
                                                                index +
                                                                  i +
                                                                  item.id
                                                                ? null
                                                                : index +
                                                                    i +
                                                                    item.id
                                                            )
                                                          }
                                                          className="m-2"
                                                          variant="outlined"
                                                        >
                                                          <AddIcon />{" "}
                                                          Description
                                                        </Button>
                                                        <Button
                                                          onClick={() =>
                                                            setshowResources(
                                                              showResources ==
                                                                index +
                                                                  i +
                                                                  item.id
                                                                ? null
                                                                : index +
                                                                    i +
                                                                    item.id
                                                            )
                                                          }
                                                          className="m-2"
                                                          variant="outlined"
                                                        >
                                                          <AddIcon /> Resourses
                                                        </Button>
                                                      </div>
                                                    )}

                                                  {showResources ==
                                                    index + i + item.id && (
                                                    <div>
                                                      <Button
                                                        onClick={() =>
                                                          setshowResources(null)
                                                        }
                                                        className="m-2"
                                                        variant="contained"
                                                      >
                                                        <CloseIcon /> Cancel
                                                      </Button>

                                                      {/* Tabs */}
                                                      <Tabs
                                                        defaultActiveKey="d-file"
                                                        id="uncontrolled-tab-example"
                                                        className="my-3"
                                                      >
                                                        <Tab
                                                          eventKey="d-file"
                                                          title="Downloadable File"
                                                        >
                                                          <Form.Group
                                                            controlId="formFile"
                                                            className="mb-3"
                                                          >
                                                            {/* (e) =>  */}
                                                            <Form.Control
                                                              onChange={(e) =>
                                                                handleDownloadbaleFile(
                                                                  e,
                                                                  item.id
                                                                )
                                                              }
                                                              type="file"
                                                            />
                                                            <Form.Label
                                                              style={{
                                                                fontSize: 11,
                                                              }}
                                                            >
                                                              <b>Note:</b> A
                                                              resource is for
                                                              any type of
                                                              document that can
                                                              be used to help
                                                              students in the
                                                              lesson. This file
                                                              is going to be
                                                              seen as a lesson
                                                              extra. Make sure
                                                              everything is
                                                              legible and the
                                                              file size is less
                                                              than 1 GiB.
                                                            </Form.Label>
                                                          </Form.Group>
                                                        </Tab>
                                                        <Tab
                                                          eventKey="e-r"
                                                          title="External Resources"
                                                        >
                                                          <Form>
                                                            <Form.Group
                                                              className="mb-3"
                                                              controlId="exampleForm.ControlInput1"
                                                            >
                                                              <Form.Label>
                                                                Title
                                                              </Form.Label>
                                                              <Form.Control
                                                                value={
                                                                  curriclum_ex_res_tile
                                                                }
                                                                onChange={(e) =>
                                                                  setcurriclum_ex_res_tile(
                                                                    e.target
                                                                      .value
                                                                  )
                                                                }
                                                                type="text"
                                                                placeholder="A Descriptive Title"
                                                              />
                                                            </Form.Group>

                                                            <Form.Group
                                                              className="mb-3"
                                                              controlId="exampleForm.ControlInput1"
                                                            >
                                                              <Form.Label>
                                                                URL
                                                              </Form.Label>
                                                              <Form.Control
                                                                value={
                                                                  curriculum_ex_res_link
                                                                }
                                                                onChange={(e) =>
                                                                  setcurriculum_ex_res_link(
                                                                    e.target
                                                                      .value
                                                                  )
                                                                }
                                                                type="text"
                                                                placeholder="https://externallink.com"
                                                              />
                                                            </Form.Group>
                                                            <Button
                                                              onClick={() =>
                                                                handleExternalResources(
                                                                  item.id
                                                                )
                                                              }
                                                              variant="contained"
                                                            >
                                                              Add Link
                                                            </Button>
                                                          </Form>
                                                        </Tab>
                                                        <Tab
                                                          eventKey="source-code"
                                                          title="Source Code"
                                                        >
                                                          <Form.Group
                                                            onChange={(e) =>
                                                              handleSaveSourceCode(
                                                                item.id,
                                                                e
                                                              )
                                                            }
                                                            controlId="formFile"
                                                            className="mb-3"
                                                          >
                                                            <Form.Control type="file" />
                                                            <Form.Label
                                                              style={{
                                                                fontSize: 11,
                                                              }}
                                                            >
                                                              <b>Note:</b> Only
                                                              available for
                                                              Python and Ruby
                                                              for now. You can
                                                              upload .py and .rb
                                                              files.
                                                            </Form.Label>
                                                          </Form.Group>
                                                        </Tab>
                                                      </Tabs>
                                                    </div>
                                                  )}
                                                </>
                                              </div>
                                            ) : curriculumvisiblity ==
                                              "article" ? (
                                              <div className="p-3">
                                                <div className="my-3">
                                                  <JoditEditor
                                                    value={article}
                                                    onChange={(e) =>
                                                      setarticle(e)
                                                    }
                                                  />
                                                  <div className="d-flex flex-start my-2">
                                                    <Button
                                                      onClick={(e) =>
                                                        handleSaveArticle(
                                                          item.id
                                                        )
                                                      }
                                                      variant="contained"
                                                    >
                                                      SAVE
                                                    </Button>
                                                  </div>
                                                </div>

                                                {/* List of Resources / External Link */}

                                                <>
                                                  {showDescription ==
                                                    index + i + item.id && (
                                                    <>
                                                      <Button
                                                        onClick={() =>
                                                          setshowDescription(
                                                            null
                                                          )
                                                        }
                                                        className="m-2"
                                                        variant="contained"
                                                      >
                                                        <CloseIcon /> Cancel
                                                      </Button>
                                                      <Button
                                                        onClick={() =>
                                                          setshowResources(null)
                                                        }
                                                        className="m-2"
                                                        variant="outlined"
                                                      >
                                                        <AddIcon /> Resourses
                                                      </Button>
                                                      <JoditEditor
                                                        value={curriculum_desc}
                                                        onChange={(value) =>
                                                          setcurriculum_desc(
                                                            value
                                                          )
                                                        }
                                                      />

                                                      <div className="d-flex my-2">
                                                        <Button
                                                          onClick={() =>
                                                            setshowDescription(
                                                              null
                                                            )
                                                          }
                                                          className="mr-1"
                                                          variant="outlined"
                                                        >
                                                          Cancel
                                                        </Button>
                                                        <Button
                                                          onClick={() =>
                                                            handleSaveDescription(
                                                              item.id
                                                            )
                                                          }
                                                          className="ml-1"
                                                          variant="contained"
                                                        >
                                                          Save
                                                        </Button>
                                                      </div>
                                                    </>
                                                  )}

                                                  {/* Add Description & Resourses */}
                                                  {showMain ==
                                                    index + i + item.id &&
                                                    showDescription !=
                                                      index + i + item.id && (
                                                      <div className="d-flex justify-content-center p-2">
                                                        <Button
                                                          onClick={() =>
                                                            setshowDescription(
                                                              showDescription ==
                                                                index +
                                                                  i +
                                                                  item.id
                                                                ? null
                                                                : index +
                                                                    i +
                                                                    item.id
                                                            )
                                                          }
                                                          className="m-2"
                                                          variant="outlined"
                                                        >
                                                          <AddIcon />{" "}
                                                          Description
                                                        </Button>
                                                        <Button
                                                          onClick={() =>
                                                            setshowResources(
                                                              showResources ==
                                                                index +
                                                                  i +
                                                                  item.id
                                                                ? null
                                                                : index +
                                                                    i +
                                                                    item.id
                                                            )
                                                          }
                                                          className="m-2"
                                                          variant="outlined"
                                                        >
                                                          <AddIcon /> Resourses
                                                        </Button>
                                                      </div>
                                                    )}

                                                  {showResources ==
                                                    index + i + item.id && (
                                                    <div>
                                                      <Button
                                                        onClick={() =>
                                                          setshowResources(null)
                                                        }
                                                        className="m-2"
                                                        variant="contained"
                                                      >
                                                        <CloseIcon /> Cancel
                                                      </Button>

                                                      {/* Tabs */}
                                                      <Tabs
                                                        defaultActiveKey="d-file"
                                                        id="uncontrolled-tab-example"
                                                        className="my-3"
                                                      >
                                                        <Tab
                                                          eventKey="d-file"
                                                          title="Downloadable File"
                                                        >
                                                          <Form.Group
                                                            controlId="formFile"
                                                            className="mb-3"
                                                          >
                                                            {/* (e) =>  */}
                                                            <Form.Control
                                                              onChange={(e) =>
                                                                handleDownloadbaleFile(
                                                                  e,
                                                                  item.id
                                                                )
                                                              }
                                                              type="file"
                                                            />
                                                            <Form.Label
                                                              style={{
                                                                fontSize: 11,
                                                              }}
                                                            >
                                                              <b>Note:</b> A
                                                              resource is for
                                                              any type of
                                                              document that can
                                                              be used to help
                                                              students in the
                                                              lesson. This file
                                                              is going to be
                                                              seen as a lesson
                                                              extra. Make sure
                                                              everything is
                                                              legible and the
                                                              file size is less
                                                              than 1 GiB.
                                                            </Form.Label>
                                                          </Form.Group>
                                                        </Tab>
                                                        <Tab
                                                          eventKey="e-r"
                                                          title="External Resources"
                                                        >
                                                          <Form>
                                                            <Form.Group
                                                              className="mb-3"
                                                              controlId="exampleForm.ControlInput1"
                                                            >
                                                              <Form.Label>
                                                                Title
                                                              </Form.Label>
                                                              <Form.Control
                                                                value={
                                                                  curriclum_ex_res_tile
                                                                }
                                                                onChange={(e) =>
                                                                  setcurriclum_ex_res_tile(
                                                                    e.target
                                                                      .value
                                                                  )
                                                                }
                                                                type="text"
                                                                placeholder="A Descriptive Title"
                                                              />
                                                            </Form.Group>

                                                            <Form.Group
                                                              className="mb-3"
                                                              controlId="exampleForm.ControlInput1"
                                                            >
                                                              <Form.Label>
                                                                URL
                                                              </Form.Label>
                                                              <Form.Control
                                                                value={
                                                                  curriculum_ex_res_link
                                                                }
                                                                onChange={(e) =>
                                                                  setcurriculum_ex_res_link(
                                                                    e.target
                                                                      .value
                                                                  )
                                                                }
                                                                type="text"
                                                                placeholder="https://externallink.com"
                                                              />
                                                            </Form.Group>
                                                            <Button
                                                              onClick={() =>
                                                                handleExternalResources(
                                                                  item.id
                                                                )
                                                              }
                                                              variant="contained"
                                                            >
                                                              Add Link
                                                            </Button>
                                                          </Form>
                                                        </Tab>
                                                        <Tab
                                                          eventKey="source-code"
                                                          title="Source Code"
                                                        >
                                                          <Form.Group
                                                            onChange={(e) =>
                                                              handleSaveSourceCode(
                                                                item.id,
                                                                e
                                                              )
                                                            }
                                                            controlId="formFile"
                                                            className="mb-3"
                                                          >
                                                            <Form.Control type="file" />
                                                            <Form.Label
                                                              style={{
                                                                fontSize: 11,
                                                              }}
                                                            >
                                                              <b>Note:</b> Only
                                                              available for
                                                              Python and Ruby
                                                              for now. You can
                                                              upload .py and .rb
                                                              files.
                                                            </Form.Label>
                                                          </Form.Group>
                                                        </Tab>
                                                      </Tabs>
                                                    </div>
                                                  )}
                                                </>
                                              </div>
                                            ) : (
                                              <div className="d-flex justify-content-center">
                                                <div className="mx-2">
                                                  <Card
                                                    sx={{ width: 120 }}
                                                    elevation={3}
                                                  >
                                                    <CardActionArea
                                                      onClick={() => {
                                                        setshowDescRes(true);
                                                        setcurriculumvisiblity(
                                                          "video"
                                                        );
                                                      }}
                                                      className="d-flex justify-content-center align-items-center text-center"
                                                    >
                                                      <CardContent>
                                                        <PlayCircleIcon fontSize="large" />

                                                        <p className="my-2">
                                                          Video Lecture
                                                        </p>
                                                      </CardContent>
                                                    </CardActionArea>
                                                  </Card>
                                                </div>

                                                <div className="mx-2">
                                                  <Card
                                                    sx={{ width: 120 }}
                                                    elevation={3}
                                                  >
                                                    <CardActionArea
                                                      onClick={() => {
                                                        setshowDescRes(true);
                                                        setcurriculumvisiblity(
                                                          "article"
                                                        );
                                                      }}
                                                      className="d-flex justify-content-center align-items-center text-center"
                                                    >
                                                      <CardContent>
                                                        <ArticleIcon fontSize="large" />

                                                        <p className="my-2">
                                                          Text-based Lecture
                                                        </p>
                                                      </CardContent>
                                                    </CardActionArea>
                                                  </Card>
                                                </div>
                                              </div>
                                            )
                                          ) : (
                                            <></>
                                          ))}

                                        {/* Main Video Card & Text Based Card */}
                                        {item.curriculumItemFiles.length != 0 &&
                                          showMain == index + i + item.id && (
                                            <div className="my-3">
                                              {/* Display Video After Upaed Video */}

                                              <div className="p-3">
                                                {/* Upload Input */}
                                                <Form.Group
                                                  controlId="formFile"
                                                  className="my-3"
                                                >
                                                  <Form.Control
                                                    accept="video/*"
                                                    onChange={(e) => {
                                                      setUploadingVideo(
                                                        index + i + item.id
                                                      );
                                                      handleSaveVideo(
                                                        e.target.files[0],
                                                        item.id
                                                      );
                                                    }}
                                                    placeholder="Add a Video"
                                                    type="file"
                                                  />
                                                  <Form.Label
                                                    style={{ fontSize: 11 }}
                                                  >
                                                    <b>Note:</b> Video file
                                                    should be High Definition
                                                    (HD) quality, with a minimum
                                                    resolution of 720p and
                                                    maximum resolution of 1080p.
                                                  </Form.Label>
                                                </Form.Group>

                                                {item.curriculumItemFiles
                                                  .length > 0 &&
                                                  item.curriculumItemFiles.some(
                                                    (video) =>
                                                      video.filetype === "Video"
                                                  ) &&
                                                  item.curriculumItemFiles
                                                    .filter(
                                                      (video) =>
                                                        video.filetype ===
                                                        "Video"
                                                    )
                                                    .map((video) => (
                                                      <div className="d-flex justify-content-end m-2">
                                                        <p>
                                                          <span className="mx-2">
                                                            Preview Video :
                                                          </span>
                                                          <Switch
                                                            checked={
                                                              video.previewVideo
                                                            }
                                                            onChange={(e) =>
                                                              handleSetVideoPreview(
                                                                e,
                                                                item
                                                              )
                                                            }
                                                          />
                                                        </p>
                                                      </div>
                                                    ))}
                                                {/* After Video Upload */}
                                                <Table striped bordered hover>
                                                  <thead>
                                                    <tr>
                                                      <th>Filename</th>
                                                      <th>Status</th>
                                                      <th>Type</th>
                                                      <th>Actions</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    {item.curriculumItemFiles
                                                      .length > 0 &&
                                                      (item.curriculumItemFiles.some(
                                                        (video) =>
                                                          video.filetype ===
                                                          "Video"
                                                      ) ? (
                                                        item.curriculumItemFiles
                                                          .filter(
                                                            (video) =>
                                                              video.filetype ===
                                                              "Video"
                                                          )
                                                          .map(
                                                            (video, index) => (
                                                              <tr key={index}>
                                                                <td>
                                                                  {uploadingVideo ==
                                                                  index +
                                                                    i +
                                                                    item.id
                                                                    ? uploadingVideoName
                                                                    : video.title}
                                                                </td>
                                                                <td>
                                                                  <td>
                                                                    {uploadingVideo ==
                                                                    index +
                                                                      i +
                                                                      item.id ? (
                                                                      <Badge bg="info">
                                                                        Uploading
                                                                      </Badge>
                                                                    ) : (
                                                                      <Badge bg="success">
                                                                        Completed
                                                                      </Badge>
                                                                    )}
                                                                  </td>
                                                                </td>
                                                                <td>Video</td>
                                                                <td>
                                                                  <Button
                                                                    onClick={() => {
                                                                      handleVideoDelete(
                                                                        video
                                                                      );
                                                                    }}
                                                                    // variant="contained"
                                                                  >
                                                                    <DeleteIcon />
                                                                  </Button>
                                                                </td>
                                                              </tr>
                                                            )
                                                          )
                                                      ) : (
                                                        <p>No Video</p>
                                                      ))}
                                                  </tbody>
                                                </Table>
                                              </div>

                                              {/* <h3>video</h3> */}

                                              {/*  Inputs of External Links / Resouces  */}

                                              {/* List of Resources / External Link */}

                                              <>
                                                {showDescription ==
                                                  index + i + item.id && (
                                                  <>
                                                    <Button
                                                      onClick={() =>
                                                        setshowDescription(null)
                                                      }
                                                      className="m-2"
                                                      variant="contained"
                                                    >
                                                      <CloseIcon /> Cancel
                                                    </Button>
                                                    <Button
                                                      onClick={() =>
                                                        setshowResources(null)
                                                      }
                                                      className="m-2"
                                                      variant="outlined"
                                                    >
                                                      <AddIcon /> Resourses
                                                    </Button>
                                                    <JoditEditor
                                                      value={curriculum_desc}
                                                      onChange={(value) =>
                                                        setcurriculum_desc(
                                                          value
                                                        )
                                                      }
                                                    />

                                                    <div className="d-flex my-2">
                                                      <Button
                                                        onClick={() =>
                                                          setshowDescription(
                                                            null
                                                          )
                                                        }
                                                        className="mx-1"
                                                        variant="outlined"
                                                      >
                                                        Cancel
                                                      </Button>
                                                      <Button
                                                        onClick={() =>
                                                          handleSaveDescription(
                                                            item.id
                                                          )
                                                        }
                                                        className="mx-1"
                                                        variant="contained"
                                                      >
                                                        Save
                                                      </Button>
                                                    </div>
                                                  </>
                                                )}

                                                {/* Add Description & Resourses */}
                                                {showMain ==
                                                  index + i + item.id &&
                                                  showDescription !=
                                                    index + i + item.id && (
                                                    <div className="d-flex justify-content-center p-2">
                                                      <Button
                                                        onClick={() => {
                                                          setcurriculum_desc(
                                                            item.description ==
                                                              "N/A"
                                                              ? ""
                                                              : item.description
                                                          );
                                                          setshowDescription(
                                                            showDescription ==
                                                              index +
                                                                i +
                                                                item.id
                                                              ? null
                                                              : index +
                                                                  i +
                                                                  item.id
                                                          );
                                                        }}
                                                        className="m-2"
                                                        variant="outlined"
                                                      >
                                                        <AddIcon /> Description
                                                      </Button>
                                                      <Button
                                                        onClick={() =>
                                                          setshowResources(
                                                            showResources ==
                                                              index +
                                                                i +
                                                                item.id
                                                              ? null
                                                              : index +
                                                                  i +
                                                                  item.id
                                                          )
                                                        }
                                                        className="m-2"
                                                        variant="outlined"
                                                      >
                                                        <AddIcon /> Resourses
                                                      </Button>
                                                    </div>
                                                  )}

                                                {showResources ==
                                                  index + i + item.id && (
                                                  <div>
                                                    <Button
                                                      onClick={() =>
                                                        setshowResources(null)
                                                      }
                                                      className="m-2"
                                                      variant="contained"
                                                    >
                                                      <CloseIcon /> Cancel
                                                    </Button>

                                                    {/* Tabs */}
                                                    <Tabs
                                                      defaultActiveKey="d-file"
                                                      id="uncontrolled-tab-example"
                                                      className="my-3"
                                                    >
                                                      <Tab
                                                        eventKey="d-file"
                                                        title="Downloadable File"
                                                      >
                                                        <Form.Group
                                                          controlId="formFile"
                                                          className="mb-3"
                                                        >
                                                          {/* (e) =>  */}
                                                          <Form.Control
                                                            onChange={(e) =>
                                                              handleDownloadbaleFile(
                                                                e,
                                                                item.id
                                                              )
                                                            }
                                                            type="file"
                                                          />
                                                          <Form.Label
                                                            style={{
                                                              fontSize: 11,
                                                            }}
                                                          >
                                                            <b>Note:</b> A
                                                            resource is for any
                                                            type of document
                                                            that can be used to
                                                            help students in the
                                                            lesson. This file is
                                                            going to be seen as
                                                            a lesson extra. Make
                                                            sure everything is
                                                            legible and the file
                                                            size is less than 1
                                                            GiB.
                                                          </Form.Label>
                                                        </Form.Group>
                                                      </Tab>
                                                      <Tab
                                                        eventKey="e-r"
                                                        title="External Resources"
                                                      >
                                                        <Form>
                                                          <Form.Group
                                                            className="mb-3"
                                                            controlId="exampleForm.ControlInput1"
                                                          >
                                                            <Form.Label>
                                                              Title
                                                            </Form.Label>
                                                            <Form.Control
                                                              value={
                                                                curriclum_ex_res_tile
                                                              }
                                                              onChange={(e) =>
                                                                setcurriclum_ex_res_tile(
                                                                  e.target.value
                                                                )
                                                              }
                                                              type="text"
                                                              placeholder="A Descriptive Title"
                                                            />
                                                          </Form.Group>

                                                          <Form.Group
                                                            className="mb-3"
                                                            controlId="exampleForm.ControlInput1"
                                                          >
                                                            <Form.Label>
                                                              URL
                                                            </Form.Label>
                                                            <Form.Control
                                                              value={
                                                                curriculum_ex_res_link
                                                              }
                                                              onChange={(e) =>
                                                                setcurriculum_ex_res_link(
                                                                  e.target.value
                                                                )
                                                              }
                                                              type="text"
                                                              placeholder="https://externallink.com"
                                                            />
                                                          </Form.Group>
                                                          <Button
                                                            onClick={() =>
                                                              handleExternalResources(
                                                                item.id
                                                              )
                                                            }
                                                            variant="contained"
                                                          >
                                                            Add Link
                                                          </Button>
                                                        </Form>
                                                      </Tab>
                                                      <Tab
                                                        eventKey="source-code"
                                                        title="Source Code"
                                                      >
                                                        <Form.Group
                                                          onChange={(e) =>
                                                            handleSaveSourceCode(
                                                              item.id,
                                                              e
                                                            )
                                                          }
                                                          controlId="formFile"
                                                          className="mb-3"
                                                        >
                                                          <Form.Control type="file" />
                                                          <Form.Label
                                                            style={{
                                                              fontSize: 11,
                                                            }}
                                                          >
                                                            <b>Note:</b> Only
                                                            available for Python
                                                            and Ruby for now.
                                                            You can upload .py
                                                            and .rb files.
                                                          </Form.Label>
                                                        </Form.Group>
                                                      </Tab>
                                                    </Tabs>
                                                  </div>
                                                )}
                                              </>

                                              {/* Downloadable Files */}
                                              {item.curriculumItemFiles.some(
                                                (downloaditem) =>
                                                  downloaditem.filetype ==
                                                  "Downloadable Items"
                                              ) && (
                                                <div className="p-2">
                                                  <h6>
                                                    <b>Downloadable Files</b>
                                                  </h6>
                                                  <ListGroup>
                                                    {item.curriculumItemFiles.some(
                                                      (downloaditem) =>
                                                        downloaditem.filetype ==
                                                        "Downloadable Items"
                                                    ) ? (
                                                      item.curriculumItemFiles
                                                        .filter(
                                                          (downloaditem) =>
                                                            downloaditem.filetype ==
                                                            "Downloadable Items"
                                                        )
                                                        .map(
                                                          (
                                                            downloaditem,
                                                            index
                                                          ) => (
                                                            <ListGroup.Item
                                                              className="d-flex justify-content-between"
                                                              key={index}
                                                            >
                                                              <span>
                                                                {
                                                                  downloaditem.title
                                                                }
                                                              </span>
                                                              <span>
                                                                <Button
                                                                  onClick={() => {
                                                                    handleDeleteDownloableFilesLecture(
                                                                      downloaditem
                                                                    );
                                                                  }}
                                                                  className="p-0"
                                                                  // variant="contained"
                                                                >
                                                                  <DeleteIcon />
                                                                </Button>
                                                              </span>
                                                            </ListGroup.Item>
                                                          )
                                                        )
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </ListGroup>
                                                </div>
                                              )}

                                              {/* External Resources */}
                                              {item.curriculumItemFiles.some(
                                                (link) =>
                                                  link.filetype ===
                                                  "External Resourses"
                                              ) && (
                                                <div className="p-2">
                                                  <h6>
                                                    <b>External Resources</b>
                                                  </h6>
                                                  <ListGroup>
                                                    {item.curriculumItemFiles
                                                      .filter(
                                                        (link) =>
                                                          link.filetype ===
                                                          "External Resourses"
                                                      )
                                                      .map((link, index) => (
                                                        <ListGroup.Item
                                                          className="d-flex justify-content-between"
                                                          key={index}
                                                        >
                                                          <span>
                                                            <a
                                                              target="_blank"
                                                              href={link.url}
                                                            >
                                                              <LaunchIcon fontSize="10" />
                                                              {link.title}
                                                            </a>
                                                          </span>
                                                          <span
                                                            onClick={() =>
                                                              handleDeleteExternalResources(
                                                                link
                                                              )
                                                            }
                                                          >
                                                            <Button
                                                              className="p-0"
                                                              // variant="contained"
                                                            >
                                                              <DeleteIcon />
                                                            </Button>
                                                          </span>
                                                        </ListGroup.Item>
                                                      ))}
                                                  </ListGroup>
                                                </div>
                                              )}

                                              {/* Source Code */}
                                              {item.curriculumItemFiles.some(
                                                (source) =>
                                                  source.filetype ===
                                                  "Source Code"
                                              ) && (
                                                <div className="p-2">
                                                  <h6>
                                                    <b>Source Code</b>
                                                  </h6>
                                                  <ListGroup>
                                                    {item.curriculumItemFiles.some(
                                                      (source) =>
                                                        source.filetype ===
                                                        "Source Code"
                                                    ) ? (
                                                      item.curriculumItemFiles
                                                        .filter(
                                                          (source) =>
                                                            source.filetype ===
                                                            "Source Code"
                                                        )
                                                        .map(
                                                          (source, index) => (
                                                            <ListGroup.Item
                                                              className="d-flex justify-content-between"
                                                              key={index}
                                                            >
                                                              <span>
                                                                {source.title}
                                                              </span>
                                                              <span>
                                                                <Button
                                                                  onClick={() => {
                                                                    handleDeleteDownloableFilesLecture(
                                                                      source
                                                                    );
                                                                  }}
                                                                  className="p-0"
                                                                  // variant="contained"
                                                                >
                                                                  <DeleteIcon />
                                                                </Button>
                                                              </span>
                                                            </ListGroup.Item>
                                                          )
                                                        )
                                                    ) : (
                                                      // <p>No Source Code</p>
                                                      <></>
                                                    )}
                                                  </ListGroup>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                      </Card>
                                    </>
                                  )}
                                </>
                              )}

                              {/* Quiz */}
                              {item.type == "Quiz" &&
                                (showEditQuizInput == index + i + item.id ? (
                                  <div>
                                    <div>
                                      <Form.Control
                                        className="mx-1"
                                        value={updateQuizName}
                                        onChange={(e) =>
                                          setupdateQuizName(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Quiz Name"
                                      />

                                      <Form.Group
                                        className="my-3"
                                        controlId="exampleForm.ControlTextarea1"
                                      >
                                        <Form.Control
                                          value={updateQuizDescription}
                                          onChange={(e) =>
                                            setupdateQuizDescription(
                                              e.target.value
                                            )
                                          }
                                          as="textarea"
                                          rows={3}
                                        />
                                      </Form.Group>
                                    </div>

                                    <Button
                                      onClick={(e) => {
                                        if (
                                          showEditQuizInput ==
                                          index + i + item.id
                                        ) {
                                          setshowEditQuizInput(null);
                                          setupdateQuizName("");
                                        } else {
                                          setshowEditQuizInput(
                                            index + i + item.id
                                          );
                                          setupdateQuizName(
                                            section.courseSection.sectionName
                                          );
                                        }
                                      }}
                                      className="mx-1"
                                      variant="outlined"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={(e) => {
                                        handleUpdateQuizName(item, section);
                                      }}
                                      className="mx-1"
                                      variant="contained"
                                    >
                                      Save
                                    </Button>
                                  </div>
                                ) : (
                                  <Card
                                    key={index + i + item.id}
                                    className="my-3"
                                  >
                                    <div className="d-flex justify-content-between align-items-center p-2">
                                      <span>
                                        <Typography>
                                          <CheckCircleIcon fontSize="small" />
                                          {i + 1}. Quiz: {newCounters.Quiz}{" "}
                                          <QuizIcon sx={{ fontSize: 15 }} />{" "}
                                          {item.title}
                                          <span className="mx-5">
                                            <EditIcon
                                              style={syllabusIcon}
                                              onClick={(e) => {
                                                if (
                                                  showEditQuizInput ==
                                                  index + i + item.id
                                                ) {
                                                  setshowEditQuizInput(null);
                                                  setupdateQuizName("");
                                                  setupdateQuizDescription("");
                                                } else {
                                                  setshowEditQuizInput(
                                                    index + i + item.id
                                                  );
                                                  setupdateQuizName(item.title);
                                                  setupdateQuizDescription(
                                                    item.description
                                                  );
                                                  console.log(item);
                                                }
                                              }}
                                            />
                                            <DeleteIcon
                                              style={syllabusIcon}
                                              onClick={() =>
                                                handleQuizDelete(item)
                                              }
                                            />
                                          </span>
                                        </Typography>
                                      </span>
                                      <span>
                                        {showContentAdd ==
                                        index + i + item.id ? (
                                          <Button
                                            onClick={() => {
                                              setshowDescRes(true);
                                              setshowMain(null);
                                              console.log(index + i + item.id);
                                              setshowContentAdd(null);
                                              setcurriculumvisiblitymc("");
                                              // handleContentshow()
                                            }}
                                            className="mx-2"
                                            size="small"
                                            variant="contained"
                                          >
                                            <CloseIcon /> Cancel
                                          </Button>
                                        ) : (
                                          <Button
                                            onClick={() => {
                                              setExpandedIndex(
                                                isExpanded
                                                  ? null
                                                  : index + i + item.id
                                              );
                                              setshowMain(
                                                showMain == index + i + item.id
                                                  ? null
                                                  : index + i + item.id
                                              );
                                              setshowContentAdd(
                                                showContentAdd ==
                                                  index + i + item.id
                                                  ? null
                                                  : index + i + item.id
                                              );
                                              handleFillQuiz(item);
                                            }}
                                            className="mx-2"
                                            size="small"
                                            variant="outlined"
                                          >
                                            {item.getQuizs[0] == null ? (
                                              <>
                                                <AddIcon /> Question
                                              </>
                                            ) : (
                                              <>
                                                <EditIcon /> Edit
                                              </>
                                            )}
                                          </Button>
                                        )}
                                      </span>
                                    </div>

                                    {/* Landing Content */}
                                    {showContentAdd == index + i + item.id &&
                                      (item.getQuizs.length != 0 ? (
                                        <div>
                                          {/* MCQ FORM */}
                                          <Form className="p-2">
                                            <Form.Group
                                              className="mb-3"
                                              controlId="exampleForm.ControlTextarea1"
                                            >
                                              <Form.Label>Question</Form.Label>
                                              <Form.Control
                                                value={question}
                                                onChange={(e) =>
                                                  setquestion(e.target.value)
                                                }
                                                as="textarea"
                                                rows={3}
                                              />
                                            </Form.Group>

                                            <Form.Label>
                                              Answers (Please select correct
                                              answer)
                                            </Form.Label>
                                            <RadioGroup
                                              name="group1"
                                              onChange={(e) =>
                                                setanswerOption(e.target.value)
                                              }
                                              value={answerOption}
                                            >
                                              <div className="row">
                                                {/* 1 */}
                                                <div className="col-md-1">
                                                  <Radio
                                                    value={answerOptionOne}
                                                    onChange={(e) =>
                                                      setanswerOptionOne(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div className="col-md-11 mb-3">
                                                  <Form.Group
                                                    className="mb-3"
                                                    controlId="exampleForm.ControlTextarea1"
                                                  >
                                                    <Form.Control
                                                      value={answerOne}
                                                      onChange={(e) =>
                                                        setanswerOne(
                                                          e.target.value
                                                        )
                                                      }
                                                      as="textarea"
                                                      rows={3}
                                                    />
                                                  </Form.Group>
                                                  <Form.Control
                                                    value={
                                                      answerExplainOne == "null"
                                                        ? ""
                                                        : answerExplainOne
                                                    }
                                                    onChange={(e) =>
                                                      setanswerExplainOne(
                                                        e.target.value
                                                      )
                                                    }
                                                    type="text"
                                                    placeholder="Explain why this is or isn't an answer"
                                                  />
                                                </div>

                                                {/* 2 */}
                                                <div className="col-md-1">
                                                  <Radio
                                                    value={answerOptionTwo}
                                                    onChange={(e) =>
                                                      setanswerOptionTwo(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div className="col-md-11 mb-3">
                                                  <Form.Group
                                                    className="mb-3"
                                                    controlId="exampleForm.ControlTextarea1"
                                                  >
                                                    <Form.Control
                                                      value={answerTwo}
                                                      onChange={(e) =>
                                                        setanswerTwo(
                                                          e.target.value
                                                        )
                                                      }
                                                      as="textarea"
                                                      rows={3}
                                                    />
                                                  </Form.Group>
                                                  <Form.Control
                                                    value={
                                                      answerExplainTwo == "null"
                                                        ? ""
                                                        : answerExplainTwo
                                                    }
                                                    onChange={(e) =>
                                                      setanswerExplainTwo(
                                                        e.target.value
                                                      )
                                                    }
                                                    type="text"
                                                    placeholder="Explain why this is or isn't an answer"
                                                  />
                                                </div>

                                                {/* 3 */}
                                                <div className="col-md-1">
                                                  <Radio
                                                    value={answerOptionThree}
                                                    onChange={(e) =>
                                                      setanswerOptionThree(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                </div>

                                                <div className="col-md-11 mb-3">
                                                  <Form.Group
                                                    className="mb-3"
                                                    controlId="exampleForm.ControlTextarea1"
                                                  >
                                                    <Form.Control
                                                      value={answerThree}
                                                      onChange={(e) =>
                                                        setanswerThree(
                                                          e.target.value
                                                        )
                                                      }
                                                      as="textarea"
                                                      rows={3}
                                                    />
                                                  </Form.Group>
                                                  <Form.Control
                                                    value={
                                                      answerExplainThree ==
                                                      "null"
                                                        ? ""
                                                        : answerExplainThree
                                                    }
                                                    onChange={(e) =>
                                                      setanswerExplainThree(
                                                        e.target.value
                                                      )
                                                    }
                                                    type="text"
                                                    placeholder="Explain why this is or isn't an answer"
                                                  />
                                                </div>

                                                {/* 4 */}
                                                <div className="col-md-1">
                                                  <Radio
                                                    value={answerOptionFour}
                                                    onChange={(e) =>
                                                      setanswerOptionFour(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                </div>

                                                <div className="col-md-11 mb-3">
                                                  <Form.Group
                                                    className="mb-3"
                                                    controlId="exampleForm.ControlTextarea1"
                                                  >
                                                    <Form.Control
                                                      value={answerFour}
                                                      onChange={(e) =>
                                                        setanswerFour(
                                                          e.target.value
                                                        )
                                                      }
                                                      as="textarea"
                                                      rows={3}
                                                    />
                                                  </Form.Group>
                                                  <Form.Control
                                                    value={
                                                      answerExplainFour ==
                                                      "null"
                                                        ? ""
                                                        : answerExplainFour
                                                    }
                                                    onChange={(e) =>
                                                      setanswerExplainFour(
                                                        e.target.value
                                                      )
                                                    }
                                                    type="text"
                                                    placeholder="Explain why this is or isn't an answer"
                                                  />
                                                </div>

                                                {/* 5*/}
                                                <div className="col-md-1">
                                                  <Radio
                                                    value={answerOptionFive}
                                                    onChange={(e) =>
                                                      setanswerOptionFive(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                </div>

                                                <div className="col-md-11 mb-3">
                                                  <Form.Group
                                                    className="mb-3"
                                                    controlId="exampleForm.ControlTextarea1"
                                                  >
                                                    <Form.Control
                                                      value={answerFive}
                                                      onChange={(e) =>
                                                        setanswerFive(
                                                          e.target.value
                                                        )
                                                      }
                                                      as="textarea"
                                                      rows={3}
                                                    />
                                                  </Form.Group>
                                                  <Form.Control
                                                    value={
                                                      answerExplainFive ==
                                                      "null"
                                                        ? ""
                                                        : answerExplainFive
                                                    }
                                                    onChange={(e) =>
                                                      setanswerExplainFive(
                                                        e.target.value
                                                      )
                                                    }
                                                    type="text"
                                                    placeholder="Explain why this is or isn't an answer"
                                                  />
                                                </div>
                                              </div>
                                            </RadioGroup>

                                            <div className="d-flex justify-content-end">
                                              <Button
                                                onClick={() =>
                                                  handleQuestionsAnswer(item)
                                                }
                                                variant="outlined"
                                              >
                                                SAVE
                                              </Button>
                                            </div>
                                          </Form>
                                        </div>
                                      ) : (
                                        curriculumvisiblitymc != "mc" && (
                                          <div className="d-flex justify-content-center">
                                            <div className="mx-2">
                                              <Card
                                                sx={{ width: 140 }}
                                                elevation={3}
                                              >
                                                <CardActionArea
                                                  onClick={() => {
                                                    setExpandedIndex(
                                                      isExpanded
                                                        ? null
                                                        : index + i + item.id
                                                    );
                                                    setshowDescRes(true);
                                                    setcurriculumvisiblitymc(
                                                      "mc"
                                                    );
                                                    setshowMain(
                                                      index + i + item.id
                                                    );
                                                    setshowContentAdd(
                                                      index + i + item.id
                                                    );
                                                    handleFillQuiz(item);
                                                  }}
                                                  className="d-flex justify-content-center align-items-center text-center"
                                                >
                                                  <CardContent>
                                                    <HelpIcon fontSize="large" />
                                                    <p className="my-2">
                                                      Multiple Choice
                                                    </p>
                                                  </CardContent>
                                                </CardActionArea>
                                              </Card>
                                            </div>
                                          </div>
                                        )
                                      ))}

                                    {showMain == index + i + item.id &&
                                      curriculumvisiblitymc == "mc" && (
                                        <div>
                                          {/* MCQ FORM */}
                                          <Form className="p-2">
                                            <Form.Group
                                              className="mb-3"
                                              controlId="exampleForm.ControlTextarea1"
                                            >
                                              <Form.Label>Question</Form.Label>
                                              <Form.Control
                                                value={question}
                                                onChange={(e) =>
                                                  setquestion(e.target.value)
                                                }
                                                as="textarea"
                                                rows={3}
                                              />
                                            </Form.Group>

                                            <Form.Label>Answers</Form.Label>
                                            <RadioGroup
                                              name="group1"
                                              onChange={(e) =>
                                                setanswerOption(e.target.value)
                                              }
                                              value={answerOption}
                                            >
                                              <div className="row">
                                                {/* 1 */}
                                                <div className="col-md-1">
                                                  <Radio
                                                    value={answerOptionOne}
                                                    onChange={(e) =>
                                                      setanswerOptionOne(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div className="col-md-11 mb-3">
                                                  <Form.Group
                                                    className="mb-3"
                                                    controlId="exampleForm.ControlTextarea1"
                                                  >
                                                    <Form.Control
                                                      value={answerOne}
                                                      onChange={(e) =>
                                                        setanswerOne(
                                                          e.target.value
                                                        )
                                                      }
                                                      as="textarea"
                                                      rows={3}
                                                    />
                                                  </Form.Group>
                                                  <Form.Control
                                                    value={
                                                      answerExplainOne == "null"
                                                        ? ""
                                                        : answerExplainOne
                                                    }
                                                    onChange={(e) =>
                                                      setanswerExplainOne(
                                                        e.target.value
                                                      )
                                                    }
                                                    type="text"
                                                    placeholder="Explain why this is or isn't the best answer"
                                                  />
                                                </div>

                                                {/* 2 */}
                                                <div className="col-md-1">
                                                  <Radio
                                                    value={answerOptionTwo}
                                                    onChange={(e) =>
                                                      setanswerOptionTwo(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div className="col-md-11 mb-3">
                                                  <Form.Group
                                                    className="mb-3"
                                                    controlId="exampleForm.ControlTextarea1"
                                                  >
                                                    <Form.Control
                                                      value={answerTwo}
                                                      onChange={(e) =>
                                                        setanswerTwo(
                                                          e.target.value
                                                        )
                                                      }
                                                      as="textarea"
                                                      rows={3}
                                                    />
                                                  </Form.Group>
                                                  <Form.Control
                                                    value={
                                                      answerExplainTwo == "null"
                                                        ? ""
                                                        : answerExplainTwo
                                                    }
                                                    onChange={(e) =>
                                                      setanswerExplainTwo(
                                                        e.target.value
                                                      )
                                                    }
                                                    type="text"
                                                    placeholder="Explain why this is or isn't the best answer"
                                                  />
                                                </div>

                                                {/* 3 */}
                                                <div className="col-md-1">
                                                  <Radio
                                                    value={answerOptionThree}
                                                    onChange={(e) =>
                                                      setanswerOptionThree(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                </div>

                                                <div className="col-md-11 mb-3">
                                                  <Form.Group
                                                    className="mb-3"
                                                    controlId="exampleForm.ControlTextarea1"
                                                  >
                                                    <Form.Control
                                                      value={answerThree}
                                                      onChange={(e) =>
                                                        setanswerThree(
                                                          e.target.value
                                                        )
                                                      }
                                                      as="textarea"
                                                      rows={3}
                                                    />
                                                  </Form.Group>
                                                  <Form.Control
                                                    value={
                                                      answerExplainThree ==
                                                      "null"
                                                        ? ""
                                                        : answerExplainThree
                                                    }
                                                    onChange={(e) =>
                                                      setanswerExplainThree(
                                                        e.target.value
                                                      )
                                                    }
                                                    type="text"
                                                    placeholder="Explain why this is or isn't the best answer"
                                                  />
                                                </div>

                                                {/* 4 */}
                                                <div className="col-md-1">
                                                  <Radio
                                                    value={answerOptionFour}
                                                    onChange={(e) =>
                                                      setanswerOptionFour(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                </div>

                                                <div className="col-md-11 mb-3">
                                                  <Form.Group
                                                    className="mb-3"
                                                    controlId="exampleForm.ControlTextarea1"
                                                  >
                                                    <Form.Control
                                                      value={answerFour}
                                                      onChange={(e) =>
                                                        setanswerFour(
                                                          e.target.value
                                                        )
                                                      }
                                                      as="textarea"
                                                      rows={3}
                                                    />
                                                  </Form.Group>
                                                  <Form.Control
                                                    value={
                                                      answerExplainFour ==
                                                      "null"
                                                        ? ""
                                                        : answerExplainFour
                                                    }
                                                    onChange={(e) =>
                                                      setanswerExplainFour(
                                                        e.target.value
                                                      )
                                                    }
                                                    type="text"
                                                    placeholder="Explain why this is or isn't the best answer"
                                                  />
                                                </div>

                                                {/* 5*/}
                                                <div className="col-md-1">
                                                  <Radio
                                                    value={answerOptionFive}
                                                    onChange={(e) =>
                                                      setanswerOptionFive(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                </div>

                                                <div className="col-md-11 mb-3">
                                                  <Form.Group
                                                    className="mb-3"
                                                    controlId="exampleForm.ControlTextarea1"
                                                  >
                                                    <Form.Control
                                                      value={answerFive}
                                                      onChange={(e) =>
                                                        setanswerFive(
                                                          e.target.value
                                                        )
                                                      }
                                                      as="textarea"
                                                      rows={3}
                                                    />
                                                  </Form.Group>
                                                  <Form.Control
                                                    value={
                                                      answerExplainFive ==
                                                      "null"
                                                        ? ""
                                                        : answerExplainFive
                                                    }
                                                    onChange={(e) =>
                                                      setanswerExplainFive(
                                                        e.target.value
                                                      )
                                                    }
                                                    type="text"
                                                    placeholder="Explain why this is or isn't the best answer"
                                                  />
                                                </div>
                                              </div>
                                            </RadioGroup>

                                            <div className="d-flex justify-content-end">
                                              <Button
                                                onClick={() =>
                                                  handleQuestionsAnswer(item)
                                                }
                                                variant="outlined"
                                              >
                                                SAVE
                                              </Button>
                                            </div>
                                          </Form>
                                        </div>
                                      )}
                                  </Card>
                                ))}

                              {/* Assignment */}
                              {item.type == "Assignment" &&
                                (showEditAssignmentInput ==
                                index + i + item.id ? (
                                  <div className="d-flex">
                                    <Form.Control
                                      className="mx-1"
                                      value={updateAssignmentName}
                                      onChange={(e) =>
                                        setupdateAssignmentName(e.target.value)
                                      }
                                      type="text"
                                      placeholder="Assignment Name"
                                    />

                                    <Button
                                      onClick={(e) => {
                                        if (
                                          showEditAssignmentInput ==
                                          index + i + item.id
                                        ) {
                                          setshowEditAssignmentInput(null);
                                          setupdateAssignmentName("");
                                        } else {
                                          setshowEditAssignmentInput(
                                            index + i + item.id
                                          );
                                          setupdateAssignmentName(item.title);
                                        }
                                      }}
                                      className="mx-1"
                                      variant="outlined"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={(e) => {
                                        handleUpdateAssignmentName(
                                          item,
                                          section
                                        );
                                      }}
                                      className="mx-1"
                                      variant="contained"
                                    >
                                      Save
                                    </Button>
                                  </div>
                                ) : (
                                  <Card
                                    key={index + i + item.id}
                                    className="my-3"
                                  >
                                    <div className="d-flex justify-content-between align-items-center p-2">
                                      <span>
                                        <Typography>
                                          <CheckCircleIcon fontSize="small" />
                                          {i + 1}. Assignment:{" "}
                                          {newCounters.Assignment}{" "}
                                          <AssessmentIcon
                                            sx={{ fontSize: 15 }}
                                          />{" "}
                                          {item.title}
                                          <span className="mx-5">
                                            <EditIcon
                                              style={syllabusIcon}
                                              onClick={(e) => {
                                                if (
                                                  showEditAssignmentInput ==
                                                  index + i + item.id
                                                ) {
                                                  setshowEditAssignmentInput(
                                                    null
                                                  );
                                                  setupdateAssignmentName("");
                                                } else {
                                                  setshowEditAssignmentInput(
                                                    index + i + item.id
                                                  );
                                                  setupdateAssignmentName(
                                                    item.title
                                                  );
                                                }
                                              }}
                                            />
                                            <DeleteIcon
                                              style={syllabusIcon}
                                              onClick={() =>
                                                handleAssignmentDelete(item)
                                              }
                                            />
                                          </span>
                                        </Typography>
                                      </span>

                                      <span>
                                        {showContentAdd ==
                                        index + i + item.id ? (
                                          <Button
                                            onClick={() => {
                                              setshowDescRes(true);
                                              setshowMain(null);
                                              console.log(index + i + item.id);
                                              setshowContentAdd(null);
                                              setcurriculumvisiblitymc("");
                                              // handleContentshow()
                                            }}
                                            className="mx-2"
                                            size="small"
                                            variant="contained"
                                          >
                                            <CloseIcon /> Cancel
                                          </Button>
                                        ) : (
                                          <Button
                                            onClick={() => {
                                              setExpandedIndex(
                                                isExpanded
                                                  ? null
                                                  : index + i + item.id
                                              );
                                              setshowMain(
                                                showMain == index + i + item.id
                                                  ? null
                                                  : index + i + item.id
                                              );
                                              setshowContentAdd(
                                                showContentAdd ==
                                                  index + i + item.id
                                                  ? null
                                                  : index + i + item.id
                                              );

                                              console.log(item);
                                              setmainSectionID(
                                                section.courseSection.sectionId
                                              );

                                              // Fill Data
                                              setAssignmentCode(
                                                item.getAssignment[0]
                                                  .assignmentCode
                                              );
                                              setAssignmentTitle(item.title);
                                              setAssignmentDesc(
                                                item.description
                                              );
                                              setAssignmentDuration(
                                                item.getAssignment[0].duration
                                              );
                                              setAssignmentInstructors(
                                                item.getAssignment[0]
                                                  .instructions
                                              );
                                              setAssignmentExLink(
                                                item.getAssignment[0]
                                                  .solutionsExternalLink
                                              );

                                              setAssignmentQuestion(
                                                item.getAssignment[0].question
                                              );
                                              setAssignmentQuestionLink(
                                                item.getAssignment[0]
                                                  .questionExternalLink
                                              );

                                              setAssignmentSolutions(
                                                item.getAssignment[0].solutions
                                              );
                                              setAssignmentSolutionsExLink(
                                                item.getAssignment[0]
                                                  .solutionsExternalLink
                                              );
                                            }}
                                            className="mx-2"
                                            size="small"
                                            variant="outlined"
                                          >
                                            <CreateIcon /> Edit
                                          </Button>
                                        )}
                                      </span>
                                    </div>

                                    {showMain == index + i + item.id && (
                                      <div className="p-3">
                                        <Tabs
                                          defaultActiveKey="assignment"
                                          id="uncontrolled-tab-example"
                                          className="mb-3"
                                        >
                                          <Tab
                                            eventKey="assignment"
                                            title="Assignment information and Instructions"
                                          >
                                            <Form>
                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control
                                                  value={AssignmentTitle}
                                                  onChange={(e) =>
                                                    setAssignmentTitle(
                                                      e.target.value
                                                    )
                                                  }
                                                  type="text"
                                                  placeholder="Assignment Title"
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlTextarea1"
                                              >
                                                <Form.Label>
                                                  Description
                                                </Form.Label>
                                                <Form.Control
                                                  value={AssignmentDesc}
                                                  onChange={(e) =>
                                                    setAssignmentDesc(
                                                      e.target.value
                                                    )
                                                  }
                                                  as="textarea"
                                                  rows={2}
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  Duration(HH:MM)
                                                </Form.Label>
                                                <Form.Control
                                                  value={AssignmentDuration}
                                                  onChange={(e) =>
                                                    setAssignmentDuration(
                                                      e.target.value
                                                    )
                                                  }
                                                  type="text"
                                                  placeholder="00:00"
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlTextarea1"
                                              >
                                                <Form.Label>
                                                  Instructions
                                                </Form.Label>
                                                <Form.Control
                                                  value={AssignmentInstructors}
                                                  onChange={(e) =>
                                                    setAssignmentInstructors(
                                                      e.target.value
                                                    )
                                                  }
                                                  as="textarea"
                                                  rows={3}
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  Upload Video
                                                </Form.Label>

                                                {item.getAssignment[0]
                                                  .assignmentVideo != "" && (
                                                  <ListGroup className="my-2">
                                                    <ListGroup.Item
                                                      className="d-flex justify-content-between"
                                                      key={index}
                                                    >
                                                      <span>
                                                        {
                                                          item.getAssignment[0]
                                                            .assignmentVideo
                                                        }
                                                      </span>
                                                      <span>
                                                        <Button
                                                          onClick={() => {
                                                            let video = {
                                                              url: item
                                                                .getAssignment[0]
                                                                .assignmentVideo,
                                                            };
                                                            handleVideoDelete(
                                                              video
                                                            );
                                                          }}
                                                          className="p-0"
                                                          // variant="contained"
                                                        >
                                                          <DeleteIcon />
                                                        </Button>
                                                      </span>
                                                    </ListGroup.Item>
                                                  </ListGroup>
                                                )}

                                                <Form.Control
                                                  accept="video/*"
                                                  onChange={(e) => {
                                                    setAssignmentVideo(
                                                      e.target.files[0]
                                                    );
                                                  }}
                                                  type="file"
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlTextarea1"
                                              >
                                                <Form.Label>
                                                  Downloadable Resourses
                                                </Form.Label>

                                                {item.getAssignment[0]
                                                  .downloadableResource !=
                                                  "" && (
                                                  <ListGroup className="my-2">
                                                    <ListGroup.Item
                                                      className="d-flex justify-content-between"
                                                      key={index}
                                                    >
                                                      <span>
                                                        {
                                                          item.getAssignment[0]
                                                            .downloadableResource
                                                        }
                                                      </span>
                                                      <span>
                                                        <Button
                                                          onClick={() => {
                                                            let Resourceitem = {
                                                              url: item
                                                                .getAssignment[0]
                                                                .downloadableResource,
                                                            };
                                                            handleDeleteDownloableFilesLecture(
                                                              Resourceitem
                                                            );
                                                          }}
                                                          className="p-0"
                                                          // variant="contained"
                                                        >
                                                          <DeleteIcon />
                                                        </Button>
                                                      </span>
                                                    </ListGroup.Item>
                                                  </ListGroup>
                                                )}

                                                <Form.Control
                                                  onChange={(e) =>
                                                    setAssignmentDResourses(
                                                      e.target.files[0]
                                                    )
                                                  }
                                                  type="file"
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  External Link
                                                </Form.Label>
                                                <Form.Control
                                                  value={AssignmentExLink}
                                                  onChange={(e) =>
                                                    setAssignmentExLink(
                                                      e.target.value
                                                    )
                                                  }
                                                  type="text"
                                                  placeholder="https://externallink.com"
                                                />
                                              </Form.Group>
                                            </Form>
                                          </Tab>

                                          <Tab
                                            eventKey="questions"
                                            title="Questions"
                                          >
                                            <Form>
                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlTextarea1"
                                              >
                                                <Form.Label>
                                                  Questions
                                                </Form.Label>
                                                <Form.Control
                                                  value={AssignmentQuestion}
                                                  onChange={(e) =>
                                                    setAssignmentQuestion(
                                                      e.target.value
                                                    )
                                                  }
                                                  as="textarea"
                                                  rows={2}
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  Upload Questions
                                                </Form.Label>
                                                {item.getAssignment[0]
                                                  .questionSheet != "" && (
                                                  <ListGroup className="my-2">
                                                    <ListGroup.Item
                                                      className="d-flex justify-content-between"
                                                      key={index}
                                                    >
                                                      <span>
                                                        {
                                                          item.getAssignment[0]
                                                            .questionSheet
                                                        }
                                                      </span>
                                                      <span>
                                                        <Button
                                                          onClick={() => {
                                                            let Resourceitem = {
                                                              url: item
                                                                .getAssignment[0]
                                                                .questionSheet,
                                                            };
                                                            handleDeleteDownloableFilesLecture(
                                                              Resourceitem
                                                            );
                                                          }}
                                                          className="p-0"
                                                          // variant="contained"
                                                        >
                                                          <DeleteIcon />
                                                        </Button>
                                                      </span>
                                                    </ListGroup.Item>
                                                  </ListGroup>
                                                )}

                                                <Form.Control
                                                  onChange={(e) =>
                                                    setAssignmentQuestionFile(
                                                      e.target.files[0]
                                                    )
                                                  }
                                                  type="file"
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  External Link
                                                </Form.Label>
                                                <Form.Control
                                                  value={AssignmentQuestionLink}
                                                  onChange={(e) =>
                                                    setAssignmentQuestionLink(
                                                      e.target.value
                                                    )
                                                  }
                                                  type="text"
                                                  placeholder="https://externallink.com"
                                                />
                                              </Form.Group>
                                            </Form>
                                          </Tab>
                                          <Tab
                                            eventKey="solutions"
                                            title="Solutions"
                                          >
                                            <Form>
                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlTextarea1"
                                              >
                                                <Form.Label>
                                                  Solutions
                                                </Form.Label>
                                                <Form.Control
                                                  value={AssignmentSolutions}
                                                  onChange={(e) =>
                                                    setAssignmentSolutions(
                                                      e.target.value
                                                    )
                                                  }
                                                  as="textarea"
                                                  rows={2}
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  Upload Video
                                                </Form.Label>
                                                {item.getAssignment[0]
                                                  .solutionVideo != "" && (
                                                  <ListGroup className="my-2">
                                                    <ListGroup.Item
                                                      className="d-flex justify-content-between"
                                                      key={index}
                                                    >
                                                      <span>
                                                        {
                                                          item.getAssignment[0]
                                                            .solutionVideo
                                                        }
                                                      </span>
                                                      <span>
                                                        <Button
                                                          onClick={() => {
                                                            let video = {
                                                              url: item
                                                                .getAssignment[0]
                                                                .solutionVideo,
                                                            };
                                                            handleVideoDelete(
                                                              video
                                                            );
                                                          }}
                                                          className="p-0"
                                                          // variant="contained"
                                                        >
                                                          <DeleteIcon />
                                                        </Button>
                                                      </span>
                                                    </ListGroup.Item>
                                                  </ListGroup>
                                                )}

                                                <Form.Control
                                                  accept="video/*"
                                                  onChange={(e) =>
                                                    setAssignmentSolutionsVideo(
                                                      e.target.files[0]
                                                    )
                                                  }
                                                  type="file"
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  Upload Solutions
                                                </Form.Label>
                                                {item.getAssignment[0]
                                                  .solutionsSheet != "" && (
                                                  <ListGroup className="my-2">
                                                    <ListGroup.Item
                                                      className="d-flex justify-content-between"
                                                      key={index}
                                                    >
                                                      <span>
                                                        {
                                                          item.getAssignment[0]
                                                            .solutionsSheet
                                                        }
                                                      </span>
                                                      <span>
                                                        <Button
                                                          onClick={() => {
                                                            let Resourceitem = {
                                                              url: item
                                                                .getAssignment[0]
                                                                .solutionsSheet,
                                                            };
                                                            handleDeleteDownloableFilesLecture(
                                                              Resourceitem
                                                            );
                                                          }}
                                                          className="p-0"
                                                          // variant="contained"
                                                        >
                                                          <DeleteIcon />
                                                        </Button>
                                                      </span>
                                                    </ListGroup.Item>
                                                  </ListGroup>
                                                )}

                                                <Form.Control
                                                  onChange={(e) =>
                                                    setAssignmentSolutionsFile(
                                                      e.target.files[0]
                                                    )
                                                  }
                                                  type="file"
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  External Link
                                                </Form.Label>
                                                <Form.Control
                                                  value={
                                                    AssignmentSolutionsExLink
                                                  }
                                                  onChange={(e) =>
                                                    setAssignmentSolutionsExLink(
                                                      e.target.value
                                                    )
                                                  }
                                                  type="text"
                                                  placeholder="https://externallink.com"
                                                />
                                              </Form.Group>

                                              <Button
                                                onClick={() =>
                                                  setshowAssignmentInput(null)
                                                }
                                                variant="outlined"
                                              >
                                                Cancel
                                              </Button>
                                              {btnLoadingAssignment ? (
                                                <Button
                                                  className="mx-1"
                                                  variant="contained"
                                                >
                                                  Loading..
                                                </Button>
                                              ) : (
                                                <Button
                                                  onClick={handleAssignmentSave}
                                                  className="mx-1"
                                                  variant="contained"
                                                >
                                                  Save Assignment
                                                </Button>
                                              )}
                                            </Form>
                                          </Tab>
                                        </Tabs>
                                      </div>
                                    )}
                                  </Card>
                                ))}

                              {/* Practice test */}
                              {item.type == "Practice Test" &&
                                (showEditPraticeTestInput ==
                                index + i + item.id ? (
                                  <div className="d-flex">
                                    <Form.Control
                                      className="mx-1"
                                      value={updatePraticeTestName}
                                      onChange={(e) =>
                                        setupdatePraticeTestName(e.target.value)
                                      }
                                      type="text"
                                      placeholder="Pratice test Name"
                                    />

                                    <Button
                                      onClick={(e) => {
                                        if (
                                          showEditPraticeTestInput ==
                                          index + i + item.id
                                        ) {
                                          setshowEditPraticeTestInput(null);
                                          setupdatePraticeTestName("");
                                        } else {
                                          setshowEditPraticeTestInput(
                                            index + i + item.id
                                          );
                                          setupdatePraticeTestName(item.title);
                                        }
                                      }}
                                      className="mx-1"
                                      variant="outlined"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={(e) => {
                                        handleUpdatePraticeTestName(
                                          item,
                                          section
                                        );
                                      }}
                                      className="mx-1"
                                      variant="contained"
                                    >
                                      Save
                                    </Button>
                                  </div>
                                ) : (
                                  <Card
                                    key={index + i + item.id}
                                    className="my-3"
                                  >
                                    <div className="d-flex justify-content-between align-items-center p-2">
                                      <span>
                                        <Typography>
                                          <CheckCircleIcon fontSize="small" />
                                          {i + 1}. Practice Test:{" "}
                                          {newCounters.PracticeTest}{" "}
                                          <BugReportIcon
                                            sx={{ fontSize: 15 }}
                                          />{" "}
                                          {item.title}
                                          <span className="mx-5">
                                            <EditIcon
                                              style={syllabusIcon}
                                              onClick={(e) => {
                                                if (
                                                  showEditPraticeTestInput ==
                                                  index + i + item.id
                                                ) {
                                                  setshowEditPraticeTestInput(
                                                    null
                                                  );
                                                  setupdatePraticeTestName("");
                                                } else {
                                                  setshowEditPraticeTestInput(
                                                    index + i + item.id
                                                  );
                                                  setupdatePraticeTestName(
                                                    item.title
                                                  );
                                                }
                                              }}
                                            />
                                            <DeleteIcon
                                              style={syllabusIcon}
                                              onClick={() =>
                                                handlePracticeTestDelete(item)
                                              }
                                            />
                                          </span>
                                        </Typography>
                                      </span>
                                      <span>
                                        {showContentAdd ==
                                        index + i + item.id ? (
                                          <Button
                                            onClick={() => {
                                              setshowDescRes(true);
                                              setshowMain(null);
                                              console.log(index + i + item.id);
                                              setshowContentAdd(null);
                                              setcurriculumvisiblitymc("");
                                              // handleContentshow()
                                            }}
                                            className="mx-2"
                                            size="small"
                                            variant="contained"
                                          >
                                            <CloseIcon /> Cancel
                                          </Button>
                                        ) : (
                                          <Button
                                            onClick={() => {
                                              setExpandedIndex(
                                                isExpanded
                                                  ? null
                                                  : index + i + item.id
                                              );
                                              setshowMain(
                                                showMain == index + i + item.id
                                                  ? null
                                                  : index + i + item.id
                                              );
                                              setshowContentAdd(
                                                showContentAdd ==
                                                  index + i + item.id
                                                  ? null
                                                  : index + i + item.id
                                              );

                                              console.log(item);
                                              setmainSectionID(
                                                section.courseSection.sectionId
                                              );

                                              // Fill Data
                                              setPraticeTestCode(
                                                item.getPracticeTests[0] == null
                                                  ? ""
                                                  : item.getPracticeTests[0]
                                                      .practiceTestCode
                                              );
                                              setPracticeTestTitle(
                                                item == null ? "" : item.title
                                              );
                                              setPracticeTestDesc(
                                                item == null
                                                  ? ""
                                                  : item.description
                                              );
                                              setPracticeTestDuration(
                                                item.getPracticeTests[0] == null
                                                  ? ""
                                                  : item.getPracticeTests[0]
                                                      .duration
                                              );
                                              setPracticeTestInstructions(
                                                item.getPracticeTests[0] == null
                                                  ? ""
                                                  : item.getPracticeTests[0]
                                                      .instructions
                                              );
                                              setPracticeTestMinPassMark(
                                                item.getPracticeTests[0] == null
                                                  ? ""
                                                  : item.getPracticeTests[0]
                                                      .minimumuPassMark
                                              );

                                              setPracticeTestExLink(
                                                item.getPracticeTests[0] == null
                                                  ? ""
                                                  : item.getPracticeTests[0]
                                                      .externalLink
                                              );
                                              setPracticeTestQuestionExLink(
                                                item.getPracticeTests[0] == null
                                                  ? ""
                                                  : item.getPracticeTests[0]
                                                      .questionLink
                                              );

                                              setPraticeTestSolutionsExLink(
                                                item.getPracticeTests[0] == null
                                                  ? ""
                                                  : item.getPracticeTests[0]
                                                      .solutionLink
                                              );
                                            }}
                                            className="mx-2"
                                            size="small"
                                            variant="outlined"
                                          >
                                            <CreateIcon /> Edit
                                          </Button>
                                        )}
                                      </span>
                                    </div>
                                    {showMain == index + i + item.id && (
                                      <div className="p-3">
                                        <Tabs
                                          defaultActiveKey="practice"
                                          id="uncontrolled-tab-example"
                                          className="mb-3"
                                        >
                                          <Tab
                                            eventKey="practice"
                                            title="Practice Test information and Instructions"
                                          >
                                            <Form>
                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control
                                                  value={PracticeTestTitle}
                                                  onChange={(e) =>
                                                    setPracticeTestTitle(
                                                      e.target.value
                                                    )
                                                  }
                                                  type="text"
                                                  placeholder="Practice Test Title"
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlTextarea1"
                                              >
                                                <Form.Label>
                                                  Description
                                                </Form.Label>
                                                <Form.Control
                                                  value={PracticeTestDesc}
                                                  onChange={(e) =>
                                                    setPracticeTestDesc(
                                                      e.target.value
                                                    )
                                                  }
                                                  as="textarea"
                                                  rows={2}
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  Duration
                                                </Form.Label>
                                                <Form.Control
                                                  value={PracticeTestDuration}
                                                  onChange={(e) =>
                                                    setPracticeTestDuration(
                                                      e.target.value
                                                    )
                                                  }
                                                  type="text"
                                                  placeholder="00:00"
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  Minimum pass mark
                                                </Form.Label>
                                                <Form.Control
                                                  value={
                                                    PracticeTestMinPassMark
                                                  }
                                                  onChange={(e) =>
                                                    setPracticeTestMinPassMark(
                                                      e.target.value
                                                    )
                                                  }
                                                  type="number"
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlTextarea1"
                                              >
                                                <Form.Label>
                                                  Instructions
                                                </Form.Label>
                                                <Form.Control
                                                  value={
                                                    PracticeTestInstructions
                                                  }
                                                  onChange={(e) =>
                                                    setPracticeTestInstructions(
                                                      e.target.value
                                                    )
                                                  }
                                                  as="textarea"
                                                  rows={3}
                                                />
                                              </Form.Group>
                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  External Link
                                                </Form.Label>
                                                <Form.Control
                                                  value={PracticeTestExLink}
                                                  onChange={(e) =>
                                                    setPracticeTestExLink(
                                                      e.target.value
                                                    )
                                                  }
                                                  type="text"
                                                  placeholder="https://externallink.com"
                                                />
                                              </Form.Group>
                                            </Form>
                                          </Tab>

                                          <Tab
                                            eventKey="questions"
                                            title="Questions"
                                          >
                                            <Form>
                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  Upload Questions
                                                </Form.Label>

                                                {item.getPracticeTests[0] !=
                                                  null &&
                                                  item.getPracticeTests[0]
                                                    .practiceTestQuestionSheet !=
                                                    "" && (
                                                    <ListGroup className="my-2">
                                                      <ListGroup.Item className="d-flex justify-content-between">
                                                        <span>
                                                          {
                                                            item
                                                              .getPracticeTests[0]
                                                              .practiceTestQuestionSheet
                                                          }
                                                        </span>
                                                        <span>
                                                          <Button
                                                            onClick={() => {
                                                              let Resourceitem =
                                                                {
                                                                  url: item
                                                                    .getPracticeTests[0]
                                                                    .practiceTestQuestionSheet,
                                                                };
                                                              handleDeleteDownloableFilesLecture(
                                                                Resourceitem
                                                              );
                                                            }}
                                                            className="p-0"
                                                            // variant="contained"
                                                          >
                                                            <DeleteIcon />
                                                          </Button>
                                                        </span>
                                                      </ListGroup.Item>
                                                    </ListGroup>
                                                  )}

                                                <Form.Control
                                                  onChange={(e) =>
                                                    setPracticeTestQuestionFile(
                                                      e.target.files[0]
                                                    )
                                                  }
                                                  type="file"
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  External Link
                                                </Form.Label>
                                                <Form.Control
                                                  value={
                                                    PracticeTestQuestionExLink
                                                  }
                                                  onChange={(e) =>
                                                    setPracticeTestQuestionExLink(
                                                      e.target.value
                                                    )
                                                  }
                                                  type="text"
                                                  placeholder="https://externallink.com"
                                                />
                                              </Form.Group>
                                            </Form>
                                          </Tab>
                                          <Tab
                                            eventKey="solutions"
                                            title="Solutions"
                                          >
                                            <Form>
                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  Upload Solutions
                                                </Form.Label>
                                                {item.getPracticeTests[0] !=
                                                  null &&
                                                  item.getPracticeTests[0]
                                                    .practiceTestSolutionSheet !=
                                                    "" && (
                                                    <ListGroup className="my-2">
                                                      <ListGroup.Item className="d-flex justify-content-between">
                                                        <span>
                                                          {
                                                            item
                                                              .getPracticeTests[0]
                                                              .practiceTestSolutionSheet
                                                          }
                                                        </span>
                                                        <span>
                                                          <Button
                                                            onClick={() => {
                                                              let Resourceitem =
                                                                {
                                                                  url: item
                                                                    .getPracticeTests[0]
                                                                    .practiceTestSolutionSheet,
                                                                };
                                                              handleDeleteDownloableFilesLecture(
                                                                Resourceitem
                                                              );
                                                            }}
                                                            className="p-0"
                                                            // variant="contained"
                                                          >
                                                            <DeleteIcon />
                                                          </Button>
                                                        </span>
                                                      </ListGroup.Item>
                                                    </ListGroup>
                                                  )}

                                                <Form.Control
                                                  onChange={(e) =>
                                                    setPracticeTestSolutionsFile(
                                                      e.target.files[0]
                                                    )
                                                  }
                                                  type="file"
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  External Link
                                                </Form.Label>
                                                <Form.Control
                                                  value={
                                                    PraticeTestSolutionsExLink
                                                  }
                                                  onChange={(e) =>
                                                    setPraticeTestSolutionsExLink(
                                                      e.target.value
                                                    )
                                                  }
                                                  type="text"
                                                  placeholder="https://externallink.com"
                                                />
                                              </Form.Group>

                                              <Button
                                                onClick={() =>
                                                  setshowPracticeTestInput(null)
                                                }
                                                className="mx-1"
                                                variant="outlined"
                                              >
                                                Cancel
                                              </Button>
                                              {btnLoadingPracticeTest ? (
                                                <Button variant="contained">
                                                  Loading..
                                                </Button>
                                              ) : (
                                                <Button
                                                  onClick={
                                                    handlePracticetestSave
                                                  }
                                                  variant="contained"
                                                >
                                                  Save Practice Test
                                                </Button>
                                              )}
                                            </Form>
                                          </Tab>
                                        </Tabs>
                                      </div>
                                    )}
                                  </Card>
                                ))}

                              {/* Coding Exercise */}
                              {item.type == "Coding Exercise" &&
                                (showEditCodingExerciseInput ==
                                index + i + item.id ? (
                                  <div className="d-flex">
                                    <Form.Control
                                      className="mx-1"
                                      value={updateCodingExerciseName}
                                      onChange={(e) =>
                                        setupdateCodingExerciseName(
                                          e.target.value
                                        )
                                      }
                                      type="text"
                                      placeholder="Coding Excercise Name"
                                    />

                                    <Button
                                      onClick={(e) => {
                                        if (
                                          showEditCodingExerciseInput ==
                                          index + i + item.id
                                        ) {
                                          setshowEditCodingExerciseInput(null);
                                          setupdateCodingExerciseName("");
                                        } else {
                                          setshowEditCodingExerciseInput(
                                            index + i + item.id
                                          );
                                          setupdateCodingExerciseName(
                                            item.title
                                          );
                                        }
                                      }}
                                      className="mx-1"
                                      variant="outlined"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={(e) => {
                                        handleUpdateExerciseName(item, section);
                                      }}
                                      className="mx-1"
                                      variant="contained"
                                    >
                                      Save
                                    </Button>
                                  </div>
                                ) : (
                                  <Card
                                    key={index + i + item.id}
                                    className="my-3"
                                  >
                                    <div className="d-flex justify-content-between align-items-center p-2">
                                      <span>
                                        <Typography>
                                          <CheckCircleIcon fontSize="small" />
                                          {i + 1}. Coding Exercise:{" "}
                                          {newCounters.CodingExercise}{" "}
                                          <CodeIcon sx={{ fontSize: 15 }} />{" "}
                                          {item.title}
                                          <span className="mx-5">
                                            <EditIcon
                                              style={syllabusIcon}
                                              onClick={(e) => {
                                                if (
                                                  showEditCodingExerciseInput ==
                                                  index + i + item.id
                                                ) {
                                                  setshowEditCodingExerciseInput(
                                                    null
                                                  );
                                                  setupdateCodingExerciseName(
                                                    ""
                                                  );
                                                } else {
                                                  setshowEditCodingExerciseInput(
                                                    index + i + item.id
                                                  );
                                                  setupdateCodingExerciseName(
                                                    item.title
                                                  );
                                                }
                                              }}
                                            />
                                            <DeleteIcon
                                              style={syllabusIcon}
                                              onClick={() =>
                                                handleCodingExercisesDelete(
                                                  item
                                                )
                                              }
                                            />
                                          </span>
                                        </Typography>
                                      </span>
                                      <span>
                                        {showContentAdd ==
                                        index + i + item.id ? (
                                          <Button
                                            onClick={() => {
                                              setshowDescRes(true);
                                              setshowMain(null);
                                              console.log(index + i + item.id);
                                              setshowContentAdd(null);
                                              setcurriculumvisiblitymc("");
                                              // handleContentshow()
                                            }}
                                            className="mx-2"
                                            size="small"
                                            variant="contained"
                                          >
                                            <CloseIcon /> Cancel
                                          </Button>
                                        ) : (
                                          <Button
                                            onClick={() => {
                                              setExpandedIndex(
                                                isExpanded
                                                  ? null
                                                  : index + i + item.id
                                              );
                                              setshowMain(
                                                showMain == index + i + item.id
                                                  ? null
                                                  : index + i + item.id
                                              );
                                              setshowContentAdd(
                                                showContentAdd ==
                                                  index + i + item.id
                                                  ? null
                                                  : index + i + item.id
                                              );

                                              console.log(item);
                                              setmainSectionID(
                                                section.courseSection.sectionId
                                              );

                                              // Fill Data
                                              setCodingExerciseCode(
                                                item.getCodingExercises[0] ==
                                                  null
                                                  ? ""
                                                  : item.getCodingExercises[0]
                                                      .codingExerciseCode
                                              );
                                              setCodingExerciseTitle(
                                                item == null ? "" : item.title
                                              );
                                              setCodingExerciseDesc(
                                                item == null
                                                  ? ""
                                                  : item.description
                                              );
                                              setCodingExerciseInstructions(
                                                item.getCodingExercises[0] ==
                                                  null
                                                  ? ""
                                                  : item.getCodingExercises[0]
                                                      .instructions
                                              );
                                              setCodingExerciseExLink(
                                                item.getCodingExercises[0]
                                                  .externalLink == null
                                                  ? ""
                                                  : item.getCodingExercises[0]
                                                      .externalLink
                                              );

                                              setCodingExerciseExternalLink(
                                                item.getCodingExercises[0] ==
                                                  null
                                                  ? ""
                                                  : item.getCodingExercises[0]
                                                      .codingExternalLink
                                              );
                                              setCodingExercisesExLinkSolutions(
                                                item.getCodingExercises[0] ==
                                                  null
                                                  ? ""
                                                  : item.getCodingExercises[0]
                                                      .solutionsExternalLink
                                              );
                                            }}
                                            className="mx-2"
                                            size="small"
                                            variant="outlined"
                                          >
                                            <CreateIcon /> Edit
                                          </Button>
                                        )}
                                      </span>
                                    </div>

                                    {showMain == index + i + item.id && (
                                      <div className="p-3">
                                        <Tabs
                                          defaultActiveKey="coding"
                                          id="uncontrolled-tab-example"
                                          className="mb-3"
                                        >
                                          <Tab
                                            eventKey="coding"
                                            title="Coding Exercise information and Instructions"
                                          >
                                            <Form>
                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control
                                                  value={CodingExerciseTitle}
                                                  onChange={(e) =>
                                                    setCodingExerciseTitle(
                                                      e.target.value
                                                    )
                                                  }
                                                  type="text"
                                                  placeholder="Coding Excercise"
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlTextarea1"
                                              >
                                                <Form.Label>
                                                  Description
                                                </Form.Label>
                                                <Form.Control
                                                  value={CodingExerciseDesc}
                                                  onChange={(e) =>
                                                    setCodingExerciseDesc(
                                                      e.target.value
                                                    )
                                                  }
                                                  as="textarea"
                                                  rows={2}
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlTextarea1"
                                              >
                                                <Form.Label>
                                                  Instructions
                                                </Form.Label>
                                                <Form.Control
                                                  value={
                                                    CodingExerciseInstructions
                                                  }
                                                  onChange={(e) =>
                                                    setCodingExerciseInstructions(
                                                      e.target.value
                                                    )
                                                  }
                                                  as="textarea"
                                                  rows={2}
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  Upload Video
                                                </Form.Label>

                                                {item.getCodingExercises[0]
                                                  .codingVideo != "" && (
                                                  <ListGroup className="my-2">
                                                    <ListGroup.Item className="d-flex justify-content-between">
                                                      <span>
                                                        {
                                                          item
                                                            .getCodingExercises[0]
                                                            .codingVideo
                                                        }
                                                      </span>
                                                      <span>
                                                        <Button
                                                          onClick={() => {
                                                            let video = {
                                                              url: item
                                                                .getCodingExercises[0]
                                                                .codingVideo,
                                                            };
                                                            handleVideoDelete(
                                                              video
                                                            );
                                                          }}
                                                          className="p-0"
                                                          // variant="contained"
                                                        >
                                                          <DeleteIcon />
                                                        </Button>
                                                      </span>
                                                    </ListGroup.Item>
                                                  </ListGroup>
                                                )}

                                                <Form.Control
                                                  accept="video/*"
                                                  onChange={(e) =>
                                                    setCodingExerciseVideo(
                                                      e.target.files[0]
                                                    )
                                                  }
                                                  type="file"
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlTextarea1"
                                              >
                                                <Form.Label>
                                                  Downloadable Resourses
                                                </Form.Label>

                                                {item.getCodingExercises[0]
                                                  .downloadableResource !=
                                                  "" && (
                                                  <ListGroup className="my-2">
                                                    <ListGroup.Item className="d-flex justify-content-between">
                                                      <span>
                                                        {
                                                          item
                                                            .getCodingExercises[0]
                                                            .downloadableResource
                                                        }
                                                      </span>
                                                      <span>
                                                        <Button
                                                          onClick={() => {
                                                            let Resourceitem = {
                                                              url: item
                                                                .getCodingExercises[0]
                                                                .downloadableResource,
                                                            };
                                                            handleDeleteDownloableFilesLecture(
                                                              Resourceitem
                                                            );
                                                          }}
                                                          className="p-0"
                                                          // variant="contained"
                                                        >
                                                          <DeleteIcon />
                                                        </Button>
                                                      </span>
                                                    </ListGroup.Item>
                                                  </ListGroup>
                                                )}

                                                <Form.Control
                                                  onChange={(e) =>
                                                    setCodingExerciseDResourses(
                                                      e.target.files[0]
                                                    )
                                                  }
                                                  type="file"
                                                  multiple
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  External Link
                                                </Form.Label>
                                                <Form.Control
                                                  value={CodingExerciseExLink}
                                                  onChange={(e) =>
                                                    setCodingExerciseExLink(
                                                      e.target.value
                                                    )
                                                  }
                                                  type="text"
                                                  placeholder="https://externallink.com"
                                                />
                                              </Form.Group>
                                            </Form>
                                          </Tab>

                                          <Tab
                                            eventKey="coding-exercises"
                                            title="Coding exercises"
                                          >
                                            <Form>
                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  Upload coding exercises
                                                </Form.Label>

                                                {item.getCodingExercises[0]
                                                  .codingExerciseSheet !=
                                                  "" && (
                                                  <ListGroup className="my-2">
                                                    <ListGroup.Item className="d-flex justify-content-between">
                                                      <span>
                                                        {
                                                          item
                                                            .getCodingExercises[0]
                                                            .codingExerciseSheet
                                                        }
                                                      </span>
                                                      <span>
                                                        <Button
                                                          onClick={() => {
                                                            let Resourceitem = {
                                                              url: item
                                                                .getCodingExercises[0]
                                                                .codingExerciseSheet,
                                                            };
                                                            handleDeleteDownloableFilesLecture(
                                                              Resourceitem
                                                            );
                                                          }}
                                                          className="p-0"
                                                          // variant="contained"
                                                        >
                                                          <DeleteIcon />
                                                        </Button>
                                                      </span>
                                                    </ListGroup.Item>
                                                  </ListGroup>
                                                )}

                                                <Form.Control
                                                  onChange={(e) =>
                                                    setCodingExerciseUploadEx(
                                                      e.target.files[0]
                                                    )
                                                  }
                                                  type="file"
                                                  multiple
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  External Link
                                                </Form.Label>
                                                <Form.Control
                                                  value={
                                                    CodingExerciseExternalLink
                                                  }
                                                  onChange={(e) =>
                                                    setCodingExerciseExternalLink(
                                                      e.target.value
                                                    )
                                                  }
                                                  type="text"
                                                  placeholder="https://externallink.com"
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  Upload Video
                                                </Form.Label>

                                                {item.getCodingExercises[0]
                                                  .codingExerciseVideo !=
                                                  "" && (
                                                  <ListGroup className="my-2">
                                                    <ListGroup.Item className="d-flex justify-content-between">
                                                      <span>
                                                        {
                                                          item
                                                            .getCodingExercises[0]
                                                            .codingExerciseVideo
                                                        }
                                                      </span>
                                                      <span>
                                                        <Button
                                                          onClick={() => {
                                                            let video = {
                                                              url: item
                                                                .getCodingExercises[0]
                                                                .codingExerciseVideo,
                                                            };
                                                            handleVideoDelete(
                                                              video
                                                            );
                                                          }}
                                                          className="p-0"
                                                          // variant="contained"
                                                        >
                                                          <DeleteIcon />
                                                        </Button>
                                                      </span>
                                                    </ListGroup.Item>
                                                  </ListGroup>
                                                )}

                                                <Form.Control
                                                  accept="video/*"
                                                  onChange={(e) =>
                                                    setCodingExerciseQVideo(
                                                      e.target.files[0]
                                                    )
                                                  }
                                                  type="file"
                                                />
                                              </Form.Group>
                                            </Form>
                                          </Tab>
                                          <Tab
                                            eventKey="solutions"
                                            title="Solutions"
                                          >
                                            <Form>
                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  Upload Solutions
                                                </Form.Label>

                                                {item.getCodingExercises[0]
                                                  .codingSolutionsSheet !=
                                                  "" && (
                                                  <ListGroup className="my-2">
                                                    <ListGroup.Item className="d-flex justify-content-between">
                                                      <span>
                                                        {
                                                          item
                                                            .getCodingExercises[0]
                                                            .codingSolutionsSheet
                                                        }
                                                      </span>
                                                      <span>
                                                        <Button
                                                          onClick={() => {
                                                            let Resourceitem = {
                                                              url: item
                                                                .getCodingExercises[0]
                                                                .codingSolutionsSheet,
                                                            };
                                                            handleDeleteDownloableFilesLecture(
                                                              Resourceitem
                                                            );
                                                          }}
                                                          className="p-0"
                                                          // variant="contained"
                                                        >
                                                          <DeleteIcon />
                                                        </Button>
                                                      </span>
                                                    </ListGroup.Item>
                                                  </ListGroup>
                                                )}

                                                <Form.Control
                                                  onChange={(e) =>
                                                    setCodingExercisesSolutionsFile(
                                                      e.target.files[0]
                                                    )
                                                  }
                                                  type="file"
                                                  multiple
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  External Link
                                                </Form.Label>
                                                <Form.Control
                                                  value={
                                                    CodingExercisesExLinkSolutions
                                                  }
                                                  onChange={(e) =>
                                                    setCodingExercisesExLinkSolutions(
                                                      e.target.value
                                                    )
                                                  }
                                                  type="text"
                                                  placeholder="https://externallink.com"
                                                />
                                              </Form.Group>

                                              <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                              >
                                                <Form.Label>
                                                  Upload Video
                                                </Form.Label>

                                                {item.getCodingExercises[0]
                                                  .codingSolutionsVideo !=
                                                  "" && (
                                                  <ListGroup className="my-2">
                                                    <ListGroup.Item className="d-flex justify-content-between">
                                                      <span>
                                                        {
                                                          item
                                                            .getCodingExercises[0]
                                                            .codingSolutionsVideo
                                                        }
                                                      </span>
                                                      <span>
                                                        <Button
                                                          onClick={() => {
                                                            let video = {
                                                              url: item
                                                                .getCodingExercises[0]
                                                                .codingSolutionsVideo,
                                                            };
                                                            handleVideoDelete(
                                                              video
                                                            );
                                                          }}
                                                          className="p-0"
                                                          // variant="contained"
                                                        >
                                                          <DeleteIcon />
                                                        </Button>
                                                      </span>
                                                    </ListGroup.Item>
                                                  </ListGroup>
                                                )}

                                                <Form.Control
                                                  accept="video/*"
                                                  onChange={(e) =>
                                                    setCodingExercisesSolutionsVideo(
                                                      e.target.files[0]
                                                    )
                                                  }
                                                  type="file"
                                                />
                                              </Form.Group>
                                              <Button
                                                onClick={() =>
                                                  setshowCodingExecInput(null)
                                                }
                                                variant="outlined"
                                              >
                                                Cancel Coding Exercise
                                              </Button>
                                              {btnLoadingCodingExcercise ? (
                                                <Button
                                                  className="mx-1"
                                                  variant="contained"
                                                >
                                                  Saving..
                                                </Button>
                                              ) : (
                                                <Button
                                                  onClick={handleCodingExecSave}
                                                  className="mx-1"
                                                  variant="contained"
                                                >
                                                  Save Coding Exercise
                                                </Button>
                                              )}
                                            </Form>
                                          </Tab>
                                        </Tabs>
                                      </div>
                                    )}
                                  </Card>
                                ))}
                            </>
                          </div>
                        );
                      }
                    )}

                  {/* Curriculum Item ACTION */}
                  <div className="m-2">
                    {showCurriculumItem == index && (
                      <div className="border border-danger p-1">
                        <Button
                          onClick={() => {
                            // handleshowCurriculumItems()
                            setshowQuizInput(null);
                            setshowLecInput(null);
                            setshowCurriculumItem(null);
                            setshowPracticeTestInput(null);
                            setshowCodingExecInput(null);
                            setshowAssignmentInput(null);
                          }}
                          variant="text"
                        >
                          <CloseIcon />
                        </Button>

                        <Button
                          onClick={() => {
                            setshowLecInput(
                              showLecInput == index ? null : index
                            );

                            setshowAssignmentInput(null);
                            setshowQuizInput(null);
                            setshowCodingExecInput(null);
                            setshowPracticeTestInput(null);
                          }}
                          variant="text"
                        >
                          <AddCircleIcon className="mx-1" />
                          Lesson
                        </Button>

                        <Button
                          onClick={() => {
                            setshowQuizInput(
                              showQuizInput == index ? null : index
                            );
                            setshowLecInput(null);
                            setshowAssignmentInput(null);
                            setshowCodingExecInput(null);
                            setshowPracticeTestInput(null);
                          }}
                          variant="text"
                        >
                          <AddCircleIcon className="mx-1" />
                          Quiz
                        </Button>

                        <Button
                          onClick={() => {
                            setshowPracticeTestInput(
                              showPracticeTestInput == index ? null : index
                            );
                            setshowLecInput(null);
                            setshowQuizInput(null);
                            setshowAssignmentInput(null);
                            setshowCodingExecInput(null);
                          }}
                          variant="text"
                        >
                          <AddCircleIcon className="mx-1" />
                          Pratice Test
                        </Button>

                        <Button
                          onClick={() => {
                            setshowAssignmentInput(
                              showAssignmentInput == index ? null : index
                            );
                            setshowLecInput(null);
                            setshowQuizInput(null);
                            setshowPracticeTestInput(null);
                            setshowCodingExecInput(null);
                          }}
                          variant="text"
                        >
                          <AddCircleIcon className="mx-1" />
                          Assignment
                        </Button>

                        <Button
                          onClick={() => {
                            setshowCodingExecInput(
                              showCodingExecInput == index ? null : index
                            );
                            setshowLecInput(null);
                            setshowQuizInput(null);
                            setshowPracticeTestInput(null);
                            setshowAssignmentInput(null);
                          }}
                          variant="text"
                        >
                          <AddCircleIcon className="mx-1" />
                          Coding Excercises
                        </Button>
                      </div>
                    )}

                    {showCurriculumItem != index && (
                      <Button
                        onClick={() => {
                          setmainSectionID(section.courseSection.sectionId);
                          setshowCurriculumItem(
                            showCurriculumItem == index ? null : index
                          );
                        }}
                        variant="contained"
                      >
                        <AddIcon /> Syllabus Item
                      </Button>
                    )}
                  </div>

                  {/* Curriculum Item ACTION */}

                  {/* Curriculum Item > Lectures */}

                  {showLecInput == index && (
                    <>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Add Lesson</Form.Label>
                        <Form.Control
                          onChange={(e) => setlecturetitle(e.target.value)}
                          type="text"
                          placeholder="Type Lesson Name"
                        />
                      </Form.Group>

                      <Button
                        onClick={() =>
                          handleSaveLecture(section.courseSection.sectionId)
                        }
                        className="mx-1"
                        variant="outlined"
                      >
                        ADD
                      </Button>
                      {/* handleCancelLectureInput */}
                      <Button
                        onClick={() => setshowLecInput(null)}
                        variant="contained"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {/* Syllabus Item > Lectures */}

                  {/* Syllabus Item > Quiz */}

                  {showQuizInput == index && (
                    <div className="p-4 m-2">
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Quiz Title</Form.Label>
                          <Form.Control
                            value={quizTitle}
                            onChange={(e) => setquizTitle(e.target.value)}
                            type="text"
                            placeholder="Enter a Title"
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Quiz Description</Form.Label>
                          <Form.Control
                            value={quizDesc}
                            onChange={(e) => setquizDesc(e.target.value)}
                            as="textarea"
                            rows={3}
                          />
                        </Form.Group>
                      </Form>

                      <Button
                        onClick={() =>
                          handleSaveQuiz(section.courseSection.sectionId)
                        }
                        className="mx-1"
                        variant="outlined"
                      >
                        ADD
                      </Button>

                      <Button
                        onClick={() => setshowQuizInput(null)}
                        variant="contained"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}

                  {/* Syllabus Item > Quiz */}

                  {/* Syllabus Item > Practice Test */}
                  {showPracticeTestInput == index && (
                    <Tabs
                      defaultActiveKey="practice"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab
                        eventKey="practice"
                        title="Practice Test information and instructions"
                      >
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>
                              Title <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              value={PracticeTestTitle}
                              onChange={(e) =>
                                setPracticeTestTitle(e.target.value)
                              }
                              type="text"
                              placeholder="Practice Test Title"
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label>
                              Description<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              value={PracticeTestDesc}
                              onChange={(e) =>
                                setPracticeTestDesc(e.target.value)
                              }
                              as="textarea"
                              rows={2}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>
                              Duration (HH:MM)
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              value={PracticeTestDuration}
                              onChange={(e) =>
                                setPracticeTestDuration(e.target.value)
                              }
                              type="text"
                              placeholder="00:00"
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>
                              Minimum pass mark (%)
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              value={PracticeTestMinPassMark}
                              onChange={(e) =>
                                setPracticeTestMinPassMark(e.target.value)
                              }
                              type="text"
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label>
                              Instructions<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              value={PracticeTestInstructions}
                              onChange={(e) =>
                                setPracticeTestInstructions(e.target.value)
                              }
                              as="textarea"
                              rows={3}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>External Link</Form.Label>
                            <Form.Control
                              value={PracticeTestExLink}
                              onChange={(e) =>
                                setPracticeTestExLink(e.target.value)
                              }
                              type="text"
                              placeholder="https://externallink.com"
                            />
                          </Form.Group>
                        </Form>
                      </Tab>

                      <Tab eventKey="questions" title="Questions">
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Upload Questions</Form.Label>
                            <Form.Control
                              onChange={(e) =>
                                setPracticeTestQuestionFile(e.target.files[0])
                              }
                              type="file"
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>External Link</Form.Label>
                            <Form.Control
                              value={PracticeTestQuestionExLink}
                              onChange={(e) =>
                                setPracticeTestQuestionExLink(e.target.value)
                              }
                              type="text"
                              placeholder="https://externallink.com"
                            />
                          </Form.Group>
                        </Form>
                      </Tab>
                      <Tab eventKey="solutions" title="Solutions">
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Upload Solutions</Form.Label>
                            <Form.Control
                              onChange={(e) =>
                                setPracticeTestSolutionsFile(e.target.files[0])
                              }
                              type="file"
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>External Link</Form.Label>
                            <Form.Control
                              value={PraticeTestSolutionsExLink}
                              onChange={(e) =>
                                setPraticeTestSolutionsExLink(e.target.value)
                              }
                              type="text"
                              placeholder="https://externallink.com"
                            />
                          </Form.Group>

                          <Button
                            onClick={() => setshowPracticeTestInput(null)}
                            className="mx-1"
                            variant="outlined"
                          >
                            Cancel Practice Test
                          </Button>
                          {btnLoadingPracticeTest ? (
                            <Button variant="contained">Saving..</Button>
                          ) : (
                            <Button
                              onClick={handlePracticetestSave}
                              variant="contained"
                            >
                              Save Practice Test
                            </Button>
                          )}
                        </Form>
                      </Tab>
                    </Tabs>
                  )}

                  {/* Syllabus Item > Practice Test */}

                  {/* Syllabus Item > Coding Excersise */}
                  {showCodingExecInput == index && (
                    <Tabs
                      defaultActiveKey="coding"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab
                        eventKey="coding"
                        title="Coding Exercise information and instructions"
                      >
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              value={CodingExerciseTitle}
                              onChange={(e) =>
                                setCodingExerciseTitle(e.target.value)
                              }
                              type="text"
                              placeholder="Coding Excercise"
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              value={CodingExerciseDesc}
                              onChange={(e) =>
                                setCodingExerciseDesc(e.target.value)
                              }
                              as="textarea"
                              rows={2}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label>Instructions</Form.Label>
                            <Form.Control
                              value={CodingExerciseInstructions}
                              onChange={(e) =>
                                setCodingExerciseInstructions(e.target.value)
                              }
                              as="textarea"
                              rows={2}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Upload Video</Form.Label>
                            <Form.Control
                              accept="video/*"
                              onChange={(e) =>
                                setCodingExerciseVideo(e.target.files[0])
                              }
                              type="file"
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label>Downloadable Resourses</Form.Label>
                            <Form.Control
                              onChange={(e) =>
                                setCodingExerciseDResourses(e.target.files[0])
                              }
                              type="file"
                              multiple
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>External Link</Form.Label>
                            <Form.Control
                              value={CodingExerciseExLink}
                              onChange={(e) =>
                                setCodingExerciseExLink(e.target.value)
                              }
                              type="text"
                              placeholder="https://externallink.com"
                            />
                          </Form.Group>
                        </Form>
                      </Tab>

                      <Tab eventKey="coding-exercises" title="Coding exercises">
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Upload coding Exercises</Form.Label>
                            <Form.Control
                              onChange={(e) =>
                                setCodingExerciseUploadEx(e.target.files[0])
                              }
                              type="file"
                              multiple
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>External Link</Form.Label>
                            <Form.Control
                              value={CodingExerciseExternalLink}
                              onChange={(e) =>
                                setCodingExerciseExternalLink(e.target.value)
                              }
                              type="text"
                              placeholder="https://externallink.com"
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Upload Video</Form.Label>
                            <Form.Control
                              accept="video/*"
                              onChange={(e) =>
                                setCodingExerciseQVideo(e.target.files[0])
                              }
                              type="file"
                            />
                          </Form.Group>
                        </Form>
                      </Tab>
                      <Tab eventKey="solutions" title="Solutions">
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Upload solutions</Form.Label>
                            <Form.Control
                              onChange={(e) =>
                                setCodingExercisesSolutionsFile(
                                  e.target.files[0]
                                )
                              }
                              type="file"
                              multiple
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>External Link</Form.Label>
                            <Form.Control
                              value={CodingExercisesExLinkSolutions}
                              onChange={(e) =>
                                setCodingExercisesExLinkSolutions(
                                  e.target.value
                                )
                              }
                              type="text"
                              placeholder="https://externallink.com"
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Upload Video</Form.Label>
                            <Form.Control
                              accept="video/*"
                              onChange={(e) =>
                                setCodingExercisesSolutionsVideo(
                                  e.target.files[0]
                                )
                              }
                              type="file"
                            />
                          </Form.Group>
                          <Button
                            onClick={() => setshowCodingExecInput(null)}
                            variant="outlined"
                          >
                            Cancel Coding Exercise
                          </Button>
                          {btnLoadingCodingExcercise ? (
                            <Button className="mx-1" variant="contained">
                              Saving..
                            </Button>
                          ) : (
                            <Button
                              onClick={handleCodingExecSave}
                              className="mx-1"
                              variant="contained"
                            >
                              Save Coding Exercise
                            </Button>
                          )}
                        </Form>
                      </Tab>
                    </Tabs>
                  )}
                  {/* Syllabus Item > Coding Excersise */}

                  {/* Syllabus Item > Assignment */}
                  {showAssignmentInput == index && (
                    <Tabs
                      defaultActiveKey="assignment"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab
                        eventKey="assignment"
                        title="Assignment information and instructions"
                      >
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>
                              Title <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              value={AssignmentTitle}
                              onChange={(e) =>
                                setAssignmentTitle(e.target.value)
                              }
                              type="text"
                              placeholder="Assignment Title"
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label>
                              Description <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              value={AssignmentDesc}
                              onChange={(e) =>
                                setAssignmentDesc(e.target.value)
                              }
                              as="textarea"
                              rows={2}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>
                              Duration (HH:MM)
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              value={AssignmentDuration}
                              onChange={(e) =>
                                setAssignmentDuration(e.target.value)
                              }
                              type="text"
                              placeholder="00:00"
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label>
                              Instructions{" "}
                              <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              value={AssignmentInstructors}
                              onChange={(e) =>
                                setAssignmentInstructors(e.target.value)
                              }
                              as="textarea"
                              rows={3}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Upload Video</Form.Label>
                            <Form.Control
                              accept="video/*"
                              onChange={(e) => {
                                setAssignmentVideo(e.target.files[0]);
                              }}
                              type="file"
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label>Downloadable Resourses</Form.Label>
                            <Form.Control
                              onChange={(e) =>
                                setAssignmentDResourses(e.target.files[0])
                              }
                              type="file"
                              multiple
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>External Link</Form.Label>
                            <Form.Control
                              value={AssignmentExLink}
                              onChange={(e) =>
                                setAssignmentExLink(e.target.value)
                              }
                              type="text"
                              placeholder="https://externallink.com"
                            />
                          </Form.Group>
                        </Form>
                      </Tab>

                      <Tab eventKey="questions" title="Questions">
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label>Questions</Form.Label>
                            <Form.Control
                              value={AssignmentQuestion}
                              onChange={(e) =>
                                setAssignmentQuestion(e.target.value)
                              }
                              as="textarea"
                              rows={2}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Upload Questions</Form.Label>
                            <Form.Control
                              onChange={(e) =>
                                setAssignmentQuestionFile(e.target.files[0])
                              }
                              type="file"
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>External Link</Form.Label>
                            <Form.Control
                              value={AssignmentQuestionLink}
                              onChange={(e) =>
                                setAssignmentQuestionLink(e.target.value)
                              }
                              type="text"
                              placeholder="https://externallink.com"
                            />
                          </Form.Group>
                        </Form>
                      </Tab>
                      <Tab eventKey="solutions" title="Solutions">
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label>Solutions</Form.Label>
                            <Form.Control
                              value={AssignmentSolutions}
                              onChange={(e) =>
                                setAssignmentSolutions(e.target.value)
                              }
                              as="textarea"
                              rows={2}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Upload Video</Form.Label>
                            <Form.Control
                              accept="video/*"
                              onChange={(e) =>
                                setAssignmentSolutionsVideo(e.target.files[0])
                              }
                              type="file"
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Upload Solutions</Form.Label>
                            <Form.Control
                              onChange={(e) =>
                                setAssignmentSolutionsFile(e.target.files[0])
                              }
                              type="file"
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>External Link</Form.Label>
                            <Form.Control
                              value={AssignmentSolutionsExLink}
                              onChange={(e) =>
                                setAssignmentSolutionsExLink(e.target.value)
                              }
                              type="text"
                              placeholder="https://externallink.com"
                            />
                          </Form.Group>

                          <Button
                            onClick={() => setshowAssignmentInput(null)}
                            variant="outlined"
                          >
                            Cancel Assignment
                          </Button>
                          {btnLoadingAssignment ? (
                            <Button className="mx-1" variant="contained">
                              Saving..
                            </Button>
                          ) : (
                            <Button
                              onClick={handleAssignmentSave}
                              className="mx-1"
                              variant="contained"
                            >
                              Save Assignment
                            </Button>
                          )}
                        </Form>
                      </Tab>
                    </Tabs>
                  )}

                  {/* Syllabus Item > Assignment */}
                </CardContent>
              </div>
            ))
          ) : (
            <LargeSpinner h={"50%"} w={"30%"} wpclass={"m-4"} />
          )
        ) : (
          <div className="d-flex justify-content-center">
            <h4>No Course Content Found</h4>
          </div>
        )}

        <div className="m-2">
          {/*  */}
          {showSectionInput && (
            <>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Add Section</Form.Label>
                <Form.Control
                  value={section}
                  onChange={(e) => setsection(e.target.value)}
                  type="text"
                  placeholder="Type Section Name"
                />
              </Form.Group>

              {btn_section_loading ? (
                <Button className="mx-1 p-2" variant="outlined">
                  <Spinner size="sm" animation="border" variant="danger" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitSection}
                  className="mx-1"
                  variant="outlined"
                >
                  ADD
                </Button>
              )}

              <Button
                onClick={() => {
                  showAddSectionInput();
                  setsection("");
                }}
                variant="contained"
              >
                Cancel
              </Button>
            </>
          )}

          {showSectionInput == false && (
            <Button onClick={showAddSectionInput} variant="contained">
              <AddIcon /> Section
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Curriculum;
