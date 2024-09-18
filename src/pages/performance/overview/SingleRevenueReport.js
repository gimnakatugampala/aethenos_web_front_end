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
          <p className="fs-4 font-bold my-4 py-3">
            Revenue Report /{" "}
            <span className="fs-4 font-bold"> {timePeriod}</span>
          </p>
        </Typography>
      </div>

      <Card className="p-3">
       
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

          {/* <Tab
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
          </Tab> */}

        </Tabs>
      </Card>
    </div>
  );
};

export default SingleRevenueReport;
