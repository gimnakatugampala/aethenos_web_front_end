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
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ArticleIcon from "@mui/icons-material/Article";
import {AddCurriculumArticle, AddCurriculumDescription, AddCurriculumDownloadable, AddCurriculumExternalResourses, AddCurriculumSection, AddCurriculumSourceCode, AddLectureTitle, GetCurriculum} from "../../../../api"
import "./Curriculum.css";
import ErrorAlert from "../../../../commonFunctions/Alerts/ErrorAlert";

const Curriculum = ({code}) => {

  const [showContentAdd, setshowContentAdd] = useState(null);
  const [showMain, setshowMain] = useState(null)
  const [showDescRes, setshowDescRes] = useState(true)
  const [curriculumvisiblity, setcurriculumvisiblity] = useState("");
  const [extracurriculum, setextracurriculum] = useState("")

  const [showSectionInput, setshowSectionInput] = useState(false)




  const [section, setsection] = useState("")
  const [lecturetitle, setlecturetitle] = useState("")


  // Get Section data
  const [sectionData, setsectionData] = useState([])


  // Curriculum Item Data
  const [article, setarticle] = useState("")
  const [curriculum_desc, setcurriculum_desc] = useState("")
  const [curriclum_ex_res_tile, setcurriclum_ex_res_tile] = useState("")
  const [curriculum_ex_res_link, setcurriculum_ex_res_link] = useState("")
  const [curriculum_download_file, setcurriculum_download_file] = useState("")
  const [curriculum_source_code, setcurriculum_source_code] = useState("")
  const [curriculum_video, setcurriculum_video] = useState("")

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

    // Show Quiz Input
    const handleShowQuizInput = () =>{
      setshowQuizInput(!showQuizInput)
      setshowCurriculumItem(false)
    }

    // Save Quiz
    const handleSaveQuiz = () =>{
      setshowQuizInput(false)
  }

  // Cancel Quiz
  const handleCancelQuizInput = () =>{
    setshowQuizInput(false)
    setshowCurriculumItem(true)
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
  
   const handleSaveArticle = (ID) =>{

    if(article == ""){
      ErrorAlert("Empty Field","Please Enter Article Text")
      return
    }

    AddCurriculumArticle(code,ID,article,setsectionData,setarticle,setshowMain)
   }



  return (
    <div className="col-md-8 curriculum-container">
      <Card className="py-2 my-2 p-4">

      <div className='d-flex justify-content-between'>
        <Typography className="p-3" variant="h4">
          Curriculum
        </Typography>
        
        </div>

        <hr />

        {/* Section 1 */}

     {sectionData !== null && sectionData.length > 0 && sectionData.map((section,index) => (
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
              <Accordion key={index} className="my-3">
                <AccordionSummary
                  className="accordian-header d-flex justify-content-between align-items-center"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <CheckCircleIcon fontSize="small" /> Lecture {index + 1}:{" "}
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
                        <Form.Control onClick={(e) => setcurriculum_video(e.target.files[0])} placeholder="Add a Video" type="file" />
                        <Form.Label style={{fontSize:11}}><b>Note:</b> All files should be at least 720p and less than 4.0 GB.</Form.Label>
                      </Form.Group>
  
  
                      {/* After Upload */}
                      <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Filename</th>
                              <th>Type</th>
                              <th>Status</th>
                              <th>Date</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>326768.mp4</td>
                              <td>Video</td>
                              <td>Processing</td>
                              <td>10/07/2023</td>
                              <td>
                              <Button size="sm" variant="text">Replace</Button>
                              </td>
                            </tr>
  
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
  
                        <Typography variant="h6" component="h6">
                          Article
                        </Typography>
  
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
                       
                      {showMain == null && (
                      <>
                      <Button onClick={() => setshowDescription(showDescription == index ? null : index)} className="m-2" variant="outlined"><AddIcon /> Description</Button>
                      <Button onClick={() => setshowResources(showResources == index ? null : index)}  className="m-2" variant="outlined"><AddIcon /> Resourses</Button>
                      </>
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
                            <Form.Label style={{fontSize:11}}><b>Note:</b>  A resource is for any type of document that can be used to help students in the lecture. This file is going to be seen as a lecture extra. Make sure everything is legible and the file size is less than 1 GiB.</Form.Label>
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
                      Lecture
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
                  <AddIcon /> Curriculum Item
                </Button>

                )}

        


            </div>

            {/* Curriculum Item ACTION */}

            {/* Curriculum Item > Lectures */}

            {showLecInput == index && (
              <>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Add Lecture</Form.Label>
                    <Form.Control onChange={(e) => setlecturetitle(e.target.value)} type="text" placeholder="Type Lecture Name" />
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
            {/* Curriculum Item > Lectures */}

            {/* Curriculum Item > Quiz */}

            {showQuizInput == index && (

            <div className="p-4 m-2">
            
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Quiz Title</Form.Label>
              <Form.Control type="text" placeholder="Enter a Title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Quiz Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            </Form>

            <Button onClick={handleSaveQuiz} className="mx-1" variant="outlined">
              ADD
            </Button>
            
            <Button onClick={() => setshowQuizInput(null) } variant="contained">
              Cancel
            </Button>
            </div>
            )}



            {/* Curriculum Item > Quiz */}

          </CardContent>
        </div>
     ))}

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
