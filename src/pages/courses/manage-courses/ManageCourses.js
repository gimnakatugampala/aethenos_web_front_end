import React, { useState , useRef, useEffect } from 'react';
import { useLocation , useParams} from "react-router-dom";
import Persona from "persona";
import {  Space , Typography  } from 'antd';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import './ManageCourses.css'
import { Layout, Menu , Col, Row, Card ,Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { Button } from '@mui/material';
import Modal from 'react-bootstrap/Modal';

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LayersIcon from '@mui/icons-material/Layers';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ForumIcon from '@mui/icons-material/Forum';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import IntendedLearners from './intended-learners/IntendedLearners';
import Curriculum from './curriculum/Curriculum';
import Basics from './basics/Basics';
import Pricing from './pricing/Pricing';
import CourseMessages from './messages/courseMessages';
import Promotion from './promotions/Promotion';
import Settings from './settings/Settings'
import AddCoupon from './promotions/AddCoupon';
import { InstructorVerify , GetCourseTitle , OwnThisContent , RequestSubmitReview , CheckContentOwnership} from '../../../api'
import ErrorAlert from '../../../commonFunctions/Alerts/ErrorAlert';

const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;
const { Text, Link , Title } = Typography;




const headerStyle = {
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#000',
};


const ManageCourses = () => {

  // course code
  let { code } = useParams();

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectTab, setselectTab] = useState(window.history.state)
  const location = useLocation();

  const [show, setShow] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const [course_title, setcourse_title] = useState("")
  const [status_type, setstatus_type] = useState("")

  const [courseOwnership, setcourseOwnership] = useState("")
  const [checkOnwership, setcheckOnwership] = useState("")
  // -------- PERSONA ---------------
  const [options, setOptions] = useState({
    templateId: "tmpl_JAZjHuAT738Q63BdgCuEJQre"
  });

  const [flowType, setFlowType] = useState("embedded");

  const embeddedClientRef = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => {

    // Get Content Ownership
    if(courseOwnership == 0){
      setShow(true)
      return
    }

    // Check Personal ID

    // Send to Request
    // RequestSubmitReview(code)

    // PERSONA
    const client = new Persona.Client({
      ...options,
      environment: "sandbox",
      onLoad: (error) => {
        if (error) {
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
        }
      }
    });
    embeddedClientRef.current = client;

    window.exit = (force) =>
      client ? client.exit(force) : alert("Initialize client first");


    

    

  
  
  };


  const handleShowVerification = () => {

    if(checkOnwership == "" || checkOnwership == false){
      ErrorAlert("Unchecked Ownership","Please Accept the Content Ownership")
      return
    }

    // setShow(false)

    // Send Ownersship
    OwnThisContent(code,setShow)

    // Check the Personal Verification

    // Send to Request
    RequestSubmitReview(code)

  };

// console.log(InstructorVerify())
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);

    if(index == "intended-learners"){
      setselectTab("intended-learners")
      setSelectedIndex(0)
      window.history.pushState("intended-learners", "Manage Course", `#intended-learners`);
    }else if (index == "curriculum"){
      setselectTab("curriculum")
      setSelectedIndex(1)
      window.history.pushState("curriculum", "Manage Course", `#curriculum`);
    }else if (index == "course-landing-page"){
      setselectTab("course-landing-page")
      setSelectedIndex(2)
      window.history.pushState("course-landing-page", "Manage Course", `#course-landing-page`);
    }else if (index == "pricing"){
      setselectTab("pricing")
      setSelectedIndex(3)
      window.history.pushState("pricing", "Manage Course", `#pricing`);
    }else if (index == "course-messages"){
      setselectTab("course-messages")
      setSelectedIndex(4)
      window.history.pushState("course-messages", "Manage Course", `#course-messages`);
    }else if (index == "promotions"){
      setselectTab("promotions")
      setSelectedIndex(5)
      window.history.pushState("promotions", "Manage Course", `#promotions`);
    }else if (index == "settings"){
      setselectTab("settings")
      setSelectedIndex(6)
      window.history.pushState("settings", "Manage Course", `#settings`);
    }else{
      setselectTab("intended-learners")
      setSelectedIndex(0)
      window.history.pushState("intended-learners", "Manage Course", `#intended-learners`);
    }    

  };

  React.useEffect(() => {
    setselectTab(window.history.state)

    if(window.location.href.replace(window.location.pathname,"").replace(/.*#/, '') == "intended-learners"){
      setSelectedIndex(0)
    }else if (window.location.href.replace(window.location.pathname,"").replace(/.*#/, '') == "curriculum"){
      setSelectedIndex(1)
    }else if (window.location.href.replace(window.location.pathname,"").replace(/.*#/, '') == "course-landing-page"){
      setSelectedIndex(2)
    }else if (window.location.href.replace(window.location.pathname,"").replace(/.*#/, '') == "pricing"){
      setSelectedIndex(3)
    }else if (window.location.href.replace(window.location.pathname,"").replace(/.*#/, '') == "course-messages"){
      setSelectedIndex(4)
    }else if (window.location.href.replace(window.location.pathname,"").replace(/.*#/, '') == "promotions"){
      setSelectedIndex(5)
    }else if (window.location.href.replace(window.location.pathname,"").replace(/.*#/, '') == "settings"){
      setSelectedIndex(6)
    }else{
      setSelectedIndex(0)
    }  

    if(window.history.state == null){

      setselectTab(window.location.href.replace(window.location.pathname,"").replace(/.*#/, ''))

      if(window.location.href.replace(window.location.pathname,"").replace(/.*#/, '') == "intended-learners"){
        setSelectedIndex(0)
      }else if (window.location.href.replace(window.location.pathname,"").replace(/.*#/, '') == "curriculum"){
        setSelectedIndex(1)
      }else if (window.location.href.replace(window.location.pathname,"").replace(/.*#/, '') == "course-landing-page"){
        setSelectedIndex(2)
      }else if (window.location.href.replace(window.location.pathname,"").replace(/.*#/, '') == "pricing"){
        setSelectedIndex(3)
      }else if (window.location.href.replace(window.location.pathname,"").replace(/.*#/, '') == "course-messages"){
        setSelectedIndex(4)
      }else if (window.location.href.replace(window.location.pathname,"").replace(/.*#/, '') == "promotions"){
        setSelectedIndex(5)
      }else if (window.location.href.replace(window.location.pathname,"").replace(/.*#/, '') == "settings"){
        setSelectedIndex(6)
      }else{
        setSelectedIndex(0)
      }   

    }

    if(!window.location.href.includes("#")){
      setselectTab("intended-learners")
      setSelectedIndex(0)
      window.history.pushState("intended-learners", "Manage Course", `#intended-learners`);
  }

  // console.log(code)

  GetCourseTitle(code,setcourse_title,setstatus_type)

  },[window.history.state]);

  useEffect(() => {
    CheckContentOwnership(code,setcourseOwnership)
  }, [courseOwnership])
  


  return (
    <Layout>
    <Header style={headerStyle}>
     <div className='d-flex justify-content-between'>

     <Space size={30}>
          <a className='link-back' href='/courses'><ArrowBackIosIcon fontSize="small" /> Back to Courses</a>
          <span className='course-title'>{course_title}</span>
          <span className='course-title-status'>{status_type}</span>
      </Space>


     </div>

  </Header>

  {/* Content */}

  <Row>

  

    <div className='col-md-3 p-4'>
    <List component="nav" aria-label="main mailbox folders">

   
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, "intended-learners")}
        >
          <ListItemIcon>
            <LocalLibraryIcon />
          </ListItemIcon>
          <ListItemText primary="Intended Learners" />
        </ListItemButton>
       

        
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, "curriculum")}
        >
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Curriculum" />
        </ListItemButton>
          


        
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, "course-landing-page")}
        >
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Course Landing Page" />
        </ListItemButton>
       
      
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, "pricing")}
        >
          <ListItemIcon>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Pricing" />
        </ListItemButton>
        

        
        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, "course-messages")}>
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="Courses Messages" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, "promotions")}>
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText primary="Promotions" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 6}
          onClick={(event) => handleListItemClick(event, "settings")}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>

        <ListItemText>
           <Button onClick={handleShow} className='mx-4 w-75 my-3' variant="contained">Submit For Review</Button>
        </ListItemText>
        

      </List>

    </div>


    {/* HERE */}
    {/*  */}
    { selectTab == "intended-learners"   ? <IntendedLearners code={code} /> : 
     selectTab == "curriculum" ?  <Curriculum  code={code}  /> : 
     selectTab == "course-landing-page" ? <Basics  code={code}  /> : 
     selectTab == "pricing" ? <Pricing  code={code}  /> : 
     selectTab == "course-messages" ? <CourseMessages  code={code}  /> :
     selectTab == "promotions" ? <Promotion  code={code}  />  : 
     selectTab == "settings" ? <Settings  code={code}  /> :
     selectTab == "add-coupon" ? <AddCoupon  code={code}  /> 
    : ""}


    

    
  </Row>


  {/* Content Copyrights */}
  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Content Ownership</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className='my-4'><b>Identify your ownership rights to the courses content</b></h6>

          <p className='m-0 p-0'>Please select one of the options below</p>

          <div className="form-check my-3">
          <input onChange={(e) => setcheckOnwership(e.target.checked)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
          <label className="form-check-label" for="flexCheckDefault"> 
        
         <p><b>I created most or all of the contest of this course, and I have properly secured all of the rights necessary to publish all of the content of this course on Aethenos.</b></p> 
           </label>
        </div>

      

      <div className='d-flex justify-content-end'>
            <Button onClick={handleShowVerification}  className='my-4' variant='contained'>Accept</Button>
      </div>


        </Modal.Body>
       
      </Modal>



  </Layout>
  )
}

export default ManageCourses