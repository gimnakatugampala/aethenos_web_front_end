import React, { useEffect, useState } from "react";
import { Card, Select } from "antd";
import MaterialTable from "material-table";
import { LineChart as LineChartNew, Line,AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import LoadingSpinner from "../../../commonFunctions/loaders/Spinner/LoadingSpinner";
import formatNumber from "../../../commonFunctions/NumberFormat";
import { GetRevenueReport, RevenueChart } from "../../../api";
import Typography from "@mui/material/Typography";

const { Option } = Select;

function RevenueReport() {
  const [chartData, setChartData] = useState(null);
  const [revenueReportData, setRevenueReportData] = useState(null);
  const [revenueDate, setRevenueDate] = useState("");
  const [revenueAmount, setRevenueAmount] = useState(0);
  const [filter, setFilter] = useState("Max");

  useEffect(() => {
    GetRevenueReport(setRevenueReportData, setRevenueDate, setRevenueAmount);
    RevenueChart(setChartData);
  }, []);

  const formatChartData = (chartData) => {
    if (!chartData) return [];
  
    const datasets = {
      Aethenos: "aethenosDataSets",
      Coupons: "couponsDataSets",
      ReferralLinks: "referralLinksDataSets",
      Refunds: "refundsDataSets",
    };
  
    const monthlyTotals = {};
  
    Object.entries(datasets).forEach(([key, datasetKey]) => {
      if (chartData[datasetKey] && Array.isArray(chartData[datasetKey])) {
        chartData[datasetKey].forEach((entry) => {
          const date = new Date(entry.timestamp);
          const formattedDate = date.toLocaleString("en-US", { month: "short", year: "numeric" }).toUpperCase(); // E.g., "DEC 2024"
          const amount = parseFloat(entry.amount) || 0; // Ensure numeric value
  
          if (!monthlyTotals[formattedDate]) {
            monthlyTotals[formattedDate] = { name: formattedDate, Aethenos: 0, Coupons: 0, ReferralLinks: 0, Refunds: 0 };
          }
  
          monthlyTotals[formattedDate][key] += amount; // Sum the amounts
          monthlyTotals[formattedDate][key] = parseFloat(monthlyTotals[formattedDate][key].toFixed(2)); // Round to 2 decimal places
        });
      }
    });
  
    return Object.values(monthlyTotals);
  };
  
  const formattedChartData = formatChartData(chartData);
  
  
  

  

  if (!chartData) return <LoadingSpinner />;

  const filterData = (data, filter) => {
    if (!data.length) return [];
  
    const today = new Date();
    const getDateOffset = (months) => {
      const d = new Date();
      d.setMonth(d.getMonth() - months);
      return d;
    };
  
    switch (filter) {
      case "Week":
        return data.filter((item) => {
          const itemDate = new Date(item.name);
          return itemDate >= new Date(today.setDate(today.getDate() - 7));
        });
  
      case "Month":
        return data.filter((item) => {
          const itemDate = new Date(item.name);
          return itemDate >= new Date(today.setDate(today.getDate() - 30));
        });
  
      case "6 Months":
        return data.filter((item) => {
          const itemDate = new Date(item.name);
          return itemDate >= getDateOffset(6);
        });
  
      case "1 Year":
        return data.filter((item) => {
          const itemDate = new Date(item.name);
          return itemDate >= getDateOffset(12);
        });
  
      case "6 Years":
        return data.filter((item) => {
          const itemDate = new Date(item.name);
          return itemDate >= getDateOffset(72);
        });
  
      case "Max":
      default:
        return data;
    }
  };
  





  return (
    <div className="mb-5 all-courses-container">
      <div className="mb-4">
        <Typography variant="h4" gutterBottom>
          <p className="fs-5 font-bold">Revenue Report</p>
        </Typography>
        <h1 className="font-bold">${formatNumber(revenueAmount)}</h1>
        <p className="fs-10">Your lifetime earnings as of {revenueDate}</p>
        <Select defaultValue={filter} onChange={setFilter} style={{ width: 150, marginBottom: 20 }}>
          <Option value="Month">Month</Option>
          <Option value="6 Months">6 Months</Option>
          <Option value="YTD">YTD</Option>
          <Option value="5 Years">5 Years</Option>
          <Option value="Max">Max</Option>
        </Select>
      </div>
      <Card className="p-2">
      <Card className="my-3">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={filterData(formattedChartData, filter)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" label={{ value: "Date", position: "insideBottom", offset: -10 }} />
              <YAxis label={{ value: "Amount (USD)", angle: -90, position: "insideLeft", offset: -10 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="Aethenos" stroke="#4caf50" fill="#4caf50" fillOpacity={0.3} />
              <Area type="monotone" dataKey="Coupons" stroke="#fbc02d" fill="#fbc02d" fillOpacity={0.3} />
              <Area type="monotone" dataKey="ReferralLinks" stroke="#2196f3" fill="#2196f3" fillOpacity={0.3} />
              <Area type="monotone" dataKey="Refunds" stroke="#f44336" fill="#f44336" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {revenueReportData ? (
          <MaterialTable
            title="Revenue Report"
            columns={[
              { title: "Month", field: "month", render: (rowData) => <a href={`/performance/revenue-report/${rowData.month}`}>{rowData.month}</a> },
              { title: "Your revenue ($)", field: "yourRevenue" },
              { title: "Expected Payment Date", field: "expectedPaymentDate" }
            ]}
            data={revenueReportData}
            options={{ sorting: true, exportButton: true }}
          />
        ) : (
          <LoadingSpinner />
        )}
      </Card>
    </div>
  );
}

export default RevenueReport;
