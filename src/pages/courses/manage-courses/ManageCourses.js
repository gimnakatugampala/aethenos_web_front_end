import React, { useState } from 'react';
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

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import IntendedLearners from './intended-learners/IntendedLearners';
import Curriculum from './curriculum/Curriculum';
import Basics from './basics/Basics';
import Pricing from './pricing/Pricing';
import CourseMessages from './messages/courseMessages';

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

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };


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
        <Button>Preview</Button>
        <Button size="small" >SAVE</Button>
          <a className='text-white' href="#"><SettingsIcon fontSize="small" /></a>
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
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="Courses Messages" />
        </ListItemButton>

        <ListItemText>
           <Button className='mx-4 w-75 my-3' type="danger">Submit For Review</Button>
        </ListItemText>
        

      </List>

    </div>


    {/* HERE */}
    {/*  */}
    {selectedIndex == 0 ? 
    <IntendedLearners /> : 
    selectedIndex == 1 ? 
    <Curriculum /> : 
    selectedIndex == 2 ? <Basics /> : 
    selectedIndex == 3 ? <Pricing /> : 
    selectedIndex == 4 ? <CourseMessages /> : ""}


    

    
  </Row>


  </Layout>
  )
}

export default ManageCourses