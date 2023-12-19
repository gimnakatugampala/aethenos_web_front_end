import React, { useState } from 'react'
import { Input, Space , Badge , Image ,Col, Divider, Row } from 'antd';
import { Card  } from 'antd';
import { Button, Progress } from 'antd';
import { Avatar, List, Skeleton, Switch , Popover ,Tag  } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Chip from '@mui/material/Chip';
// import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { FILE_PATH } from '../../commonFunctions/FilePaths';

const CourseItem = ({course,filledPercent}) => {

  const [percent, setPercent] = useState(filledPercent);
  const [loading, setLoading] = useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const content = (
    <div>
      <h6><b>Admin Comment : </b></h6>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
    </div>
  );


  setTimeout(() => {
    setLoading(false)
  }, 3000);
  

  return (
    <Skeleton loading={loading} active avatar>
    <div className='my-3'>

    {/* <Badge.Ribbon text={status} color={status == "Draft" ? "cyan" : status == "Approved" ? "green" : status == "Requested" ? "yellow" : status == "Disapproved" ? "red" : "lime"}> */}
    <Card className='card-item'>

    <div className='row'>
    <div className="col-md-2 pr-0">
        <Image
          width={100}
          src={course.img == null ? 'https://i0.wp.com/iubs.org/wp-content/uploads/2021/12/blank.jpg?fit=300%2C300&ssl=1' : FILE_PATH + course.img}
          placeholder={
            <Image
              preview={false}
              src={course.img == null ? 'https://i0.wp.com/iubs.org/wp-content/uploads/2021/12/blank.jpg?fit=300%2C300&ssl=1' : FILE_PATH + course.img}
              width={100}
            />
          }
        />
    </div>
    
      
    <div className="col-md-10 p-0">
        <h5 className="card-title"><b>{course.courseTitle == null ? "N/A" : course.courseTitle}</b> {course.approvalType.id == '2' && (<a className='mx-2' href={`edit-course?code=${course.code}`}><EditIcon /></a>)} </h5> 
        <p className='availblity'>{course.courseCategory.name == null ? "N/A" : course.courseCategory.name}</p>

        <div>
          <span className='pending-text'>

          {course.approvalType.id != null && course.approvalType.id == '1' ? (

            // <Chip label="Draft" color="secondary" variant="outlined" />
            <Chip label="Draft" color="secondary" variant="outlined" />

          ) : course.approvalType.id  == '2' ? (

            <Popover content={course.comment} >
            <Chip 
              aria-owns={open ? 'mouse-over-popover' : undefined}
              icon={<MoreVertIcon />}
              label="Rejected" color="primary" variant="outlined" />
              </Popover>
          ) : course.approvalType.id  == '3' ? (
            <Chip label="Pending" color="success" variant="outlined" />
          ) : course.approvalType.id  == '4' ? (
            <Chip label="Disapproved" color="primary" variant="outlined" />
          ) : course.approvalType.id  == '5' ? (
            <Chip label="Approved" color="success" variant="outlined" />
          ): course.approvalType.id  == '7' && (
            <Chip label="Requested" color="warning" variant="outlined" />
          ) }

            
          </span>
          <Progress percent={percent} />
        </div>


    </div>
    </div>

   
        {course.approvalType.id != null && course.approvalType.id == 3 && (
            <div className='d-flex justify-content-center'> 
              <a className='card-item-link' href={`/courses/manage/${course.code}/`}>Manage Course</a>
            </div> 
         )}

          {course.approvalType.id != null && course.approvalType.id == 4 && (
              <div className='d-flex justify-content-center'> 
              <a className='card-item-link' href={`/courses/manage/${course.code}/`}>Manage Course</a>
            </div> 
          )}

          {course.approvalType.id != null && course.approvalType.id == 5 && (
              <div className='d-flex justify-content-center'> 
              <a className='card-item-link' href={`/courses/manage/${course.code}/`}>Manage Course</a>
            </div> 
          )}



    </Card>
    {/* </Badge.Ribbon> */}
    </div>
  </Skeleton>
  )
}

export default CourseItem