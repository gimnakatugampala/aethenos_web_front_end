import React from 'react'
import './curriculum.css'
import { Layout, Menu , Col, Row  , Card ,Select } from 'antd';
import { Input } from 'antd';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { useState } from 'react';
const { TextArea } = Input;
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;
const { Text, Link , Title } = Typography;


const fileList = [
  {
    uid: '0',
    name: 'xxx.png',
    status: 'uploading',
    percent: 33,
  },
  {
    uid: '-1',
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'zzz.png',
    status: 'error',
  },
];

  

 const Curriculum = () => {

  const [show, setShow] = useState(false);
  const [showCurriculum, setshowCurriculum] = useState(false)
  const [showLecture, setshowLecture] = useState(false)
   
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCurriculum = () => setshowCurriculum(true)
    const handleCurriculumClose = () => setshowCurriculum(false)

    const handleshowLecture = () => setshowLecture(!showLecture)
    const handleshowLectureClose = () => setshowLecture(false)


    const onDrop = (data) => {
      console.log(data)
      // => banana 
  }

  return (
    <div className='col-md-8'>
    <Card className="py-2 my-2"> 
        <Typography className='p-3' variant='h4'>
          Curriculum
       </Typography>
       <hr />

       <div className='row'>

            <div className='d-flex justify-content-end'>
                <Button variant="contained" onClick={handleShow}>
                <i class="fa-solid fa-plus"></i> Add Section
                </Button>
            </div>

          <div className='col-md-12'>
          <table className="table caption-top">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Objective</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Introduction</td>
                  <td>The Foundation of the Course</td>
                  <td>
                  <Button onClick={handleCurriculum} variant="contained"><i class="fa-solid fa-plus p-1"></i></Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
       </div>

      


    </Card>


      {/* Add Section */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div className='row'>
          <div className='col-md-12'>

          <div class="mb-3">
              <label class="form-label">Title</label>
              <input type="email" class="form-control"  placeholder="Enter Title" />
            </div>

            <div class="mb-3">
              <label class="form-label">Objective</label>
              <input type="email" class="form-control"  placeholder="Enter Objective" />
            </div>

            <Button variant="contained">Save</Button>

          </div>
        </div>

        </Modal.Body>
      
      </Modal>

      {/* Add Curriculum */}
      <Modal size="lg" show={showCurriculum} onHide={handleCurriculumClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Curriculum</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div className='d-flex justify-content-end my-2'>
            <Button onClick={handleshowLecture} variant="contained">Add Curriculum</Button>
        </div>

      {showLecture && (
        <div className='row'>
          <div className='col-md-12'>
              <label  class="form-label">Lecture Name</label>
              <input type="email" class="form-control" placeholder="Name" />

              <div className="my-2">
                <Button className='mx-1' variant="contained">Add</Button>
                <Button onClick={handleshowLectureClose} className='mx-1' variant="outlined" >Cancel</Button>
              </div>
          </div>   
        </div>
      )}

       
      <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Introduction</Accordion.Header>
        <Accordion.Body>
          
          
    
    <Upload
      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
      listType="picture"
      defaultFileList={[...fileList]}
      className="upload-list-inline"
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Deep Learning</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

        </Modal.Body>
      </Modal>
    
    </div>
  
  )
}

export default Curriculum