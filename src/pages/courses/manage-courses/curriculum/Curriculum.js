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
  // {
  //   uid: '0',
  //   name: 'xxx.png',
  //   status: 'uploading',
  //   percent: 33,
  // },
  {
    uid: '-1',
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  // {
  //   uid: '-2',
  //   name: 'zzz.png',
  //   status: 'error',
  // },
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


       </div>

      


    </Card>


  
    
    </div>
  
  )
}

export default Curriculum