import React from 'react'
import Alert from 'react-bootstrap/Alert';
import InfoIcon from '@mui/icons-material/Info';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Payouts = () => {
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

        <div className='d-flex justify-content-between'>

        <div>
            <img width={100} src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png' />
        </div>

        <div>
        <span className='mx-3'>Not Connected</span>
        <button type="button" className="btn btn-secondary"><i className="fa-brands fa-paypal fa-x m-1"></i> Log in with Paypal</button>
        </div>

        </div>
        

        </CardContent>
  
     </Card>
    </div>
  )
}

export default Payouts