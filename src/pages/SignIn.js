import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Input,
  Switch,
} from "antd";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import validateEmail from "../commonFunctions/emailValid";
import { LoginInstructor } from "../api";
import signinbg from "../assets/images/img-signin.jpg";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import MainLoader from "../commonFunctions/loaders/MainLoader/MainLoader";
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const SignIn = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const [showPassword, setshowPassword] = useState(false)
  const [loading, setloading] = useState(false)

  useEffect(() => {
  
      // Get Session Details
      console.log(new URLSearchParams(window.location.search).get("sessionTimeout"))
      if(new URLSearchParams(window.location.search).get("sessionTimeout")){
        setShow(true)
      }else{
        setShow(false)
        window.location.href = "/courses"
      }
  
    }, [])

    const onhandleSubmit = () =>{
      console.log(email)
      console.log(password)

      
  
      if(email == ""){
  
        Swal.fire({
          title: "Empty Field!",
          text: "Please Enter Your Email",
          icon: "error"
        });
  
      }else if(!validateEmail(email)){
  
        Swal.fire({
          title: "Invalid Email!",
          text: "Please Enter A Valid Email",
          icon: "error"
        });
  
      }else if(password == ""){
  
        Swal.fire({
          title: "Empty Field!",
          text: "Please Enter Your Password",
          icon: "error"
        });
      }else{

        setloading(true)
        LoginInstructor(email, password,new URLSearchParams(window.location.search).get("rediect-url"),setloading)
  
      }
  
    }

    return (
      <>
        <Layout className="layout-default layout-signin">

        {loading && <MainLoader />}
       
          <Content className="signin">
            <Row gutter={[24, 0]} justify="space-around">
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 2 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15">Sign In</Title>
                <Title className="font-regular text-muted" level={5}>
                  Enter your  email and password to sign in as Instructor
                </Title>
              
                <Form>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={(e) => setemail(e.target.value)} type="email" placeholder="name@example.com" />
              </Form.Group>

              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  onChange={(e) => setpassword(e.target.value)}
                  type={showPassword ? 'text' :'password'}
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Text onClick={() => setshowPassword(!showPassword)} id="basic-addon2">
                  {showPassword ?  <i class="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                  
                  </InputGroup.Text>
              </InputGroup>

              <Button onClick={onhandleSubmit} type="primary" block>
            Login
          </Button>

              </Form>


              </Col>
              <Col
                className="sign-img"
                style={{ padding: 12 }}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
              >
                <img src={signinbg} alt="" />
              </Col>
            </Row>
          </Content>
        

        </Layout>
      </>
    );

}
export default SignIn