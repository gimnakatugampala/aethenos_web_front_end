import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { LineChart } from "@mui/x-charts/LineChart";
import Card from "react-bootstrap/Card";
import Link from "@mui/material/Link";
import MaterialTable from "material-table";
import Button from "react-bootstrap/Button";
import TranslateIcon from "@mui/icons-material/Translate";
import LanguageIcon from "@mui/icons-material/Language";
import Map from "./Map";

const Students = () => {
  const headerCellStyle = {
    fontWeight: "bold",
  };
  const handleButtonClick = (rowData) => {
    console.log("Button clicked for row with data:", rowData);
  };
  return (
    <Card>
      <div className="d-flex justify-content-between p-2">
        <p className="fs-5 font-bold">Students</p>
        <button type="button" className="btn btn-primary ml-auto">
          Invite Students
        </button>
      </div>

      <MaterialTable
        title=" "
        columns={[
          {
            title: "Name",
            field: "name",
            headerStyle: headerCellStyle,
          },
          {
            title: "Enrolled",
            field: "enrolled",
            headerStyle: headerCellStyle,
          },
          {
            title: "Last Visited",
            field: "lastVisited",
            headerStyle: headerCellStyle,
          },
          {
            title: "Progress",
            field: "progress",
            headerStyle: headerCellStyle,
          },
          {
            title: "Questions Asked",
            field: "questionsAsked",
            headerStyle: headerCellStyle,
          },
          {
            title: "Questions Answered",
            field: "questionsAnswered",
            headerStyle: headerCellStyle,
          },
          {
            title: "Message",
            field: "messageButton",
            render: (rowData) => (
              <Button
                variant="btn btn-outline-dark"
                onClick={() => handleButtonClick(rowData)}
              >
                Message
              </Button>
            ),
            headerStyle: headerCellStyle,
          },
        ]}
        data={[
          {
            name: "John Doe",
            enrolled: "2023-01-15",
            lastVisited: "2023-03-05",
            progress: "75%",
            questionsAsked: 5,
            questionsAnswered: 10,
          },
          {
            name: "Jane Smith",
            enrolled: "2023-02-10",
            lastVisited: "2023-03-07",
            progress: "90%",
            questionsAsked: 8,
            questionsAnswered: 15,
          },
          {
            name: "Mike Johnson",
            enrolled: "2023-01-20",
            lastVisited: "2023-03-01",
            progress: "50%",
            questionsAsked: 3,
            questionsAnswered: 7,
          },
          {
            name: "Emily Brown",
            enrolled: "2023-02-05",
            lastVisited: "2023-03-08",
            progress: "85%",
            questionsAsked: 7,
            questionsAnswered: 12,
          },
          {
            name: "David Wilson",
            enrolled: "2023-02-15",
            lastVisited: "2023-03-06",
            progress: "70%",
            questionsAsked: 6,
            questionsAnswered: 11,
          },
          {
            name: "Sarah Davis",
            enrolled: "2023-01-10",
            lastVisited: "2023-03-03",
            progress: "60%",
            questionsAsked: 4,
            questionsAnswered: 9,
          },
          {
            name: "Michael Lee",
            enrolled: "2023-02-20",
            lastVisited: "2023-03-09",
            progress: "95%",
            questionsAsked: 9,
            questionsAnswered: 16,
          },
          {
            name: "Linda Harris",
            enrolled: "2023-01-25",
            lastVisited: "2023-03-02",
            progress: "80%",
            questionsAsked: 6,
            questionsAnswered: 13,
          },
          {
            name: "William Clark",
            enrolled: "2023-02-10",
            lastVisited: "2023-03-04",
            progress: "70%",
            questionsAsked: 5,
            questionsAnswered: 10,
          },
          {
            name: "Olivia Martinez",
            enrolled: "2023-01-15",
            lastVisited: "2023-03-10",
            progress: "85%",
            questionsAsked: 8,
            questionsAnswered: 14,
          },
          {
            timePeriod: "Apr 2023",
            amount: "$150",
            expectedPaymentDate: "2023-04-15",
            withholdingTax: "$50",
            netEarning: "$20",
            notes: "Note 2",
          },
          {
            timePeriod: "May 2023",
            amount: "$200",
            expectedPaymentDate: "2023-05-15",
            withholdingTax: "$50",
            netEarning: "$20",
            notes: "Note 3",
          },
          {
            timePeriod: "Jun 2023",
            amount: "$250",
            expectedPaymentDate: "2023-06-15",
            withholdingTax: "$50",
            netEarning: "$20",
            notes: "Note 4",
          },
          {
            timePeriod: "Jul 2023",
            amount: "$300",
            expectedPaymentDate: "2023-07-15",
            withholdingTax: "$50",
            netEarning: "$20",
            notes: "Note 5",
          },
        ]}
        options={{
          sorting: true,
          exportButton: true,
        }}
      />
      <Card className="mt-5">
        <Map />
      </Card>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <Card className="mt-5">
              <div className="bg-secondary text-light p-2 mb-1">
                <LanguageIcon />
                Countries
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-8">
                    <p>United State</p>
                    <p>Canada</p>
                    <p>United Kingdom</p>
                    <p>Australia</p>
                    <p>Germany</p>
                    <p>France</p>
                    <p>Japan</p>
                    <p>China</p>
                  </div>
                  <div className="col-4">
                    {" "}
                    <p>45%</p>
                    <p>65%</p>
                    <p>23%</p>
                    <p>66%</p>
                    <p>97%</p>
                    <p>99%</p>
                    <p>22%</p>
                    <p>65%</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-6">
            <Card className="mt-5">
              <div className="bg-secondary text-light p-2 mb-1">
                <TranslateIcon />
                Languages
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-8">
                    <p>English</p>
                    <p>Mandarin</p>
                    <p>Chinese</p>
                    <p>Spanish</p>
                    <p>Hindi</p>
                    <p>Arabic</p>
                    <p>French</p>
                    <p>Russian</p>
                  </div>
                  <div className="col-4">
                    {" "}
                    <p>45%</p>
                    <p>65%</p>
                    <p>23%</p>
                    <p>66%</p>
                    <p>97%</p>
                    <p>99%</p>
                    <p>22%</p>
                    <p>65%</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Students;
