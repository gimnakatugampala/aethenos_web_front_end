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
      <Input  placeholder='Enter Course Title' showCount maxLength={20} onChange={onChange} />

        <Select
        className='my-2 category-select'
        size='large'
        placeholder="Select Course Category"
        allowClear
        onChange={handleChange}
        options={[
          {
            value: 'jack',
            label: 'Jack',
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

    </div>

      
    
      </div>
     

    </div>
  )
}

export default StepOne