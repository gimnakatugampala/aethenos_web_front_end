import React, { useEffect, useState } from 'react'

import { Divider, Radio, Typography } from 'antd';
import { Input } from 'antd';

import { Select, Space } from 'antd';
import { getCourseCategories } from '../../../../api';
import './StepOne.css'


const StepOne = ({setcourse_title , setcourse_category}) => {

  const [categories, setcategories] = useState([])

  useEffect(() => {
    getCourseCategories(setcategories)
  }, [])
  

  const onChnageTitle = (e) => {
    document.getElementById("course-title-count").innerText = 60 - e.target.value.length;
    setcourse_title(e.target.value);
  };

  const handleChange = (value) => {
    setcourse_category(value);
  };

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
      
      <div class="input-group">
        <input maxLength={60} onChange={onChnageTitle} type="text" class="form-control" placeholder="Enter Course Title" />
        <span class="input-group-text" id="course-title-count">60</span>
      </div>

        <Select
        className='my-2 category-select'
        size='large'
        placeholder="Select Course Category"
        allowClear
        onChange={handleChange}
        options={categories}
        />

    </div>

      
    
      </div>
     

    </div>
  )
}

export default StepOne