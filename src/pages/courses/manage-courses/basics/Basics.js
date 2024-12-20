import React, { useEffect, useRef, useState } from "react";
import "./basics.css";
import { Space } from "antd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import Form from 'react-bootstrap/Form';
import { Layout, Menu, Col, Row, Button, Select, Image, Upload } from "antd";
import { Input } from "antd";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ButtonMaterial from '@mui/material/Button';
import { TagsInput } from "react-tag-input-component";
import { GetCourseLandingPage , GetLanguages , GetLevel , GetCategories , GetSubCategories, UpdateCourseCompleteProgress, GetTopics, VideoStreaming } from "../../../../api";
import ImageUploader from 'react-images-upload';
import ReactPlayer from 'react-player'
import ErrorAlert from "../../../../commonFunctions/Alerts/ErrorAlert";
import { AddCourseLandingPage } from "../../../../api";
import { FILE_PATH } from "../../../../commonFunctions/FilePaths";
import LoadingSpinner from "../../../../commonFunctions/loaders/Spinner/LoadingSpinner";
import ButtonSpinner from "../../../../commonFunctions/loaders/Spinner/ButtonSpinner";
import { v4 as uuidv4 } from 'uuid';
import { uploadFileInChunks } from "../../../../commonFunctions/uploadFileInChunks";
import JoditEditor from "jodit-react";




const { TextArea } = Input;
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#000",
};



const Basics = ({code}) => {

   // File Upload
   let fieUploadUUID = uuidv4();
   let uploadType = "promotional-videos"

  const [course_title, setcourse_title] = useState("")
  const [course_subtitle, setcourse_subtitle] = useState("")
  const [course_desc, setcourse_desc] = useState("")
  const [lang, setlang] = useState("")
  const [level, setlevel] = useState("")
  const [course_cat, setcourse_cat] = useState("")
  const [course_sub_cat, setcourse_sub_cat] = useState("")
  const [course_topic, setcourse_topic] = useState("")
  const [keywords, setkeywords] = useState([])
  const [course_image, setcourse_image] = useState("")
  const [promo_vid, setpromo_vid] = useState("")

  const [own_topic, setown_topic] = useState("")

  const [preview_img, setpreview_img] = useState("")

  const [videoSrc , seVideoSrc] = useState("");

  const [langData, setlangData] = useState([])
  const [levelData, setlevelData] = useState([])
  const [cat, setcat] = useState([])
  const [subcatData, setsubcatData] = useState([])
  const [topicsData, settopicsData] = useState([])

  const [loading_btn, setloading_btn] = useState(false)

  const progressBarRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);




  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const handleClick = (e) => {
    
    // console.log(course_title)
    // console.log(course_subtitle)
    console.log(course_desc)
    // console.log(lang)
    // console.log(level)
    // console.log(course_cat)
    // console.log(course_sub_cat)
    // console.log(keywords)
    // console.log(course_image)
    console.log(promo_vid) 
    console.log(videoSrc)
    // console.log(course_topic)

    if(course_title == ""){
      ErrorAlert("Empty Field","Please Enter Course Title")
      return
    }else if(course_subtitle == ""){
      ErrorAlert("Empty Field","Please Enter Course Sub Title")
      return
    }else if(course_desc == ""){
      ErrorAlert("Empty Field","Please Enter Course Description")
      return
    }else if(lang == ""){
      ErrorAlert("Empty field","Please select a language")
      return
    }else if(level == ""){
      ErrorAlert("Empty field","Please select a level")
      return
    }else if(course_cat == ""){
      ErrorAlert("Empty field","Please select a course category")
      return
    }else if(course_sub_cat == ""){
      ErrorAlert("Empty field","Please select a course sub category")
      return
    }else if(course_topic == ""){
      ErrorAlert("Empty field","Please select a topic")
      return
    }else if(course_topic == 'other'){
        if(own_topic == ""){
          ErrorAlert("Empty field","Please enter your own topic")
          return
        }
    }

    if(keywords.length != 5){
      ErrorAlert("Error","Please enter only 5 keywords")
      return
    }

    

    setloading_btn(true)

      // Run the upload
      const maxSize = 3 * 1024 * 1024 * 1024;
      if (promo_vid.size > maxSize) {
        setVideoFile(null);
        setloading_btn(true)
        ErrorAlert('Error','File size exceeds 3.0GB.');
        return;
      } else {
        setVideoFile(videoSrc);

        // if video no added
        if(promo_vid == "" && videoSrc == ""){
          console.log("1")

        
          uploadFileInChunks(
            fieUploadUUID,
            uploadType,
            promo_vid,
            updateProgressBar,
            setUploading
          );

          return

        }else if(promo_vid != "" && videoSrc != ""){
          console.log("2")


          uploadFileInChunks(
            fieUploadUUID,
            uploadType,
            promo_vid,
            updateProgressBar,
            setUploading
          );

          return

        }else{


          AddCourseLandingPage(
            code,
            course_title,
            course_subtitle,
            course_desc,
            lang,
            level,
            course_cat,
            course_sub_cat,
            course_topic,
            keywords,
            promo_vid,
            course_image,
            videoSrc,
            own_topic,
            fieUploadUUID,
            setloading_btn
            )

            return

        }

      }

   
  

  };

  const updateProgressBar = (progress) => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = progress + '%';
      progressBarRef.current.textContent = progress + '%';
    }

    if(progress == 100){

      AddCourseLandingPage(
        code,
        course_title,
        course_subtitle,
        course_desc,
        lang,
        level,
        course_cat,
        course_sub_cat,
        course_topic,
        keywords,
        promo_vid,
        course_image,
        videoSrc,
        own_topic,
        fieUploadUUID,
        setloading_btn
        )
  
    
    }

    console.log(progress)
  };


  const handleVideo = (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      // Check if the file is a video
      if (selectedFile.type.startsWith('video/')) {
        // File is valid, set the promo video state
        setpromo_vid(selectedFile);
  
        // Create a preview of the video file
        const reader = new FileReader();
        reader.onloadend = () => {
          seVideoSrc(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        // File is not a video
        ErrorAlert("Error", "Please enter a valid video file.");
      }
    }
  };
  

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile && selectedFile.type.startsWith('image/')) {

    setcourse_image(selectedFile)

    // It's an image file
    const reader = new FileReader();

    reader.onloadend = () => {
      setpreview_img(reader.result);
    };

    reader.readAsDataURL(selectedFile);
  } else {
    ErrorAlert("Error","Please Enter a Valid Image")
  }
};


  useEffect(() => {
    GetCourseLandingPage(code,setcourse_title,setcourse_subtitle,setcourse_desc,setcourse_topic,setpreview_img,seVideoSrc,setkeywords,setcourse_cat,setcourse_sub_cat,setlevel,setlang,setpromo_vid)

    GetLanguages(setlangData)

    GetLevel(setlevelData)

    GetCategories(setcat)

  

  }, [code])

  useEffect(() => {
    GetSubCategories(setsubcatData,course_cat,code)
  }, [course_cat])
  
  useEffect(() => {
    GetTopics(settopicsData,code,course_sub_cat)
    
    
  }, [course_sub_cat])
  
  useEffect(() => {
    console.log("Topic " + course_topic)
    console.log("Cat " + course_cat)
    console.log("Sub Cat " + course_sub_cat)
  })
  
  
  
  

 
  // const  isDataURI = (dataURI) => {
  //   // Check if the string starts with 'data:'
  //   if (dataURI.startsWith('data:')) {
  //     // Extract the media type and data
  //     const [, mediaType, base64Data] = dataURI.match(/^data:([^;]+);base64,(.+)$/);
  
  //     // Check if the media type is present and the base64 data is valid
  //     if (mediaType && base64Data) {
  //       try {
  //         // Decode the base64 data to check if it's a valid base64 string
  //         atob(base64Data);
  //         return true; // Valid data URI
  //       } catch (error) {
  //         return false; // Invalid base64 data
  //       }
  //     }
  //   }
  
  //   return false; // Not a valid data URI
  // }
  
  const isDataURI = (url) => url.startsWith('data:video');

  const isDataImageURI = (url) => url.startsWith('data:image');

  const [streamingSrc, setStreamingSrc] = useState(""); // To store the final video source


  useEffect(() => {
    const handleVideoSource = async () => {
      if (videoSrc && !isDataURI(videoSrc)) {
        try {
          const streamedSrc = await VideoStreaming(videoSrc);
          setStreamingSrc(streamedSrc);
        } catch (error) {
          console.error("Video streaming error: ", error);
        }
      } else {
        setStreamingSrc(videoSrc);
      }
    };

    handleVideoSource();
  }, [videoSrc]);

  return (
    <div className="col-md-10 px-4 mb-4 course-landing-page-responsive ">
      <Card className="py-2 my-2 p-4">

      <div className='d-flex justify-content-between'>
        <Typography className="p-3" variant="h4">
          Course landing page
        </Typography>

        {loading_btn ? <ButtonMaterial variant="contained"><ButtonSpinner /></ButtonMaterial> : <ButtonMaterial onClick={handleClick} variant="contained"><AddIcon /> SAVE</ButtonMaterial>}
        
        
        </div>

        <hr />

        <p>
        Please give details below to construct an attractive course landing page that will compel students to sign up to your course.
        </p>

      
      <div className="px-3">
          <div className="my-3">
            <h6>Course title <span className="text-danger">*</span></h6>
            <div class="input-group mb-3">
              <input
                value={course_title}
                maxLength={60}
                onChange={(e) => setcourse_title(e.target.value)}
                type="text"
                class="form-control"
                placeholder="Course title"
              />
              <span class="input-group-text" id="res-1">
                {60 - course_title.length}
              </span>
            </div>
          </div>

          <div className="my-3">
            <h6>Course subtitle <span className="text-danger">*</span></h6>
            <div class="input-group mb-3">
              <input
              value={course_subtitle}
                maxLength={120}
                onChange={(e) => setcourse_subtitle(e.target.value)}
                type="text"
                class="form-control"
                placeholder="Insert your course subtitle"
              />
              <span class="input-group-text" id="res-2">
                {120 - course_subtitle.length}
              </span>
            </div>
          </div>

          <div className="my-3">
            <h6>Course description <span className="text-danger">*</span></h6>
            <JoditEditor value={course_desc} onChange={(content) => setcourse_desc(content)} />
            {/* <textarea  class="form-control" rows="3"></textarea> */}
          </div>

          <div className="row my-3">

            <div className="col-md-6">
            <Form.Label>Language <span className="text-danger">*</span></Form.Label>
            <Form.Select value={lang} onChange={(e) => setlang(e.target.value)} aria-label="Default select example">
            <option value="">Select Course Language</option>
            {langData.map((lang,index) => (
            <option key={index} value={lang.id}>{lang.name}</option>
            ))}
        
          </Form.Select>
            </div>

            <div className="col-md-6">
            <Form.Label>Course Level <span className="text-danger">*</span></Form.Label>
            <Form.Select value={level} onChange={(e) => setlevel(e.target.value)} aria-label="Default select example">
            <option value="">Select Course Level</option>
            {levelData.map((level,index) => (
            <option key={index} value={level.id}>{level.name}</option>
            ))}
          </Form.Select>
            </div>
            
            <div className="col-md-4 mt-3">
            <Form.Label>Course Category <span className="text-danger">*</span></Form.Label>
            <Form.Select value={course_cat} onChange={(e) => setcourse_cat(e.target.value)} >
            <option disabled value="">Select Course Category</option>
            {cat != null && cat.map((category,index) => (
            <option key={index} value={category.id}>{category.name}</option>
            ))}
          </Form.Select>
            </div>

            <div className="col-md-5 mt-3">
            <Form.Label>Course Sub Category <span className="text-danger">*</span></Form.Label>
              <Form.Select value={course_sub_cat} onChange={(e) =>  setcourse_sub_cat(e.target.value)} >
              <option value="">Select Course Sub Category</option>
              {subcatData != null && subcatData.map((subcategory,index) => (
              <option key={index}  value={subcategory.id}>{subcategory.name}</option>
            ))}
           
            </Form.Select>
            </div>
          
            <div className="col-md-3 mt-3">
            <Form.Label>Course Topic <span className="text-danger">*</span></Form.Label>
              <Form.Select value={course_topic} onChange={(e) => setcourse_topic(e.target.value)} >
              <option value="">Select Topic</option>
              {topicsData != null &&  topicsData.map((topic,index) => (
              <option key={index} value={topic.id}>{topic.topic}</option>
              ))}
              {course_sub_cat != "" && <option value="other">Other</option>}
               
            </Form.Select>
            </div>

            {course_topic == 'other' && (
            <>
            <div className="col-md-9 mt-3"></div>
            <div className="col-md-3 mt-3">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Suggest a topic <span className="text-danger">*</span></Form.Label>
              <Form.Control value={own_topic} onChange={(e) => setown_topic(e.target.value)} type="text" placeholder="Enter your suggested topic" />
            </Form.Group>
            </div>
            </>
            )}

            <div className="col-md-12 my-3">
              <h6>What are the keywords that can help students find your course?</h6>
              <TagsInput
              className="select-keywords"
              value={keywords}
              onChange={setkeywords}
              name="keywords"
              placeHolder="Enter Search Keywords"
            />
            </div>
          </div>

          <div className="row my-3">
            <div className="col-md-4">
              <h6>
                <b>Course image <span className="text-danger">*</span></b>
              </h6>
              {preview_img == "" ? 
              <img style={{objectFit:'cover', width: "auto"}} height={200} src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg" />
               : isDataImageURI(preview_img) ? <img  height={150} src={preview_img} /> : <img  height={150}  src={`${FILE_PATH}${preview_img}`} /> }
            

     
            </div>

            <div className="col-md-7 d-flex justify-content-start">
              <div>
                <p>
                Upload your course image here. 
                </p>
                <p>
                Image file format: The file format must be .bmp, .gif, .jpg, .jpeg, or .png
                </p>
                <p>
                Minimum required dimensions: 750 x 422 pixels</p>
                <p>
                Maximum required dimensions: 6000 x 6000 pixels.
                </p>
                

                <div className="mb-3">
                  <input className="form-control" type="file" accept="image/*" onChange={handleFileChange} />
                </div>
              
              </div>
            </div>
          </div>

          <div className="row my-2">
            <div className="col-md-4">
              <h6>
                <b>Promotional video <span className="text-danger">*</span></b>
              </h6>

              {videoSrc === "" ? (
                <img
                  src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg"
                  width="200"
                  height="200"
                  alt="Placeholder"
                />
              ) : (
                <video
                  style={{width: "300px"}} 
                  height={200}
                  controls
                  src={isDataURI(videoSrc) ? videoSrc : streamingSrc}
                  onError={(e) => console.error("Video Playback Error: ", e)}
                >
                  Your browser does not support the video tag.
                </video>
              )}

              
            </div>

            <div className="col-md-7 d-flex align-items-center">
              <div>
                <p>
                Upload your promotional video here. </p>
                <p>
                The promotional video will be a creative solution to capture potential students’ attention and show what your course has in store. Videos are one of the most impactful and quickest forms of communication to generate results. Focus on sending one clear and persuasive message to your audience.
                </p>

                
                <div className="mb-3">
                  <input className="form-control" type="file" accept="video/*" onChange={handleVideo} />
                </div>
              </div>
            </div>
          </div>
        </div>
        

      </Card>
    </div>
  );
};

export default Basics;
