import React, { useState }  from 'react'
import './CourseEngagement.css'
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { LineChart } from "@mui/x-charts/LineChart";
import { Button, Card } from "antd";
import MaterialTable from 'material-table';
import Dropdown from 'react-bootstrap/Dropdown';
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from "@mui/material/Typography";


const CourseEngagement = () => {

  
  const pData = [2400, 600, 2000, 400, 5000, 4000, 5200,4800,8000,10000,4200,1800];
  const xLabels = [
    'Nov 21',
    'Dec 21',
    'Jan 22',
    'Feb 22',
    'Mar 22',
    'Apr 22',
    'May 22',
    'Jun 22',
    'Jul 22',
    'Aug 22',
    'Sep 22',
    'Oct 22',
  ];

  const uData = [5, 10, 2, 20, 12, 3, 30,10,4,3];
const pData1 = [20, 50, 23, 25, 30, 10, 30,10,40,7];
const xLabels1 = [
  'Jun 22',
  'Jul 22',
  'Aug 22',
  'Sep 22',
  'Oct 22',
  'Nov 22',
  'Dec 22',
  'Jan 22',
  'Feb 22',
  'Mar 22',
  'Apr 22',
  'May 22',
];


  const [tableVisible, setTableVisible] = useState(false);

  const toggleTableVisibility = () => {
    setTableVisible(!tableVisible);
  };


  return (

  <>
   <div className='row'>
   <div className='col-md-4'>

<Typography className="mb-4" variant="h4" gutterBottom>
            Course Engagement
    </Typography>
   </div>
   <div className='col-md-3'>

    <Dropdown>
      <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
        All Courses
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Last 30 days</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Last 12 months</Dropdown.Item>
        <Dropdown.Item href="#/action-3">All Courses</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

   </div>

    </div>


    <Card>
      
    <div class="mb-3 d-flex justify-content-between">
    <p className="fs-6">minutes consumed by active students</p>
    <div className="text-end">
        <Dropdown>
            <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
            Last 12 months
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Last 30 days</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Last 12 months</Dropdown.Item>
                <Dropdown.Item href="#/action-3">All Courses</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
</div>

<hr></hr>

<div>
<p className="fs-7 fw-bold mb-3" >Minutes taught</p>
<div className='col-12 col-lg-6 d-block d-md-flex'>
<div className='col-12 col-lg-12'>
<p className="fs-7 fw-bold">58,437.25 minutes taught</p>
<p className="fs-8">of lectures students have collectively viewed over the specified time period.</p>
</div>

<div className='col-12 col-lg-12'>
<p className="fs-7 fw-bold"> 714 active students</p>
<p className="fs-8">who've started a lecture over the selected time period.</p>
</div>
</div>
</div>
<BarChart
      width={1000}
      height={500}
      series={[
        { data: pData, label: 'pv', id: 'pvId' },
     
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
 <div>
      <Button className='mb-3' onClick={toggleTableVisibility}>See details</Button>
     

      {tableVisible && (
        <MaterialTable
          title="Section 1: Introduction"
          columns={[
            { title: 'Lecture', field: 'Lecture' },
            { title: 'Watched', field: 'Watched' },
            { title: 'Dropped', field: 'Dropped' },
            { title: 'Amount watched', field: 'Amountwatched' },

           
          ]}
          data={[
            { Lecture: '1.Cource Overview (03:37)', Watched: '2 Student', Dropped: '0%', Amountwatched: '62%' },
            { Lecture: '2.Why go? (04:01)', Watched: '1 Student', Dropped: '0%', Amountwatched: '100%' },
            { Lecture: '3.Environment Step (04:20)', Watched: '1 Student', Dropped: '0%', Amountwatched: '100%' },
                    ]}
          actions={[
            {
              icon: 'add',
              tooltip: 'Add User',
              isFreeAction: true,
              onClick: (event) => alert("You want to add a new row")
            }
          ]}
        />
      )}
    </div>

    <div>
<p className="fs-7 fw-bold mb-3" >Minutes spent</p>
<div className='col-12 col-lg-6 d-block d-md-flex'>
<div className=''>
<p className="fs-7 fw-bold">360 minutes</p>
<p className="fs-8">of lectures students have collectively viewed over the specified time period.</p>
</div>

<div className=''>
<p className="fs-7 fw-bold"> 360 active students</p>
<p className="fs-8">who've started a lecture over the selected time period.</p>
</div>
</div>
</div>
<BarChart
      width={1000}
      height={400}
      series={[
        { data: pData1, label: 'pv', id: 'pvId', stack: 'total' },
        { data: uData, label: 'uv', id: 'uvId', stack: 'total' },
      ]}
      xAxis={[{ data: xLabels1, scaleType: 'band' }]}
    />
  
  </Card>
  </>
  );
}

export default CourseEngagement