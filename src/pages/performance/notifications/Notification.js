import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { LineChart } from "@mui/x-charts/LineChart";
import Link from "@mui/material/Link";
import MaterialTable from "material-table";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TranslateIcon from "@mui/icons-material/Translate";
import LanguageIcon from "@mui/icons-material/Language";
import AddIcon from "@mui/icons-material/Add";
import ForumIcon from "@mui/icons-material/Forum";
import FormControl from "@mui/material/FormControl";
import { Layout, Select, Space } from "antd";
import Card from "@mui/material/Card";
import { GetNotifications } from "../../../api";

const Notification = () => {
  const headerCellStyle = {
    fontWeight: "bold",
  };

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    GetNotifications(setNotifications);
  }, []);

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  return (

      <div className="mb-5 all-courses-container">
        <div
          className="row mb-4 mx-2"
          style={{ justifyContent: "space-between" }}
        >
          <div className="col-md-2">
            <Typography variant="h4" gutterBottom>
              Notifications
            </Typography>
          </div>
        </div>
        <Card className="border-rad-20">
        <div className="px-5 m-3 py-3">
        
        <MaterialTable
            className="border-rad-20 p-2 px-4 mx-5"
            title=""
            columns={[
              {
                title: "Notification",
                field: "notification",
                headerStyle: headerCellStyle,
                cellStyle: { width: "60%" }, 
              },
              {
                title: "Notification Time",
              field: "notificationTime",
              headerStyle: headerCellStyle,
              render: rowData => formatDateTime(rowData.notificationTime), // Formatting the date and time
              cellStyle: { width: "40%" }, 
            
              },
            ]}
            data={notifications}
            options={{
              sorting: true,
              exportButton: true,
            }}
          />
          </div>
        </Card>
      </div>
 
  );
};

export default Notification;
