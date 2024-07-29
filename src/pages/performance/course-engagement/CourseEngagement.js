import React, { useState }  from 'react'
import './CourseEngagement.css'
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { LineChart } from "@mui/x-charts/LineChart";
import {  Card } from "antd";
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import MaterialTable from 'material-table';
import Dropdown from 'react-bootstrap/Dropdown';
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import { Select, Space } from 'antd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
    <div className="row mb-3">
        <div className="col-md-5">
             <Typography variant="h4" gutterBottom>
              Course Engagement
            </Typography>
        </div>

        <div className="col-md-3">
        <FormControl fullWidth>
        <Select
          defaultValue={10}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>All Courses</option>
          <option value={20}>Learn Photoshop</option>
          <option value={30}>Software Development</option>
        </Select>
      </FormControl>

        </div>

      </div>


    <Card className='p-3'>
      
    <div class="mb-3 d-flex justify-content-between align-items-center p-2">
    <h5 className='mt-2'>Minutes Consumed by Active Students</h5>
    <div>
    <FormControl fullWidth>
        <Select
          defaultValue={10}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>Last 12 months</option>
          <option value={20}>Last 30 days</option>
          <option value={30}>Last 12 months</option>
        </Select>
      </FormControl>
    </div>
</div>

<hr></hr>

  {/* 1st component */}
  <div className="card">
  <div className="card-header">
    Minutes Taught
  </div>
  <div className="card-body">

  <div>
        <div className='row'>

        <div className='col-md-5 col-lg-5'>
        <h6 className="fs-7 fw-bold">58,437.25 minutes taught</h6>
        <p className="fs-8">of lectures students have collectively viewed over the specified time period.</p>
        </div>

        <div className='col-md-6 col-lg-6'>
        <h6 className="fs-7 fw-bold"> 714 active students</h6>
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


  <div className='my-2'>
      {tableVisible ? (
        <button onClick={toggleTableVisibility}  type="button" class="btn btn-outline-danger mb-3"><i class="fa-solid fa-chevron-up mx-1"></i> Cancel</button>
        ) : (
          <Button onClick={toggleTableVisibility} className='mb-3'  variant="contained"><i class="fa-solid fa-chevron-down mx-1"></i> See details</Button>
      )}

          {tableVisible && (
            <>
            <Accordion>
            <AccordionSummary
            style={{width:'100%',padding:'5px'}}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Section : 1</Typography>
            </AccordionSummary>
            <AccordionDetails>

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
            />
            </AccordionDetails>
      </Accordion>



      <Accordion>
            <AccordionSummary
            style={{width:'100%',padding:'5px'}}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Section : 2</Typography>
            </AccordionSummary>
            <AccordionDetails>

            <MaterialTable
              title="Section 2: Introduction"
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
            />
            </AccordionDetails>
      </Accordion>

           </>
      
          )}

      
     

    
       
     
    </div>


  </div>
</div>



    {/* 1st component */}

    <div className="card my-4">
  <div className="card-header">
  Minutes Spent
  </div>
  <div className="card-body">

  <div className='row'>
<div className='col-md-6'>
<p className="fs-7 fw-bold">360 minutes</p>
<p className="fs-8">of lectures students have collectively viewed over the specified time period.</p>
</div>

<div className='col-md-6'>
<p className="fs-7 fw-bold"> 360 active students</p>
<p className="fs-8">who've started a lecture over the selected time period.</p>
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

  </div>
</div>


  
  </Card>
  </>
  );
}

export default CourseEngagement