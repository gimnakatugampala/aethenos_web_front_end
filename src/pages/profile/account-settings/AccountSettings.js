import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Button from '@mui/material/Button';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ErrorAlert from '../../../commonFunctions/Alerts/ErrorAlert';
import PasswordChecklist from "react-password-checklist"
import { PasswordReset } from '../../../api';


const AccountSettings = () => {


    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isValidPassword, setisValidPassword] = useState(false)

    const [currentPassword, setcurrentPassword] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
  
    const toggleCurrentPasswordVisibility = () => {
      setCurrentPasswordVisible(!currentPasswordVisible);
    };
  
    const toggleNewPasswordVisibility = () => {
      setNewPasswordVisible(!newPasswordVisible);
    };
  
    const toggleConfirmPasswordVisibility = () => {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(newPassword)
        console.log(confirmPassword)

        if(currentPassword == ""){
            ErrorAlert("Empty field","Please enter the current password")
            return
        }

        if(newPassword == ""){
            ErrorAlert("Empty field","Please enter new password")
            return
        }

        if(confirmPassword == ""){
            ErrorAlert("Empty field","Please enter confirm password")
            return
        }

        if(newPassword != confirmPassword){
            ErrorAlert("Password mismatch","The new passwords do not match")
            return
        }

        if(isValidPassword == false){
            ErrorAlert("Password Error","Your password is must be in the given criteria")
            return
        }


        PasswordReset(confirmPassword,currentPassword)

    }

  return (
    <div className='container mb-5'>
        <h3>Account settings</h3>

        <Tabs
        defaultActiveKey="password-reset"
        id="uncontrolled-tab-example"
        className="my-3"
        >
        

          <Tab eventKey="password-reset" title="Password Reset">

            <div className='row mt-5 mx-auto  text-center'>
                <div className='col-md-8 text-center'>
                <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
        value={currentPassword}
          type={currentPasswordVisible ? "text" : "password"}
          placeholder="Current Password"
          aria-label="Current Password"
          aria-describedby="current-password-addon"
          onChange={(e) => setcurrentPassword(e.target.value)}
        />
        <InputGroup.Text id="current-password-addon" onClick={toggleCurrentPasswordVisibility}>
          {currentPasswordVisible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
        </InputGroup.Text>
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
        value={newPassword}
          type={newPasswordVisible ? "text" : "password"}
          placeholder="New Password"
          aria-label="New Password"
          aria-describedby="new-password-addon"
          onChange={(e) => setnewPassword(e.target.value)}
        />
        <InputGroup.Text id="new-password-addon" onClick={toggleNewPasswordVisibility}>
          {newPasswordVisible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
        </InputGroup.Text>
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
        value={confirmPassword}
          type={confirmPasswordVisible ? "text" : "password"}
          placeholder="Confirm Password"
          aria-label="Confirm Password"
          aria-describedby="confirm-password-addon"
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
        <InputGroup.Text id="confirm-password-addon" onClick={toggleConfirmPasswordVisibility}>
          {confirmPasswordVisible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
        </InputGroup.Text>
      </InputGroup>

      <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={5}
				value={newPassword}
				valueAgain={confirmPassword}
				onChange={(isValid) => {
                    console.log(isValid)
                    setisValidPassword(isValid)
                }}
			/>

      <div className='col-md-5'>
        <Button type='submit' variant="contained">Change Password</Button>
      </div>
    </Form>

                </div>
            </div>

        


          </Tab>

         
    </Tabs>

    </div>
  )
}

export default AccountSettings