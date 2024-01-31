import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Radio } from 'antd';
import { Select } from 'antd';
import { Input, Space , Badge , Image ,Col, Divider, Row } from 'antd';
import { Card } from 'antd';
import { Button, Progress } from 'antd';
import Modal from 'react-bootstrap/Modal';
import CourseItem from '../../../components/course-item/CourseItem';
import Colors from '../../../commonFunctions/Colors';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { GetAllCourses } from '../../../api';
import MainLoader from '../../../commonFunctions/loaders/MainLoader/MainLoader';
import Spinner from 'react-bootstrap/Spinner';
import './AllCourses.css'
import LoadingSpinner from '../../../commonFunctions/loaders/Spinner/LoadingSpinner';
const { Search } = Input;

const AllCourses = () => {

  const [courses, setcourses] = useState([])

  useEffect(() => {

  
      GetAllCourses(setcourses)
    
  }, [])
  


  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => console.log(value);
  
  

  return (
    <div className='all-courses-container'>
    <div className='all-coueses-control-items'>

    <Space size="middle">
    <Radio.Group  defaultValue="a" buttonStyle="solid">
      <Radio.Button value="a">All</Radio.Button>
      <Radio.Button value="b">Draft</Radio.Button>
      <Radio.Button value="c">Requested</Radio.Button>
      <Radio.Button value="d">Approved</Radio.Button>
    </Radio.Group>

    <Space size={90}>
    <Select
      className='select-items'
      size="large"
      defaultValue="newest"
      placeholder="Filter Courses"
      onChange={handleChange}
      
      options={[
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
        { value: 'a-z', label: 'A-Z' },
        { value: 'z-a', label: 'Z-A' }
      ]}
    />

    <Search placeholder="Search Courses" onSearch={onSearch} enterButton />

    <Button type="primary" danger>
      <a className='icon-container' href="/add-courses">
        <PlusOutlined className='icon' />
        Add Course
      </a>
  </Button>

    </Space>

    </Space>
      
</div>

{/* List */}
<div className='container my-3'>


{/* List One */}
{courses != null ?  courses.length > 0 ? 
courses.map((course,key) => (
<CourseItem key={key} course={course}  filledPercent={course.progress}  />
))
: <LoadingSpinner w={"40%"} h={"100%"} wpclass={"m-5"} /> : 
<div className='d-flex justify-content-center align-items-center mt-5'>
  <h4>No Courses Found</h4>
</div>  }


    
  </div>



    

    </div>
  )
}

export default AllCourses