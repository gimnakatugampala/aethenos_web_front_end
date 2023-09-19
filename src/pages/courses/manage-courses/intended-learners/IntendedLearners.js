import React from 'react'
import {  Space , Typography  } from 'antd';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import { Layout, Menu , Col, Row ,Button , Card ,Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;
const { Text, Link , Title } = Typography;


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

    
  const handleClick = e => {
    console.log('click ', e);
  };

  const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const onFinish = (values) => {
  console.log('Received values of form:', values);
};

  return (
    <div className='col-md-8'>
    <Card className="py-2 my-2"> 
        <Typography.Title className='p-3' level={3}>
        Intended learners
       </Typography.Title>
       <hr />

       <div className='managec-container'>


      <div className='section-1'>
          <p>The following descriptions will be publicly visible on your <a href='/courses/manage/2023/basics'> Course Landing Page </a>and will have a direct impact on your course performance. These descriptions will help learners decide if your course is right for them.</p>

          <div className='mt-4'>
          <Title level={5}>What will students learn in your course?</Title>
          <p>You must enter at least 4 learning objectives or outcomes that learners can expect to achieve after completing your course.</p>
          </div>

      </div>


      {/* Form 1 */}
      <div style={{margin:'auto'}}>
        <div>
          <div className='w-100'>
          <Form labelCol={{flex: '100px'}} colon={false} style={{width:980,margin:'auto'}}>

          {/* 1 */}
          <Form.Item
            rules={[{required: true}]}>
            <Input placeholder='Example: Define User Roles' />
          </Form.Item>

            {/* 2 */}
            <Form.Item rules={[{required: true}]}>
            <Input placeholder='Example: Estimate Project Timelines' />
            </Form.Item>

            {/* 3 */}
            <Form.Item rules={[{required: true}]}>
            <Input placeholder='Example: Identity and Manage project risks' />
          </Form.Item>
        </Form>

        </div>
            <Form
            name="dynamic_form_item"
            {...formItemLayoutWithOutLabel}
            onFinish={onFinish}
            >
            <Form.List name="names">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                    
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="Example" style={{width: '80%'}} />
                      </Form.Item>
                      {fields.length > 0 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button p-2"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add More Responses
                    </Button>
                  
                    <Form.ErrorList errors={errors} />
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
      <Title level={5}>What are the requirements or prerequisites for taking your course?</Title>
      <p>List the required skills, experience, tools or equipment learners should have prior to taking your course.
    If there are no requirements, use this space as an opportunity to lower the barrier for beginners.</p>
      </div>
      {/* Form 2 */}

      <div style={{margin:'auto'}}>
        <div>
          <div className='w-100'>
          <Form labelCol={{flex: '100px'}} colon={false} style={{width:980,margin:'auto'}}>

          {/* 1 */}
          <Form.Item
            rules={[{required: true}]}>
            <Input placeholder='Example: Define User Roles' />
          </Form.Item>

            {/* 2 */}
            <Form.Item rules={[{required: true}]}>
            <Input placeholder='Example: Estimate Project Timelines' />
            </Form.Item>

            {/* 3 */}
            <Form.Item rules={[{required: true}]}>
            <Input placeholder='Example: Identity and Manage project risks' />
          </Form.Item>
        </Form>

        </div>
            <Form
            name="dynamic_form_item"
            {...formItemLayoutWithOutLabel}
            onFinish={onFinish}
            >
            <Form.List name="names">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                    
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="Example" style={{width: '80%'}} />
                      </Form.Item>
                      {fields.length > 0 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button p-2"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add More Responses
                    </Button>
                  
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>

          
          </Form>
          </div>

        </div>
    </div>

      </div>

    {/* Section 3 */}
  <div className='section-3'>
  <div className='mt-4'>
    <Title level={5}>Who is this course for?</Title>
    <p>Write a clear description of the intended learners for your course who will find your course content valuable.
This will help you attract the right learners to your course.</p>
    </div>

  </div>

   {/* Form 3 */}

   <Form
    labelCol={{
      flex: '100px',
    }}
    labelAlign="left"
    labelWrap
    wrapperCol={{
      flex: 1,
    }}
    colon={false}
    style={{
      maxWidth: 400,
      textAlign:'center',
      marginLeft:'13%'
    }}
  >
    {/* 1 */}
    <Form.Item
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input placeholder='Examples:Python Beginners' />
    </Form.Item>
  </Form>

      <Form
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      style={{
        maxWidth: 800,
      }}
    >
      <Form.List
        name="names"
        // rules={[
        //   {
        //     validator: async (_, names) => {
        //       if (!names || names.length < 2) {
        //         return Promise.reject(new Error('At least 2 passengers'));
        //       }
        //     },
        //   },
        // ]}
      >
       
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                // label={index === 0 ? 'ddd' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="Example"
                    style={{
                      width: '60%',
                    }}
                  />
                </Form.Item>
                {fields.length > 0 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button p-2"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{
                  width: '60%',
                }}
                icon={<PlusOutlined />}
              >
                Add More Responses
              </Button>
            
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>

    
    </Form>



    </Card>
    
    </div>
  )
}

export default IntendedLearners