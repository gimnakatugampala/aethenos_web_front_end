import React, { useState } from 'react'
import { Tree } from 'antd';
import { Divider, Radio, Typography } from 'antd';
import ImageUploading from 'react-images-uploading';
import { PlusOutlined } from '@ant-design/icons';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import { Modal, Upload } from 'antd';
import { FILE_PATH } from '../../../../commonFunctions/FilePaths';

import './StepThree.css'


const StepThree = ({preview_img,setpreview_img,setcourse_img}) => {

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setpreview_img(imageList[0].data_url);
    setcourse_img(imageList[0].file)
  };



  return (
    <div className='stepthree-container text-center'>
    <div>

    <div className='my-5'>
        <Typography.Title
        level={3}>
        Upload Course Image
      </Typography.Title>

      <p>You Can Always Change It.</p>
      </div>

      <div className='pt-3'>
            <img
            className='mb-3'
                 width={200}
                 height={200}
                 id
                src={ preview_img === "" 
                  ? 'https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg' 
                  : preview_img.includes('data:image/')
                  ? preview_img
                  : `${FILE_PATH}${preview_img}`}
              />

<ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper  border border-2 p-5">
            <Button size="small" style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps} variant="contained"><FileUploadIcon /> Click or Drop here</Button>
       
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                {/* <img className='m-2' src={preview_img['data_url']} alt="" width="100" /> */}
                <div className="image-item__btn-wrapper">
                <Button size="small" className='m-2' onClick={() => onImageUpdate(index)} variant="contained" color="info">
              <CreateIcon />  Update
                </Button>
              

                  <Button size="small" className='m-2' onClick={() => onImageRemove(index)} variant="outlined" color="error">
                  <DeleteIcon />  Remove
                  </Button>

          
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    
      </div>

    </div>
    </div>
  )
}

export default StepThree