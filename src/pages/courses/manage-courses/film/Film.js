import React from 'react'
import './film.css'
import {  Space , Typography  } from 'antd';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import { Layout, Menu , Col, Row ,Button , Card ,Select } from 'antd';
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
  

const Film = () => {
 
    
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
      defaultSelectedKeys={['5']}
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
        <Menu.Item key="2"><a href='/courses/manage/2023/course-structure'>Course Structure</a></Menu.Item>
      </SubMenu>

      <SubMenu
        key="sub2"
        title={
          <h6>
            <b>Create your content</b>
          </h6>
        }
      >
       <Menu.Item key="5"><a href='/courses/manage/2023/film'>Film & Edit</a></Menu.Item>
        <Menu.Item key="6"><a href='/courses/manage/2023/curriculum'>Curriculum</a></Menu.Item>
        <Menu.Item key="7"><a href='/courses/manage/2023/captions'>Caption (optional)</a></Menu.Item>
        <Menu.Item key="8"><a href='/courses/manage/2023/accessibility'>Accessibility (optional)</a></Menu.Item>
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
        <Menu.Item key="11"><a href='/courses/manage/2023/promotions'>Promotions</a></Menu.Item>
        <Menu.Item key="12"><a href='/courses/manage/2023/messages'>Course messages</a></Menu.Item>
      </SubMenu>

    </Menu>

      <Button className='mx-4 w-75 my-3' type="primary">Submit For Review</Button>
    </Card>

    </Col>

    <Col span={19}>
    <Card className="py-2 my-2"> 
        <Typography.Title className='p-3' level={3}>
          Film & Edit
       </Typography.Title>
       <hr />

      

 

    </Card>
    
    </Col>
  </Row>


  </Layout>
  )
}

export default Film