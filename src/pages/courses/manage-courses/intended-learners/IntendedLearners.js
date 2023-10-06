import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import { Layout, Menu , Col, Row ,Button  ,Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import Card from '@mui/material/Card';

import Typography from '@mui/material/Typography';
import $ from "jquery";


const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;


const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 20,
      },
    },
  };

  
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 20,
        offset: 4,
      },
    },
  };
  

const IntendedLearners = () => {

    
  const onChangeResOne = e => {
    document.getElementById("res-1").innerText = 160 - e.target.value.length
    // console.log('click ', e);
  };

  const onChangeResTwo = (e) =>{
    document.getElementById("res-2").innerText = 160 - e.target.value.length
  }

  const onChangeResThree = (e) =>{
    document.getElementById("res-3").innerText = 160 - e.target.value.length
  }

  const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const onFinish = (values) => {
  console.log('Received values of form:', values);
};


  return (
    <div className='col-md-8'>
    <Card className="py-2 my-2 p-4"> 

      <Typography className='my-2' variant="h4" >
          Intended Learners
      </Typography>

       <hr />

       <div className='managec-container'>


      <div className='section-1'>
          <div className='mt-4'>
          <Typography variant="h6" >What will students learn in your course?</Typography>
          <p>You must enter at least 4 learning objectives or outcomes that learners can expect to achieve after completing your course.</p>
          </div>

      </div>


      {/* Form 1 */}
      <div style={{margin:'auto'}}>
        <div>
          <div className='w-100'>
          <Form labelCol={{flex: '100px'}} colon={false} style={{margin:'auto'}}>

          {/* 1 */}
          <div class="input-group mb-3">
            <input maxLength={160} onChange={onChangeResOne} type="text" class="form-control" placeholder="Example: Define User Roles" />
            <span class="input-group-text" id="res-1">160</span>
          </div>


            {/* 2 */}
            <div class="input-group mb-3">
            <input maxLength={160} onChange={onChangeResTwo} type="text" class="form-control" placeholder="Example: Estimate Project Timelines" />
            <span class="input-group-text" id="res-2">160</span>
          </div>

      

            {/* 3 */}
            <div class="input-group mb-3">
            <input maxLength={160} onChange={onChangeResThree} type="text" class="form-control" placeholder="Example: Identity and Manage project risks" />
            <span class="input-group-text" id="res-3">160</span>
          </div>

          
        </Form>
        </div>

            <Form
            name="dynamic_form_item"
            // {...formItemLayoutWithOutLabel}
            onFinish={onFinish}
            >
            <Form.List name="names">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>

                       <div class="input-group">
                        <input maxLength={160} type="text" class="form-control" placeholder="Example" />
                        <span class="input-group-text btn btn-danger text-white" id="res-3">  {fields.length > 0 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}</span>
                      </div>

                    
                    </Form.Item>
                  ))}

                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} >
                      Add More Responses
                    </Button>
                  
                    
                  </Form.Item>

                </>
              )}
            </Form.List>

          
          </Form>
          </div>

        </div>

    {/* Section 2 */}
    <div className='section-2'>
    <div className='mt-4'>
    <Typography variant="h6" >What are the requirements or prerequisites for taking your course?</Typography>
      {/* <Title level={5}>What are the requirements or prerequisites for taking your course?</Title> */}
      <p>List the required skills, experience, tools or equipment learners should have prior to taking your course.
    If there are no requirements, use this space as an opportunity to lower the barrier for beginners.</p>
      </div>

    </div>
       {/* Form 2 */}
       <div style={{margin:'auto'}}>
        <div>
          <div className='w-100'>
          <Form labelCol={{flex: '100px'}} colon={false} style={{margin:'auto'}}>

          {/* 1 */}
          <div class="input-group mb-3">
            <input maxLength={160} onChange={onChangeResOne} type="text" class="form-control" placeholder="Example: Define User Roles" />
            <span class="input-group-text" id="res-1">160</span>
          </div>


            {/* 2 */}
            <div class="input-group mb-3">
            <input maxLength={160} onChange={onChangeResTwo} type="text" class="form-control" placeholder="Example: Estimate Project Timelines" />
            <span class="input-group-text" id="res-2">160</span>
          </div>

      

            {/* 3 */}
            <div class="input-group mb-3">
            <input maxLength={160} onChange={onChangeResThree} type="text" class="form-control" placeholder="Example: Identity and Manage project risks" />
            <span class="input-group-text" id="res-3">160</span>
          </div>

          
        </Form>
        </div>

            <Form
            name="dynamic_form_item"
            // {...formItemLayoutWithOutLabel}
            onFinish={onFinish}
            >
            <Form.List name="names">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>

                       <div class="input-group">
                        <input maxLength={160} type="text" class="form-control" placeholder="Example" />
                        <span class="input-group-text btn btn-danger text-white" id="res-3">  {fields.length > 0 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}</span>
                      </div>

                    
                    </Form.Item>
                  ))}

                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} >
                      Add More Responses
                    </Button>
                  
                    
                  </Form.Item>

                </>
              )}
            </Form.List>

          
          </Form>
          </div>

        </div>


      </div>

    {/* Section 3 */}
    <div className='section-3'>
    <div className='mt-4'>
    <Typography variant="h6" >Who is this course for?</Typography>
    <Typography variant="body2" gutterBottom>
    Write a clear description of the intended learners for your course who will find your course content valuable.
    This will help you attract the right learners to your course.
    </Typography>
      </div>
    </div>

   {/* Form 3 */}
   <div style={{margin:'auto'}}>
        <div>
          <div className='w-100'>
          <Form labelCol={{flex: '100px'}} colon={false} style={{margin:'auto'}}>

          {/* 1 */}
          <div class="input-group mb-3">
            <input maxLength={160} onChange={onChangeResOne} type="text" class="form-control" placeholder="Example: Beginner Python developers curious about data science" />
            <span class="input-group-text" id="res-1">160</span>
          </div>
          
        </Form>
        </div>

            <Form
            name="dynamic_form_item"
            // {...formItemLayoutWithOutLabel}
            onFinish={onFinish}
            >
            <Form.List name="names">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>

                       <div class="input-group">
                        <input maxLength={160} type="text" class="form-control" placeholder="Example" />
                        <span class="input-group-text btn btn-danger text-white" id="res-3">  {fields.length > 0 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}</span>
                      </div>

                    
                    </Form.Item>
                  ))}

                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} >
                      Add More Responses
                    </Button>
                  
                    
                  </Form.Item>

                </>
              )}
            </Form.List>

          
          </Form>
          </div>

        </div>


    </Card>
    
    </div>
  )
}

export default IntendedLearners