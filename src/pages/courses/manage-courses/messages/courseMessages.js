import React, { useState } from 'react';
import {  Space , Typography  } from 'antd';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import './courseMessages.css'
import { Layout, Menu , Col, Row ,Button , Card ,Select } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { Input } from 'antd';
const { TextArea } = Input;
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
  

const CourseMessages = () => {

  const [val, setval] = useState("")

    
    const handleClick = e => {
        console.log('click ', e);
      };
    
      const handleChange = (value) => {
      console.log(`selected ${value}`);
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

  <Row>
    <Col style={{height:'100vh',padding:5}} span={5}>
    <Card className="py-2 my-1"> 
    <Menu
      onClick={handleClick}
      // style={{ width: 256 }}
      // className="my-2"
      defaultSelectedKeys={['12']}
      defaultOpenKeys={['sub1','sub2','sub4']}
      mode="inline"
    >
      
      <SubMenu
        key="sub1"
        title={
          <h6>
            <b>Plan your course</b>
          </h6>
        }
      >
        <Menu.Item key="1"><a href='/courses/manage/2023/'>Intented Learners</a></Menu.Item>

      </SubMenu>

      <SubMenu
        key="sub2"
        title={
          <h6>
            <b>Create your content</b>
          </h6>
        }
      >
        <Menu.Item key="6"><a href='/courses/manage/2023/curriculum'>Curriculum</a></Menu.Item>
      </SubMenu>

      <SubMenu
        key="sub4"
        title={
          <h6>
            <b>Publish your course</b>
          </h6>
        }
      >
        <Menu.Item key="9"><a href='/courses/manage/2023/basics'>Course landing page</a></Menu.Item>
        <Menu.Item key="10"><a href='/courses/manage/2023/pricing'>Pricing</a></Menu.Item>
        <Menu.Item key="12"><a href='/courses/manage/2023/messages'>Course messages</a></Menu.Item>
      </SubMenu>

    </Menu>

      <Button className='mx-4 w-75 my-3' type="danger">Submit For Review</Button>
    </Card>

    </Col>

    <Col span={19}>
    <Card className="py-2 my-2"> 
        <Typography.Title className='p-3' level={3}>
          Course Messages
       </Typography.Title>
       <hr />

       <div className='pricing-container'>

       <div className='pricing-header'>
      
      <p>Write messages to your students (optional) that will be sent automatically when they join or complete your course to encourage students to engage with course content. If you do not wish to send a welcome or congratulations message, leave the text box blank.</p>

      </div>

      <Space  direction="vertical"
    size="middle">
         <Typography.Title level={5}>
         Welcome Message
       </Typography.Title>

      <Editor
  apiKey="4kzusxd15inrsx59etjfcvbu21jqq9g169ftvk4n59ywoeak"
      onEditorChange={(value,editor) => console.log(value)}
      init={{ plugins: 'link table' }}
    />

      
      <Typography.Title level={5}>
      Congratulations Message
       </Typography.Title>


       <Editor
       
        apiKey="4kzusxd15inrsx59etjfcvbu21jqq9g169ftvk4n59ywoeak"
        onEditorChange={(value,editor) => console.log(value)}
        init={{ plugins: 'link table' }}
      />
      </Space>

       </div>

 

    </Card>
    
    </Col>
  </Row>


  </Layout>
  )
}

export default CourseMessages