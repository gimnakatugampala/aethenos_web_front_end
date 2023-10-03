import React, { useState } from 'react'
import { Input, Space , Badge , Image ,Col, Divider, Row } from 'antd';
import { Card  } from 'antd';
import { Button, Progress } from 'antd';
import { Avatar, List, Skeleton, Switch } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Chip from '@mui/material/Chip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';

const CourseItem = ({title, status, filledPercent, seenBy , adminreview}) => {

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


  setTimeout(() => {

    setLoading(false)
    
  }, 3000);
  

  return (
    <Skeleton loading={loading} active avatar>
    <div className='my-3'>

    <Badge.Ribbon text={status} color={status == "Draft" ? "cyan" : status == "Approved" ? "green" : status == "Requested" ? "yellow" : status == "Disapproved" ? "red" : "lime"}>
    <Card className='card-item'>

    <div className='row'>
    <div className="col-md-2 pr-0">
        <Image
          width={100}
          src={`https://i0.wp.com/iubs.org/wp-content/uploads/2021/12/blank.jpg?fit=300%2C300&ssl=1`}
          placeholder={
            <Image
              preview={false}
              src="https://i0.wp.com/iubs.org/wp-content/uploads/2021/12/blank.jpg?fit=300%2C300&ssl=1"
              width={100}
            />
          }
        />
    </div>
      
    <div className="col-md-10 p-0">
        <h5 className="card-title"><b>{title}</b> {adminreview == 'rejected' && (<a className='mx-2' href="edit-course"><EditIcon /></a>)} </h5> 
        <p className='availblity'>{seenBy}</p>

        <div>
          <span className='pending-text'>
          {adminreview == 'draft' ? (
            <Chip label="Draft" color="secondary" variant="outlined" />
          ) : adminreview == 'rejected' ? (
            <Chip 
              aria-owns={open ? 'mouse-over-popover' : undefined}
              icon={<MoreVertIcon />}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              label="Rejected" color="primary" variant="outlined" />
          ) : adminreview == 'pending' && (
            <Chip label="Pending" color="success" variant="outlined" />
          ) }

            
          </span>
          <Progress percent={percent} />
        </div>


    </div>
    </div>

   {/* Rejected Admin Comment */}
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 2 }}>
        <h6><b>Admin Comment : </b></h6>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
        </Typography>
      </Popover>
        {adminreview == 'pending' && (
            <div className='d-flex justify-content-center'> 
              <a className='card-item-link' href="/courses/manage/2023/">Manage Course</a>
            </div> 
        )}





    </Card>
    </Badge.Ribbon>
    </div>
  </Skeleton>
  )
}

export default CourseItem