import React, { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { LineChart } from "@mui/x-charts/LineChart";
import { Card } from "antd";
import Link from "@mui/material/Link";
import MaterialTable from "material-table";
import { PieChart, pieArcClasses } from "@mui/x-charts/PieChart";
import { GetRevenueReportByID } from "../../../api";

const SingleRevenueReport = () => {

  useEffect(() => {
    GetRevenueReportByID()
  }, [])
  

  const data = [
    { id: 0, value: 10, label: "series A" },
    { id: 1, value: 15, label: "series B" },
    { id: 2, value: 20, label: "series C" },
  ];
  const headerCellStyle = {
    fontWeight: "bold",
  };
  return (
    <Card className="p-3">
      <div className="container text-center">
        <div className="row">
          <div className="col-12">
            <p className="fs-5 my-4">
              Revenue Report / <span className="fs-4 font-bold"> Mar 2019</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="container my-4">
        <p className="font-bold fs-10 mb-0">
          You earned $71 during this period. May 8, 2019 is the expected payment
          date for this payment.
        </p>
        <p>
          Total for this money is not yet finalized. As a refund or an external
          payment may still be applied.
          <a href="#"> Payment and revenue reports.</a>
        </p>
      </div>

      <div className="container">
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
          {/* <div className="col-4">
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
          </div> */}
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
      </div>

      <Tabs className="mt-5">

        <Tab
          eventKey="home"
          title={
            <div className="tab-title">
              <div className="font-bold fs-5">Purchases</div>
              <div>$20 this month</div>
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
                title: "Price Paid",
                field: "pricePaid",
                headerStyle: headerCellStyle,
              },
              {
                title: "Payment Processing",
                field: "paymentProcessing",
                headerStyle: headerCellStyle,
              },
              {
                title: "Apple/Google fees",
                field: "appleGooglefees",
                headerStyle: headerCellStyle,
              },
              {
                title: "Tax",
                field: "tax",
                headerStyle: headerCellStyle,
              },
              {
                title: "Net Revenue",
                field: "netRevenue",
                headerStyle: headerCellStyle,
              },
              {
                title: "Your Revenue",
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
              }
            ]}
            data={[
              {
                date: "Mar 2023",
                customerName: "$100",
                course: "Course 1",
                couponCode: "ABC123",
                pricePaid:"48329",
                paymentProcessing:"48329",
                appleGooglefees:"",
                tax:"",
                netRevenue:"43636",
                yourRevenue: "$1000",
                channel: "Online",
                platform: "Monthly",
              }
            ]}
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
              <div>$200 this month</div>
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
                field: "refundAmount",
                headerStyle: headerCellStyle,
              },
              {
                title: "Change to Your Revenue",
                field: "changeRevenue",
                headerStyle: headerCellStyle,
              }
            ]}
            data={[
              {
                date: "Mar 2023",
                customerName: "$100",
                course: "Course 1",
                refundAmount: "12.88",
                changeRevenue: "-12.88"
              }
            ]}
            options={{
              sorting: true,
              exportButton: true,
            }}
          />
        </Tab>

        {/* <Tab
          eventKey="contact"
          title={
            <div className="tab-title">
              <div>Instructor Rating</div>
              <div className="font-bold fs-5">4</div>
              <div>21 rating this month</div>
            </div>
          }
        >
          <MaterialTable
            title="Instructor Rating"
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
                title: "Channel",
                field: "channel",
                headerStyle: headerCellStyle,
              },
              {
                title: "Price Period",
                field: "pricePeriod",
                headerStyle: headerCellStyle,
              },
              {
                title: "Your Revenue",
                field: "yourRevenue",
                headerStyle: headerCellStyle,
              },
            ]}
            data={[
              {
                date: "Mar 2023",
                customerName: "$100",
                course: "Course 1",
                couponCode: "ABC123",
                channel: "Online",
                pricePeriod: "Monthly",
                yourRevenue: "$1000",
              },
              {
                date: "Apr 2023",
                customerName: "$150",
                course: "Course 2",
                couponCode: "DEF456",
                channel: "In-Person",
                pricePeriod: "Yearly",
                yourRevenue: "$1500",
              },
              {
                date: "May 2023",
                customerName: "$200",
                course: "Course 3",
                couponCode: "GHI789",
                channel: "Online",
                pricePeriod: "Monthly",
                yourRevenue: "$2000",
              },
              {
                date: "Jun 2023",
                customerName: "$250",
                course: "Course 4",
                couponCode: "JKL012",
                channel: "Online",
                pricePeriod: "Yearly",
                yourRevenue: "$2500",
              },
              {
                date: "Jul 2023",
                customerName: "$300",
                course: "Course 5",
                couponCode: "MNO345",
                channel: "In-Person",
                pricePeriod: "Monthly",
                yourRevenue: "$3000",
              },
            ]}
            options={{
              sorting: true,
              exportButton: true,
            }}
          />
        </Tab> */}

      </Tabs>
    </Card>
  );
};

export default SingleRevenueReport;
