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

// Helper function to format the day data
const formatDays = (days) => days.map((day) => day);

function RevenueReport() {
  const [overViewStatus, setOverViewStatus] = useState(null);
  const [chartData, setChartData] = useState(null);

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
              <Box sx={{ flexGrow: 1 }}>
  <LineChart
    xAxis={[
      {
        data: formatDays(days),
        label: "Days", // Label for the x-axis
      },
    ]}
    yAxis={[
      {
        min: 0,
        max: getAdjustedData(revenueData),
        interval: 1,
        label: "Amount (USD)", // Label for the y-axis
        tickFormatter: (value) => Math.round(value),
      },
    ]}
    series={[
      {
        data: revenueData,
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
                  <div className="font-bold fs-5">
                    {overViewStatus.totalEnrollments}
                  </div>
                  <div>{overViewStatus.thisMonthEnrollments} this month</div>
                </div>
              }
            >
           <Box sx={{ flexGrow: 1 }}>
  <LineChart
    xAxis={[
      {
        data: formatDays(days),
        label: "Days", // Label for the x-axis
      },
    ]}
    yAxis={[
      {
        min: 0,
        max: getAdjustedData(enrollmentData),
        interval: 1,
        label: "Count of Students", // Label for the y-axis
        tickFormatter: (value) => Math.round(value),
      },
    ]}
    series={[
      {
        data: enrollmentData,
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
                  <div className="font-bold fs-5">
                    {overViewStatus.instructorRating == "NaN"
                      ? 0.0
                      : parseFloat(overViewStatus.instructorRating).toFixed(2)}
                  </div>
                  <div>{overViewStatus.thisMonthRating} rating this month</div>
                </div>
              }
            >
             <Box sx={{ flexGrow: 1 }}>
  <LineChart
    xAxis={[
      {
        data: formatDays(days),
        label: "Days", // Label for the x-axis
      },
    ]}
    yAxis={[
      {
        min: 0, // You may want to set a max value if needed, based on ratings range.
        label: "Ratings", // Label for the y-axis
      },
    ]}
    series={[
      {
        data: ratingData,
        area: true,
      },
    ]}
    height={400}
  />
</Box>

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
