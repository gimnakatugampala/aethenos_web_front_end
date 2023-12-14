import React, { useEffect, useState } from "react";
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
import { GetCourseLandingPage , GetLanguages , GetLevel , GetCategories , GetSubCategories } from "../../../../api";
import ImageUploader from 'react-images-upload';
import ReactPlayer from 'react-player'
import ErrorAlert from "../../../../commonFunctions/Alerts/ErrorAlert";
import { AddCourseLandingPage } from "../../../../api";


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

let dataLangData = []
let dataLevelData = []
let datacatData = []
let datasubCatData = []

const Basics = ({code}) => {

  const [course_title, setcourse_title] = useState("")
  const [course_subtitle, setcourse_subtitle] = useState("")
  const [course_desc, setcourse_desc] = useState("")
  const [lang, setlang] = useState("")
  const [level, setlevel] = useState("")
  const [course_cat, setcourse_cat] = useState("")
  const [course_sub_cat, setcourse_sub_cat] = useState("")
  const [keywords, setkeywords] = useState([])
  const [course_image, setcourse_image] = useState("")
  const [promo_vid, setpromo_vid] = useState("")

  const [preview_img, setpreview_img] = useState("")

  const [videoSrc , seVideoSrc] = useState("");

  const [langData, setlangData] = useState([])
  const [levelData, setlevelData] = useState([])
  const [cat, setcat] = useState([])
  const [subcatData, setsubcatData] = useState([])



  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const handleClick = (e) => {
    
    console.log(course_title)
    console.log(course_subtitle)
    console.log(course_desc)
    console.log(lang)
    console.log(level)
    console.log(course_cat)
    console.log(course_sub_cat)
    console.log(keywords)
    console.log(promo_vid)
    console.log(course_image)

    AddCourseLandingPage(
      code,
      course_title,
      course_subtitle,
      course_desc,
      lang,
      level,
      course_cat,
      course_sub_cat,
      keywords,
      promo_vid,
      course_image
      )

    
  };


const handleVideo = (event) =>{
  const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type.startsWith('video/')) {


      setpromo_vid(selectedFile)

      // It's a video file
      const reader = new FileReader();

      reader.onloadend = () => {
        seVideoSrc(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    } else {
      ErrorAlert("Error","Please Enter a Valid Video")
    }
}

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
    GetCourseLandingPage(code,setcourse_title,setcourse_subtitle,setcourse_desc,setpreview_img,seVideoSrc,setkeywords,setcourse_cat,setcourse_sub_cat,setlevel,setlang)

    GetLanguages(setlangData)

    GetLevel(setlevelData)

    GetCategories(setcat)

    GetSubCategories(setsubcatData)

    console.log(levelData)

  

  }, [code])

  useEffect(() => {

    dataLangData = langData.map(lang => {
      return { ...langData, 
        label: lang.name,
        value: lang.id,
       };
  })

  dataLevelData = levelData.map(level => {
    return { ...levelData, 
      label: level.name,
      value: level.id,
     };
})

datacatData = cat.map(c => {
    return { ...cat, 
      label: c.name,
      value: c.id,
     };
})


datasubCatData = subcatData.map(c => {
  return { ...subcatData, 
    label: c.name,
    value: c.id,
   };
})







  }, [langData,levelData,cat,subcatData])
  
  

  return (
    <div className="col-md-8">
      <Card className="py-2 my-2 p-4">

      <div className='d-flex justify-content-between'>
        <Typography className="p-3" variant="h4">
          Course Landing Page
        </Typography>

        <ButtonMaterial onClick={handleClick} variant="contained"><AddIcon /> SAVE</ButtonMaterial>
        </div>

        <hr />

        <p>
          Your course landing page is crucial to your success on Udemy. If it’s
          done right, it can also help you gain visibility in search engines
          like Google. As you complete this section, think about creating a
          compelling Course Landing Page that demonstrates why someone would
          want to enroll in your course. Learn more about creating your course
          landing page and course title standards.
        </p>

        <div className="basics-container">
          <div className="my-3">
            <h6>Course title</h6>
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
                60
              </span>
            </div>
          </div>

          <div className="my-3">
            <h6>Course subtitle</h6>
            <div class="input-group mb-3">
              <input
              value={course_subtitle}
                maxLength={60}
                onChange={(e) => setcourse_subtitle(e.target.value)}
                type="text"
                class="form-control"
                placeholder="Insert your course subtitle"
              />
              <span class="input-group-text" id="res-2">
                120
              </span>
            </div>
          </div>

          <div className="my-3">
            <h6>Course description</h6>
            <textarea value={course_desc} onChange={(e) => setcourse_desc(e.target.value)} class="form-control" rows="3"></textarea>
          </div>

          <div className="row my-3">
            <h6>Basic Info</h6>

            <div className="col-md-3">
            <Form.Select value={lang} onChange={(e) => setlang(e.target.value)} aria-label="Default select example">
            <option value="">Select Course Language</option>
            {langData.map((lang,index) => (
            <option key={index} value={lang.id}>{lang.name}</option>
            ))}
        
          </Form.Select>
            </div>

            <div className="col-md-3">

            <Form.Select value={level} onChange={(e) => setlevel(e.target.value)} aria-label="Default select example">
            <option value="">Select Course Level</option>
            {levelData.map((level,index) => (
            <option key={index} value={level.id}>{level.name}</option>
            ))}
          </Form.Select>
            </div>
            
            <div className="col-md-3">

            <Form.Select value={course_cat} onChange={(e) => setcourse_cat(e.target.value)} aria-label="Default select example">
            <option value="">Select Course Category</option>
            {cat.map((category,index) => (
            <option key={index} value={category.id}>{category.name}</option>
            ))}
          </Form.Select>
            </div>

            <div className="col-md-3">
              <Form.Select value={subcatData} onChange={(e) => setcourse_sub_cat(e.target.value)} aria-label="Default select example">
              <option value="">Select Course Sub Category</option>
              {subcatData.map((subcategory,index) => (
              <option key={index} value={subcategory.id}>{subcategory.name}</option>
              ))}
            </Form.Select>

            </div>

            <div className="col-md-12 my-3">
              <h6>What is primarily taught in your course?</h6>
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
                <b>Course image</b>
              </h6>
              <img
                 width={200}
                 height={200}
                 id
                src={preview_img == "" ?  'https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg' : preview_img}
              />

     
            </div>

            <div className="col-md-8 d-flex align-items-center">
              <div>
                <p>
                  Upload your course image here. It must meet our course image
                  quality standards to be accepted. Important guidelines:
                  750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the
                  image.
                </p>

                <div className="mb-3">
                  <label for="formFile" className="form-label">Default file input example</label>
                  <input className="form-control" type="file" accept="image/*" onChange={handleFileChange} />
                </div>
              
              </div>
            </div>
          </div>

          <div className="row my-3">
            <div className="col-md-4">
              <h6>
                <b>Promotional video</b>
              </h6>

             {videoSrc == "" ? (<img src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg" width="200" height="200" />) : 
            <ReactPlayer width={200} height={200} url={videoSrc} /> } 
              
            </div>

            <div className="col-md-8 d-flex align-items-center">
              <div>
                <p>
                  Upload your course image here. It must meet our course image
                  quality standards to be accepted. Important guidelines:
                  750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the
                  image.
                </p>
                <div className="mb-3">
                  <label for="formFile" className="form-label">Default file input example</label>
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
