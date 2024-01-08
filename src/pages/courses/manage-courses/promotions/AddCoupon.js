import React, { useState } from 'react'
import { Card  } from 'antd';
import Radio from '@mui/material/Radio';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const AddCoupon = ({code}) => {

    const [selectedValue, setSelectedValue] = React.useState('free-coupon');
    const [start_date, setstart_date] = useState(new Date())

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

    const onChange = (e) =>{
        console.log(e)
    }

  return (
    <div className='col-md-8'>
    <Card className="py-2 my-2"> 

    <h5 className='p-2'><b>Create new Coupon</b></h5>

    <div className='row'>

        <div className='col-md-6'>
        <Card className='border border-dark border-3 h-100'>
            <Radio
                checked={selectedValue === 'free-coupon'}
                onChange={handleChange}
                value="free-coupon"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'A' }}
            />
            <span><b>Free Coupon</b></span>

            <div className='container'>
                <p>Creates a limited-time offer that allows up to 1000 students to enroll in your course for free.</p>

                <p>Expiry: 1000 redemptions or 7 days after activation, whichever comes first.</p>
            </div>

        </Card>
        </div>

        <div className='col-md-6'>
        <Card className='border border-dark border-3 h-100'>
            <Radio
                checked={selectedValue === 'discount-coupon'}
                onChange={handleChange}
                value="discount-coupon"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'B' }}
            />
            <span><b>Discount Coupon</b></span>

            <div className='container'>
                <p>Creates a 30 day offer for a price you decide on with unlimited redemptions.</p>

                <p>Expiry: 30 days after activation</p>
            </div>

            </Card>
            </div>

    </div>

    {selectedValue == "free-coupon" && (
    <div className='container'>
    <div className='my-5'>
        <h6><b>Start date:</b> <DateTimePicker onChange={setstart_date} value={start_date} /></h6>
        <h6><b>End date:</b> <DateTimePicker onChange={setstart_date} value={start_date} /></h6>
    </div>

    
      <Form.Group className='d-flex'  controlId="exampleForm.ControlInput1">
        <Form.Label><b>Enter coupon code (optional)</b></Form.Label>
        <Form.Control type="text" placeholder="Enter Coupon" />
      </Form.Group>

      <p>The coupon code must be between 6 - 20 characters, only UPPERCASE LETTERS (A-Z), numbers (0-9) and these symbols can be used: periods (.), dashes (-), and underscores (_). Coupon codes with lowercase or other symbols cannot be created. A coupon code can only be used once per course.</p>


      <div className='my-2'>
        <Button variant='contained'>Create Coupon</Button>
     </div>

    </div>
    )}

   
 
    
  
    </Card>
    </div>
  )
}

export default AddCoupon