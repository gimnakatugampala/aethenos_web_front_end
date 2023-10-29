import React from 'react'
import Webcam from "react-webcam";
import { Button } from '@mui/material';
import { useState } from 'react';
import CheckMark from '../../../../../assets/images/verification/check_mark.gif'


const StepFour = ({showCompleted}) => {

    const [captureIng, setcaptureIng] = useState("")

  return (
    <div className='p-5 m-3 text-center'>
    <div className='row mx-auto'>
      
      <div className="card w-50 mx-auto">
      <div className="card-body">

        {showCompleted ? (
            <>
                <h6><b>Congratulations, you're done!</b></h6>
                <p>Thank you for completing the process! Your submission will be reviewed within the next 2-3 days.</p>

                <img src={CheckMark} />
            </>
        ) : (
            <>
            <h6>Please look into the camera and try removing your glasses</h6> 

{captureIng == "" ? (
<Webcam    
audio={false}
screenshotFormat="image/jpeg"
className='my-2' width="100%" height={250} 
>

{({ getScreenshot }) => (
<Button  onClick={() => {
const imageSrc = getScreenshot()
setcaptureIng(imageSrc)
}} variant="contained">Capture photo</Button>

)}
</Webcam>
   ): (
   <img src={captureIng} />
   )}


       </>
        )}
          
          


       </div>
       </div>
       </div>
</div>
  )
}

export default StepFour