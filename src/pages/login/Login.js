import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { LoginInstructor } from '../../api';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, Progress } from 'antd';
import 'sweetalert2/src/sweetalert2.scss'
import validateEmail from '../../commonFunctions/emailValid';

const Login = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
  
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
  
    const [showPassword, setshowPassword] = useState(false)

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
    
          LoginInstructor(email, password,new URLSearchParams(window.location.search).get("rediect-url"))
    
        }
    
      }
    
    
      


  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Instructor SignIn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

      </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={onhandleSubmit}>
            SignIn
          </Button>
        </Modal.Footer>

      </Modal>

  )
}

export default Login