import React, { useState, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Row, Col, Breadcrumb, Button, List } from "antd";
import Dropdown from "react-bootstrap/Dropdown";

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
import { GetInstructorProfileDetails, GetNotifications } from "../../api";
import { ENV_STATUS } from "../../commonFunctions/env";
import bellIcon from "../../assets/images/utils/icons8-notification-50.png";
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
    GetNotifications(setNotifications);
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
        <Col span={24} md={6}></Col>
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
                  {notifications.map((notification, index) => (
                    <Dropdown.Item key={index}>
                      {notification.notification}
                    </Dropdown.Item>
                  ))}
                  {notifications.length === 0 && (
                    <Dropdown.Item>No notifications</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>

              {/* <Typography sx={{ minWidth: 50 }}>
        <Badge badgeContent={notifications.length}} color="primary">
            <NotificationsIcon color="action" />
          </Badge>
        </Typography> */}

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

              {/* <a href="/payouts">
        <MenuItem onClick={handleClose}>
        <ListItemIcon>
            <PaidIcon fontSize="medium"  />
          </ListItemIcon>
          Payouts Details
        </MenuItem>
        </a> */}

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
