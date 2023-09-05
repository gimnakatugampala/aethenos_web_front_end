import React from 'react'

import { Divider, Radio, Typography } from 'antd';
import { Input } from 'antd';
import { Select, Space } from 'antd';
import './StepOne.css'

const StepOne = () => {

  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
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
      <Input className='course-title'  placeholder='Enter Course Title' showCount maxLength={20} onChange={onChange} />

        <Select
        className='my-2 category-select'
        size='large'
        placeholder="Select Course Category"
        allowClear
        onChange={handleChange}
        options={[
          {
            value: 'development',
            label: 'Development',
          },
          {
            value: 'bisiness',
            label: 'Business',
          },
          {
            value: 'finance',
            label: 'Finance & Accounting',
          },
          {
            value: 'it',
            label: 'IT & Software',
          },
          {
            value: 'officep',
            label: 'Office Productivity',
          },
          {
            value: 'design',
            label: 'Design',
          },
          {
            value: 'marketing',
            label: 'Marketing',
          },
          {
            value: 'lifestyle',
            label: 'Lifestyle',
          },
          {
            value: 'photography',
            label: 'Photography & Video',
          },
          {
            value: 'health',
            label: 'Health & Fitness',
          },
          {
            value: 'music',
            label: 'Music',
          },
          {
            value: 'teaching',
            label: 'Teaching & Academics',
          },
        ]}
        />

    </div>

      
    
      </div>
     

    </div>
  )
}

export default StepOne