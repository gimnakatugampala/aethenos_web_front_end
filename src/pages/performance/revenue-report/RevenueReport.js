import React, { useEffect, useState } from "react";
import { Card } from "antd";
import MaterialTable from "material-table";
import { LineChart } from "@mui/x-charts/LineChart";
import LoadingSpinner from "../../../commonFunctions/loaders/Spinner/LoadingSpinner";
import formatNumber from "../../../commonFunctions/NumberFormat";
import { GetRevenueReport, RevenueChart } from "../../../api";
import Typography from "@mui/material/Typography";
// Mapping full month names to abbreviated forms
const monthAbbreviations = {
  JANUARY: "JAN",
  FEBRUARY: "FEB",
  MARCH: "MAR",
  APRIL: "APR",
  MAY: "MAY",
  JUNE: "JUN",
  JULY: "JUL",
  AUGUST: "AUG",
  SEPTEMBER: "SEP",
  OCTOBER: "OCT",
  NOVEMBER: "NOV",
  DECEMBER: "DEC",
};

function RevenueReport() {
  const [chartData, setChartData] = useState(null);
  const [revenueReportData, setRevenueReportData] = useState(null);
  const [revenueDate, setRevenueDate] = useState("");
  const [revenueAmount, setRevenueAmount] = useState(0);

  useEffect(() => {
    // Fetch revenue report data
    GetRevenueReport(setRevenueReportData, setRevenueDate, setRevenueAmount);

    // Fetch chart data
    RevenueChart(setChartData);
  }, []);

  // Convert API response years to Date objects with abbreviated month names and year
  const formatYears = (years) => {
    return years.map((yearStr) => {
      const [year, month] = yearStr.split(" ");
      const monthIndex = new Date(Date.parse(`${month} 1, 2020`)).getMonth();
      return {
        date: new Date(parseInt(year), monthIndex, 1),
        label: `${monthAbbreviations[month] || month} ${year}`, // Format as "MMM YYYY"
      };
    });
  };

  const AethenosDataSet = chartData?.aethenosDataSets || [];
  const RefundsDataSet = chartData?.refundsDataSets || [];
  const PromotionsDataSet = chartData?.promotionsDataSets || [];
  const formattedYears = chartData?.years ? formatYears(chartData.years) : [];

  const headerCellStyle = {
    fontWeight: "bold",
  };

  return (
    <div className="mb-5 all-courses-container">
      <div className="mb-4">
      <Typography className="m-0 p-0" variant="h4" gutterBottom>
        <p className="fs-5 font-bold">Revenue Report</p>
      </Typography>
      <h1 className="font-bold m-0 p-0">${formatNumber(revenueAmount)}</h1>
      <p className="fs-10 m-0 p-0">
        Your lifetime earnings as of {revenueDate}
      </p>
      </div>
      <Card className="p-2 ">
        {/* <p className="fs-5 font-bold">Revenue Report</p>
      <h1 className="font-bold m-0 p-0">${formatNumber(revenueAmount)}</h1>
      <p className="fs-10 m-0 p-0">
        Your lifetime earnings as of {revenueDate}
      </p> */}

        {chartData == null ? (
          "Loading.."
        ) : (
          <Card className="my-3">
            <LineChart
              xAxis={[
                {
                  id: "Years",
                  data: formattedYears.map((year) => year.date),
                  scaleType: "time",
                  valueFormatter: (date) => {
                    const yearData = formattedYears.find(
                      (year) => year.date.getTime() === date.getTime()
                    );
                    return yearData ? yearData.label : "";
                  },
                },
              ]}
              series={[
                {
                  id: "Aethenos",
                  label: "Aethenos",
                  data: AethenosDataSet,
                  stack: "total",
                  area: true,
                  showMark: false,
                },
                {
                  id: "Your Promotions",
                  label: "Your Promotions",
                  data: PromotionsDataSet,
                  stack: "total",
                  area: true,
                  showMark: false,
                },
                {
                  id: "Refunds",
                  label: "Refunds",
                  data: RefundsDataSet,
                  stack: "total",
                  area: true,
                  showMark: false,
                },
              ]}
              sx={{
                "--ChartsLegend-itemWidth": "200px",
              }}
              height={400}
              margin={{ left: 70 }}
            />
          </Card>
        )}

        {revenueReportData ? (
          <MaterialTable
            title="Revenue Report"
            columns={[
              {
                title: "Month",
                field: "month",
                render: (rowData) => (
                  <a href={`/performance/revenue-report/${rowData.id}`}>
                    {rowData.month}
                  </a>
                ),
                headerStyle: headerCellStyle,
              },
              {
                title: "Your revenue ($)",
                field: "yourRevenue",
                headerStyle: headerCellStyle,
              },
              {
                title: "Expected Payment Date",
                field: "expectedPaymentDate",
                headerStyle: headerCellStyle,
              },
            ]}
            data={revenueReportData}
            options={{
              sorting: true,
              exportButton: true,
            }}
          />
        ) : (
          <LoadingSpinner />
        )}
      </Card>
    </div>
  );
}

export default RevenueReport;
