import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ChatIcon from "@mui/icons-material/Chat";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SpeakerPhoneIcon from "@mui/icons-material/SpeakerPhone";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import logoFull from "../../assets/images/utils/aethenos_logo.png";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const signup = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      key={0}
    >
      <path
        d="M0,2A2,2,0,0,1,2,0H8a2,2,0,0,1,2,2V8a2,2,0,0,1-2,2H2A2,2,0,0,1,0,8Z"
        transform="translate(4 4)"
        fill={color}
      />
      <path
        d="M2,0A2,2,0,0,0,0,2V8a2,2,0,0,0,2,2V4A2,2,0,0,1,4,2h6A2,2,0,0,0,8,0Z"
        fill={color}
      />
    </svg>,
  ];

  return (
    <>
      <Menu theme="light" mode="inline">
        <div className="brand brand-nav-large">
          <img
            width="150"
            src={logoFull}
            alt="LOGO"
            // style={{ marginRight: "10px" }}
          />
        </div>

        <div className="brand brand-large">
            <img
              width="150"
              src={logoFull}
              alt="LOGO"
              style={{ marginRight: "10px", marginTop: "10px", marginBottom: "10px" }}
            />
          </div>

        <Menu.Item className="menu-item-header" key="1">
          Courses
        </Menu.Item>

        <Menu.Item key="2">
          <NavLink to="/courses">
            <span
              className="icon"
              style={{
                background: page === "courses" ? color : "",
              }}
            >
              <AutoStoriesIcon />
            </span>
            <span className="label">Courses</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item className="menu-item-header" key="3">
          Communications
        </Menu.Item>

        <Menu.Item key="4">
          <NavLink to="/communications/qa">
            <span
              className="icon"
              style={{
                background: page === "communications/qa" ? color : "",
              }}
            >
              <QuestionMarkIcon />
            </span>
            <span className="label">Q & A</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="5">
          <NavLink to="/communications/messages">
            <span
              className="icon"
              style={{
                background: page === "communications/messages" ? color : "",
              }}
            >
              <ChatIcon />
            </span>
            <span className="label">Messages</span>
          </NavLink>
        </Menu.Item>

        {/* <Menu.Item key="6">
          <NavLink to="/communications/assignments">
            <span
              className="icon"
              style={{
                background: page === "communications/assignments" ? color : "",
              }}
           >
           <AssignmentIcon />
           </span>
            <span className="label">Assignments</span>
          </NavLink>
        </Menu.Item> */}

        <Menu.Item key="7">
          <NavLink to="/communications/announcements">
            <span
              className="icon"
              style={{
                background:
                  page === "communications/announcements" ? color : "",
              }}
            >
              <SpeakerPhoneIcon />
            </span>
            <span className="label">Announcements</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item className="menu-item-header" key="8">
          Performance
        </Menu.Item>

        <Menu.Item key="9">
          <NavLink to="/performance/overview">
            <span
              className="icon"
              style={{
                background: page === "performance/overview" ? color : "",
              }}
            >
              <LeaderboardIcon />
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="10">
          <NavLink to="/performance/students">
            <span
              className="icon"
              style={{
                background: page === "performance/students" ? color : "",
              }}
            >
              <PersonOutlineIcon />
            </span>
            <span className="label">Students</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="11">
          <NavLink to="/performance/reviews">
            <span
              className="icon"
              style={{
                background: page === "performance/reviews" ? color : "",
              }}
            >
              {signup}
            </span>
            <span className="label">Reviews</span>
          </NavLink>
        </Menu.Item>

        {/* <Menu.Item key="12">
          <NavLink to="/performance/engagement">
            <span
              className="icon p-2"
              style={{
                background: page === "performance/engagement" ? color : "",
              }}
           ><LocalLibraryIcon  /></span>
            <span className="label">Course Engagement</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="13">
          <NavLink to="/performance/traffic-conversions">
            <span
              className="icon p-2"
              style={{
                background: page === "/performance/traffic-conversions" ? color : "",
              }}
           ><QueryStatsIcon /></span>
            <span className="label">Traffic&Conversions</span>
          </NavLink>
        </Menu.Item> */}

        {/* <Menu.Item key="7">
          <NavLink to="/all-courses">
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : "",
              }}
            >
              {profile}
            </span>
            <span className="label">Courses</span>
          </NavLink>  
        </Menu.Item>

        <Menu.Item key="7">
          <NavLink to="/sign-in">
            <span className="icon">{signin}</span>
            <span className="label">Sign In</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="8">
          <NavLink to="/sign-up">
            <span className="icon">{signup}</span>
            <span className="label">Sign Up</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="10">
          <NavLink to="/add-courses">
            <span className="icon">{signup}</span>
            <span className="label">Courses</span>
          </NavLink>
        </Menu.Item> */}
      </Menu>
    </>
  );
}

export default Sidenav;
