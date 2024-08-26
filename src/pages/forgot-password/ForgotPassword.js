import React, { Component } from "react";
import {
  Menu,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  Layout,
  Row,
  Col,
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
import {
  ChangeToNewPassword,
  SendEmailVerficationCode,
  VerifyCode,
} from "../../api";
import ButtonSpinner from "../../commonFunctions/loaders/Spinner/ButtonSpinner";
import VerificationInput from "react-verification-input";
import toast, { Toaster } from "react-hot-toast";
import PasswordChecklist from "react-password-checklist";
import ReactCodeInput from "react-code-input"



const inputStyle = {
  fontFamily: 'Arial, sans-serif',
  borderRadius: '8px',
  border: '2px solid #d9d9d9',
  width: '50px',
  height: '50px',
  fontSize: '20px',
  textAlign: 'center',
  margin: '0 5px',
  outline: 'none',
  transition: 'border-color 0.3s, box-shadow 0.3s',
};

const inputFocusStyle = {
  borderColor: '#40a9ff',
  boxShadow: '0 0 5px rgba(64, 169, 255, 0.5)',
};


const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const ForgotPassword = () => {
  const [email, setemail] = useState("");

  const [btnLoading, setbtnLoading] = useState(false);
  const [showVerificationInputs, setshowVerificationInputs] = useState(false);

  const [codeSuccess, setcodeSuccess] = useState(false);

  const [VerficationCode, setVerficationCode] = useState("");

  const [password, setpassword] = useState("");
  const [conPassword, setconPassword] = useState("");
  const [isValidPassword, setisValidPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  // ========== Submit ==========
  const onFinish = () => {
    console.log(email);

    setbtnLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      // console.log("Invalid email:", email);
      setbtnLoading(false);
      ErrorAlert("Error", "Please enter a valid email");
      return;
    }

    SendEmailVerficationCode(
      email,
      toast,
      setbtnLoading,
      setshowVerificationInputs
    );
  };

  const handleSubmit = () => {
    console.log(VerficationCode);

    if (VerficationCode.length < 5) {
      ErrorAlert("Error", "Verification code is incomplete");
      setbtnLoading(false);
      return;
    }

    VerifyCode(VerficationCode, email, setcodeSuccess, setbtnLoading);
  };

  const handleChangePassword = () => {
    if (password == "") {
      ErrorAlert("Error", "Please enter password");
      return;
    } else if (conPassword == "") {
      ErrorAlert("Error", "Please enter confirm password");
      return;
    } else if (password != conPassword) {
      ErrorAlert("Error", "Password do not match");
      return;
    }

    if (isValidPassword == false) {
      ErrorAlert("Error", "Your Password should match the checklist");
      return;
    }

    ChangeToNewPassword(VerficationCode, email, conPassword, setbtnLoading);
  };

  return (
    <>
      <Card>
        <Toaster />
        <Layout className="">
          <Content className="signin">
            <Row gutter={[24, 0]} justify="space-around">
              {/* <Header>
            <div className="header-col header-btn">
            <img src={logo} alt="LOGO" />
            </div>
          </Header> */}
              <Col
                className="main-sign-in"
                // xs={{ span: 24, offset: 0 }}
                // lg={{ span: 6, offset: 2 }}
                // md={{ span: 12 }}
              >
                <Content className="signin">
                  {showVerificationInputs ? (
                    codeSuccess ? (
                      <div bordered="false">
                        <div className="main-sign-in-logo">
                          <img
                            width="150"
                            height={"100%"}
                            src={logo}
                            alt="LOGO"
                          />
                          {/* <span>Aethenos</span> */}
                        </div>

                        <Title className="main-sign-in-title">
                          Reset Password
                        </Title>

                        <Form
                          name="basic"
                          initialValues={{ remember: true }}
                          onFinish={handleChangePassword}
                          // onFinishFailed={onFinishFailed}
                          className="row-col"
                        >
                          <Form.Item name="password">
                            <Input
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setpassword(e.target.value)}
                              placeholder="Enter Password"
                            />
                          </Form.Item>

                          <Form.Item name="conpassword">
                            <Input
                              type={showPassword ? "text" : "password"}
                              value={conPassword}
                              onChange={(e) => setconPassword(e.target.value)}
                              placeholder="Enter Confirm Password"
                            />
                          </Form.Item>

                          <Form.Item>
                            <Checkbox
                              checked={showPassword}
                              onChange={(e) =>
                                setShowPassword(e.target.checked)
                              }
                            >
                              Show Password
                            </Checkbox>
                          </Form.Item>

                          <PasswordChecklist
                            rules={[
                              "minLength",
                              "specialChar",
                              "number",
                              "capital",
                              "match",
                            ]}
                            minLength={5}
                            value={password}
                            valueAgain={conPassword}
                            onChange={(isValid) => {
                              setisValidPassword(isValid);
                            }}
                          />

                          <Form.Item>
                            {btnLoading ? (
                              <Button
                                style={{ width: "100%" }}
                                type="primary"
                                htmlType="submit"
                                className="sign-in-button mt-3"
                              >
                                <ButtonSpinner />
                              </Button>
                            ) : (
                              <Button
                                style={{ width: "100%" }}
                                type="primary"
                                htmlType="submit"
                                className="sign-in-button mt-3"
                              >
                                Change Password
                              </Button>
                            )}
                          </Form.Item>
                        </Form>
                      </div>
                    ) : (
                      <div className="" bordered="false">
                        <div className="main-sign-in-logo">
                          <img
                            width="150"
                            height={"100%"}
                            src={logo}
                            alt="LOGO"
                          />
                          {/* <span>Aethenos</span> */}
                        </div>

                        <Title className="mb-15 main-sign-in-title">
                          Reset Password
                        </Title>
                        <p className="m-0 p-0">
                          Verification code sent successfully. Please check your
                          email
                        </p>

                        <div className="d-flex justify-content-center my-4">
                          {/* <VerificationInput
                            value={VerficationCode}
                            onChange={(e) => setVerficationCode(e)}
                            length={5}
                            className="mx-auto text-center"
                          /> */}

<ReactCodeInput  inputStyle={inputStyle}
        inputFocusStyle={inputFocusStyle} value={VerficationCode}
                            onChange={(e) => setVerficationCode(e)}   className="mx-auto text-center" type='number' fields={5} />
                        </div>
                        {btnLoading ? (
                          <Button
                            style={{ width: "100%" }}
                            type="primary"
                            htmlType="submit"
                            className="sign-in-button"
                          >
                            <ButtonSpinner />
                          </Button>
                        ) : (
                          <Button
                            onClick={handleSubmit}
                            style={{ width: "100%" }}
                            type="primary"
                            htmlType="submit"
                            className="sign-in-button"
                          >
                            Verify
                          </Button>
                        )}
                      </div>
                    )
                  ) : (
                    <div>
                      <div className="main-sign-in-logo">
                        <img
                          width="150"
                          height={"100%"}
                          src={logo}
                          alt="LOGO"
                        />
                        {/* <span>Aethenos</span> */}
                      </div>

                      <Title className="ant-typography mb-15 main-sign-in-title">
                        Reset Password
                      </Title>

                      <p className="text-center font-semibold text-muted mb-4 ">
                        Enter your Aethenos Account email address.
                      </p>
                      <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                      >
                        <Form.Item
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Please input your email!",
                            },
                          ]}
                        >
                          <Input
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            placeholder="Enter email"
                          />
                        </Form.Item>

                        <Form.Item>
                          {btnLoading ? (
                            <Button
                              style={{ width: "100%" }}
                              type="primary"
                              htmlType="submit"
                              className="sign-in-button"
                            >
                              <ButtonSpinner />
                            </Button>
                          ) : (
                            <Button
                              style={{ width: "100%" }}
                              type="primary"
                              htmlType="submit"
                              className="sign-in-button"
                            >
                              Next
                            </Button>
                          )}
                        </Form.Item>
                      </Form>

                      <p className="font-semibold text-muted text-center">
                        <Link
                          to="/login?sessionTimeout=true&rediect-url=courses"
                          className="font-bold "
                        >
                          Return to Login
                        </Link>
                      </p>
                    </div>
                  )}
                </Content>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Card>
    </>
  );
};

export default ForgotPassword;
