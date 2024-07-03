import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";

import AllCourses from "./pages/courses/all-courses/AllCourses";
import AddCourses from "./pages/courses/add-courses/AddCourses";
import EditCourse from "./pages/courses/edit-courses/EditCourse";
import ManageCourses from "./pages/courses/manage-courses/ManageCourses";

import Reviews from "./pages/performance/reviews/Reviews";
import Overview from "./pages/performance/overview/Overview";
import RevenueReport from "./pages/performance/revenue-report/RevenueReport";
import SingleRevenueReport from "./pages/performance/overview/SingleRevenueReport";
import TrafficConversation from "./pages/performance/traffic-conversations/TrafficConversation";
import CourseEngagement from "./pages/performance/course-engagement/CourseEngagement";
import Annoucements from "./pages/communications/annoucements/Annoucements";
import Assignments from "./pages/communications/assignments/Assignments";
import Students from "./pages/performance/students/Students";
import Verification from "./pages/profile/verification/Verification";
import Payouts from "./pages/profile/payouts/Payouts";

import QA from "./pages/communications/qa/QA";
import Messages from "./pages/communications/messages/Messages";

import MyProfile from "./pages/profile/my-profile/MyProfile";
import AccountSettings from "./pages/profile/account-settings/AccountSettings";
// import Login from "./pages/login/Login.js"

import theme from "./commonFunctions/theme";

import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { VerifyTheInstructor } from "./api";

import './App.css'

function App() {


  return (
    <div className="App">
     
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sign-up" exact component={SignUp} />
          {/* <Route path="/sign-in" exact component={SignIn} /> */}
          <Route path="/login" exact component={SignIn} />
          <Route path="/forgot-password" exact component={ForgotPassword} />

          <Route path="/courses/manage/:code/" exact component={ManageCourses} />

          <Main>
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/tables" component={Tables} />
            <Route exact path="/billing" component={Billing} />
            <Route exact path="/rtl" component={Rtl} />
            {/* <Route exact path="/profile" component={Profile} /> */}

            <Route exact path="/courses" component={AllCourses} />
            <Route exact path="/add-courses" component={AddCourses} />
            <Route exact path="/edit-course" component={EditCourse} />

            <Route exact path="/profile" component={MyProfile} />
            <Route exact path="/verification" component={Verification} />
            <Route exact path="/payouts" component={Payouts} />
            <Route exact path="/account-settings" component={AccountSettings} />
            
            <Route
              exact
              path="/communications/qa"
              component={QA}
            />

            <Route
              exact
              path="/communications/messages"
              component={Messages}
            />


            <Route
              exact
              path="/communications/announcements"
              component={Annoucements}
            />


            <Route
              exact
              path="/communications/assignments"
              component={Assignments}
            />


            <Route
              exact
              path="/performance/revenue-report"
              component={RevenueReport}
            />

            <Route
              exact
              path="/performance/engagement"
              component={CourseEngagement}
            />

            
            <Route
              exact
              path="/performance/revenue-report/:id"
              component={SingleRevenueReport}
            />
            <Route exact path="/performance/overview" component={Overview} />
            <Route exact path="/performance/reviews" component={Reviews} />
            <Route exact path="/performance/traffic-conversions" component={TrafficConversation} />
            <Route exact path="/performance/students" component={Students} />
          </Main>
          <Redirect from="*" to="/courses" />
        </Switch>
      </ThemeProvider>
     
    </div>
  );
}

export default App;
