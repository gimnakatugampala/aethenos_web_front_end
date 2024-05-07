import React, { useEffect, useState } from "react";
import { Input } from "antd";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { CardContent } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Form from 'react-bootstrap/Form';
import RichTextEditor from "../../../../components/RichTextEditor";
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import JoditEditor from "jodit-react";

import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import HelpIcon from '@mui/icons-material/Help';
import ArticleIcon from "@mui/icons-material/Article";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import {AddCurriculumArticle, AddCurriculumDescription, AddCurriculumDownloadable, AddCurriculumExternalResourses, AddCurriculumQnAQuiz, AddCurriculumQuiz, AddCurriculumSection, AddCurriculumSourceCode, AddCurriculumVideo, AddLectureTitle, AssignmentDelete, AssignmentSave, CodingExerciseDelete, CodingExerciseSave, GetCurriculum, LectureDelete, PracticeTestDelete, PracticeTestSave, QuizDelete, SectionDelete} from "../../../../api"
import "./Curriculum.css";
import ErrorAlert from "../../../../commonFunctions/Alerts/ErrorAlert";
import removeHtmlTags from "../../../../commonFunctions/RemoveHTML";
import ListGroup from 'react-bootstrap/ListGroup';
import LaunchIcon from '@mui/icons-material/Launch';
import LargeSpinner from '../../../../commonFunctions/loaders/Spinner/LoadingSpinner'
import InputGroup from 'react-bootstrap/InputGroup';
import CreateIcon from '@mui/icons-material/Create';
import QuizIcon from '@mui/icons-material/Quiz';
import BugReportIcon from '@mui/icons-material/BugReport';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CodeIcon from '@mui/icons-material/Code';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'




const Curriculum = ({code}) => {

  const [showContentAdd, setshowContentAdd] = useState(null);
  const [showMain, setshowMain] = useState(null)
  const [showDescRes, setshowDescRes] = useState(true)
  const [curriculumvisiblity, setcurriculumvisiblity] = useState("");
  const [curriculumvisiblitymc, setcurriculumvisiblitymc] = useState("")
  const [extracurriculum, setextracurriculum] = useState("")

  const [showSectionInput, setshowSectionInput] = useState(false)

  const [question, setquestion] = useState("")

  const [answerOptionOne, setanswerOptionOne] = useState("ans1")
  const [answerOptionTwo, setanswerOptionTwo] = useState("ans2")
  const [answerOptionThree, setanswerOptionThree] = useState("ans3")
  const [answerOptionFour, setanswerOptionFour] = useState("ans4")
  const [answerOptionFive, setanswerOptionFive] = useState("ans5")
  const [answerOption, setanswerOption] = useState("")

  const [answerOne, setanswerOne] = useState("")
  const [answerTwo, setanswerTwo] = useState("")
  const [answerThree, setanswerThree] = useState("")
  const [answerFour, setanswerFour] = useState("")
  const [answerFive, setanswerFive] = useState("")

  const [answerExplainOne, setanswerExplainOne] = useState("")
  const [answerExplainTwo, setanswerExplainTwo] = useState("")
  const [answerExplainThree, setanswerExplainThree] = useState("")
  const [answerExplainFour, setanswerExplainFour] = useState("")
  const [answerExplainFive, setanswerExplainFive] = useState("")




  const [section, setsection] = useState("")
  const [lecturetitle, setlecturetitle] = useState("")

  // Section ID
  const [mainSectionID, setmainSectionID] = useState(null)


  // Get Section data
  const [sectionData, setsectionData] = useState([])


  // Curriculum Item Data
  const [article, setarticle] = useState("")
  const [curriculum_desc, setcurriculum_desc] = useState("")
  const [curriclum_ex_res_tile, setcurriclum_ex_res_tile] = useState("")
  const [curriculum_ex_res_link, setcurriculum_ex_res_link] = useState("")

  const [quizTitle, setquizTitle] = useState("")
  const [quizDesc, setquizDesc] = useState("")

  const [showCurriculumItem, setshowCurriculumItem] = useState(null)

  const [showLecInput, setshowLecInput] = useState(null)
  const [showQuizInput, setshowQuizInput] = useState(null)
  const [showPracticeTestInput, setshowPracticeTestInput] = useState(null)
  const [showCodingExecInput, setshowCodingExecInput] = useState(null)
  const [showAssignmentInput, setshowAssignmentInput] = useState(null)

  const [showDescription, setshowDescription] = useState(null)
  const [showResources, setshowResources] = useState(null)


  // ======== PRACTICE TEST ==================
  const [PraticeTestCode, setPraticeTestCode] = useState("")
  const [PracticeTestTitle, setPracticeTestTitle] = useState("")
  const [PracticeTestDesc, setPracticeTestDesc] = useState("")
  const [PracticeTestDuration, setPracticeTestDuration] = useState("")
  const [PracticeTestInstructions, setPracticeTestInstructions] = useState("")
  const [PracticeTestMinPassMark, setPracticeTestMinPassMark] = useState("")
  const [PracticeTestExLink, setPracticeTestExLink] = useState("")


  const [PracticeTestQuestionFile, setPracticeTestQuestionFile] = useState(null)
  const [PracticeTestQuestionExLink, setPracticeTestQuestionExLink] = useState("")


  const [PracticeTestSolutionsFile, setPracticeTestSolutionsFile] = useState(null)
  const [PraticeTestSolutionsExLink, setPraticeTestSolutionsExLink] = useState("")

  const [btnLoadingPracticeTest, setbtnLoadingPracticeTest] = useState(false)

  // ======== PRACTICE TEST ==================


  // ======== CODING EXEC ==================
  const [CodingExerciseCode, setCodingExerciseCode] = useState("")
  const [CodingExerciseTitle, setCodingExerciseTitle] = useState("")
  const [CodingExerciseDesc, setCodingExerciseDesc] = useState("")
  const [CodingExerciseInstructions, setCodingExerciseInstructions] = useState("")

  const [CodingExerciseVideo, setCodingExerciseVideo] = useState(null)
  const [CodingExerciseDResourses, setCodingExerciseDResourses] = useState(null)
  const [CodingExerciseExLink, setCodingExerciseExLink] = useState("")

  const [CodingExerciseUploadEx, setCodingExerciseUploadEx] = useState(null)
  const [CodingExerciseExternalLink, setCodingExerciseExternalLink] = useState("")
  const [CodingExerciseQVideo, setCodingExerciseQVideo] = useState(null)

  const [CodingExercisesSolutionsFile, setCodingExercisesSolutionsFile] = useState(null)
  const [CodingExercisesExLinkSolutions, setCodingExercisesExLinkSolutions] = useState("")
  const [CodingExercisesSolutionsVideo, setCodingExercisesSolutionsVideo] = useState(null)

  const [btnLoadingCodingExcercise, setbtnLoadingCodingExcercise] = useState(false)
  // ======== CODING EXEC ==================


  // ============ ASSIGNMENT =============
  const [AssignmentCode, setAssignmentCode] = useState("")
  const [AssignmentTitle, setAssignmentTitle] = useState("")
  const [AssignmentDesc, setAssignmentDesc] = useState("")
  const [AssignmentDuration, setAssignmentDuration] = useState("")
  const [AssignmentInstructors, setAssignmentInstructors] = useState("")
  const [AssignmentVideo, setAssignmentVideo] = useState(null)
  const [AssignmentDResourses, setAssignmentDResourses] = useState(null)
  const [AssignmentExLink, setAssignmentExLink] = useState("")

  const [AssignmentQuestion, setAssignmentQuestion] = useState("")
  const [AssignmentQuestionFile, setAssignmentQuestionFile] = useState(null)
  const [AssignmentQuestionLink, setAssignmentQuestionLink] = useState("")


  const [AssignmentSolutions, setAssignmentSolutions] = useState("")
  const [AssignmentSolutionsVideo, setAssignmentSolutionsVideo] = useState(null)
  const [AssignmentSolutionsFile, setAssignmentSolutionsFile] = useState(null)
  const [AssignmentSolutionsExLink, setAssignmentSolutionsExLink] = useState("")

  const [btnLoadingAssignment, setbtnLoadingAssignment] = useState(false)
  // ============ ASSIGNMENT =============



  const handleContentshow = () => setshowContentAdd(!showContentAdd);

  const showAddSectionInput = () => setshowSectionInput(!showSectionInput)

  

  // Add Section
  const handleSubmitSection = () =>{
      console.log(section)

      if(section == ""){
        ErrorAlert("Empty Field","Please Fill The Section Title")
        return
      }

      AddCurriculumSection(code,section,setshowSectionInput,setsection,setsectionData)
      
      // setsection("")

  }

  // Show Curriculum Item
  const handleshowCurriculumItems = () => {
    setshowCurriculumItem(!showCurriculumItem)

  }

    // Show Lecture Input
    const handleshowLectureInput = () => {
      setshowLecInput(!showLecInput)
      setshowCurriculumItem(false)
    }
      
  

    // Save Lecture
    const handleSaveLecture = (courseID) =>{
      // setshowLecInput(false)
      if(lecturetitle == ""){
        ErrorAlert("Empty Field","Please Enter Lecture Title")
        return
      }

      AddLectureTitle(code,lecturetitle,courseID,setlecturetitle,setshowLecInput,setshowCurriculumItem,setsectionData)

      console.log(lecturetitle,courseID)
    }
  
    // Cancel Lecture
    const handleCancelLectureInput = () =>{
      setshowLecInput(false)
      setshowCurriculumItem(true)
    }

    // ----------------


    // ====== SUBMIT PRACTICE TEST ======
    const handlePracticetestSave = () =>{
      console.log(mainSectionID)
      console.log(PraticeTestCode)
      console.log(PracticeTestTitle)
      console.log(PracticeTestDesc)
      console.log(PracticeTestDuration)
      console.log(PracticeTestMinPassMark)
      console.log(PracticeTestInstructions)
      console.log(PracticeTestExLink)
      console.log(PracticeTestQuestionFile)
      console.log(PracticeTestQuestionExLink)
      console.log(PracticeTestSolutionsFile)
      console.log(PraticeTestSolutionsExLink)

      if(PracticeTestTitle == ""){
        ErrorAlert("Empty Field","Please Fill The Title")
        return
      }

      if(PracticeTestDesc == ""){
        ErrorAlert("Empty Field","Please Fill The Description")
        return
      }

      if(PracticeTestDuration == ""){
        ErrorAlert("Empty Field","Please Fill The Duration")
        return
      }

      if(PracticeTestMinPassMark == ""){
        ErrorAlert("Empty Field","Please Fill The Min Pass Mark")
        return
      }

      if(PracticeTestInstructions == ""){
        ErrorAlert("Empty Field","Please Fill The Instructors")
        return
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
      )

    }


    // ======= SUBMIT CODING EXEC =======
    const handleCodingExecSave = () => {
      console.log(CodingExerciseTitle)
      console.log(CodingExerciseCode)
      console.log(CodingExerciseDesc)
      console.log(CodingExerciseInstructions)
      console.log(CodingExerciseVideo)
      console.log(CodingExerciseDResourses)
      console.log(CodingExerciseExLink)

      console.log(CodingExerciseUploadEx)
      console.log(CodingExerciseExternalLink)
      console.log(CodingExerciseQVideo)

      console.log(CodingExercisesSolutionsFile)
      console.log(CodingExercisesExLinkSolutions)
      console.log(CodingExercisesSolutionsVideo)

      if(CodingExerciseTitle == ""){
        ErrorAlert("Empty Field","Please Fill the Title")
        return
      }

      if(CodingExerciseDesc == ""){
        ErrorAlert("Empty Field","Please Fill the Description")
        return
      }

      if(CodingExerciseInstructions == ""){
        ErrorAlert("Empty Field","Please Fill the Instructors")
        return
      }


      CodingExerciseSave(
        mainSectionID,
        CodingExerciseCode,
        CodingExerciseTitle,
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
      )

    }


    // ======== SUBMIT ASSIGNMENT =======
    const handleAssignmentSave = () => {
      console.log(mainSectionID)
      console.log(AssignmentCode)
      console.log(AssignmentTitle)
      console.log(AssignmentDesc)
      console.log(AssignmentDuration)
      console.log(AssignmentInstructors)
      console.log(AssignmentVideo)
      console.log(AssignmentDResourses)
      console.log(AssignmentExLink)
      console.log(AssignmentQuestion)
      console.log(AssignmentQuestionFile)
      console.log(AssignmentQuestionLink)
      console.log(AssignmentSolutions)
      console.log(AssignmentSolutionsVideo)
      console.log(AssignmentSolutionsFile)
      console.log(AssignmentSolutionsExLink)

      if(AssignmentTitle == ""){
        ErrorAlert("Empty Field","Please Fill Title")
        return
      }

      if(AssignmentDesc == ""){
        ErrorAlert("Empty Field","Please Fill Description")
        return
      }

      if(AssignmentDuration == ""){
        ErrorAlert("Empty Field","Please Fill Duration")
        return
      }

      if(AssignmentInstructors == ""){
        ErrorAlert("Empty Field","Please Fill Instructions")
        return
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
      )
    }


    // ============= DELETE ==============

    const handleSectionDelete = (section) =>{
      // console.log(section.courseSection.sectionId)

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          SectionDelete(section.courseSection.sectionId)
        }
      });

    }

    const handleLectureDelete = (item) =>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          LectureDelete(item.id)
        }
      });

      // console.log(item.id)

    }

    const handleQuizDelete = (item) =>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          QuizDelete(item.id)
        }
      });

      console.log(item)
    }

    const handleAssignmentDelete = (item) =>{
      // console.log(item.getAssignment[0].assignmentCode)

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          AssignmentDelete(item.getAssignment[0].assignmentCode)
        }
      });

    }

    const handlePracticeTestDelete = (item) =>{

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          PracticeTestDelete(item.getPracticeTests[0].practiceTestCode)
        }
      });

      // console.log(item.getPracticeTests[0].practiceTestCode)


    }

    const handleCodingExercisesDelete = (item) =>{
        Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          // PracticeTestDelete(item.getPracticeTests[0].practiceTestCode)
          CodingExerciseDelete(item.getCodingExercises[0].codingExerciseCode)
        }
      });

      // console.log(item.getCodingExercises[0].codingExerciseCode)
    }
  

  useEffect(() => {
    GetCurriculum(code,setsectionData)
  }, [])

  useEffect(() => {
  sectionData.forEach(f => {
      console.log(f)
    })
  },[])

  // Save Description in Lecture
  const handleSaveDescription = (ID) => {
    console.log(ID)
    console.log(curriculum_desc)

    if(curriculum_desc == ""){
      ErrorAlert("Empty Field","Please Enter Description")
      return
    }

    // setcurriculum_desc
    AddCurriculumDescription(code,ID,curriculum_desc,setcurriculum_desc,setshowDescription,setsectionData)

  }

  // Save Resources > Downloadable
  const handleDownloadbaleFile = (e,ID) =>{
    console.log(e.target.files[0])

    // setcurriculum_download_file(e.target.files[0])
    AddCurriculumDownloadable(code,ID,e.target.files[0],setshowResources,setsectionData)
    
  }

   // Save Resources > External Reourses
   const handleExternalResources = (ID) =>{
      // console.log(ID)


      if(curriclum_ex_res_tile == ""){

        ErrorAlert("Empty Field","Please Enter Title")
        return

      }else if(curriculum_ex_res_link == ""){
        ErrorAlert("Empty Field","Please Enter Link")
        return

      }else{
        AddCurriculumExternalResourses(code,ID,curriclum_ex_res_tile,curriculum_ex_res_link,setcurriclum_ex_res_tile,setcurriculum_ex_res_link,setsectionData)
      }



   }

  //  Save Resource > Source Code
   const handleSaveSourceCode = (ID,e) =>{

    console.log(ID)
    console.log(e.target.files[0])

    AddCurriculumSourceCode(code,ID,e.target.files[0],setsectionData)

   }  
  
  //  Save Article > Article
   const handleSaveArticle = (ID) =>{

    if(article == ""){
      ErrorAlert("Empty Field","Please Enter Article Text")
      return
    }

    AddCurriculumArticle(code,ID,article,setsectionData,setarticle,setshowMain)
   }

// Save Video > Video
   const handleSaveVideo = (video,ID) =>{
      console.log(video)
      console.log(ID)


      AddCurriculumVideo(code,ID,video,setsectionData,setshowMain)
   }

  //  Save Quiz > First Step
    // Show Quiz Input
    const handleShowQuizInput = () =>{
      setshowQuizInput(!showQuizInput)
      setshowCurriculumItem(false)
    }

    // Save Quiz
    const handleSaveQuiz = (sectionID) =>{
      // setshowQuizInput(null)

      console.log(sectionID)
      console.log(quizTitle)
      console.log(quizDesc)

      if(quizTitle == ""){
        ErrorAlert("Empty Field","Please Enter Quiz Title")
      }else if(quizDesc == ""){
        ErrorAlert("Empty Field","Please Enter Quiz Description")
      }else{

        AddCurriculumQuiz(code,setsectionData,sectionID,quizTitle,quizDesc,setshowQuizInput,setshowCurriculumItem,setquizTitle,setquizDesc)

      }

  }

  // Save > Answer & Question
  const handleQuestionsAnswer = (item) =>{
    // console.log(item.id)

    let ID = item.id // Lect ID
    let curriculumID = item.getQuizs.length == 0 ? "" : item.getQuizs[0].id // Curriculum ID
    // console.log(item.getQuizs.length)
    console.log(ID)
    console.log(curriculumID)

    
    // console.log(answerOption)

    // console.log(answerOne)
    // console.log(answerExplainOne)

 
    // console.log(answerTwo)
    // console.log(answerExplainTwo)

    // console.log(answerThree)
    // console.log(answerExplainThree)

    // console.log(answerFour)
    // console.log(answerExplainFour)

    // console.log(answerFive)
    // console.log(answerExplainFive)

    if(question == ""){
      ErrorAlert("Empty Field","Please Enter a Question");
      return
    }else if(answerOption == ""){
      ErrorAlert("Empty Field","Please Select a Correct Answer");
      return
    }else if(answerOne == ""){
      ErrorAlert("Empty Field","Please Enter Answer One");
      return
    }else if(answerTwo == ""){
      ErrorAlert("Empty Field","Please Enter Answer Two");
      return
    }else if(answerThree == ""){
      ErrorAlert("Empty Field","Please Enter Answer Three");
      return
    }else if(answerFour == ""){
      ErrorAlert("Empty Field","Please Enter Answer Four");
      return
    }else if(answerFive == ""){
      ErrorAlert("Empty Field","Please Enter Answer Five");
      return
    }else{
      AddCurriculumQnAQuiz(code,curriculumID,question,ID,answerOne,answerTwo,answerThree,answerFour,answerFive,answerExplainOne,answerExplainTwo,answerExplainThree,answerExplainFour,answerExplainFive,answerOption,setcurriculumvisiblitymc,setshowMain,setsectionData)
    }
    
    
  }


  // Cancel Quiz
  const handleCancelQuizInput = () =>{
    setshowQuizInput(false)
    setshowCurriculumItem(true)
  }

  // Get Quiz Data
  const handleFillQuiz = (item) => {
   
console.log(item)
    setquestion(item.getQuizs.length == 0 ? "" : item.getQuizs[0].question)

    setanswerOne(item.getQuizs.length == 0 ? "" : item.getQuizs[0].getAnswers[0].name)
    setanswerTwo(item.getQuizs.length == 0 ? "" : item.getQuizs[0].getAnswers[1].name)
    setanswerThree(item.getQuizs.length == 0 ? "" : item.getQuizs[0].getAnswers[2].name)
    setanswerFour(item.getQuizs.length == 0 ? "" : item.getQuizs[0].getAnswers[3].name)
    setanswerFive(item.getQuizs.length == 0 ? "" : item.getQuizs[0].getAnswers[4].name)

    setanswerExplainOne(item.getQuizs.length == 0 ? "" : item.getQuizs[0].getAnswers[0].explanation)
    setanswerExplainTwo(item.getQuizs.length == 0 ? "" : item.getQuizs[0].getAnswers[1].explanation)
    setanswerExplainThree(item.getQuizs.length == 0 ? "" : item.getQuizs[0].getAnswers[2].explanation)
    setanswerExplainFour(item.getQuizs.length == 0 ? "" : item.getQuizs[0].getAnswers[3].explanation)
    setanswerExplainFive(item.getQuizs.length == 0 ? "" : item.getQuizs[0].getAnswers[4].explanation)

    if(item.getQuizs.length != 0){  
      if(item.getQuizs[0].getAnswers[0].correctAnswer == true){
        setanswerOption("ans1")
      }else if(item.getQuizs[0].getAnswers[1].correctAnswer == true){
        setanswerOption("ans2")
      }else if(item.getQuizs[0].getAnswers[2].correctAnswer == true){
        setanswerOption("ans3")
      }else if(item.getQuizs[0].getAnswers[3].correctAnswer == true){
        setanswerOption("ans4")
      }else if(item.getQuizs[0].getAnswers[4].correctAnswer == true){
        setanswerOption("ans5")
      }
    }else{
      setanswerOption("")
    }


  }


  return (
    <div className="col-md-8 curriculum-container">
      <Card className="py-2 my-2 p-4">

      <div className='d-flex justify-content-between'>
        <Typography className="p-3" variant="h4">
        Syllabus
        </Typography>
        
        </div>

        <hr />

        {/* Section 1 */}
      {sectionData != null  ? (
        sectionData.length > 0  ?  sectionData.map((section,index) => (
          <div key={index} className="card p-2 my-3">
            <CardContent>
              <div className="d-flex justify-content-between section-container">
                <Typography variant="subtitle1">
                  <b> Section {index + 1}:</b> <FileCopyIcon sx={{ fontSize: 15 }} />{" "}
                  {section.courseSection.sectionName}
                  <DeleteIcon onClick={() => handleSectionDelete(section)}  />
                </Typography>
              </div>


              <div className="my-2">

              {/* Lecture > Quiz > Assignment */}
              {section.courseSection.sectionCurriculumItem.length > 0 && section.courseSection.sectionCurriculumItem.map((item,index) => (

                // Lecture
                <>
                {item.type == "Lecture" && 

                (<Accordion key={index} className="my-3">
                  <AccordionSummary
               
                    className="accordian-header d-flex justify-content-between align-items-center"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <CheckCircleIcon fontSize="small" /> Lesson {index + 1}:{" "}
                      <FileCopyIcon sx={{ fontSize: 15 }} /> {item.title}
                     <DeleteIcon onClick={() => handleLectureDelete(item)} />
                    </Typography>

                    {showContentAdd == index ? (
                      <Button
                        onClick={() => {
                          setshowDescRes(true)
                          setshowMain(null)
                          console.log(index)
                          setshowContentAdd(null)
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
                          setshowDescRes(false)
                          setshowMain(showMain == index ? null : index)
                          console.log(index)
                          setshowContentAdd(showContentAdd == index ? null : index)
                          // handleContentshow()
                        }}
                        className="mx-2"
                        size="small"
                        variant="outlined"
                      >
                        <AddIcon /> Content
                      </Button>
                    )}
                  </AccordionSummary>

                  <AccordionDetails>

                    {/* Landing Content */}
                    {showMain == index ? (
                        curriculumvisiblity == "video" ? (
                        <div>
                          <Button
                            onClick={() => setcurriculumvisiblity("")}
                            variant="contained"
                          >
                            <CloseIcon /> Cancel
                          </Button>

                          {/* Upload Input */}
                          <Form.Group controlId="formFile" className="my-3">
                          <Form.Control accept="video/*" onChange={(e) => handleSaveVideo(e.target.files[0],item.id)} placeholder="Add a Video" type="file" />
                          <Form.Label style={{fontSize:11}}><b>Note:</b> All files should be at least 720p and less than 4.0 GB.</Form.Label>
                        </Form.Group>


                        {/* After Upload */}
                        <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Filename</th>
                                <th>Type</th>
                              </tr>
                            </thead>
                            <tbody>
                            {item.curriculumItemFiles.length > 0 && (
                              item.curriculumItemFiles.some(video => video.filetype === "Video") ? (
                                  item.curriculumItemFiles
                                      .filter(video => video.filetype === "Video")
                                      .map((video, index) => (
                                          <tr key={index}>
                                            <td>{video.url}</td>
                                            <td>Video</td>
                                          </tr>
                                      ))
                              ) : (
                                  <p>No Video</p>
                              )
                        )}

                            </tbody>
                          </Table>


                          <p><b>Note:</b> This video is still being processed. We will send you an email when it is ready.</p>
                          
                        </div>
                      ) : curriculumvisiblity == "article" ? (
                        <div>
                          <Button
                            onClick={() => setcurriculumvisiblity("")}
                            variant="contained"
                          >
                            <CloseIcon /> Cancel
                          </Button>

                          <div className="my-3">

                          {/* <Typography variant="h6" component="h6">
                            Article
                          </Typography> */}

                          {removeHtmlTags(item.article) != "N/A" && (
                          <ListGroup className="my-3">
                            <ListGroup.Item>{removeHtmlTags(item.article)}</ListGroup.Item>
                          </ListGroup>
                          )}

                            <JoditEditor value={article} onChange={(e) => setarticle(e)} />
                            <div className="d-flex flex-start my-2">
                              <Button onClick={(e) => handleSaveArticle(item.id)} variant="contained">SAVE</Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-center">
                          <div className="mx-2">
                            <Card sx={{ width: 120 }} elevation={3}>
                              <CardActionArea
                                onClick={() => {
                                  setshowDescRes(true)
                                  setcurriculumvisiblity("video")
                                }}
                                className="d-flex justify-content-center align-items-center text-center"
                              >
                                <CardContent>
                                  <PlayCircleIcon fontSize="large" />

                                  <p className="my-2">Video</p>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </div>


                          <div className="mx-2">
                            <Card sx={{ width: 120 }} elevation={3}>
                              <CardActionArea
                                onClick={() => {
                                  setshowDescRes(true)
                                  setcurriculumvisiblity("article")
                                }}
                                className="d-flex justify-content-center align-items-center text-center"
                              >
                                <CardContent>
                                  <ArticleIcon fontSize="large" />

                                  <p className="my-2">Articles</p>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </div>
                        </div>
                      )
                    ) : (
                        <></>
                    )}

                    <p>{item.description != "N/A" && removeHtmlTags(item.description)}</p>

                    <div className="my-3">
                    {item.curriculumItemFiles.length > 0 && (
                      <div className="p-2">
                          <h6><b>Downloadable Files</b></h6>
                          <ListGroup>
                              {item.curriculumItemFiles.some(downloaditem => downloaditem.filetype == "Downloadable Items") ? (
                                  item.curriculumItemFiles
                                      .filter(downloaditem => downloaditem.filetype == "Downloadable Items")
                                      .map((downloaditem, index) => (
                                          <ListGroup.Item key={index}>{downloaditem.title}</ListGroup.Item>
                                      ))
                              ) : (
                                  <p>No Downloadable Items</p>
                              )}
                          </ListGroup>
                      </div>
                  )}


                {item.curriculumItemFiles.some(link => link.filetype === "External Resourses") && (
                    <div className="p-2">
                        <h6><b>External Resources</b></h6>
                        <ListGroup>
                            {item.curriculumItemFiles
                                .filter(link => link.filetype === "External Resourses")
                                .map((link, index) => (
                                    <ListGroup.Item key={index}>
                                        <a  target="_blank" href={link.url}><LaunchIcon fontSize="10" />{link.title}</a>
                                    </ListGroup.Item>
                                ))}
                        </ListGroup>
                    </div>
                )}


                {item.curriculumItemFiles.length > 0 && (
                    <div className="p-2">
                        <h6><b>Source Code</b></h6>
                        <ListGroup>
                            {item.curriculumItemFiles.some(source => source.filetype === "Source Code") ? (
                                item.curriculumItemFiles
                                    .filter(source => source.filetype === "Source Code")
                                    .map((source, index) => (
                                        <ListGroup.Item key={index}>{source.title}</ListGroup.Item>
                                    ))
                            ) : (
                                <p>No Source Code</p>
                            )}
                        </ListGroup>
                    </div>
                )}



                    </div>
                  

                      {/* Always There  : Description */}
                      {showDescription == index && (
                        <>
                        <Button onClick={() => setshowDescription(null)}  className="m-2" variant="contained"><CloseIcon /> Cancel</Button>
                         <Button onClick={() => setshowResources(null)}  className="m-2" variant="outlined"><AddIcon /> Resourses</Button> 
                        <JoditEditor value={curriculum_desc} onChange={(value) => setcurriculum_desc(value)} />

                        <div className="d-flex my-2">
                        <Button onClick={() => setshowDescription(null)} className="mr-1" variant="outlined">Cancel</Button>
                        <Button onClick={() => handleSaveDescription(item.id)} className="ml-1"  variant="contained">Save</Button>
                        </div>
                        </>
                      )}

                        {/* Add Description & Resourses */}
                        
                        {showMain == null && showDescription != index &&  (
                        <>
                      
                        
                        <Button onClick={() => setshowDescription(showDescription == index ? null : index)} className="m-2" variant="outlined"><AddIcon /> Description</Button>
                        <Button onClick={() => setshowResources(showResources == index ? null : index)}  className="m-2" variant="outlined"><AddIcon /> Resourses</Button>
                        
                     
                        </>
                        )}

                        {showResources == index && (
                          <div>
                            <Button onClick={() => setshowResources(null)}  className="m-2" variant="contained"><CloseIcon /> Cancel</Button>

                             {/* <Button onClick={() => setshowDescription(showDescription == index ? null : index)} className="m-2" variant="outlined"><AddIcon /> Description</Button>  */}
                            
                            {/* Tabs */}
                            <Tabs
                            defaultActiveKey="d-file"
                            id="uncontrolled-tab-example"
                            className="my-3"
                          >
                            <Tab eventKey="d-file" title="Downloadable File">

                            <Form.Group controlId="formFile" className="mb-3">
                            {/* (e) =>  */}
                              <Form.Control  onChange={(e) => handleDownloadbaleFile(e,item.id)} type="file" />
                              <Form.Label style={{fontSize:11}}><b>Note:</b>  A resource is for any type of document that can be used to help students in the lesson. This file is going to be seen as a lesson extra. Make sure everything is legible and the file size is less than 1 GiB.</Form.Label>
                            </Form.Group>
                              
                            </Tab>
                            <Tab eventKey="e-r" title="External Resources">

                            <Form> 
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control value={curriclum_ex_res_tile} onChange={(e) => setcurriclum_ex_res_tile(e.target.value)} type="text" placeholder="A Descriptive Title" />
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>URL</Form.Label>
                                <Form.Control value={curriculum_ex_res_link} onChange={(e) => setcurriculum_ex_res_link(e.target.value)} type="text" placeholder="https://example.com" />
                              </Form.Group>
                              <Button onClick={() => handleExternalResources(item.id)} variant="contained">Add Link</Button>
                            </Form>

                            </Tab>
                            <Tab eventKey="source-code" title="Source Code">

                            <Form.Group onChange={(e) => handleSaveSourceCode(item.id,e)} controlId="formFile" className="mb-3">
                              <Form.Control type="file" />
                              <Form.Label style={{fontSize:11}}><b>Note:</b>  Only available for Python and Ruby for now. You can upload .py and .rb files.</Form.Label>
                            </Form.Group>

                            </Tab>
                          </Tabs>
                          </div>
                        )}
                        
                        
                    

                  </AccordionDetails>
                </Accordion>) }

                {/* Quiz */}
                {item.type == "Quiz" && 
                 (
                  // Quiz Accordance
                <Accordion key={index} className="my-3">
                  <AccordionSummary
                    className="accordian-header d-flex justify-content-between align-items-center"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <CheckCircleIcon fontSize="small" /> Quiz {index + 1}:{" "}
                      <QuizIcon sx={{ fontSize: 15 }} /> {item.title}
                      <DeleteIcon onClick={() => handleQuizDelete(item)} />
                    </Typography>

                    {showContentAdd == index ? (
                      <Button
                        onClick={() => {
                          setshowDescRes(true)
                          setshowMain(null)
                          console.log(index)
                          setshowContentAdd(null)
                          setcurriculumvisiblitymc("")
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
                          setshowMain(showMain == index ? null : index)
                          setshowContentAdd(showContentAdd == index ? null : index)
                        }}
                        className="mx-2"
                        size="small"
                        variant="outlined"
                      >
                        <AddIcon /> Questions
                      </Button>
                    )}
                  </AccordionSummary>

                  <AccordionDetails>

                    {/* Landing Content */}
                    {showMain == index ? (
                        curriculumvisiblitymc == "mc" ? (
                        <div>

                          <Button
                          className="my-2"
                            onClick={() => setcurriculumvisiblitymc("")}
                            variant="contained"
                          >
                            <CloseIcon /> Cancel
                          </Button>
                          
                          {/* MCQ */}
                        <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Question</Form.Label>
                          <Form.Control value={question} onChange={(e) => setquestion(e.target.value)} as="textarea" rows={3} />
                        </Form.Group>

                        <Form.Label>Answers</Form.Label>
                        <RadioGroup
                          name="group1"
                          onChange={(e) => setanswerOption(e.target.value)}
                          value={answerOption}
                        >
                        <div className="row">

                          {/* 1 */}
                            <div className="col-md-1">
                              <Radio value={answerOptionOne} onChange={(e) => setanswerOptionOne(e.target.value)} />
                            </div>
                            <div className="col-md-11 mb-3">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Control value={answerOne} onChange={(e) => setanswerOne(e.target.value)} as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Control value={answerExplainOne} onChange={(e) => setanswerExplainOne(e.target.value)} type="text" placeholder="Explain why this is or isn't the best answer" />
                            </div>

                          {/* 2 */}
                            <div className="col-md-1">
                              <Radio value={answerOptionTwo} onChange={(e) => setanswerOptionTwo(e.target.value)} />
                            </div>
                            <div className="col-md-11 mb-3">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Control value={answerTwo} onChange={(e) => setanswerTwo(e.target.value)} as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Control value={answerExplainTwo} onChange={(e) => setanswerExplainTwo(e.target.value)} type="text" placeholder="Explain why this is or isn't the best answer" />
                            </div>

                        {/* 3 */}
                        <div className="col-md-1">
                          <Radio value={answerOptionThree} onChange={(e) => setanswerOptionThree(e.target.value)} />
                        </div>

                        <div className="col-md-11 mb-3">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                          <Form.Control value={answerThree} onChange={(e) => setanswerThree(e.target.value)} as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Control value={answerExplainThree} onChange={(e) => setanswerExplainThree(e.target.value)} type="text" placeholder="Explain why this is or isn't the best answer" />
                        </div>

                        {/* 4 */}
                        <div className="col-md-1">
                          <Radio value={answerOptionFour} onChange={(e) => setanswerOptionFour(e.target.value)} />
                        </div>

                        <div className="col-md-11 mb-3">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                          <Form.Control value={answerFour} onChange={(e) => setanswerFour(e.target.value)} as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Control value={answerExplainFour} onChange={(e) => setanswerExplainFour(e.target.value)} type="text" placeholder="Explain why this is or isn't the best answer" />
                        </div>



                        {/* 5*/}
                        <div className="col-md-1">
                          <Radio value={answerOptionFive} onChange={(e) => setanswerOptionFive(e.target.value)} />

                        </div>

                        <div className="col-md-11 mb-3">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                          <Form.Control value={answerFive} onChange={(e) => setanswerFive(e.target.value)} as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Control value={answerExplainFive} onChange={(e) => setanswerExplainFive(e.target.value)} type="text" placeholder="Explain why this is or isn't the best answer" />
                        </div>


                        </div>
                        </RadioGroup>

                        <div className="d-flex justify-content-end">
                        <Button onClick={() => handleQuestionsAnswer(item)}  variant="outlined">
                          ADD
                        </Button>
                        </div>
                      

                      </Form>
                          
                          
                        </div>
                      )  : (
                        <div className="d-flex justify-content-center">
                          <div className="mx-2">
                            <Card sx={{ width: 140 }} elevation={3}>
                              <CardActionArea
                                onClick={() => {
                                  setshowDescRes(true)
                                  setcurriculumvisiblitymc("mc")
                                  handleFillQuiz(item)
                                }}
                                className="d-flex justify-content-center align-items-center text-center"
                              >
                                <CardContent>
                                  <HelpIcon fontSize="large" />
                                  <p className="my-2">Multiple Choice</p>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </div>

                        </div>
                      ) 
                    ) : (
                        <></>
                    )}
                  

            

                        {showResources == index && (
                          <div>
                            <Button onClick={() => setshowResources(null)}  className="m-2" variant="contained"><CloseIcon /> Cancel</Button>
                            <Button onClick={() => setshowDescription(showDescription == index ? null : index)} className="m-2" variant="outlined"><AddIcon /> Description</Button>
                            
                            {/* Tabs */}
                            <Tabs
                            defaultActiveKey="d-file"
                            id="uncontrolled-tab-example"
                            className="my-3"
                          >
                            <Tab eventKey="d-file" title="Downloadable File">

                            <Form.Group controlId="formFile" className="mb-3">
                            {/* (e) =>  */}
                              <Form.Control  onChange={(e) => handleDownloadbaleFile(e,item.id)} type="file" />
                              <Form.Label style={{fontSize:11}}><b>Note:</b>  A resource is for any type of document that can be used to help students in the lesson. This file is going to be seen as a lesson extra. Make sure everything is legible and the file size is less than 1 GiB.</Form.Label>
                            </Form.Group>
                              
                            </Tab>
                            <Tab eventKey="e-r" title="External Resources">

                            <Form> 
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control value={curriclum_ex_res_tile} onChange={(e) => setcurriclum_ex_res_tile(e.target.value)} type="text" placeholder="A Descriptive Title" />
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>URL</Form.Label>
                                <Form.Control value={curriculum_ex_res_link} onChange={(e) => setcurriculum_ex_res_link(e.target.value)} type="text" placeholder="https://example.com" />
                              </Form.Group>
                              <Button onClick={() => handleExternalResources(item.id)} variant="contained">Add Link</Button>
                            </Form>

                            </Tab>
                            <Tab eventKey="source-code" title="Source Code">

                            <Form.Group onChange={(e) => handleSaveSourceCode(item.id,e)} controlId="formFile" className="mb-3">
                              <Form.Control type="file" />
                              <Form.Label style={{fontSize:11}}><b>Note:</b>  Only available for Python and Ruby for now. You can upload .py and .rb files.</Form.Label>
                            </Form.Group>

                            </Tab>
                          </Tabs>
                          </div>
                        )}
                        
                        
                    

                  </AccordionDetails>
                </Accordion>
                )}

                {/* Assignment */}
                {item.type == "Assignment" && 
                 (
                  // Assignment
                <Accordion key={index} className="my-3">
                  <AccordionSummary
                    className="accordian-header d-flex justify-content-between align-items-center"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <CheckCircleIcon fontSize="small" /> Assignment {index + 1}:{" "}
                      <AssessmentIcon sx={{ fontSize: 15 }} /> {item.title}
                      <DeleteIcon onClick={() => handleAssignmentDelete(item)}  />
                    </Typography>

                    {showContentAdd == index ? (
                      <Button
                        onClick={() => {
                          setshowDescRes(true)
                          setshowMain(null)
                          console.log(index)
                          setshowContentAdd(null)
                          setcurriculumvisiblitymc("")
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
                          setshowMain(showMain == index ? null : index)
                          setshowContentAdd(showContentAdd == index ? null : index)

                          console.log(item)
                          setmainSectionID(section.courseSection.sectionId)

                          // Fill Data
                          setAssignmentCode(item.getAssignment[0].assignmentCode)
                          setAssignmentTitle(item.title)
                          setAssignmentDesc(item.description)
                          setAssignmentDuration(item.getAssignment[0].duration)
                          setAssignmentInstructors(item.getAssignment[0].instructions)
                          setAssignmentExLink(item.getAssignment[0].solutionsExternalLink)


                          setAssignmentQuestion(item.getAssignment[0].question)
                          setAssignmentQuestionLink(item.getAssignment[0].questionExternalLink)

                          setAssignmentSolutions(item.getAssignment[0].solutions)
                          setAssignmentSolutionsExLink(item.getAssignment[0].solutionsExternalLink)




                        }}
                        className="mx-2"
                        size="small"
                        variant="outlined"
                      >
                        <CreateIcon /> Edit
                      </Button>
                    )}
                  </AccordionSummary>

                  <AccordionDetails>

                  {showMain == index && (

                          <Tabs
                          defaultActiveKey="assignment"
                          id="uncontrolled-tab-example"
                          className="mb-3"
                          >

                          <Tab eventKey="assignment" title="Assignment information and Instructions">
                          <Form>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>Title</Form.Label>
                              <Form.Control value={AssignmentTitle} onChange={(e) => setAssignmentTitle(e.target.value)} type="text" placeholder="Assignment Title" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Label>Description</Form.Label>
                              <Form.Control value={AssignmentDesc} onChange={(e) => setAssignmentDesc(e.target.value)}  as="textarea" rows={2} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>Duration</Form.Label>
                              <Form.Control value={AssignmentDuration} onChange={(e) => setAssignmentDuration(e.target.value)} type="text" placeholder="00:00" />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Label>Instructions</Form.Label>
                              <Form.Control value={AssignmentInstructors} onChange={(e) => setAssignmentInstructors(e.target.value)} as="textarea" rows={3} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Upload Video</Form.Label>
                                <Form.Control onChange={(e) => {
                                  setAssignmentVideo(e.target.files[0])
                                }} type="file" />
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Downloadable Resourses</Form.Label>
                                <Form.Control  onChange={(e) => setAssignmentDResourses(e.target.files[0])} type="file" multiple />
                              </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Label>External Link</Form.Label>
                              <Form.Control value={AssignmentExLink} onChange={(e) => setAssignmentExLink(e.target.value)} type="text" placeholder="https://example.com" />
                            </Form.Group>
                          </Form>
                          </Tab>

                          <Tab eventKey="questions" title="Questions">

                          <Form>

                          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Label>Questions</Form.Label>
                              <Form.Control value={AssignmentQuestion} onChange={(e) => setAssignmentQuestion(e.target.value)} as="textarea" rows={2} />
                            </Form.Group>

                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Upload Question</Form.Label>
                          <Form.Control  onChange={(e) => setAssignmentQuestionFile(e.target.files[0])} type="file" />
                          </Form.Group>


                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>External Link</Form.Label>
                          <Form.Control value={AssignmentQuestionLink} onChange={(e) => setAssignmentQuestionLink(e.target.value)} type="text" placeholder="https://example.com" />
                          </Form.Group>
                          </Form>

                          </Tab>
                          <Tab eventKey="solutions" title="Solutions">
                          <Form>

                          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                              <Form.Label>Solutions</Form.Label>
                              <Form.Control value={AssignmentSolutions} onChange={(e) => setAssignmentSolutions(e.target.value)} as="textarea" rows={2} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Upload Video</Form.Label>
                                <Form.Control  onChange={(e) => setAssignmentSolutionsVideo(e.target.files[0])} type="file" />
                              </Form.Group>

                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Upload Solutions</Form.Label>
                          <Form.Control  onChange={(e) => setAssignmentSolutionsFile(e.target.files[0])} type="file" />
                          </Form.Group>


                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>External Link</Form.Label>
                          <Form.Control value={AssignmentSolutionsExLink} onChange={(e) => setAssignmentSolutionsExLink(e.target.value)} type="text" placeholder="https://example.com" />
                          </Form.Group>

                          <Button onClick={() => setshowAssignmentInput(null)} variant="outlined">Cancel</Button>
                          {btnLoadingAssignment ? (
                          <Button  className="mx-1" variant="contained">Loading..</Button>
                          ) : (
                          <Button onClick={handleAssignmentSave} className="mx-1" variant="contained">Save Assignment</Button>
                          )}

                          </Form>
                          </Tab>
                          </Tabs>
                  )}

                  </AccordionDetails>
                </Accordion>
                )}

                {/* Practice test */}
                {item.type == "Practice Test" && 
                 (
                  // Assignment
                <Accordion key={index} className="my-3">
                  <AccordionSummary
                    className="accordian-header d-flex justify-content-between align-items-center"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <CheckCircleIcon fontSize="small" /> Practice Test {index + 1}:{" "}
                      <BugReportIcon sx={{ fontSize: 15 }} /> {item.title}
                      <DeleteIcon onClick={() => handlePracticeTestDelete(item)} />
                    </Typography>

                    {showContentAdd == index ? (
                      <Button
                        onClick={() => {
                          setshowDescRes(true)
                          setshowMain(null)
                          console.log(index)
                          setshowContentAdd(null)
                          setcurriculumvisiblitymc("")
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
                          setshowMain(showMain == index ? null : index)
                          setshowContentAdd(showContentAdd == index ? null : index)

                          console.log(item)
                          setmainSectionID(section.courseSection.sectionId)

                          // Fill Data
                          setPraticeTestCode(item.getPracticeTests[0].practiceTestCode)
                          setPracticeTestTitle(item.title)
                          setPracticeTestDesc(item.description)
                          setPracticeTestDuration(item.getPracticeTests[0].duration)
                          setPracticeTestInstructions(item.getPracticeTests[0].instructions)
                          setPracticeTestMinPassMark(item.getPracticeTests[0].minimumuPassMark)


                          setPracticeTestExLink(item.getPracticeTests[0].externalLink)
                          setPracticeTestQuestionExLink(item.getPracticeTests[0].questionLink)

                          setPraticeTestSolutionsExLink(item.getPracticeTests[0].solutionLink)


                        }}
                        className="mx-2"
                        size="small"
                        variant="outlined"
                      >
                        <CreateIcon /> Edit
                      </Button>
                    )}
                  </AccordionSummary>

                  <AccordionDetails>

                  {showMain == index && (

                      <Tabs
                      defaultActiveKey="practice"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                      >

                      <Tab eventKey="practice" title="Practice Test information and Instructions">
                      <Form>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Title</Form.Label>
                          <Form.Control value={PracticeTestTitle} onChange={(e) => setPracticeTestTitle(e.target.value)} type="text" placeholder="Practice Test Title" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Description</Form.Label>
                          <Form.Control value={PracticeTestDesc} onChange={(e) => setPracticeTestDesc(e.target.value)} as="textarea" rows={2} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Duration</Form.Label>
                          <Form.Control value={PracticeTestDuration} onChange={(e) => setPracticeTestDuration(e.target.value)} type="text" placeholder="00:00" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Minimum pass mark</Form.Label>
                          <Form.Control value={PracticeTestMinPassMark} onChange={(e) => setPracticeTestMinPassMark(e.target.value)} type="number" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Instructions</Form.Label>
                          <Form.Control value={PracticeTestInstructions} onChange={(e) => setPracticeTestInstructions(e.target.value)} as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>External Link</Form.Label>
                          <Form.Control value={PracticeTestExLink} onChange={(e) => setPracticeTestExLink(e.target.value)} type="text" placeholder="https://example.com" />
                        </Form.Group>
                      </Form>
                      </Tab>

                      <Tab eventKey="questions" title="Questions">

                      <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Upload Question</Form.Label>
                      <Form.Control  onChange={(e) => setPracticeTestQuestionFile(e.target.files[0])} type="file" />
                      </Form.Group>


                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>External Link</Form.Label>
                      <Form.Control value={PracticeTestQuestionExLink} onChange={(e) => setPracticeTestQuestionExLink(e.target.value)} type="text" placeholder="https://example.com" />
                      </Form.Group>
                      </Form>

                      </Tab>
                      <Tab eventKey="solutions" title="Solutions">
                      <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Upload Solutions</Form.Label>
                      <Form.Control  onChange={(e) => setPracticeTestSolutionsFile(e.target.files[0])} type="file" />
                      </Form.Group>


                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>External Link</Form.Label>
                      <Form.Control value={PraticeTestSolutionsExLink} onChange={(e) => setPraticeTestSolutionsExLink(e.target.value)} type="text" placeholder="https://example.com" />
                      </Form.Group>

                      <Button onClick={() => setshowPracticeTestInput(null)} className="mx-1"  variant="outlined">Cancel</Button>
                      {btnLoadingPracticeTest ? (
                      <Button variant="contained">Loading..</Button>
                      ) :(
                      <Button onClick={handlePracticetestSave} variant="contained">Save Practice Test</Button>
                      )}

                      </Form>
                      </Tab>
                      </Tabs>

                        
                  )}

                  </AccordionDetails>
                </Accordion>
                )}


                {/* Coding Exercise */}
                {item.type == "Coding Exercise" && 
                 (
                  // Assignment
                <Accordion key={index} className="my-3">
                  <AccordionSummary
                    className="accordian-header d-flex justify-content-between align-items-center"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      <CheckCircleIcon fontSize="small" /> Coding Exercise {index + 1}:{" "}
                      <CodeIcon sx={{ fontSize: 15 }} /> {item.title}
                      <DeleteIcon onClick={() => handleCodingExercisesDelete(item)} />
                    </Typography>

                    {showContentAdd == index ? (
                      <Button
                        onClick={() => {
                          setshowDescRes(true)
                          setshowMain(null)
                          console.log(index)
                          setshowContentAdd(null)
                          setcurriculumvisiblitymc("")
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
                          setshowMain(showMain == index ? null : index)
                          setshowContentAdd(showContentAdd == index ? null : index)

                          console.log(item)
                          setmainSectionID(section.courseSection.sectionId)

                          // Fill Data
                          setCodingExerciseCode(item.getCodingExercises[0].codingExerciseCode)
                          setCodingExerciseTitle(item.title)
                          setCodingExerciseDesc(item.description)
                          setCodingExerciseInstructions(item.getCodingExercises[0].instructions)
                          setCodingExerciseExLink(item.getCodingExercises[0].externalLink == null ? "" : item.getCodingExercises[0].externalLink)

                          setCodingExerciseExternalLink(item.getCodingExercises[0].codingExternalLink)
                          setCodingExercisesExLinkSolutions(item.getCodingExercises[0].solutionsExternalLink)
                          


                        }}
                        className="mx-2"
                        size="small"
                        variant="outlined"
                      >
                        <CreateIcon /> Edit
                      </Button>
                    )}
                  </AccordionSummary>

                  <AccordionDetails>

                  {showMain == index && (
                     <Tabs
                     defaultActiveKey="coding"
                     id="uncontrolled-tab-example"
                     className="mb-3"
                   >
     
                     <Tab eventKey="coding" title="Coding Exercise information and Instructions">
                     <Form>
     
                       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                         <Form.Label>Title</Form.Label>
                         <Form.Control value={CodingExerciseTitle} onChange={(e) => setCodingExerciseTitle(e.target.value)} type="text" placeholder="Coding Excercise" />
                       </Form.Group>
     
                       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                         <Form.Label>Description</Form.Label>
                         <Form.Control value={CodingExerciseDesc} onChange={(e) => setCodingExerciseDesc(e.target.value)} as="textarea" rows={2} />
                       </Form.Group>
   
                       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                         <Form.Label>Instructions</Form.Label>
                         <Form.Control value={CodingExerciseInstructions} onChange={(e) => setCodingExerciseInstructions(e.target.value)} as="textarea" rows={2} />
                       </Form.Group>
     
     
                       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                         <Form.Label>Upload Video</Form.Label>
                         <Form.Control  onChange={(e) => setCodingExerciseVideo(e.target.files[0])} type="file" />
                       </Form.Group>
   
                       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                         <Form.Label>Downloadable Resourses</Form.Label>
                         <Form.Control onChange={(e) => setCodingExerciseDResourses(e.target.files[0])} type="file" multiple />
                       </Form.Group>
   
                       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                         <Form.Label>External Link</Form.Label>
                         <Form.Control value={CodingExerciseExLink} onChange={(e) => setCodingExerciseExLink(e.target.value)} type="text" placeholder="https://example.com" />
                       </Form.Group>
                     </Form>
                     </Tab>
     
                     <Tab eventKey="coding-exercises" title="Coding exercises">
     
                     <Form>
                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     <Form.Label>Upload coding exercises</Form.Label>
                     <Form.Control  onChange={(e) => setCodingExerciseUploadEx(e.target.files[0])} type="file" multiple />
                   </Form.Group>
     
     
                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     <Form.Label>External Link</Form.Label>
                     <Form.Control value={CodingExerciseExternalLink} onChange={(e) => setCodingExerciseExternalLink(e.target.value)} type="text" placeholder="https://example.com" />
                   </Form.Group>
   
                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                         <Form.Label>Upload Video</Form.Label>
                         <Form.Control  onChange={(e) => setCodingExerciseQVideo(e.target.files[0])} type="file" />
                       </Form.Group>
                   </Form>
     
                     </Tab>
                     <Tab eventKey="solutions" title="Solutions">
                     <Form>
                     <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     <Form.Label>Upload Solutions</Form.Label>
                     <Form.Control  onChange={(e) => setCodingExercisesSolutionsFile(e.target.files[0])} type="file" multiple />
                   </Form.Group>
     
     
                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     <Form.Label>External Link</Form.Label>
                     <Form.Control value={CodingExercisesExLinkSolutions} onChange={(e) => setCodingExercisesExLinkSolutions(e.target.value)} type="text" placeholder="https://example.com" />
                   </Form.Group>
   
                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                         <Form.Label>Upload Video</Form.Label>
                         <Form.Control  onChange={(e) => setCodingExercisesSolutionsVideo(e.target.files[0])} type="file" />
                       </Form.Group>
                   <Button onClick={() => setshowCodingExecInput(null)} variant="outlined">Cancel</Button>
                   {btnLoadingCodingExcercise ? (
                   <Button  className="mx-1" variant="contained">Loading..</Button>
                   ) :(
                   <Button onClick={handleCodingExecSave} className="mx-1" variant="contained">Save Coding Exercise</Button>
                   )}
     
                   </Form>
                     </Tab>
                   </Tabs>
                        
                  )}

                  </AccordionDetails>
                </Accordion>
                )}

                </>
              ))}


          
              

              </div>

              

          {/* Curriculum Item ACTION */}
              <div className="m-2">


                {showCurriculumItem == index && (
                  <div className="border border-danger p-1">

                    <Button onClick={() => {
                      // handleshowCurriculumItems()
                      setshowQuizInput(null)
                      setshowLecInput(null)
                      setshowCurriculumItem(null)
                      setshowPracticeTestInput(null)
                      setshowCodingExecInput(null)
                      setshowAssignmentInput(null)
                      }} variant="text"><CloseIcon /></Button>

                      <Button onClick={() => {
                        setshowLecInput(showLecInput == index ? null : index)
                        
                        setshowAssignmentInput(null)
                        setshowQuizInput(null)
                        setshowCodingExecInput(null)
                        setshowPracticeTestInput(null)
                      }} variant="text">
                        <AddIcon />
                        Lesson
                      </Button>
                  
                      <Button onClick={() => {
                        setshowQuizInput(showQuizInput == index ? null : index)
                        setshowLecInput(null)
                        setshowAssignmentInput(null)
                        setshowCodingExecInput(null)
                        setshowPracticeTestInput(null)

                      }} variant="text">
                      <AddIcon />
                        Quiz
                      </Button>

                      <Button onClick={() => {
                        setshowPracticeTestInput(showPracticeTestInput == index ? null : index)
                        setshowLecInput(null)
                        setshowQuizInput(null)
                        setshowAssignmentInput(null)
                        setshowCodingExecInput(null)

                      }} variant="text">
                      <AddIcon />
                        Pratice Test
                      </Button>

                      <Button onClick={() => {
                        setshowCodingExecInput(showCodingExecInput == index ? null : index)
                        setshowLecInput(null)
                        setshowQuizInput(null)
                        setshowPracticeTestInput(null)
                        setshowAssignmentInput(null)
                      }} variant="text">
                      <AddIcon />
                        Coding Excercises
                      </Button>

                      <Button onClick={() => {
                        setshowAssignmentInput(showAssignmentInput == index ? null : index)
                        setshowLecInput(null)
                        setshowQuizInput(null)
                        setshowPracticeTestInput(null)
                        setshowCodingExecInput(null)
                      }} variant="text">
                      <AddIcon />
                        Assignment
                      </Button>

                  </div>
                )}

                  {showCurriculumItem != index && (
                  <Button onClick={() => {
                    setmainSectionID(section.courseSection.sectionId) 
                    setshowCurriculumItem(showCurriculumItem == index ? null : index)}} variant="contained">
                    <AddIcon /> Syllabus Item
                  </Button>

                  )}

          


              </div>

              {/* Curriculum Item ACTION */}

              {/* Curriculum Item > Lectures */}

              {showLecInput == index && (
                <>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Add Lesson</Form.Label>
                      <Form.Control onChange={(e) => setlecturetitle(e.target.value)} type="text" placeholder="Type Lesson Name" />
              </Form.Group>

                <Button onClick={() => handleSaveLecture(section.courseSection.sectionId)} className="mx-1" variant="outlined">
                    ADD
                  </Button>
                  {/* handleCancelLectureInput */}
                  <Button onClick={() => setshowLecInput(null)} variant="contained">
                    Cancel
                  </Button>
                </>
              )}
              {/* Syllabus Item > Lectures */}

              {/* Syllabus Item > Quiz */}

              {showQuizInput == index && (

              <div className="p-4 m-2">
        
              <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Quiz Title</Form.Label>
                <Form.Control value={quizTitle} onChange={(e) => setquizTitle(e.target.value)} type="text" placeholder="Enter a Title" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Quiz Description</Form.Label>
                <Form.Control value={quizDesc} onChange={(e) => setquizDesc(e.target.value)} as="textarea" rows={3} />
              </Form.Group>
              </Form>

              <Button onClick={() => handleSaveQuiz(section.courseSection.sectionId)} className="mx-1" variant="outlined">
                ADD
              </Button>
              
              <Button onClick={() => setshowQuizInput(null) } variant="contained">
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

                <Tab eventKey="practice" title="Practice Test information and Instructions">
                <Form>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={PracticeTestTitle} onChange={(e) => setPracticeTestTitle(e.target.value)} type="text" placeholder="Practice Test Title" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={PracticeTestDesc} onChange={(e) => setPracticeTestDesc(e.target.value)} as="textarea" rows={2} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control value={PracticeTestDuration} onChange={(e) => setPracticeTestDuration(e.target.value)} type="text" placeholder="00:00" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Minimum pass mark</Form.Label>
                    <Form.Control value={PracticeTestMinPassMark} onChange={(e) => setPracticeTestMinPassMark(e.target.value)} type="number" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Instructions</Form.Label>
                    <Form.Control value={PracticeTestInstructions} onChange={(e) => setPracticeTestInstructions(e.target.value)} as="textarea" rows={3} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>External Link</Form.Label>
                    <Form.Control value={PracticeTestExLink} onChange={(e) => setPracticeTestExLink(e.target.value)} type="text" placeholder="https://example.com" />
                  </Form.Group>
                </Form>
                </Tab>

                <Tab eventKey="questions" title="Questions">

                <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Upload Question</Form.Label>
                <Form.Control  onChange={(e) => setPracticeTestQuestionFile(e.target.files[0])} type="file" />
              </Form.Group>


              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>External Link</Form.Label>
                <Form.Control value={PracticeTestQuestionExLink} onChange={(e) => setPracticeTestQuestionExLink(e.target.value)} type="text" placeholder="https://example.com" />
              </Form.Group>
              </Form>

                </Tab>
                <Tab eventKey="solutions" title="Solutions">
                <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Upload Solutions</Form.Label>
                <Form.Control  onChange={(e) => setPracticeTestSolutionsFile(e.target.files[0])} type="file" />
              </Form.Group>


              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>External Link</Form.Label>
                <Form.Control value={PraticeTestSolutionsExLink} onChange={(e) => setPraticeTestSolutionsExLink(e.target.value)} type="text" placeholder="https://example.com" />
              </Form.Group>

              <Button onClick={() => setshowPracticeTestInput(null)} className="mx-1"  variant="outlined">Cancel</Button>
              {btnLoadingPracticeTest ? (
                <Button variant="contained">Loading..</Button>
              ) :(
                <Button onClick={handlePracticetestSave} variant="contained">Save Practice Test</Button>
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
  
                  <Tab eventKey="coding" title="Coding Exercise information and Instructions">
                  <Form>
  
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Title</Form.Label>
                      <Form.Control value={CodingExerciseTitle} onChange={(e) => setCodingExerciseTitle(e.target.value)} type="text" placeholder="Coding Excercise" />
                    </Form.Group>
  
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Description</Form.Label>
                      <Form.Control value={CodingExerciseDesc} onChange={(e) => setCodingExerciseDesc(e.target.value)} as="textarea" rows={2} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Instructions</Form.Label>
                      <Form.Control value={CodingExerciseInstructions} onChange={(e) => setCodingExerciseInstructions(e.target.value)} as="textarea" rows={2} />
                    </Form.Group>
  
  
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Upload Video</Form.Label>
                      <Form.Control  onChange={(e) => setCodingExerciseVideo(e.target.files[0])} type="file" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Downloadable Resourses</Form.Label>
                      <Form.Control onChange={(e) => setCodingExerciseDResourses(e.target.files[0])} type="file" multiple />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>External Link</Form.Label>
                      <Form.Control value={CodingExerciseExLink} onChange={(e) => setCodingExerciseExLink(e.target.value)} type="text" placeholder="https://example.com" />
                    </Form.Group>
                  </Form>
                  </Tab>
  
                  <Tab eventKey="coding-exercises" title="Coding exercises">
  
                  <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Upload coding exercises</Form.Label>
                  <Form.Control  onChange={(e) => setCodingExerciseUploadEx(e.target.files[0])} type="file" multiple />
                </Form.Group>
  
  
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>External Link</Form.Label>
                  <Form.Control value={CodingExerciseExternalLink} onChange={(e) => setCodingExerciseExternalLink(e.target.value)} type="text" placeholder="https://example.com" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Upload Video</Form.Label>
                      <Form.Control  onChange={(e) => setCodingExerciseQVideo(e.target.files[0])} type="file" />
                    </Form.Group>
                </Form>
  
                  </Tab>
                  <Tab eventKey="solutions" title="Solutions">
                  <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Upload Solutions</Form.Label>
                  <Form.Control  onChange={(e) => setCodingExercisesSolutionsFile(e.target.files[0])} type="file" multiple />
                </Form.Group>
  
  
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>External Link</Form.Label>
                  <Form.Control value={CodingExercisesExLinkSolutions} onChange={(e) => setCodingExercisesExLinkSolutions(e.target.value)} type="text" placeholder="https://example.com" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Upload Video</Form.Label>
                      <Form.Control  onChange={(e) => setCodingExercisesSolutionsVideo(e.target.files[0])} type="file" />
                    </Form.Group>
                <Button onClick={() => setshowCodingExecInput(null)} variant="outlined">Cancel</Button>
                {btnLoadingCodingExcercise ? (
                <Button  className="mx-1" variant="contained">Loading..</Button>
                ) :(
                <Button onClick={handleCodingExecSave} className="mx-1" variant="contained">Save Coding Exercise</Button>
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

                <Tab eventKey="assignment" title="Assignment information and Instructions">
                <Form>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={AssignmentTitle} onChange={(e) => setAssignmentTitle(e.target.value)} type="text" placeholder="Assignment Title" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={AssignmentDesc} onChange={(e) => setAssignmentDesc(e.target.value)}  as="textarea" rows={2} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control value={AssignmentDuration} onChange={(e) => setAssignmentDuration(e.target.value)} type="text" placeholder="00:00" />
                  </Form.Group>

              
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Instructions</Form.Label>
                    <Form.Control value={AssignmentInstructors} onChange={(e) => setAssignmentInstructors(e.target.value)} as="textarea" rows={3} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Upload Video</Form.Label>
                      <Form.Control onChange={(e) => {
                        setAssignmentVideo(e.target.files[0])
                      }} type="file" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Downloadable Resourses</Form.Label>
                      <Form.Control  onChange={(e) => setAssignmentDResourses(e.target.files[0])} type="file" multiple />
                    </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>External Link</Form.Label>
                    <Form.Control value={AssignmentExLink} onChange={(e) => setAssignmentExLink(e.target.value)} type="text" placeholder="https://example.com" />
                  </Form.Group>
                </Form>
                </Tab>

                <Tab eventKey="questions" title="Questions">

                <Form>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Questions</Form.Label>
                    <Form.Control value={AssignmentQuestion} onChange={(e) => setAssignmentQuestion(e.target.value)} as="textarea" rows={2} />
                  </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Upload Question</Form.Label>
                <Form.Control  onChange={(e) => setAssignmentQuestionFile(e.target.files[0])} type="file" />
              </Form.Group>


              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>External Link</Form.Label>
                <Form.Control value={AssignmentQuestionLink} onChange={(e) => setAssignmentQuestionLink(e.target.value)} type="text" placeholder="https://example.com" />
              </Form.Group>
              </Form>

                </Tab>
                <Tab eventKey="solutions" title="Solutions">
                <Form>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Solutions</Form.Label>
                    <Form.Control value={AssignmentSolutions} onChange={(e) => setAssignmentSolutions(e.target.value)} as="textarea" rows={2} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Upload Video</Form.Label>
                      <Form.Control  onChange={(e) => setAssignmentSolutionsVideo(e.target.files[0])} type="file" />
                    </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Upload Solutions</Form.Label>
                <Form.Control  onChange={(e) => setAssignmentSolutionsFile(e.target.files[0])} type="file" />
              </Form.Group>


              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>External Link</Form.Label>
                <Form.Control value={AssignmentSolutionsExLink} onChange={(e) => setAssignmentSolutionsExLink(e.target.value)} type="text" placeholder="https://example.com" />
              </Form.Group>

              <Button onClick={() => setshowAssignmentInput(null)} variant="outlined">Cancel</Button>
              {btnLoadingAssignment ? (
                <Button  className="mx-1" variant="contained">Loading..</Button>
              ) : (
              <Button onClick={handleAssignmentSave} className="mx-1" variant="contained">Save Assignment</Button>
              )}

              </Form>
                </Tab>
              </Tabs>
              )}

              {/* Syllabus Item > Assignment */}

            </CardContent>
          </div> 
      )) : <LargeSpinner h={"50%"} w={"30%"} wpclass={"m-4"} />
      ) : 
      <div className="d-flex justify-content-center">
        <h4>No Syllabus Found</h4>
      </div>
      }


        <div className="m-2">

          {showSectionInput && (
            <>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Add Section</Form.Label>
              <Form.Control value={section} onChange={(e) => setsection(e.target.value)} type="text" placeholder="Type Section Name" />
            </Form.Group>
            <Button onClick={handleSubmitSection} className="mx-1" variant="outlined">
                ADD
              </Button>
              <Button onClick={() => {
                showAddSectionInput()
                setsection("")
                }} variant="contained">
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
