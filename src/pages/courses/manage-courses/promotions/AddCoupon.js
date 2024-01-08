import React from 'react'
import { Card  } from 'antd';
import Radio from '@mui/material/Radio';

const AddCoupon = ({code}) => {

    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

  return (
    <div className='col-md-8'>
    <Card className="py-2 my-2"> 

    <div className='row'>

        <div className='col-md-6'>
        <Card className='border border-dark border-3 h-100'>
            <Radio
                checked={selectedValue === 'a'}
                onChange={handleChange}
                value="a"
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
                checked={selectedValue === 'b'}
                onChange={handleChange}
                value="b"
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

 

  
    </Card>
    </div>
  )
}

export default AddCoupon