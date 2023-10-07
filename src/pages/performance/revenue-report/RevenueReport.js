import React from "react";
import "../revenue-report/RevenueReport";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { LineChart } from "@mui/x-charts/LineChart";
import { Card } from "antd";
import Link from "@mui/material/Link";
import MaterialTable from "material-table";

function RevenueReport() {
  const years = [
    new Date(1990, 0, 1),
    new Date(1991, 0, 1),
    new Date(1992, 0, 1),
    new Date(1993, 0, 1),
    new Date(1994, 0, 1),
    new Date(1995, 0, 1),
    new Date(1996, 0, 1),
    new Date(1997, 0, 1),
    new Date(1998, 0, 1),
    new Date(1999, 0, 1),
    new Date(2000, 0, 1),
    new Date(2001, 0, 1),
    new Date(2002, 0, 1),
    new Date(2003, 0, 1),
    new Date(2004, 0, 1),
    new Date(2005, 0, 1),
    new Date(2006, 0, 1),
    new Date(2007, 0, 1),
    new Date(2008, 0, 1),
    new Date(2009, 0, 1),
    new Date(2010, 0, 1),
    new Date(2011, 0, 1),
    new Date(2012, 0, 1),
    new Date(2013, 0, 1),
    new Date(2014, 0, 1),
    new Date(2015, 0, 1),
    new Date(2016, 0, 1),
    new Date(2017, 0, 1),
    new Date(2018, 0, 1),
  ];

  const FranceGDPperCapita = [
    28129, 28294.264, 28619.805, 28336.16, 28907.977, 29418.863, 29736.645,
    30341.807, 31323.078, 32284.611, 33409.68, 33920.098, 34152.773, 34292.03,
    35093.824, 35495.465, 36166.16, 36845.684, 36761.793, 35534.926, 36086.727,
    36691, 36571, 36632, 36527, 36827, 37124, 37895, 38515.918,
  ];

  const UKGDPperCapita = [
    26189, 25792.014, 25790.186, 26349.342, 27277.543, 27861.215, 28472.248,
    29259.764, 30077.385, 30932.537, 31946.037, 32660.441, 33271.3, 34232.426,
    34865.78, 35623.625, 36214.07, 36816.676, 36264.79, 34402.36, 34754.473,
    34971, 35185, 35618, 36436, 36941, 37334, 37782.83, 38058.086,
  ];

  const GermanyGDPperCapita = [
    25391, 26769.96, 27385.055, 27250.701, 28140.057, 28868.945, 29349.982,
    30186.945, 31129.584, 32087.604, 33367.285, 34260.29, 34590.93, 34716.44,
    35528.715, 36205.574, 38014.137, 39752.207, 40715.434, 38962.938, 41109.582,
    43189, 43320, 43413, 43922, 44293, 44689, 45619.785, 46177.617,
  ];

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
          xAxis={[
            {
              id: "Years",
              data: years,
              scaleType: "time",
              valueFormatter: (date) => date.getFullYear(),
            },
          ]}
          series={[
            {
              id: "France",
              label: "French GDP per capita",
              data: FranceGDPperCapita,
              stack: "total",
              area: true,
              showMark: false,
            },
            {
              id: "Germany",
              label: "German GDP per capita",
              data: GermanyGDPperCapita,
              stack: "total",
              area: true,
              showMark: false,
            },
            {
              id: "United Kingdom",
              label: "UK GDP per capita",
              data: UKGDPperCapita,
              stack: "total",
              area: true,
              showMark: false,
            },
          ]}
          sx={{
            "--ChartsLegend-itemWidth": "200px",
          }}
          width={890}
          height={400}
          margin={{ left: 70 }}
        />
      </Card>
      <MaterialTable
        title="Revenue Report"
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
