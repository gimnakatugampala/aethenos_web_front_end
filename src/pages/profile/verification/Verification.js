import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';


import StepOne from './components/StepOne/StepOne';
import StepTwo from './components/StepTwo/StepTwo';
import StepThree from './components/StepThree/StepThree';
import StepFour from './components/StepFour/StepFour';
import { useState } from 'react';

const steps = ['Begin Precess', 'Select Method', 'Upload a Photo ID','Personal Identification'];

const Verification = () => {

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [showCompleted, setshowCompleted] = useState(false)


  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    

  

  return (
    <div className='container'>
        <h3>Verification Process</h3>
    <Card className='p-5'>

    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
     
        if (isStepSkipped(index)) {
          stepProps.completed = false;
        }
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>

    
        <div>
            {activeStep == 0 ? (
                <StepOne />
            ) : activeStep == 1 ? (
                <StepTwo />
            ) : activeStep == 2 ? (
                <StepThree />
            ) : activeStep == 3 && (
                <StepFour showCompleted={showCompleted} />
            )}
        </div>

      <React.Fragment>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />

          <Button className='mt-5'>
              {activeStep == 0 && <Button onClick={handleNext} variant="contained">Begin Process</Button> }  
              {activeStep === steps.length -1 ? <Button onClick={() => setshowCompleted(true)} variant="contained" color='primary'>Submit</Button> : activeStep != 0 && <Button onClick={handleNext} variant="text">Next</Button>}
            </Button>
        </Box>
      </React.Fragment>
    
  </Card>

    </div>
  )
}

export default Verification