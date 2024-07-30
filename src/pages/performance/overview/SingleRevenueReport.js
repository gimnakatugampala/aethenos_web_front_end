import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { LineChart } from "@mui/x-charts/LineChart";
import { Card } from "antd";
import Link from "@mui/material/Link";
import MaterialTable from "material-table";
import { PieChart, pieArcClasses } from "@mui/x-charts/PieChart";
import { GetRevenueReportByID, RevenueChart } from "../../../api";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";

const SingleRevenueReport = () => {
  const { id } = useParams();

  const [purchasesNo, setpurchasesNo] = useState(0);
  const [refundNo, setrefundNo] = useState(0);
  const [timePeriod, settimePeriod] = useState("");

  const [purchasedData, setpurchasedData] = useState([]);
  const [refundData, setrefundData] = useState([]);

  useEffect(() => {
    GetRevenueReportByID(
      id,
      setrefundNo,
      setpurchasesNo,
      setpurchasedData,
      settimePeriod,
      setrefundData
    );
  }, [id]);

  // useEffect(() => {
  //   RevenueChart()
  // })

  const data = [
    { id: 0, value: 10, label: "series A" },
    { id: 1, value: 15, label: "series B" },
    { id: 2, value: 20, label: "series C" },
  ];
  const headerCellStyle = {
    fontWeight: "bold",
  };
  return (
    <div className="all-courses-container mb-4">
      <div className="row mx-2" style={{ justifyContent: "space-between" }}>
        <Typography className="mb-4 " variant="h4" gutterBottom>
          <p className="fs-4 font-bold my-4">
            Revenue Report /{" "}
            <span className="fs-4 font-bold"> {timePeriod}</span>
          </p>
        </Typography>
      </div>

      <Card className="p-3">
        {/* 
      <div className="container text-center">
        <div className="row">
          <div className="col-12">
            <p className="fs-5 my-4">
              Revenue Report /{" "}
              <span className="fs-4 font-bold"> {timePeriod}</span>
            </p>
          </div>
        </div>
      </div> */}

        {/* <div className="container my-4">
        <p className="font-bold fs-10 mb-0">
          You earned $71 during this period. May 8, 2019 is the expected payment
          date for this payment.
        </p>
        <p>
          Total for this money is not yet finalized. As a refund or an external
          payment may still be applied.
          <a href="#"> Payment and revenue reports.</a>
        </p>
      </div> */}

        {/* <div className="container">
        <div className="row text-center">
          <div className="col-6">
            <Card>
              <h6><i>Your Total Earnings</i></h6>
              <h6><b>$45.00</b></h6>
              <PieChart
                series={[
                  {
                    data,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: { innerRadius: 30, additionalRadius: -30 },
                  },
                ]}
                sx={{
                  [`& .${pieArcClasses.faded}`]: {
                    fill: "gray",
                  },
                }}
                height={200}
              />
            </Card>
          </div>
          <div className="col-4">
            <Card>
              <PieChart
                series={[
                  {
                    data,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: { innerRadius: 30, additionalRadius: -30 },
                  },
                ]}
                sx={{
                  [`& .${pieArcClasses.faded}`]: {
                    fill: "gray",
                  },
                }}
                height={200}
              />
            </Card>
          </div>
          <div className="col-6">
            <Card>
            <h6><i>Your Earning by Courses</i></h6>
              <h6><b></b></h6>
              <PieChart
                series={[
                  {
                    data,
                    highlightScope: { faded: "global", highlighted: "item" },
                    faded: { innerRadius: 30, additionalRadius: -30 },
                  },
                ]}
                sx={{
                  [`& .${pieArcClasses.faded}`]: {
                    fill: "gray",
                  },
                }}
                height={200}
              />
            </Card>
          </div>
        </div>
      </div> */}

        <Tabs className="mt-5">
          <Tab
            eventKey="home"
            title={
              <div className="tab-title">
                <div className="font-bold fs-5">Purchases</div>
                <div>${purchasesNo} this month</div>
              </div>
            }
          >
            <MaterialTable
              title="Total Revenue"
              columns={[
                { title: "Date", field: "date", headerStyle: headerCellStyle },
                {
                  title: "Customer Name",
                  field: "customerName",
                  headerStyle: headerCellStyle,
                },
                {
                  title: "Course",
                  field: "course",
                  headerStyle: headerCellStyle,
                },
                {
                  title: "Coupon Code",
                  field: "couponCode",
                  headerStyle: headerCellStyle,
                },
                {
                  title: "Price Paid ($)",
                  field: "pricePaid",
                  headerStyle: headerCellStyle,
                },
                {
                  title: "Payment Processing Fees ($)",
                  field: "paymentProcessingFees",
                  headerStyle: headerCellStyle,
                },
                {
                  title: "Apple/Google fees ($)",
                  field: "appleOrGoogleFees",
                  headerStyle: headerCellStyle,
                },
                {
                  title: "Tax ($)",
                  field: "tax",
                  headerStyle: headerCellStyle,
                },
                {
                  title: "Net Revenue ($)",
                  field: "netRevenue",
                  headerStyle: headerCellStyle,
                },
                {
                  title: "Your Revenue ($)",
                  field: "yourRevenue",
                  headerStyle: headerCellStyle,
                },
                {
                  title: "Channel",
                  field: "channel",
                  headerStyle: headerCellStyle,
                },
                {
                  title: "Platform",
                  field: "platform",
                  headerStyle: headerCellStyle,
                },
              ]}
              data={purchasedData}
              options={{
                sorting: true,
                exportButton: true,
              }}
            />
          </Tab>

          <Tab
            eventKey="refunds"
            title={
              <div className="tab-title">
                <div className="font-bold fs-5">Refunds</div>
                <div>${refundNo} this month</div>
              </div>
            }
          >
            <MaterialTable
              title="All Refunds"
              columns={[
                { title: "Date", field: "date", headerStyle: headerCellStyle },
                {
                  title: "Customer Name",
                  field: "customerName",
                  headerStyle: headerCellStyle,
                },
                {
                  title: "Course",
                  field: "course",
                  headerStyle: headerCellStyle,
                },
                {
                  title: "Refund Amount",
                  field: "refundsAmount",
                  headerStyle: headerCellStyle,
                },
                {
                  title: "Change to Your Revenue",
                  field: "changeToYourRevenue",
                  headerStyle: headerCellStyle,
                },
              ]}
              data={refundData}
              options={{
                sorting: true,
                exportButton: true,
              }}
            />
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
};

export default SingleRevenueReport;
