import './EditCourse.css'
import React, { useEffect, useRef, useState } from 'react'
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
import { getEditCourse } from '../../../api';
import { EditCourses } from '../../../api';
import { uploadFileInChunks } from '../../../commonFunctions/uploadFileInChunks';
import ErrorAlert from '../../../commonFunctions/Alerts/ErrorAlert';
import MainLoader from '../../../commonFunctions/loaders/MainLoader/MainLoader';

const steps = ['Basic Details', 'Keywords Tags', 'Course Image', 'Test Video'];

const EditCourse = () => {

    // File Upload
    let fieUploadUUID = Date.now().toString();


  const [course_title, setcourse_title] = useState("")
  const [course_cat, setcourse_cat] = useState("")

  const [keywords, setkeywords] = useState([])

  const [preview_img, setpreview_img] = useState('')
  const [course_img, setcourse_img] = useState('')

  const [preview_video, setpreview_video] = useState('')
  const [course_video, setcourse_video] = useState('')


  const [loading, setloading] = useState(false)





  useEffect(() => {
    
    // console.log(new URLSearchParams(window.location.search).get("code"))

    getEditCourse(
      new URLSearchParams(window.location.search).get("code"),
      setcourse_title,
      setcourse_cat,
      setkeywords,
      setpreview_img,
      setpreview_video
      )
  
  }, [])
  
 
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


    const [uploading, setUploading] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const progressBarRef = useRef(null);
  
    // Click
    const handleClick = (e) =>{
      e.preventDefault()

      // EditCourses(
      //   new URLSearchParams(window.location.search).get("code"),
      //   course_title,
      //   keywords,
      //   course_cat,
      //   course_img,
      //   course_video
      //   )

      setloading(true)

      if(course_video == ""){

        // Do not run the upload video
        EditCourses(
        new URLSearchParams(window.location.search).get("code"),
        fieUploadUUID,
        course_title,
        keywords,
        course_cat,
        course_img,
        course_video,
        setloading
        )

      }else{
        // Run the upload
        const maxSize = 3 * 1024 * 1024 * 1024;
        if (course_video.size > maxSize) {
          setVideoFile(null);
          setloading(false)
          ErrorAlert('Error','File size exceeds 3.0GB.');
          return;
        } else {
          setVideoFile(course_video);
          uploadFileInChunks(
            fieUploadUUID,
            course_video,
            updateProgressBar,
            setUploading
          );
        }
      }

      console.log(preview_video)
      console.log(course_video)
      console.log(course_img)

      // window.location.href = "/courses"
    }

    const updateProgressBar = (progress) => {
      if (progressBarRef.current) {
        progressBarRef.current.style.width = progress + '%';
        progressBarRef.current.textContent = progress + '%';
      }
  
      if(progress == 100){
        EditCourses(
          new URLSearchParams(window.location.search).get("code"),
          fieUploadUUID,
          course_title,
          keywords,
          course_cat,
          course_img,
          course_video,
          setloading
          )
      }
  
      console.log(progress)
    };
  
    return (
     <div className='all-courses-container'>

{loading && <MainLoader /> }
  
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
              <StepOne course_cat={course_cat} setcourse_cat={setcourse_cat} course_title={course_title} setcourse_title={setcourse_title} />
            ) : activeStep == 1 ? (
              <StepTwo keywords={keywords} setkeywords={setkeywords} />
            ) : activeStep == 2 ? (
              <StepThree preview_img={preview_img} setpreview_img={setpreview_img} setcourse_img={setcourse_img} />
            ) : activeStep == 3 && (
              <StepFour preview_video={preview_video} setcourse_video={setcourse_video} />
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