import React ,{useState} from 'react'
import './StepFour.css'
import { Tree } from 'antd';
import { Divider, Radio, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { Input } from 'antd';
import { FILE_PATH } from '../../../../commonFunctions/FilePaths';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


const StepFour = ({preview_video, setcourse_video}) => {

    const [URL, setURL] = useState("")

    const onAddVideo = (e) => {
      const file = e.target.files[0];
    
      // Create a URL for the video file
      const blobURL = window.URL.createObjectURL(file);
    
      // Create a video element to check the duration
      const video = document.createElement('video');
      video.preload = 'metadata';
    
      video.onloadedmetadata = function () {
        window.URL.revokeObjectURL(video.src); // Clean up after getting metadata
    
        const duration = video.duration;
        const minDuration = 5 * 60; // 5 minutes in seconds
    
        if (duration < minDuration) {
          Swal.fire({
            title: 'Upload Failed!',
            text: 'Video must be at least 5 minutes long.',
            icon: 'error',
          });
          return;
        }
    
        // If the video duration is sufficient, proceed with setting the video file and blob URL
        setcourse_video(file);
        document.getElementById("add-course-test-video").src = blobURL;
      };
    
      video.src = blobURL;
    };
    

  return (
    <div className='d-flex justify-content-center align-items-center'>

    <div className='text-center'>
        <Typography.Title
            level={3}>
            Upload a Test Video
       </Typography.Title>

       <p>Please Upload a Test Video to See Your Quality of Filming.</p>
       <Input onChange={onAddVideo} type='file' accept="video/*" placeholder="Basic usage" />

             <video className='mt-3' id='add-course-test-video' width={240} src={preview_video == "" ? "" : `${FILE_PATH}${preview_video}`} autoPlay>
                Your browser does not support the video tag.
            </video>
       
    </div>

    </div>
  )
}

export default StepFour