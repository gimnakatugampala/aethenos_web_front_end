import React, { useState } from 'react'

import { TagsInput } from "react-tag-input-component";
import { Divider, Radio, Typography } from 'antd';
import './StepTwo.css'

const StepTwo = ({course_keywords, setcourse_keywords}) => {

  const [selected, setSelected] = useState(["it","software"]);

  


  return (
    <div className='steptwo-container text-center'> 
      <div>

      <div className='my-5'>
      <Typography.Title
        level={3}>
        Enter Some Keywords to find your Course
      </Typography.Title>

      <p>When Typing These Keywords by Student Your Course Will Appear</p>

      </div>

    <div className='pt-3'>
          <pre>{JSON.stringify(course_keywords)}</pre>
          <TagsInput
            className="select-keywords"
            value={course_keywords}
            onChange={setcourse_keywords}
            name="keywords"
            placeHolder="Enter Search Keywords"
          />
          <em>Please enter a minimum of 5 keywords to be used as search terms for students. Press Enter after each keyword.</em>
    </div>


    </div>
  </div>
  )
}

export default StepTwo