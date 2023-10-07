import React from "react";
import "../revenue-report/RevenueReport";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { LineChart } from "@mui/x-charts/LineChart";
import { Card } from "antd";
import Link from "@mui/material/Link";

function RevenueReport() {
  return (
    <Card>
      <p className="fs-5 font-bold">Overview</p>
      <p className="fs-6">Get top insights about your performance</p>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
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
          <Card>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={890}
              height={500}
            />
          </Card>
        </Tab>
        <Tab
          eventKey="profile"
          title={
            <div className="tab-title">
              <div>Total Enrollment</div>
              <div className="font-bold fs-5">$500</div>
              <div>$200 this month</div>
            </div>
          }
        >
          <Card>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={890}
              height={500}
            />
          </Card>
        </Tab>
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
          <Card>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={890}
              height={500}
            />
          </Card>
        </Tab>
      </Tabs>
      <div className="text-center">
        <Card>
          <Link
            component="button"
            variant="body2"
            className="center text-primary text-decoration-none"
            onClick={() => {
              window.location.href = "/performance/revenue-report";
            }}
          >
            Revenue Report >
          </Link>
        </Card>
      </div>
    </Card>
  );
}

export default RevenueReport;
