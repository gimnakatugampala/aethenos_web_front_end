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
        <YAxis />
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
    <MaterialTable
      title="Revenue Report"
      columns={[
        { title: "Name", field: "name" },
        { title: "Surname", field: "surname" },
        { title: "Birth Year", field: "birthYear", type: "numeric" },
        {
          title: "Birth Place",
          field: "birthCity",
          lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
        },
      ]}
      data={[
        { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
        {
          name: "Zerya Betül",
          surname: "Baran",
          birthYear: 2017,
          birthCity: 34,
        },
      ]}
      options={{
        exportButton: true,
        headerStyle: {
          backgroundColor: "#007bff",
          color: "#fff",
        },
      }}
    />
  );
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
          <Tabs
            id="controlled-tab-example"
            defaultActiveKey="home"
            className="mb-3"
          >
            <Tab
              eventKey="home"
              title={
                <span style={tabTitleStyle}>
                  Total Revenue: $50
                  <br />
                  <span style={{ ...enlargedFontSize, ...boldStyle }}>
                    $ 100-200
                  </span>
                  <br />
                  Monthly Revenue: $10
                </span>
              }
            >
              <BeautifulLineChart data={dataForTab1} />
            </Tab>
            <Tab
              eventKey="profile"
              title={
                <span style={tabTitleStyle}>
                  Total Revenue: $70
                  <br />
                  <span style={{ ...enlargedFontSize, ...boldStyle }}>
                    $ 200-300
                  </span>
                  <br />
                  Monthly Revenue: $15
                </span>
              }
            >
              <BeautifulLineChart data={dataForTab1} />
            </Tab>
            <Tab
              eventKey="contact"
              title={
                <span style={tabTitleStyle}>
                  Total Revenue: $100
                  <br />
                  <span style={{ ...enlargedFontSize, ...boldStyle }}>
                    $ 300-400
                  </span>
                  <br />
                  Monthly Revenue: $20
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
          >
            Revenue Report
          </Button>
          <CustomMaterialTable show={showRevenueReport} />
        </div>
      </CardContent>
    </Card>
  );
}

export default CombinedChart;
