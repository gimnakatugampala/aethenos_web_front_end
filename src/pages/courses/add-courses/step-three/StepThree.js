import React, { useEffect, useState } from 'react'
import { Tree } from 'antd';
import { Divider, Radio, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import ImageUploading from 'react-images-uploading';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import './StepThree.css'



const StepThree = ({setcourse_image}) => {

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    setcourse_image(imageList[0].file)
  };




  return (
    <div className='stepthree-container text-center'>
    <div>

    <div className='my-5'>
        <Typography.Title
        level={3}>
        Upload Course Image
      </Typography.Title>

    
      </div>

      <div className='pt-3'>
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
                <img className='m-2' src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                <Button size="small" className='m-2' onClick={() => onImageUpdate(index)} variant="contained" color="error">
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