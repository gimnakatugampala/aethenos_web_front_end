import React from "react";
import "../revenue-report/RevenueReport";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { LineChart } from "@mui/x-charts/LineChart";
import Box from '@mui/material/Box';
import { Card } from "antd";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';


function RevenueReport() {
  return (
    <div>
      <div className="mb-5">
       <Typography className="m-0 p-0" variant="h4" gutterBottom>
       Overview
      </Typography>
      <span className="p-0 m-0">Get top insights about your performance</span>
      </div>

    <Card className="p-3">
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {/* Total Revenue */}
        <Tab
          eventKey="home"
          title={
            <div className="tab-title">
              <div>Total Revenue</div>
              <div className="font-bold fs-5">$100</div>
              <div>$20 this month</div>
            </div>
          }
        >
         
          <Box sx={{ flexGrow: 1 }}>
          <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              area: true,
            },
          ]}
          
          height={400}
        />
      </Box>
         
        </Tab>

      {/* Total Enrollment */}
        <Tab
          eventKey="profile"
          title={
            <div className="tab-title">
              <div>Total Enrollment</div>
              <div className="font-bold fs-5">$500.66</div>
              <div>$200 this month</div>
            </div>
          }
        >
      
          <Box sx={{ flexGrow: 1 }}>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              height={400}
            />
            </Box>
          
        </Tab>

      {/* Instructor Rating */}
        <Tab
          eventKey="contact"
          title={
            <div className="tab-title">
              <div>Instructor Rating</div>
              <div className="font-bold fs-5">4</div>
              <div>21 rating this month</div>
            </div>
          }
        >
         <Box sx={{ flexGrow: 1 }}>
          <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              area: true,
            },
          ]}
          
          height={400}
        />
      </Box>
        </Tab>
        
      </Tabs>
      <div className="text-center">
        <Card>
          <a href="/performance/revenue-report">
          Revenue Report  <i class="fa-solid fa-angle-right"></i>
          </a>
        </Card>
      </div>
    </Card>
    </div>
  );
}

export default RevenueReport;
