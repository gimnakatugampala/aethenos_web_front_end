import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Typography, Button as AntButton } from "antd";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import validateEmail from "../commonFunctions/emailValid";
import { LoginInstructor } from "../api";
import signinbg from "../assets/images/img-signin.jpg";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import MainLoader from "../commonFunctions/loaders/MainLoader/MainLoader";
import logo from "../assets/images/utils/aethenos_logo.jpg";
import { Card } from "react-bootstrap";

const { Title } = Typography;
const { Content } = Layout;

const SignIn = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get Session Details
    const sessionTimeout = new URLSearchParams(window.location.search).get(
      "sessionTimeout"
    );
    if (sessionTimeout) {
      setShow(true);
    } else {
      setShow(false);
      window.location.href = "/courses";
    }
  }, []);

  const onHandleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      Swal.fire({
        title: "Empty Field!",
        text: "Please enter your email",
        icon: "error",
      });
    } else if (!validateEmail(email)) {
      Swal.fire({
        title: "Invalid Email!",
        text: "Please enter a valid email", 
        icon: "error",
      });
    } else if (password === "") {
      Swal.fire({
        title: "Empty Field!",
        text: "Please enter your password",
        icon: "error",
      });
    } else {
      setLoading(true);
      LoginInstructor(
        email,
        password,
        new URLSearchParams(window.location.search).get("rediect-url"),
        setLoading
      );
    }
  };

  return (
    <>
    {/* <Card> */}
      <Layout className="" >
        {loading && <MainLoader />}

        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              className="main-sign-in"
              // xs={{ span: 24, offset: 0 }}
              // lg={{ span: 6, offset: 2 }}
              // md={{ span: 12 }}
            >
              <div className="main-sign-in-logo">
                <img width="150" height={"100%"} src={logo} alt="LOGO" />
                {/* <span>Aethenos</span> */}
              </div>

              <Title className="mb-15 main-sign-in-title">Sign In</Title>
              <Title
                className="font-regular text-muted"
                level={5}
                align="center"
              >
                Enter your email and password to sign in as instructor
              </Title>

              <Form onSubmit={onHandleSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="name@example.com"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Text
                      onClick={() => setShowPassword(!showPassword)}
                      id="basic-addon2"
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? (
                        <i className="fa-solid fa-eye-slash"></i>
                      ) : (
                        <i className="fa-solid fa-eye"></i>
                      )}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3 font-bold " controlId="formPassword">
                  <a href="/forgot-password">Forgot Password ?</a>
                </Form.Group>

                <AntButton
                  type="primary"
                  htmlType="submit"
                  block
                  className="sign-in-button"
                >
                  Login
                </AntButton>
              </Form>
            </Col>
            {/* <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col> */}
          </Row>
        </Content>
      </Layout>
      {/* </Card> */}
    </>
  );
};

export default SignIn;
