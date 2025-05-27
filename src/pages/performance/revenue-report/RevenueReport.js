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
        const dateObj = new Date(entry.timestamp);
        const formattedDate = dateObj.toLocaleString("en-US", {
          month: "short",
          year: "numeric",
        }).toUpperCase(); // e.g. "OCT 2024"
        const amount = parseFloat(entry.amount) || 0;

        if (!monthlyTotals[formattedDate]) {
          monthlyTotals[formattedDate] = {
            name: formattedDate,
            Aethenos: 0,
            Coupons: 0,
            ReferralLinks: 0,
            Refunds: 0,
            tooltipDate: dateObj.toISOString().split("T")[0],  // set tooltipDate here
          };
        }

        monthlyTotals[formattedDate][key] += amount;
        monthlyTotals[formattedDate][key] = parseFloat(monthlyTotals[formattedDate][key].toFixed(2));

        // Optional: Update tooltipDate if the current date is later (if you want latest date)
        if (dateObj.toISOString().split("T")[0] > monthlyTotals[formattedDate].tooltipDate) {
          monthlyTotals[formattedDate].tooltipDate = dateObj.toISOString().split("T")[0];
        }
      });
    }
  });

  // Padding missing months
  const currentDate = new Date();
  const earliestDate = Object.keys(monthlyTotals)
    .map((key) => {
      // Parse month-year string to date with day=1
      const [monthStr, year] = key.split(" ");
      return new Date(`${monthStr} 1, ${year}`);
    })
    .sort((a, b) => a - b)[0] || new Date();

  let cursor = new Date(earliestDate.getFullYear(), earliestDate.getMonth(), 1);
  const end = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  while (cursor <= end) {
    const formatted = cursor.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    }).toUpperCase();

    if (!monthlyTotals[formatted]) {
      monthlyTotals[formatted] = {
        name: formatted,
        Aethenos: 0,
        Coupons: 0,
        ReferralLinks: 0,
        Refunds: 0,
        tooltipDate: cursor.toISOString().split("T")[0],  // use cursor here
      };
    }

    cursor.setMonth(cursor.getMonth() + 1);
  }

  return Object.values(monthlyTotals).sort((a, b) => {
    const d1 = new Date(a.name);
    const d2 = new Date(b.name);
    return d1 - d2;
  });
};





  
  const formattedChartData = formatChartData(chartData);
  
  
  if (!chartData) return <LoadingSpinner />;

  const parseMonthYear = (monthYearStr) => {
  const [monthStr, year] = monthYearStr.split(" ");
  const month = new Date(`${monthStr} 1, ${year}`).getMonth();
  return new Date(year, month);
};

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
        const itemDate = parseMonthYear(item.name);
        return itemDate >= new Date(today.setDate(today.getDate() - 7));
      });

    case "Month": {
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      return data.filter((item) => {
        const itemDate = parseMonthYear(item.name);
        return (
          itemDate.getMonth() === currentMonth &&
          itemDate.getFullYear() === currentYear
        );
      });
    }

    case "6 Months":
      return data.filter((item) => {
        const itemDate = parseMonthYear(item.name);
        return itemDate >= getDateOffset(6);
      });

    case "1 Year":
      return data.filter((item) => {
        const itemDate = parseMonthYear(item.name);
        return itemDate >= getDateOffset(12);
      });

    case "6 Years":
      return data.filter((item) => {
        const itemDate = parseMonthYear(item.name);
        return itemDate >= getDateOffset(72);
      });

    case "YTD": {
      const currentYear = today.getFullYear();
      const startOfYear = new Date(currentYear, 0); // Jan 1st
      return data.filter((item) => {
        const itemDate = parseMonthYear(item.name);
        return itemDate >= startOfYear && itemDate <= today;
      });
    }

    case "Max":
    default:
      return data;
  }
};


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="custom-tooltip bg-white p-2 border rounded shadow">
        <p className="label font-bold">{`Month: ${label}`}</p>
        <p className="text-sm text-gray-500">{`Date: ${item.tooltipDate}`}</p>
        <div className="mt-2">
          {payload.map((entry) => (
            <p
              key={entry.dataKey}
              style={{ color: entry.color, margin: 0 }}
            >
              {`${entry.dataKey}: $${entry.value.toFixed(2)}`}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return null;
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
          <Option value="Max">Lifetime</Option>
        </Select>
      </div>
      <Card className="p-2">
      <Card className="my-3">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={filterData(formattedChartData, filter)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
             <XAxis
          dataKey="name"
          interval="preserveStartEnd"
          angle={-45}
          textAnchor="end"
          height={80}
          tick={{ dy: 10 }}
        />

              <YAxis label={{ value: "Amount (USD)", angle: -90, position: "insideLeft", offset: -10 }} />
              <Tooltip content={<CustomTooltip />} />

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
