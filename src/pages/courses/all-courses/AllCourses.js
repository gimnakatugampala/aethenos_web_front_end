import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';

import { Radio } from 'antd';
import { Select } from 'antd';
import { Input, Space , Badge , Image ,Col, Divider, Row } from 'antd';
import { Card } from 'antd';
import { Button, Progress } from 'antd';
import CourseItem from '../../../components/course-item/CourseItem';
import './AllCourses.css'
const { Search } = Input;

const AllCourses = () => {


  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => console.log(value);
  
  

  return (
    <div>
    <Space style={{marginLeft:20,marginRight:20}} size="large">
      <Radio.Group defaultValue="a" buttonStyle="solid">
      <Radio.Button value="a">All</Radio.Button>
      <Radio.Button value="b">Draft</Radio.Button>
      <Radio.Button value="c">Requested</Radio.Button>
      <Radio.Button value="d">Approved</Radio.Button>
    </Radio.Group>

    <Space size={90}>
    <Select
      size="large"
      defaultValue="newest"
      placeholder="Filter Courses"
      style={{ width: 150 }}
      onChange={handleChange}
      
      options={[
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
        { value: 'a-z', label: 'A-Z' },
        { value: 'z-a', label: 'Z-A' }
      ]}
    />

    <Search  placeholder="Search Courses" onSearch={onSearch} enterButton />

    <Button type="primary" danger>
    <a href="/add-courses">
        Add Course
      </a>
    </Button>

    </Space>
      
</Space>

{/* List */}
<div className='container my-3'>

{/* List One */}
<CourseItem title="Learn Photoshop in 20 Min" status="Requested" filledPercent={49} seenBy="PUBLIC" />
<CourseItem title="Learn Webdevelopment in 20 Min" status="Approved" filledPercent={49} seenBy="PRIVATE" />
<CourseItem title="Learn AI in 20 Min" status="Draft" filledPercent={49} seenBy="PUBLIC" />
<CourseItem title="Learn Mobile Development in 20 Min" status="Disapproved" filledPercent={49} seenBy="PUBLIC" />
    
  </div>


    

    </div>
  )
}

export default AllCourses