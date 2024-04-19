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
import {AddCurriculumArticle, AddCurriculumDescription, AddCurriculumDownloadable, AddCurriculumExternalResourses, AddCurriculumQnAQuiz, AddCurriculumQuiz, AddCurriculumSection, AddCurriculumSourceCode, AddCurriculumVideo, AddLectureTitle, GetCurriculum} from "../../../../api"
import "./Curriculum.css";
import ErrorAlert from "../../../../commonFunctions/Alerts/ErrorAlert";
import removeHtmlTags from "../../../../commonFunctions/RemoveHTML";
import ListGroup from 'react-bootstrap/ListGroup';
import LaunchIcon from '@mui/icons-material/Launch';
import LargeSpinner from '../../../../commonFunctions/loaders/Spinner/LoadingSpinner'
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
  const [showDescription, setshowDescription] = useState(null)
  const [showResources, setshowResources] = useState(null)


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
    }else if(answerExplainOne == ""){
      ErrorAlert("Empty Field","Please Enter Answer One Explanation");
      return
    }else if(answerTwo == ""){
      ErrorAlert("Empty Field","Please Enter Answer Two");
      return
    }else if(answerExplainTwo == ""){
      ErrorAlert("Empty Field","Please Enter Answer Two Explanation");
      return
    }else if(answerThree == ""){
      ErrorAlert("Empty Field","Please Enter Answer Three");
      return
    }else if(answerExplainThree == ""){
      ErrorAlert("Empty Field","Please Enter Answer Three Explanation");
      return
    }else if(answerFour == ""){
      ErrorAlert("Empty Field","Please Enter Answer Four");
      return
    }else if(answerExplainFour == ""){
      ErrorAlert("Empty Field","Please Enter Answer Four Explanation");
      return
    }else if(answerFive == ""){
      ErrorAlert("Empty Field","Please Enter Answer Five");
      return
    }else if(answerExplainFive == ""){
      ErrorAlert("Empty Field","Please Enter Answer Five Explanation");
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
                </Typography>
              </div>


              <div className="my-2">

              {section.courseSection.sectionCurriculumItem.length > 0 && section.courseSection.sectionCurriculumItem.map((item,index) => (
                item.type == "Lecture" ? 
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
                </Accordion>) : 
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
                      <FileCopyIcon sx={{ fontSize: 15 }} /> {item.title}
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
                </Accordion>)

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
                      }} variant="text"><CloseIcon /></Button>

                      <Button onClick={() => setshowLecInput(showLecInput == index ? null : index)} variant="text">
                        <AddIcon />
                        Lesson
                      </Button>
                      {/* const [showQuizInput, setshowQuizInput] = useState(false) */}
                      {/* handleShowQuizInput */}
                      <Button onClick={() => setshowQuizInput(showQuizInput == index ? null : index)} variant="text">
                      <AddIcon />
                        Quiz
                      </Button>
                  </div>
                )}

                  {showCurriculumItem != index && (
                  <Button onClick={() => setshowCurriculumItem(showCurriculumItem == index ? null : index)} variant="contained">
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
