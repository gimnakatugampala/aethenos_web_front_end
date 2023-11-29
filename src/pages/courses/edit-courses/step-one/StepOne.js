import React, { useEffect, useState } from 'react'

import { Divider, Radio, Typography } from 'antd';
import { Input } from 'antd';

import { Select, Space } from 'antd';

import './StepOne.css'
import { getCourseCategories } from '../../../../api';


const StepOne = ({course_title,setcourse_title,course_cat,setcourse_cat}) => {

  const [categoriesData, setcategories] = useState([])

  const onChnageTitle = (e) => {
    document.getElementById("course-title-count").innerText = 60 - e.target.value.length;
    // console.log(60 - e.target.value.length);
  };

  useEffect(() => {
    getCourseCategories(setcategories)

    console.log(categoriesData)
  }, [])



  return (
    <div className="stepone-container">

      <div>
      <div className='my-5'>
      <Typography.Title
        level={3}>
        How about a working title?
      </Typography.Title>

      <p>It's ok if you can't think of a good title now. You can change it later.</p>
      </div>
      
      <div className='pt-3'>
      {/* <Input className='course-title'  placeholder='Enter Course Title'  maxLength={20} onChange={onChange} /> */}

      <div class="input-group">
        <input value={course_title} maxLength={60} onChange={(e) => setcourse_title(e.target.value)} type="text" class="form-control" placeholder="Enter Course Title" />
        <span class="input-group-text" id="course-title-count">60</span>
      </div>

        <Select
        className='my-2 category-select'
        size='large'
        placeholder="Select Course Category"
        value={course_cat}
        allowClear
        onChange={(value) => setcourse_cat(value)}
        options={categoriesData}
        />

    </div>

      
    
      </div>
     

    </div>
  )
}

export default StepOne