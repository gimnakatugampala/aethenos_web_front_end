import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Instruction from "./Instructions";
import SubmissionForm from "./SubmissionForm";
import Instructor from "./Instructor";
import Feedback from "./Feedback";
import Card from '@mui/material/Card';

import Inputs from "./Inputs";

const steps = [
  "Instruction",
  "Submission",
  "Instructor Example",
  "Give Feedback",
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
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

   


    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log(activeStep)
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    // if (!isStepOptional(activeStep)) {
    //   // You probably want to guard against something like this,
    //   // it should never occur unless someone's actively trying to break something.
    //   throw new Error("You can't skip a step that isn't optional.");
    // }
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped((prevSkipped) => {
    //   const newSkipped = new Set(prevSkipped.values());
    //   newSkipped.add(activeStep);
    //   return newSkipped;
    // });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <Typography className="mb-4" variant="h4" gutterBottom>
             Assignments
        </Typography>
    
    <Card className="p-4">
      
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
            }
            // if (isStepSkipped(index)) {
            // stepProps.completed = false;
            // }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <div className="d-flex justify-content-center align-items-center text-center my-4">
              <div>
             <Typography  variant="h5" gutterBottom>
             All steps completed - you&apos;re finished
            </Typography>

              <Typography  variant="body2" gutterBottom>
             The Assignment Created Proccess is Done
            </Typography>
            </div>

            </div>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
     
        ) : (
          <React.Fragment>
            <div className="p-2">{activeStep === 0 && <Instruction />}</div>
            <div className="p-2">{activeStep === 1 && <SubmissionForm />}</div>
            <div className="p-2">{activeStep === 2 && <Instructor />}</div>
            <div className="p-2">{activeStep === 3 && <Feedback />}</div>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length  ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
    
    </Card>
    </div>
  );
}
