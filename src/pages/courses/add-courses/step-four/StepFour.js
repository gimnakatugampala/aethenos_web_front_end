import React ,{useState} from 'react'
import './StepFour.css'
import { Tree } from 'antd';
import { Divider, Radio, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { Input } from 'antd';
import ReactPlayer from 'react-player';



import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const StepFour = ({course_test_video, setcourse_test_video}) => {

    const [URL, setURL] = useState("")

    const onAddVideo = (e) =>{

  


      console.log(e.target.files[0].type)

      if(!e.target.files[0].type.includes("video")){
        Swal.fire({
          title: 'Upload Field!',
          text: 'Please Add a Video!',
          icon: 'error'
        })

        return
      }

   
      
      
      let blobURL = window.URL.createObjectURL(e.target.files[0]);
      
        setURL(blobURL)
        setcourse_test_video(e.target.files[0])


          // document.getElementById("add-course-test-video").url = blobURL;
        
    }

  return (
    <div className='d-flex justify-content-center align-items-center'>

    <div className='text-center'>
        <Typography.Title
            level={3}>
            Upload a test video
       </Typography.Title>

       <p>Please upload a test video to check your quality of filming (Minimum 5 minutes).</p>
       <Input onChange={onAddVideo} accept="video/*" type='file' placeholder="Basic usage" />

       {/* <ReactPlayer width={URL != "" ? "320" : "0"} height={URL != "" ? "240" : "0"}  url={course_test_video} /> */}

       {URL && (
        <div className='m-4'>
          <ReactPlayer  width='380px' height='240px' url={URL} controls />
        </div>
        )}

       {/* width={URL != "" ? "320" : "0"} height={URL != "" ? "240" : "0"} */}
             {/* <video id='add-course-test-video' width={URL != "" ? "320" : "0"} height={URL != "" ? "240" : "0"} autoPlay>
                Your browser does not support the video tag.
            </video> */}
       
    </div>

    </div>
  )
}

export default StepFour