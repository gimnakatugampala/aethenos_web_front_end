import React, { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import InfoIcon from '@mui/icons-material/Info';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AddWalletDetails, GetPaypalProfileDetails, GetWalletDetails } from '../../../api';
import Form from 'react-bootstrap/Form';
import ErrorAlert from '../../../commonFunctions/Alerts/ErrorAlert';


const Payouts = () => {

  const [paypalEmail, setpaypalEmail] = useState("")
  const [paypalUsername, setpaypalUsername] = useState("")

  const [payoneerEmail, setpayoneerEmail] = useState("")
  const [payoneerUsername, setpayoneerUsername] = useState("")

  const handleConnectPaypal = () =>{
    console.log("Paypal")

    if(paypalEmail == ""){
      ErrorAlert("Empty Field","Please Fill Email")
      return
    }

    if(paypalUsername == ""){
      ErrorAlert("Empty Field","Please Fill Username")
      return
    }

    AddWalletDetails(paypalEmail,paypalUsername,payoneerEmail,payoneerUsername)

    console.log(paypalEmail)
    console.log(paypalUsername)
  }

  const handleConnectPayoneer = () =>{
    console.log("Payoneer")

    if(payoneerEmail == ""){
      ErrorAlert("Empty Field","Please Fill Email")
      return
    }

    if(payoneerUsername == ""){
      ErrorAlert("Empty Field","Please Fill Username")
      return
    }

    AddWalletDetails(paypalEmail,paypalUsername,payoneerEmail,payoneerUsername)

    console.log(payoneerEmail)
    console.log(payoneerUsername)

  }

  useEffect(() => {
    GetWalletDetails(setpaypalEmail,setpaypalUsername,setpayoneerEmail,setpayoneerUsername)
  }, [])
  
  

  return (
    <div className='container'>
        <h3>Payment Method</h3>

        <Alert variant="secondary">
            <div className='d-flex align-items-center'>
                <InfoIcon className='mr-2' />
                <p className='m-0 p-0'>Connecting to a new payout method may take a few days. You won't receive payments to the new linked account until its status is approved.</p>
            </div>
        </Alert>

        <Card>
        <CardContent>

          <div className='row'>

              <div className='col-md-12 my-3'>
              <div className='d-flex justify-content-between'>
                    <div>
                        <img width={100} src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png' />
                    </div>

                    <div className='row'>
                      <div className='col-md-5'>
                      <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Control value={paypalEmail} onChange={(e) => setpaypalEmail(e.target.value)}  type="email" placeholder="Enter Paypal Email" />
                        </Form.Group>
                      </Form>
                      </div>
                      <div className='col-md-5'>
                      <Form>
                        <Form.Group  controlId="exampleForm.ControlInput1">
                          <Form.Control value={paypalUsername} onChange={(e) => setpaypalUsername(e.target.value)}  type="text" placeholder="Enter Paypal Username" />
                        </Form.Group>
                      </Form>

                      </div>
                      <div className='col-md-2'>
                    <button onClick={handleConnectPaypal} type="button" className="btn btn-secondary">
                      Connect</button>
                    </div>

                    </div>

                    </div>

              </div>

              <div className='col-md-12 my-3'>
              <div className='d-flex justify-content-between'>
                    <div>
                        <img width={100} src='/images/payoneer.png' />
                    </div>

                    <div className='row'>
                      <div className='col-md-5'>
                      <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Control value={payoneerEmail} onChange={(e) => setpayoneerEmail(e.target.value)} type="email" placeholder="Enter Payoneer Email" />
                        </Form.Group>
                      </Form>
                      </div>
                      <div className='col-md-5'>
                      <Form>
                        <Form.Group  controlId="exampleForm.ControlInput1">
                          <Form.Control value={payoneerUsername} onChange={(e) => setpayoneerUsername(e.target.value)}  type="text" placeholder="Enter Payoneer Email" />
                        </Form.Group>
                      </Form>

                      </div>
                      <div className='col-md-2'>
                    <button onClick={handleConnectPayoneer} type="button" className="btn btn-secondary">
                      Connect</button>
                    </div>

                    </div>

                    </div>

              </div>
          </div>

       
        

        </CardContent>
  
     </Card>
    </div>
  )
}

export default Payouts