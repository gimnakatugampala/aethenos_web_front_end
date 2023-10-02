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



 const Curriculum = () => {



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