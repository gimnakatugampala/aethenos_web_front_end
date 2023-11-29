import React ,{useState} from 'react'
import './StepFour.css'
import { Tree } from 'antd';
import { Divider, Radio, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { Input } from 'antd';


const StepFour = ({preview_video, setcourse_video}) => {

    const [URL, setURL] = useState("")

    const onAddVideo = (e) =>{
        setcourse_video(e.target.files[0])
      
        let blobURL = window.URL.createObjectURL(e.target.files[0]);

        document.getElementById("add-course-test-video").src = blobURL;
        
    }

  return (
    <div className='d-flex justify-content-center align-items-center'>

    <div className='text-center'>
        <Typography.Title
            level={3}>
            Upload a Test Video
       </Typography.Title>

       <p>Please Upload a Test Video to See Your Quality of Filming.</p>
       <Input onChange={onAddVideo} type='file' placeholder="Basic usage" />

             <video id='add-course-test-video' width={240} src={preview_video == "" ? "" : preview_video} autoPlay>
                Your browser does not support the video tag.
            </video>
       
    </div>

    </div>
  )
}

export default StepFour