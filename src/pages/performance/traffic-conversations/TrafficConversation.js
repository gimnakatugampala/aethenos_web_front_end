import React from 'react'
import './TrafficConversation.css'
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { LineChart } from "@mui/x-charts/LineChart";
import { Card } from "antd";
import MaterialTable from 'material-table';
import Dropdown from 'react-bootstrap/Dropdown';
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import { Select, Space } from 'antd';

const TrafficConversation = () => {

  const xLabels = [
    'Jun 18',
    'Jun 20',
    'Jun 22',
    'Jun 24',
    'Jun 26',
    'Jun 28',
   
  ];
  const xLabels2 = [
    'Mar 21',
    'Apr 21',
    'May 21',
    'Jun 21',
   
   
  ];

  return (

  <>
  <div className="mb-5">
       <Typography className="m-0 p-0" variant="h4" gutterBottom>
       Traffic Conversions
      </Typography>
      <span className="p-0 m-0">Use this table to understand what webpages are giving you the most traffic</span>
      </div>
    <Card>


<div className='p-3'>

    <div className='row my-4'>
    <div className='col-md-8'></div>
      <div className='col-md-4'>
    <FormControl fullWidth>
        <Select
          defaultValue={10}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>Last 30 days</option>
          <option value={20}>Last 12 months</option>
          <option value={30}>All channel</option>
        </Select>
      </FormControl>
      </div>
    </div>


    <div className='mb-5'>
        <MaterialTable
          title="Coupon List"
          columns={[
            { title: 'Source', field: 'name' },
            { title: 'Channel', field: 'surname' },
            { title: 'Coupon code', field: 'Couponcode'},
            { title: 'Visitors', field: 'Visitors'},

            
          ]}
          data={[
            { name: 'Mehmet', surname: 'Baran', Couponcode: '--', Visitors: 63 },
            { name: 'Zerya Betül', surname: 'Baran',  Couponcode: '--', Visitors: 233 },
          ]}        
          options={{
            exportButton: true
          }}
        />

    </div>

    </div>
{/* <p className="fs-6">Understand how people get to your landing page and whether they're enrolling</p>

    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab
        eventKey="home"
        title={
          <div className="tab-title">
            <div>Landing page visitors</div>
            <div className="font-bold fs-5">1,780</div>
          </div>
        }
      >
    

<Card>
  <LineChart
    xAxis={[
      {
        scaleType: 'point',data: xLabels,
      }
    ]}
    series={[
      {
        data: [100, 20, 87, 65, 50, 0],
      },
    ]}
    width={990}
    height={400}
    // options={{
    //   xLabels : {
    //     type: 'months',
    //   },
    // }}
  />
</Card>
      </Tab>
      <Tab
        eventKey="profile"
        title={
          <div className="tab-title">
            <div>Conversion rate</div>
            <div className="font-bold fs-5">1.01%</div>
          </div>
        }
      >
        <Card>
          <LineChart
            xAxis={[{ scaleType: 'point',data: xLabels2 }]}
            series={[
              {
                data: [1.00,2.00,1.95,0.40],
              },
            ]}
            width={900}
            height={400}
          />
        </Card>
      </Tab>
    
    </Tabs>
  */}
  </Card>
  </>
  );
}

export default TrafficConversation