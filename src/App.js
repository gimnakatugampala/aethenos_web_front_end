/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import AllCourses from "./pages/courses/all-courses/AllCourses";
import AddCourses from "./pages/courses/add-courses/AddCourses";
import ManageCourses from "./pages/courses/manage-courses/ManageCourses";

import Pricing from "./pages/courses/manage-courses/pricing/Pricing";
import courseMessages from "./pages/courses/manage-courses/messages/courseMessages";
import courseStructure from "./pages/courses/manage-courses/course-structure/courseStructure";
import captions from "./pages/courses/manage-courses/captions/captions";
import Film from "./pages/courses/manage-courses/film/Film";
import Curriculum from "./pages/courses/manage-courses/curriculum/Curriculum";
import Promotions from "./pages/courses/manage-courses/promotions/Promotions";
import Basics from "./pages/courses/manage-courses/basics/Basics";
import Accessibility from "./pages/courses/manage-courses/accessibility/AccessibilityPage";

import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />


        <Route path="/courses/manage/2023/" exact component={ManageCourses} />
        <Route path="/courses/manage/2023/course-structure" exact component={courseStructure} />

        <Route path="/courses/manage/2023/film" exact component={Film} />
        <Route path="/courses/manage/2023/curriculum" exact component={Curriculum} />
        <Route path="/courses/manage/2023/captions" exact component={captions} />
        <Route path="/courses/manage/2023/accessibility" exact component={Accessibility} />
        <Route path="/courses/manage/2023/basics" exact component={Basics} />
        <Route path="/courses/manage/2023/pricing" exact component={Pricing} />
        <Route path="/courses/manage/2023/promotions" exact component={Promotions} />
        <Route path="/courses/manage/2023/messages" exact component={courseMessages} />

        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={Profile} />

          <Route exact path="/courses" component={AllCourses} />
          <Route exact path="/add-courses" component={AddCourses} />

          
        </Main>
          <Redirect from="*" to="/courses" />
        
      </Switch>
    </div>
  );
}

export default App;
