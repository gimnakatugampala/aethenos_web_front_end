import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MaterialTable from "material-table";

function BeautifulLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `$${value}`} />{" "}
        {/* Display "$" symbol */}
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#007bff"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function CustomMaterialTable({ show }) {
  if (!show) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <MaterialTable
        title="Revenue Report"
        columns={[
          { title: "Time Period", field: "timePeriod" },
          { title: "Amount", field: "amount" },
          { title: "Expected Payment Date", field: "expectedPaymentDate" },
          { title: "Notes", field: "notes" },
        ]}
        data={[
          {
            timePeriod: "Q1 2023",
            amount: 5000,
            expectedPaymentDate: "2023-04-15",
            notes: "First Quarter Revenue",
          },
          {
            timePeriod: "Q2 2023",
            amount: 6500,
            expectedPaymentDate: "2023-07-15",
            notes: "Second Quarter Revenue",
          },
          {
            timePeriod: "Q3 2023",
            amount: 7200,
            expectedPaymentDate: "2023-10-15",
            notes: "Third Quarter Revenue",
          },
          {
            timePeriod: "Q4 2023",
            amount: 6900,
            expectedPaymentDate: "2024-01-15",
            notes: "Fourth Quarter Revenue",
          },
          {
            timePeriod: "Total",
            amount: 25600,
            expectedPaymentDate: "N/A",
            notes: "Yearly Total Revenue",
          },
        ]}
        options={{
          exportButton: true,
          headerStyle: {
            backgroundColor: "#007bff",
            color: "#fff",
          },
          rowStyle: (rowData) => ({
            backgroundColor: rowData.tableData.id === 0 ? "" : "#FFFFFF",
          }),
        }}
      />
    </div>
  );
}

function AdditionalChart() {
  const dataForAdditionalChart = [
    { month: "Jul", amount: 120 },
    { month: "Aug", amount: 150 },
    { month: "Sep", amount: 180 },
    { month: "Oct", amount: 160 },
    { month: "Nov", amount: 200 },
    { month: "Dec", amount: 170 },
  ];

  return <BeautifulLineChart data={dataForAdditionalChart} />;
}

function CombinedChart() {
  const tabTitleStyle = {
    fontSize: "12px",
  };

  const boldStyle = {
    fontWeight: "bold",
  };

  const enlargedFontSize = {
    fontSize: "20px",
  };

  const dataForTab1 = [
    { month: "Jan", amount: 60 },
    { month: "Feb", amount: 80 },
    { month: "Mar", amount: 110 },
    { month: "Apr", amount: 90 },
    { month: "May", amount: 130 },
    { month: "Jun", amount: 100 },
  ];

  const dataForTab3 = [
    { month: "Jan", amount: 40 },
    { month: "Feb", amount: 60 },
    { month: "Mar", amount: 90 },
    { month: "Apr", amount: 70 },
    { month: "May", amount: 110 },
    { month: "Jun", amount: 80 },
  ];

  const [showRevenueReport, setShowRevenueReport] = useState(false);

  const toggleRevenueReport = () => {
    setShowRevenueReport(!showRevenueReport);
  };

  return (
    <Card>
      <CardContent>
        <div>
          <h5 style={{ textAlign: "left", marginBottom: "20px" }}>
            Get top insights about your performance
          </h5>
          <Tabs
            id="controlled-tab-example"
            defaultActiveKey="home"
            className="mb-3"
          >
            <Tab
              eventKey="home"
              title={
                <span style={tabTitleStyle}>
                  <div style={{ margin: "10px", padding: "10px" }}>
                    Total Revenue: $50
                    <br />
                    <span style={{ ...enlargedFontSize, ...boldStyle }}>
                      $ 100-200
                    </span>
                    <br />
                    Monthly Revenue: $10
                  </div>
                </span>
              }
            >
              <BeautifulLineChart data={dataForTab1} />
            </Tab>
            <Tab
              eventKey="profile"
              title={
                <span style={tabTitleStyle}>
                  <div style={{ margin: "10px", padding: "10px" }}>
                    Total Revenue: $70
                    <br />
                    <span style={{ ...enlargedFontSize, ...boldStyle }}>
                      $ 200-300
                    </span>
                    <br />
                    Monthly Revenue: $15
                  </div>
                </span>
              }
            >
              <BeautifulLineChart data={dataForTab1} />
            </Tab>
            <Tab
              eventKey="contact"
              title={
                <span style={tabTitleStyle}>
                  <div style={{ margin: "10px", padding: "10px" }}>
                    Total Revenue: $100
                    <br />
                    <span style={{ ...enlargedFontSize, ...boldStyle }}>
                      $ 300-400
                    </span>
                    <br />
                    Monthly Revenue: $20
                  </div>
                </span>
              }
            >
              <BeautifulLineChart data={dataForTab3} />
            </Tab>
          </Tabs>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={toggleRevenueReport}
            style={{ margin: "10px", padding: "10px" }}
          >
            Revenue Report
          </Button>
          {showRevenueReport && (
            <div>
              <br />
              <br />
              <h5>Revenue Report</h5>
              <br />
              <h1>$42,200.00</h1>
              <p>Your Lifetime Earnings as of Dec 12, 2023</p>
              <AdditionalChart />
              <CustomMaterialTable show={showRevenueReport} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default CombinedChart;
