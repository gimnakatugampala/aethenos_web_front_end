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
    GetRevenueReport(setRevenueReportData, setRevenueDate, setRevenueAmount);
    RevenueChart(setChartData);
  }, []);

  const formatYears = (years) => {
    return years.map((yearStr) => {
      const [year, month] = yearStr.split(" ");
      const monthIndex = new Date(Date.parse(`${month} 1, 2020`)).getMonth();
      return {
        date: new Date(parseInt(year), monthIndex, 1),
        label: `${monthAbbreviations[month] || month} ${year}`,
      };
    });
  };

  const findEarliestIndex = () => {
    const datasets = [
      chartData?.aethenosDataSets || [],
      chartData?.refundsDataSets || [],
      chartData?.referalLinkDataSets || [],
      chartData?.couponDataSets || [],
    ];

    const earliestIndex = datasets.reduce((earliest, dataset) => {
      const index = dataset.findIndex((value) => value !== 0);
      return index !== -1 ? Math.min(earliest, index) : earliest;
    }, chartData?.years.length || 0);

    return earliestIndex;
  };

  if (!chartData) {
    return <LoadingSpinner />;
  }

    // Round up chart data to 2 decimal places
    const AethenosDataSet = chartData.aethenosDataSets.map((val) => val ? val.toFixed(2) : "0.00");
    const RefundsDataSet = chartData.refundsDataSets.map((val) => val ? val.toFixed(2) : "0.00");
    const ReferalLinkDataSet = chartData.referalLinkDataSets.map((val) => val ? val.toFixed(2) : "0.00");
    const CouponDataSet = chartData.couponDataSets.map((val) => val ? val.toFixed(2) : "0.00");
    const formattedYears = formatYears(chartData.years);
  
    const earliestIndex = findEarliestIndex();
    const filteredYears = formattedYears.slice(earliestIndex);
    const filteredAethenosData = AethenosDataSet.slice(earliestIndex);
    const filteredRefundsData = RefundsDataSet.slice(earliestIndex);
    const filteredReferalData = ReferalLinkDataSet.slice(earliestIndex);
    const filteredCouponData = CouponDataSet.slice(earliestIndex);

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
      <Card className="p-2">
        <Card className="my-3">
          <LineChart
            xAxis={[
              {
                id: "Years",
                data: filteredYears.map((year) => year.date),
                scaleType: "time",
                valueFormatter: (date) => {
                  const yearData = filteredYears.find(
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
                data: filteredAethenosData,
                stack: "total",
                area: true,
                showMark: false,
                color: "#4caf50", // Green
              },
              {
                id: "Coupons",
                label: "Coupons",
                data: filteredCouponData,
                stack: "total",
                area: true,
                showMark: false,
                color: "#fbc02d", // Dark Yellow
              },
              {
                id: "Referral Links",
                label: "Referral Links",
                data: filteredReferalData,
                stack: "total",
                area: true,
                showMark: false,
                color: "#2196f3", // Blue
              },
              {
                id: "Refunds",
                label: "Refunds",
                data: filteredRefundsData,
                stack: "total",
                area: true,
                showMark: false,
                color: "#f44336", // Red
              },
            ]}
            sx={{
              "--ChartsLegend-itemWidth": "200px",
            }}
            height={400}
            margin={{ left: 70 }}
          />
        </Card>

        {revenueReportData ? (
          <MaterialTable
            title="Revenue Report"
            columns={[
              {
                title: "Month",
                field: "month",
                render: (rowData) => (
                  <a href={`/performance/revenue-report/${rowData.month}`}>
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
