import React, { Component } from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
} from "antd";


import { Link } from "react-router-dom";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/utils/aethenos_logo.jpg";
import { useState } from "react";
import ErrorAlert from "../../commonFunctions/Alerts/ErrorAlert";
import { ChangeToNewPassword, SendEmailVerficationCode, VerifyCode } from "../../api";
import ButtonSpinner from "../../commonFunctions/loaders/Spinner/ButtonSpinner";
import VerificationInput from "react-verification-input";
const { Title } = Typography;
const { Header, Footer, Content } = Layout;



const ForgotPassword = () => {

    const [email, setemail] = useState("")

    const [btnLoading, setbtnLoading] = useState(false)
    const [showVerificationInputs, setshowVerificationInputs] = useState(false)

    const [codeSuccess, setcodeSuccess] = useState(false)

    const [VerficationCode, setVerficationCode] = useState("")

    const [password, setpassword] = useState("")
    const [conPassword, setconPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false);


    // ========== Submit ==========
    const onFinish = () => {
        console.log(email)

        setbtnLoading(true)

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            // console.log("Invalid email:", email);
            setbtnLoading(false)
            ErrorAlert("Error","Please enter a valid email")
            return
        }

        SendEmailVerficationCode(email,setbtnLoading,setshowVerificationInputs)


    }

    const handleSubmit = () =>{
      console.log(VerficationCode)

      if(VerficationCode.length < 5){
        ErrorAlert("Error","Verification code is incomplete")
        setbtnLoading(false)
        return
      }

      VerifyCode(VerficationCode,email,setcodeSuccess,setbtnLoading)
    }


    const handleChangePassword = () =>{

      

      if(password == ""){
        ErrorAlert("Error","Please enter password")
        return
      }else if(conPassword == ""){
        ErrorAlert("Error","Please enter confirm password")
        return
      }else if(password != conPassword){
        ErrorAlert("Error","Password do not match")
        return
      }

      ChangeToNewPassword(VerficationCode,email,conPassword,setbtnLoading)


    }

  return (
    <>
        <div className="layout-default ant-layout layout-sign-up">
          <Header>
            <div className="header-col header-btn">
            <img src={logo} alt="LOGO" />
            </div>
          </Header>

          <Content className="p-0 mt-5">

            {showVerificationInputs ? (

            codeSuccess ? (
              <Card
                className="card-signup header-solid h-full ant-card pt-0 mt-3 text-center"
                title={<h1 className="text-center fw-semibold p-0 m-0">Change Password</h1>}
                bordered="false"
              >

              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={handleChangePassword}
                // onFinishFailed={onFinishFailed}
                className="row-col"
              >
        
                <Form.Item
                  name="password"
                >
                  <Input type={showPassword ? "text" : "password"}  value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enter Password" />
                </Form.Item>

                <Form.Item
                  name="conpassword"
                >
                  <Input type={showPassword ? "text" : "password"}  value={conPassword} onChange={(e) => setconPassword(e.target.value)}  placeholder="Enter Confirm Password" />
                </Form.Item>

                <Form.Item>
              <Checkbox 
                checked={showPassword} 
                onChange={(e) => setShowPassword(e.target.checked)}
              >
                Show Password
              </Checkbox>
            </Form.Item>

 

                <Form.Item>
                {btnLoading ? (

                    <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                    >
                    <ButtonSpinner />
                    </Button>

                ) : (
                  <Button
             
                    style={{ width: "80%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Change Password
                  </Button>
                )}
                </Form.Item>
              </Form>
                

               
                
            </Card>
            ) : (
              <Card
                className="card-signup header-solid h-full ant-card pt-0 mt-3 text-center"
                title={<h1 className="text-center fw-semibold p-0 m-0">Verification</h1>}
                bordered="false"
              >
                <p className="m-0 p-0">Verification code sent successfully. Please check your email</p>

                <div className="d-flex justify-content-center my-4">
                    <VerificationInput value={VerficationCode} onChange={(e) => setVerficationCode(e)} length={5} className="mx-auto text-center" />
                </div>
                {btnLoading ? (
                    <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                    >
                    <ButtonSpinner />
                    </Button>
                ) : (
                  <Button
                  onClick={handleSubmit}
                      style={{ width: "80%" }}
                       type="primary"
                    htmlType="submit"
                    >
                      Verify
                    </Button>
                )}
            </Card>
            )

            ) : (
            <Card
              className="card-signup header-solid h-full ant-card pt-0 mt-3"
              title={<h1 className="text-center fw-semibold p-0 m-0">Reset password</h1>}
              bordered="false"
            >

              <p className="text-center font-semibold text-muted">Enter your Aethenos Account email address.</p>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                className="row-col"
              >
          
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input value={email} onChange={(e) => setemail(e.target.value)} placeholder="Enter email" />
                </Form.Item>

 

                <Form.Item>
                {btnLoading ? (

                    <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                    >
                    <ButtonSpinner />
                    </Button>

                ) : (
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Next
                  </Button>
                )}
                </Form.Item>
              </Form>
              <p className="font-semibold text-muted text-center">
                <Link to="/login?sessionTimeout=true&rediect-url=courses" className="font-bold">
                  Return to Login
                </Link>
              </p>
            </Card>
            )}
       
          </Content>
    
        </div>
      </>
  )
}

export default ForgotPassword