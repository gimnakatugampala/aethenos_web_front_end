
import { Switch, Route , Redirect } from "react-router-dom";
import Home from "./pages/home/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import AllCourses from "./pages/courses/all-courses/AllCourses";
import AddCourses from "./pages/courses/add-courses/AddCourses";
import EditCourse from "./pages/courses/edit-courses/EditCourse";
import ManageCourses from "./pages/courses/manage-courses/ManageCourses";


import Reviews from "./pages/reviews/Reviews";
import Overview from "./pages/performance/overview/Overview";
import RevenueReport from "./pages/performance/revenue-report/RevenueReport";

import theme from "./commonFunctions/theme";

import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

import { ThemeProvider } from "@mui/material";


function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />


        <Route path="/courses/manage/2023/" exact component={ManageCourses} />

        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={Profile} />

          <Route exact path="/courses" component={AllCourses} />
          <Route exact path="/add-courses" component={AddCourses} />
          <Route exact path="/edit-course" component={EditCourse} />


           <Route exact path="/performance/revenue-report" component={RevenueReport} />
           <Route exact path="/performance/overview" component={Overview} />
           <Route exact path="/performance/reviews" component={Reviews} />

        </Main>
          <Redirect from="*" to="/courses" />
        
      </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
