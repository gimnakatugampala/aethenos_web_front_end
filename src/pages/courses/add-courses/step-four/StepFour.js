import React ,{useState} from 'react'
import './StepFour.css'
import { Tree } from 'antd';
import { Divider, Radio, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { Input } from 'antd';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const StepFour = ({setcourse_test_video}) => {

    const [URL, setURL] = useState("")

    const onAddVideo = (e) =>{

      if(e.target.files[0].type != "video/mp4"){
        Swal.fire({
          title: 'Upload Field!',
          text: 'Please Add a Video!',
          icon: 'error'
        })

        return
      }
   
        setURL(e.target.value)
       

        let blobURL = window.URL.createObjectURL(e.target.files[0]);

        setcourse_test_video(e.target.files[0])


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

             <video id='add-course-test-video' width={URL != "" ? "320" : "0"} height={URL != "" ? "240" : "0"} autoPlay>
                Your browser does not support the video tag.
            </video>
       
    </div>

    </div>
  )
}

export default StepFour