import React from "react";
import "../revenue-report/RevenueReport";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { LineChart } from "@mui/x-charts/LineChart";
import { Card } from "antd";
import Link from "@mui/material/Link";
import MaterialTable from "material-table";

function RevenueReport() {
  const headerCellStyle = {
    fontWeight: "bold",
  };
  return (
    <Card>
      <p className="fs-5 font-bold">Revenue Report</p>
      <h1 className="font-bold">$50,523.55</h1>
      <p className="fs-10">Your lifetime earnings of March 12 2019</p>
      <Card>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={800}
          height={500}
        />
      </Card>
      <MaterialTable
        title="Basic Sorting Preview"
        columns={[
          {
            title: "Time Period",
            field: "timePeriod",
            render: (rowData) => (
              <a href="/performance/revenue-report/1">{rowData.timePeriod}</a>
            ),
            headerStyle: headerCellStyle,
          },
          { title: "Amount", field: "amount", headerStyle: headerCellStyle },
          {
            title: "Expected Payment Date",
            field: "expectedPaymentDate",
            headerStyle: headerCellStyle,
          },
          { title: "Notes", field: "notes", headerStyle: headerCellStyle },
        ]}
        data={[
          {
            timePeriod: "Mar 2023",
            amount: "$100",
            expectedPaymentDate: "2023-03-15",
            notes: "Note 1",
          },
          {
            timePeriod: "Apr 2023",
            amount: "$150",
            expectedPaymentDate: "2023-04-15",
            notes: "Note 2",
          },
          {
            timePeriod: "May 2023",
            amount: "$200",
            expectedPaymentDate: "2023-05-15",
            notes: "Note 3",
          },
          {
            timePeriod: "Jun 2023",
            amount: "$250",
            expectedPaymentDate: "2023-06-15",
            notes: "Note 4",
          },
          {
            timePeriod: "Jul 2023",
            amount: "$300",
            expectedPaymentDate: "2023-07-15",
            notes: "Note 5",
          },
        ]}
        options={{
          sorting: true,
        }}
      />
    </Card>
  );
}

export default RevenueReport;
