import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { LineChart } from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GetChartOverviewData, GetRevenueOverview } from "../../../api";
import LoadingSpinner from "../../../commonFunctions/loaders/Spinner/LoadingSpinner";
import formatNumber from "../../../commonFunctions/NumberFormat";
import moment from "moment";
import { LineChart as LineChartNew, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";




// Helper function to format the day data
const formatDays = (days) => days.map((day) => day);

function RevenueReport() {
  const [overViewStatus, setOverViewStatus] = useState(null);
  const [chartData, setChartData] = useState(null);
  const currentMonth = moment().format("MMMM"); // e.g., "February"



  useEffect(() => {
    // Fetch the overview data
    GetRevenueOverview(setOverViewStatus);

    // Fetch the chart data
    GetChartOverviewData(setChartData);
  }, [chartData, overViewStatus]);

  if (!overViewStatus || !chartData) {
    return <LoadingSpinner />;
  }

  // Extract data from the chartData
  const days = chartData.days || [];

  const revenueData = chartData.revenue || [];

  const enrollmentData = chartData.enrollment || [];

  const ratingData = chartData.rating || [];

  const getAdjustedData = (data) => {
    const allLessThanFive = data.every((value) => value < 5);

    return allLessThanFive ? 5 : null;
  };


// Sample data (Replace with your real data)
const data = days.map((day, index) => ({
  day,
  revenue: revenueData[index],
  enrollments: enrollmentData[index],
  rating: ratingData[index] || 0,
}));

// Custom Tooltip for Revenue Chart
const RevenueTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "white", padding: "10px", border: "1px solid #ccc" }}>
        <p>{`Day: ${payload[0].payload.day}`}</p>
        <p>{`Revenue: $${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Enrollments Chart
const EnrollmentsTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "white", padding: "10px", border: "1px solid #ccc" }}>
        <p>{`Day: ${payload[0].payload.day}`}</p>
        <p>{`Enrollments: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};


// Custom Tooltip for Ratings Chart
const RatingsTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "white", padding: "10px", border: "1px solid #ccc" }}>
        <p>{`Day: ${payload[0].payload.day}`}</p>
        <p>{`Rating: ${payload[0].value.toFixed(1)}/5`}</p>
      </div>
    );
  }
  return null;
};

  return (
    <div className=" all-courses-container mb-5">
      <div
        className="row mb-4 mx-3"
        style={{ justifyContent: "space-between" }}
      >
        <Typography className="m-0 p-0" variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <span className="p-0 m-0">Get top insights about your performance</span>
      </div>

      <div className="text-right m-4">
            {/* <Card className="mb-3 font-bold "> */}
              <a className="btn btn-danger" href="/performance/revenue-report">
                Revenue Report <i className="fa-solid fa-angle-right"></i>
              </a>
            {/* </Card> */}
          </div>

      <Card className="border-rad-20">
        <div className="row  m-3">
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
                  <div className="font-bold fs-5">
                    ${formatNumber(Number.parseFloat(overViewStatus.totalRevenue).toFixed(2))}
                  </div>
                  <div>
                    $
                    {formatNumber(Number.parseFloat(overViewStatus.thisMonthRevenue).toFixed(
                      2
                    ))}{" "}
                    this month
                  </div>
                </div>
              }
            >




      <ResponsiveContainer width="100%" height={400}>
          <LineChartNew data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" label={{ value: `Days of ${currentMonth}`, position: "insideBottom", dy: 3 }}
            
              interval="preserveStartEnd"
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ dy: 10 }}
            />
            <YAxis 
              label={{ value: "Revenue (USD)", angle: -90, position: "insideLeft" }} 
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip content={<RevenueTooltip />} />
            <Line type="monotone" dataKey="revenue" stroke="#4285F4" strokeWidth={2} dot={{ r: 5 }} />
          </LineChartNew>
        </ResponsiveContainer>



            </Tab>

            {/* Total Enrollment */}
            <Tab
              eventKey="profile"
              title={
                <div className="tab-title">
                  <div>Total Enrollment</div>
                  <div className="font-bold fs-5">
                    {overViewStatus.totalEnrollments}
                  </div>
                  <div>{overViewStatus.thisMonthEnrollments} this month</div>
                </div>
              }
            >
          <ResponsiveContainer width="100%" height={400}>
    <LineChartNew data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" label={{ value: `Days of ${currentMonth}`, position: "insideBottom", dy: 3 }} 
        interval="preserveStartEnd"
          angle={-45}
          textAnchor="end"
          height={80}
          tick={{ dy: 10 }}
      
      />
      <YAxis 
        label={{ value: "Enrollments", angle: -90, position: "insideLeft" }} 
        tickFormatter={(value) => value} 
      />
      <Tooltip content={<EnrollmentsTooltip />} />
      <Line type="monotone" dataKey="enrollments" stroke="#34A853" strokeWidth={2} dot={{ r: 5 }} />
    </LineChartNew>
  </ResponsiveContainer>

            </Tab>

            {/* Instructor Rating */}
            <Tab
              eventKey="contact"
              title={
                <div className="tab-title">
                  <div>Instructor Rating</div>
                  <div className="font-bold fs-5">
                    {overViewStatus.instructorRating == "NaN"
                      ? 0.0
                      : parseFloat(overViewStatus.instructorRating).toFixed(2)}
                  </div>
                  <div>{overViewStatus.thisMonthRating} rating this month</div>
                </div>
              }
            >
       
       <ResponsiveContainer width="100%" height={400}>
      <LineChartNew data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        
        {/* X-Axis for Days of the Month */}
        <XAxis 
          dataKey="day" 
          label={{ value: `Days of ${currentMonth}`, position: "insideBottom",dy: 3  }} 
          interval="preserveStartEnd"
          angle={-45}
          textAnchor="end"
          height={80}
          tick={{ dy: 10 }}
        />
        
        {/* Y-Axis for Ratings */}
        <YAxis
          label={{ value: "Ratings (0-5)", angle: -90, position: "insideLeft" }}
          domain={[0, 5]} // Set range from 0 to 5
          tickFormatter={(value) => value.toFixed(1)}
        />

        {/* Tooltip */}
        <Tooltip content={<RatingsTooltip />} />

        {/* Line for Ratings */}
        <Line type="monotone" dataKey="rating" stroke="#FFA500" strokeWidth={2} dot={{ r: 5 }} />
      </LineChartNew>
    </ResponsiveContainer>


            </Tab>
          </Tabs>
          {/* <div className="text-center">
            <Card className="mb-3 font-bold ">
              <a href="/performance/revenue-report">
                Revenue Report <i className="fa-solid fa-angle-right"></i>
              </a>
            </Card>
          </div> */}
        </div>
      </Card>
    </div>
  );
}

export default RevenueReport;
