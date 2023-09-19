import React, { useState } from 'react';
import {  Space , Typography  } from 'antd';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import './Pricing.css'
import { Layout, Menu , Col, Row ,Button , Card ,Select } from 'antd';
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
  

const Pricing = () => {

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
          Pricing
       </Typography.Title>
       <hr />

       <div className='pricing-container'>

       <div className='pricing-header'>
      <Title level={5}>Course Price Tier</Title>
      <p>Please select the price tier for your course below and click 'Save'. The list price that students will see in other currencies is determined using the price tier matrix.</p>
      <p>If you intend to offer your course for free, the total length of video content must be less than 2 hours.</p>

      </div>

      <Space>
      <Select
      defaultValue="USD"
        size='large'
        style={{
          width: 100,
        }}
        onChange={handleChange}
        options={[
          {
            value: 'USD',
            label: 'USD',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'Yiminghe',
            label: 'yiminghe',
          },
          {
            value: 'disabled',
            label: 'Disabled',
            disabled: true,
          },
        ]}
      />


      <Select
      defaultValue="Select"
        size='large'
        style={{
          width: 200,
        }}
        onChange={handleChange}
        options={[
          {
            value: 'Select',
            label: 'Select',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'Yiminghe',
            label: 'yiminghe',
          },
          {
            value: 'disabled',
            label: 'Disabled',
            disabled: true,
          },
        ]}
      />

      <Button disabled size={3} type="primary" danger>Save</Button>

      </Space>

       </div>

 

    </Card>
    
    </div>
  )
}

export default Pricing