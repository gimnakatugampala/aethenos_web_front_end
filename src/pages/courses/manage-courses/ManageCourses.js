import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

import {  Space , Typography  } from 'antd';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import './ManageCourses.css'
import { Layout, Menu , Col, Row ,Button , Card ,Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

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

import IntendedLearners from './intended-learners/IntendedLearners';
import Curriculum from './curriculum/Curriculum';
import Basics from './basics/Basics';
import Pricing from './pricing/Pricing';
import CourseMessages from './messages/courseMessages';
import Promotion from './promotions/Promotion';
import Settings from './settings/Settings'

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

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectTab, setselectTab] = useState(window.history.state)
  const location = useLocation();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);


    if(index == 0){
      setselectTab("intended-learners")
      window.history.pushState("intended-learners", "Manage Course", `#intended-learners`);
    }else if (index == 1){
      setselectTab("curriculum")
      window.history.pushState("curriculum", "Manage Course", `#curriculum`);
    }else if (index == 2){
      setselectTab("course-landing-page")
      window.history.pushState("course-landing-page", "Manage Course", `#course-landing-page`);
    }else if (index == 3){
      setselectTab("pricing")
      window.history.pushState("pricing", "Manage Course", `#pricing`);
    }else if (index == 4){
      setselectTab("course-messages")
      window.history.pushState("course-messages", "Manage Course", `#course-messages`);
    }else if (index == 5){
      setselectTab("promotions")
      window.history.pushState("promotions", "Manage Course", `#promotions`);
    }else if (index == 6){
      setselectTab("settings")
      window.history.pushState("settings", "Manage Course", `#settings`);
    }else{
      setselectTab("intended-learners")
      window.history.pushState("intended-learners", "Manage Course", `#intended-learners`);
    }

    // console.log(window.history)



    

  };

  React.useEffect(() => {
    setselectTab(window.history.state)
  }, [window.history]);


  return (
    <Layout>
    <Header style={headerStyle}>
     <div className='d-flex justify-content-between'>

     <Space size={30}>
          <a className='link-back' href='/courses'><ArrowBackIosIcon fontSize="small" /> Back to Courses</a>
          <span className='course-title'>Learn Photoshop in 20min</span>
          <span className='course-title-status'>DRAFT</span>
      </Space>

      <Space size={15}>
        <Button size="small" >SAVE</Button>
      </Space>
     </div>

  </Header>

  {/* Content */}

  <Row>

  

    <div className='col-md-3 p-5'>
    <List component="nav" aria-label="main mailbox folders">

   
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <LocalLibraryIcon />
          </ListItemIcon>
          <ListItemText primary="Intended Learners" />
        </ListItemButton>
       

        
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Curriculum" />
        </ListItemButton>
          


        
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Course Landing Page" />
        </ListItemButton>
       
      
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Pricing" />
        </ListItemButton>
        

        
        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}>
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="Courses Messages" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}>
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText primary="Promotions" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 6}
          onClick={(event) => handleListItemClick(event, 6)}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>

        <ListItemText>
           <Button className='mx-4 w-75 my-3' type="danger">Submit For Review</Button>
        </ListItemText>
        

      </List>

    </div>


    {/* HERE */}
    {/*  */}
    { selectTab == "intended-learners"  ? <IntendedLearners /> : 
     selectTab == "curriculum" ?  <Curriculum /> : 
     selectTab == "course-landing-page" ? <Basics /> : 
     selectTab == "pricing" ? <Pricing /> : 
     selectTab == "course-messages" ? <CourseMessages /> :
     selectTab == "promotions" ? <Promotion />  : 
     selectTab == "settings" ? <Settings /> 
    : ""}


    

    
  </Row>


  </Layout>
  )
}

export default ManageCourses