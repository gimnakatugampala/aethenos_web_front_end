import React, { useState } from 'react'
import { Input, Space , Badge , Image ,Col, Divider, Row } from 'antd';
import { Card  } from 'antd';
import { Button, Progress } from 'antd';
import { Avatar, List, Skeleton, Switch } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const CourseItem = ({title, status, filledPercent, seenBy}) => {

  const [percent, setPercent] = useState(filledPercent);
  const [loading, setLoading] = useState(true);

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
        <h5 className="card-title"><b>{title}</b></h5>
        <p className='availblity'>{seenBy}</p>

        <div>
          <span className='pending-text'><Badge color="#f50" text="#f50" /> <CheckOutlined /></span>
          <Progress percent={percent} />
        </div>


    </div>
    </div>

    <div className='d-flex justify-content-center'> 
      <a className='card-item-link' href="/courses/manage/2023/">Manage Course</a>
    </div> 

    {/* <div className='d-flex justify-content-center'> 
      <a className='card-item-link-draft' href='#'><h2>Waiting For Admin Approval</h2></a>
    </div>  */}



    </Card>
    </Badge.Ribbon>
    </div>
  </Skeleton>
  )
}

export default CourseItem