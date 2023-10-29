import React from 'react'
import { Button } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const StepThree = () => {
  return (
    <div className='p-5 m-3 text-center'>
         <div className='row mx-auto'>
           
           <div className="card w-50 mx-auto">
           <div className="card-body">
           <h5><b>Front of drivers license</b></h5>
                <p>Take a clear photo of the front of your driver license.</p> 
                
                <div className='bg-light my-2'>

                <img height="150" src='https://icons.veryicon.com/png/o/business/business-office/employees-card.png' />
                </div>

                 <Button className='w-100' variant="contained"><CameraAltIcon /></Button>
                 <button type="button" className="btn btn-outline-danger w-100 my-2">Upload a photo</button>
                 {/* <Button className='w-100' variant="Outlined">Upload a photo</Button> */}


            </div>
            </div>
            </div>
    </div>
  )
}

export default StepThree