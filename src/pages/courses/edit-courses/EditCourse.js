import './EditCourse.css'
import React, { useState } from 'react'
import StepOne from './step-one/StepOne';
import StepTwo from './step-two/StepTwo';
import StepThree from './step-three/StepThree';
import StepFour from './step-four/StepFour';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card , Space } from 'antd';

const steps = ['Basic Details', 'Keywords Tags', 'Course Image', 'Test Video'];

const EditCourse = () => {
 
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
  
    const isStepOptional = (step) => {
      return step === 0;
    };
  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      let newSkipped = skipped;
      
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
  
      if(activeStep < 3){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
  
  
      // console.log(activeStep)
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleSkip = () => {
      if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
  
    // Click
  
    const handleClick = (e) =>{
      e.preventDefault()
      window.location.href = "/courses"
    }
  
    return (
     <div>
  
  <Card bordered={false}>  
    <Box direction='vertical' sx={{ width: '100%'}}>
          
        <Stepper className='my-2' activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
  
            if (index == 0) {
              labelProps.optional = (
                <Typography variant="caption">Step One</Typography>
              );
            }else if(index == 1){
              labelProps.optional = (
                <Typography variant="caption">Step Two</Typography>
              );
            }else if(index == 2){
              labelProps.optional = (
                <Typography variant="caption">Step Three</Typography>
              );
            }else if(index == 3){
              labelProps.optional = (
                <Typography variant="caption">Step Four</Typography>
              );
            }
  
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
        
          <React.Fragment>
  
  
          <div className='my-5'>
            {activeStep == 0 ? (
              <StepOne />
            ) : activeStep == 1 ? (
              <StepTwo />
            ) : activeStep == 2 ? (
              <StepThree />
            ) : activeStep == 3 && (
              <StepFour />
            ) }
          </div>
  
        
            <Box  sx={{ display: 'flex', flexDirection: 'row', pt: 2}}>
          
              <Button
              className='mt-5'
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
  
              <Button className='mt-5' onClick={handleNext}>
                {activeStep === steps.length -1 ? <Button onClick={handleClick} variant="contained" color='primary'>Update Course</Button> : 'Next'}
              </Button>
  
            </Box>
            
  
          </React.Fragment>
      
   
  
     
      </Box>
      </Card>
     </div>
    )
}

export default EditCourse