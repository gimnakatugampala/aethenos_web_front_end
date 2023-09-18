import React ,{useState} from 'react'
import './StepFour.css'
import { Tree } from 'antd';
import { Divider, Radio, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { Input } from 'antd';







const StepFour = () => {

    const [URL, setURL] = useState("")

    const onAddVideo = (e) =>{
        // console.log(e.target.files[0])
        setURL(e.target.value)
        // console.log(e)

        let blobURL = window.URL.createObjectURL(e.target.files[0]);
        document.getElementById("add-course-test-video").src = blobURL;
    }

  return (
    <div className='d-flex justify-content-center align-items-center'>

    <div className='my-5 text-center'>
        <Typography.Title
            level={3}>
            Upload a Test Video
       </Typography.Title>

       <p>Please Upload a Test Video to See Your Quality of Filming.</p>


     <Input onChange={onAddVideo} type='file' placeholder="Basic usage" />

           
             <video id='add-course-test-video' width="320" height="240" autoPlay>
                Your browser does not support the video tag.
            </video>
  

    </div>

    </div>
  )
}

export default StepFour