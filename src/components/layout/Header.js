import React, { useState, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Row, Col, Breadcrumb, List } from "antd";
import Button from "@mui/material/Button";
import Dropdown from "react-bootstrap/Dropdown";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import { parseISO, formatDistanceToNow } from "date-fns";
// import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";

import {
  SearchOutlined,
  StarOutlined,
  TwitterOutlined,
  FacebookFilled,
} from "@ant-design/icons";

import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
// import avtar from "../../assets/images/team-2.jpg";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Popover from "@mui/material/Popover";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaidIcon from "@mui/icons-material/Paid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Cookies from "js-cookie";
import SettingsIcon from "@mui/icons-material/Settings";
import { GetInstructorProfileDetails, GetNotificationsLatest } from "../../api";
import { ENV_STATUS } from "../../commonFunctions/env";
import bellIcon from "../../assets/images/utils/icons8-notification-50.png";
import logo from "../../assets/images/utils/aethenos_logo.jpg";

const calculateTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) return `${interval} years ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;
  return `${Math.floor(seconds)} seconds ago`;
};

function Header({
  placement,
  name,
  subName,
  onPress,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
}) {
  const [notifications, setNotifications] = useState([]);

  const [first_Name, setfirst_Name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [headline, setheadline] = useState("");
  const [biography, setbiography] = useState("");
  const [website, setwebsite] = useState("");
  const [twitter, settwitter] = useState("");
  const [facebook, setfacebook] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [youtube, setyoutube] = useState("");
  const [profile_img, setprofile_img] = useState("");
  const [uploadImage, setuploadImage] = useState("");

  useEffect(() => {
    GetNotificationsLatest(setNotifications);
  }, []);

  const handleNotification = () => {
    // Add your notification logic here
    // For example, add a new notification to the list
    const newNotification = {
      id: Date.now(),
      message: "New notification message",
    };
    setNotifications([...notifications, newNotification]);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    GetInstructorProfileDetails(
      setfirst_Name,
      setlast_name,
      setheadline,
      setbiography,
      setwebsite,
      settwitter,
      setfacebook,
      setlinkedin,
      setyoutube,
      setprofile_img
    );
  }, []);

  // Logout
  const handleLogout = () => {
    if (ENV_STATUS == "dev") {
      Cookies.remove("aethenos", { path: "" });
      window.location.reload();
    } else {
      Cookies.remove("aethenos", { domain: ".aethenos.com" });
      window.location.href = "aethenos.com";
    }
  };

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
        <div className="brand">
        <img width="150" src={logo} alt="LOGO" />
        {/* <span>Aethenos</span> */}
      </div>
        
        </Col>
        <Col span={24} md={18} className="header-control">
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <a href="https://aethenos.com" style={{ minWidth: 100 }}>
                Student
              </a>

              <Dropdown>
                <Dropdown.Toggle
                  variant="danger"
                  id="dropdown-basic"
                  className="notification-toggle"
                  bsPrefix="custom-toggle"
                >
                  <img width="20px" src={bellIcon} alt="LOGO" />
                  <span className="notification-count">
                    {notifications.length}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <div height="80px">
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        color: "#ff4d4f",
                        alignItems: "center",
                      }}
                    >
                      <NotificationsNoneOutlinedIcon
                        style={{ margin: "auto" }}
                      />

                      <span
                        style={{
                          fontSize: "14px",
                          color: "black",
                          display: "flex",
                          flexDirection: "row",
                          fontWeight: "bold",
                          justifyContent: "flex-end",
                        }}
                      >
                        You Have Received {notifications.length} New
                        Notifications
                      </span>

                      <Button className="m-2" variant="outlined">
                        <a href="/performance/notifications">View All</a>
                      </Button>
                    </span>
                  </div>
                  {notifications.map((notification, index) => (
                    <Dropdown.Item
                      key={index}
                      style={{
                        justifyContent: "flex-start",
                        display: "flex",
                        flexDirection: "column",

                        border: "1px solid #e0e0e0",
                        padding: "10px",
                        boxSizing: "border-box",
                      }}
                    >
                      <MenuItem
                        onClick={handleClose}
                        style={{
                          width: "400px",
                          display: "flex",
                          flexDirection: "row",
                          textWrap: "balance",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <ListItemIcon>
                            <NotificationsNoneOutlinedIcon />
                          </ListItemIcon>
                          <span style={{ fontWeight: "bold" }}>
                            {notification.notification}
                          </span>
                        </div>
                      </MenuItem>

                      <span
                        style={{
                          fontSize: "12px",
                          color: "gray",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        {calculateTimeAgo(notification.notificationTime)}
                      </span>
                    </Dropdown.Item>
                  ))}
                  {notifications.length === 0 && (
                    <Dropdown.Item>No notifications</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    src="/static/images/avatar/1.jpg"
                    alt={`${first_Name} ${last_name}`}
                    sx={{ width: 35, height: 35 }}
                  >{`${first_Name[0]}${last_name[0]}`}</Avatar>
                </IconButton>
              </Tooltip>
            </Box>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                    color: "red",
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <a href="/profile">
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="medium" />
                  </ListItemIcon>
                  Profile Details
                </MenuItem>
              </a>

              <Divider />

              <a href="/account-settings">
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="medium" />
                  </ListItemIcon>
                  Account Settings
                </MenuItem>
              </a>

              <Divider />

              <a href="/verification">
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <CheckCircleIcon fontSize="medium" />
                  </ListItemIcon>
                  Instructor Verification
                </MenuItem>
              </a>

              <Divider />

              <Divider />

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="medium" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </React.Fragment>
        </Col>
      </Row>
    </>
  );
}

export default Header;
