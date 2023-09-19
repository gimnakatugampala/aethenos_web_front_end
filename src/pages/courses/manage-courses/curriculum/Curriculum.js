import React from 'react'
import './curriculum.css'
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
  

 const Curriculum = () => {
   
    const handleClick = e => {
        console.log('click ', e);
      };
    
      const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

  return (
    <div className='col-md-8'>
    <Card className="py-2 my-2"> 
        <Typography.Title className='p-3' level={3}>
          Curriculum
       </Typography.Title>
       <hr />



    </Card>
    
    </div>
  
  )
}

export default Curriculum