import React, { useRef, useState } from 'react'

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
import { addCourse } from '../../../api';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import MainLoader from '../../../commonFunctions/loaders/MainLoader/MainLoader';
import 'sweetalert2/src/sweetalert2.scss'
import { uploadFileInChunks } from '../../../commonFunctions/uploadFileInChunks';
import ErrorAlert from '../../../commonFunctions/Alerts/ErrorAlert';

const steps = ['Basic Details', 'Keywords Tags', 'Course Image', 'Test Video'];



const AddCourses = () => {


  // File Upload
  let fieUploadUUID = Date.now().toString();
  let uploadType = "test-video"


  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [course_title, setcourse_title] = useState("")
  const [course_category, setcourse_category] = useState("")

  const [course_keywords, setcourse_keywords] = useState([])

  const [course_image, setcourse_image] = useState("")

  const [course_test_video, setcourse_test_video] = useState("")

  const [loading, setloading] = useState(false)


  const isStepOptional = (step) => {
    return step === 0;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;

    if(activeStep == 0){

      if(course_title == ""){

        Swal.fire({
          title: 'Empty Field!',
          text: 'Please Fill Course Title!',
          icon: 'error'
        })

        return

      }else if(course_category == ""){

        Swal.fire({
          title: 'Empty Field!',
          text: 'Please Select a Course Category!',
          icon: 'error'
        })

        return

      }

    }else if(activeStep == 1){

      if(course_keywords.length != 5){
        Swal.fire({
          title: ' Keywords Error!',
          text: 'Please enter a minimum of 5 Keywords!',
          icon: 'error'
        })

        return

      }

    }else if(activeStep == 2){

      if(course_image == ""){
        Swal.fire({
          title: ' Image Error!',
          text: 'Please Upload an Image!',
          icon: 'error'
        })

        return

      }
    }else if(activeStep == 3){

      if(course_test_video == ""){
        Swal.fire({
          title: ' Video Error!',
          text: 'Please Upload a Video!',
          icon: 'error'
        })

        return

      }

   
    }
    
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

 
  const [uploading, setUploading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const progressBarRef = useRef(null);


  const handleClick = (e) =>{
    e.preventDefault()

    setloading(true)

    if (course_test_video != "") {
      const maxSize = 3 * 1024 * 1024 * 1024;
      if (course_test_video.size > maxSize) {
        setVideoFile(null);
        setloading(false)
        ErrorAlert('Error','File size exceeds 3.0GB.');
        return;
      } else {
        setVideoFile(course_test_video);
        uploadFileInChunks(
          fieUploadUUID,
          uploadType,
          course_test_video,
          updateProgressBar,
          setUploading
        );
      }
    } else {
      ErrorAlert('Error', 'No file selected.');
      setloading(false)
    }

   

    // addCourse(
    //   course_title,
    //   course_category,
    //   course_keywords,
    //   course_image,
    //   course_test_video,
    //   setloading
    // )

    // console.log(course_title)
    // console.log(course_category)
    // console.log(course_keywords)
    // console.log(course_image) 
    console.log(course_test_video)
  }

  const updateProgressBar = (progress) => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = progress + '%';
      progressBarRef.current.textContent = progress + '%';
    }

    if(progress == 100){
        addCourse(
      fieUploadUUID,
      course_title,
      course_category,
      course_keywords,
      course_image,
      course_test_video,
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
                <StepOne setcourse_category={setcourse_category} setcourse_title={setcourse_title} />
              ) : activeStep == 1 ? (
                <StepTwo course_keywords={course_keywords} setcourse_keywords={setcourse_keywords} />
              ) : activeStep == 2 ? (
                <StepThree setcourse_image={setcourse_image} />
              ) : activeStep == 3 && (
                <StepFour course_test_video={course_test_video} setcourse_test_video={setcourse_test_video} />
              ) }
            </div>

          
              <Box  sx={{ display: 'flex',flex: '1 1 auto'}}>
          
                <Button
                variant="contained"
                  className='mt-5 p-0'
                  color="primary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  // sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                <Button className='mt-5' onClick={handleNext}>
                  {activeStep === steps.length -1 ? <Button onClick={handleClick} variant="contained" color='primary'>Send For Approval</Button> : <Button variant="contained" color='primary'>Next</Button>}
                </Button>

              </Box>
              

            </React.Fragment>
        
    

      
        </Box>
    </Card>
    

    


   </div>
  )
}

export default AddCourses