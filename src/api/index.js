import SuccessAlert from "../commonFunctions/Alerts/SuccessAlert";
import ErrorAlert from "../commonFunctions/Alerts/ErrorAlert";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { ENV_STATUS } from "../commonFunctions/env";
import moment from "moment";
import { FILE_PATH } from "../commonFunctions/FilePaths";
import Persona from "persona";
import { useRef, useState } from "react";
import ReactToastSuccess from "../commonFunctions/Toasts/ReactToastSuccess";
import SuccessToast from "../commonFunctions/Toasts/SuccessToast";

const CURRENT_USER = Cookies.get("aethenos");
const BACKEND_LINK = "https://aethenosinstructor.exon.lk:2053/aethenos-api";

// Unauthorized
const Unauthorized = (result, rediect_url) => {
  if (result == 401) {
    // window.localStorage.removeItem("aethenos")

    if (ENV_STATUS == "dev") {
      Cookies.remove("aethenos", { path: "" });
    } else {
      Cookies.remove("aethenos", { domain: ".aethenos.com" });
    }

    window.location.href = `/login?sessionTimeout=true&rediect-url=${rediect_url}`;
  }
};

export const LoginInstructor = async (email, password, url, setloading) => {
  setloading(true);

  var formdata = new FormData();
  formdata.append("email", `${email}`);
  formdata.append("password", `${password}`);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/authentication/instructor`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      if (result.message == "incorrect password.") {
        setloading(false);
        ErrorAlert(result.message, result.variable);
        return;
      } else {
        SuccessAlert(
          "Login successful!",
          "Successfully login as an instructor"
        );

        if (ENV_STATUS == "dev") {
          Cookies.set("aethenos", result.token, { expires: 7, path: "" });
        } else {
          Cookies.set("aethenos", result.token, {
            expires: 7,
            path: "",
            domain: ".aethenos.com",
          });
        }

        setloading(false);

        setTimeout(() => {
          window.location.href = `/${url}`;
        }, 1500);
      }
    })
    .catch((error) => console.log("error", error));
};

export const InstructorVerify = async () => {
  if (CURRENT_USER != null) {
    if (CURRENT_USER.status == "Instructor") {
      return true;
    } else if (CURRENT_USER.status == "Student") {
      return false;
    }
  } else {
    return false;
  }
};

export const getCourseCategories = async (setcategories) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/course/getCourseCategory`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const convertedArray = result.map((item) => ({
        label: item.name,
        value: item.id,
      }));

      setcategories(convertedArray);
    })
    .catch((error) => console.log("error", error));
};

export const addCourse = async (
  fieUploadUUID,
  course_title,
  course_category,
  course_keywords,
  course_image,
  course_test_video,
  setloading
) => {
  setloading(true);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("course_title", `${course_title}`);
  formdata.append("img", course_image);
  formdata.append("test_video",fieUploadUUID + "_" + course_test_video.name);
  formdata.append("approval_type_id", "1");
  formdata.append("course_category_id", `${course_category}`);
  formdata.append("keywords", `${course_keywords[0]}`);
  formdata.append("keywords", `${course_keywords[1]}`);
  formdata.append("keywords", `${course_keywords[2]}`);
  formdata.append("keywords", `${course_keywords[3]}`);
  formdata.append("keywords", `${course_keywords[4]}`);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/course/addCourse`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      if (result.variable == "404") {
        setloading(false);
        ErrorAlert("Error", result.message);
        return;
      }

      if (result.variable == "200") {
        setloading(false);
        SuccessAlert(
          "Test video sent For approval!",
          "Please await our feedback to proceed"
        );

        setTimeout(() => {
          window.location.href = "/courses";
        }, 2500);
      }

      Unauthorized(result.status, "add-courses");
    })
    .catch((error) => {
      setloading(false);
      ErrorAlert("Error", "Something Went Wong");
    });
};

export const getEditCourse = (
  code,
  setcourse_title,
  setcourse_cat,
  setkeywords,
  setpreview_img,
  setpreview_video
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/editcourse/getCourseByCode/${code}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `edit-course?code=${code}`);

      setcourse_title(result.course_title);
      setcourse_cat(result.course_category_id);
      setkeywords(result.keywordArray);
      setpreview_img(
        `https://aethenosinstructor.exon.lk:2053/aethenos-assert/${result.img}`
      );
      setpreview_video(
        `https://aethenosinstructor.exon.lk:2053/aethenos-assert/${result.test_video}`
      );
    })
    .catch((error) => console.log("error", error));
};

export const EditCourses = async (
  code,
  course_title,
  keywords,
  course_cat,
  course_img,
  course_video
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("code", `${code}`);
  formdata.append("course_title", `${course_title}`);
  if (course_img != "") {
    formdata.append("img", course_img);
  }

  if (course_video != "") {
    formdata.append("test_video", course_video);
  }

  formdata.append("approval_type_id", "1");
  formdata.append("course_category_id", `${course_cat}`);
  formdata.append("keywords", `${keywords[0]}`);
  formdata.append("keywords", `${keywords[1]}`);
  formdata.append("keywords", `${keywords[2]}`);
  formdata.append("keywords", `${keywords[3]}`);
  formdata.append("keywords", `${keywords[4]}`);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/editcourse/updateCourse`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, `edit-course?code=${code}`);

      console.log(result);
      if (result.variable == "200") {
        SuccessAlert("Course Updated!", result.message);

        setTimeout(() => {
          window.location.href = "/courses";
        }, 1000);
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.log("error", error));
};

export const GetAllCourses = async (setcourses) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/course/getCourseByInstructor`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      if (result.variable == "This is not an instructor") {
        Unauthorized(401, "courses");
      }

      if (result.variable == "404") {
        setcourses(null);
      }

      Unauthorized(result.status, "courses");

      setcourses(
        result.sort(
          (a, b) =>
            new Date(b.course.createdDate) - new Date(a.course.createdDate)
        )
      );

      if (result.length == 0) {
        setcourses(null);
      }
    })
    .catch((error) => console.log("error", error));
};

export const GetCourseTitle = async (
  code,
  setcourse_title,
  setstatus_type,
  setcourseVideoLength,
  settitle_loading
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/course/getCourseTitleAndApproveType/${code}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      // console.log(result)

      Unauthorized(
        result.status,
        `courses/manage/${code}/#course-landing-page`
      );

      setcourse_title(result.title);
      setstatus_type(result.approveType);
      setcourseVideoLength(result.courseLength);
      settitle_loading(false);
    })
    .catch((error) => console.log("error", error));
};

export const UpdateCourseProgress = async (code) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/course/courseCurriculumProgress/${code}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export const GetIntendedLeaners = async (
  code,
  setstudentsLearn,
  setrequirements,
  setwhos
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/managecourse/getIntendedLearners/${code}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, `courses/manage/${code}/#intended-learners`);

      setstudentsLearn(result.studentsLearn);
      setrequirements(result.requirements);
      setwhos(result.who);

      console.log(result);
    })
    .catch((error) => console.log("error", error));
};

export const AddIntendedLeaners = async (
  item,
  code,
  setloadingBtn,
  setstudentsLearn,
  setrequirements,
  setwhos
) => {
  setloadingBtn(true);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var raw = JSON.stringify(item);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/saveIntendedLearners`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#intended-learners`);

      if (result.variable == "200") {
        SuccessAlert("Saved!", result.message);
        setloadingBtn(false);

        UpdateCourseProgress(code);
        setTimeout(() => {
          window.location.reload();
        }, 2000);

        // window.location.reload()
      } else {
        ErrorAlert("Error!", result.message);
        setloadingBtn(false);
      }
    })
    .catch((error) => console.log("error", error));
};

export const DeleteStudentLearns = async (
  code,
  item,
  setstudentsLearn,
  setrequirements,
  setwhos
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("courseCode", `${code}`);
  formdata.append("intendedLearner", `${item}`);
  formdata.append("intendedLearnerTypeId", "1");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/deleteIntendedLearners`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, `courses/manage/${code}/#intended-learners`);
      console.log(result);

      if (result.variable == "200") {
        SuccessAlert("Deleted", result.message);
        GetIntendedLeaners(code, setstudentsLearn, setrequirements, setwhos);
        return;
      } else {
        ErrorAlert("Error", result.message);
        GetIntendedLeaners(code, setstudentsLearn, setrequirements, setwhos);
        return;
      }
    })
    .catch((error) => console.error(error));
};

export const DeleteRequirements = async (
  code,
  item,
  setstudentsLearn,
  setrequirements,
  setwhos
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("courseCode", `${code}`);
  formdata.append("intendedLearner", `${item}`);
  formdata.append("intendedLearnerTypeId", "2");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/deleteIntendedLearners`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, `courses/manage/${code}/#intended-learners`);
      console.log(result);

      if (result.variable == "200") {
        SuccessAlert("Deleted", result.message);
        GetIntendedLeaners(code, setstudentsLearn, setrequirements, setwhos);
        return;
      } else {
        ErrorAlert("Error", result.message);
        GetIntendedLeaners(code, setstudentsLearn, setrequirements, setwhos);
        return;
      }
    })
    .catch((error) => console.error(error));
};

export const DeleteWhos = async (
  code,
  item,
  setstudentsLearn,
  setrequirements,
  setwhos
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("courseCode", `${code}`);
  formdata.append("intendedLearner", `${item}`);
  formdata.append("intendedLearnerTypeId", "3");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/deleteIntendedLearners`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, `courses/manage/${code}/#intended-learners`);
      console.log(result);

      if (result.variable == "200") {
        SuccessAlert("Deleted", result.message);
        GetIntendedLeaners(code, setstudentsLearn, setrequirements, setwhos);
        return;
      } else {
        ErrorAlert("Error", result.message);
        GetIntendedLeaners(code, setstudentsLearn, setrequirements, setwhos);
        return;
      }
    })
    .catch((error) => console.error(error));
};

export const AddCourseMessages = async (
  code,
  congratsmsg,
  welcomemsg,
  setloading_btn
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  setloading_btn(true);

  var formdata = new FormData();
  formdata.append("course_code", `${code}`);
  formdata.append("congratulations_msg", `${congratsmsg}`);
  formdata.append("welcome_msg", `${welcomemsg}`);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/savemessages`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#course-messages`);

      if (result.variable == "200") {
        SuccessAlert("Saved!", result.message);
        setloading_btn(false);
        UpdateCourseProgress(code);
      } else {
        ErrorAlert("Error!", result.message);
        setloading_btn(false);
      }
    })
    .catch((error) => console.log("error", error));
};

export const GetCourseMessages = async (
  code,
  setcongratsmsg,
  setwelcomemsg
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/getMessages/${code}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      setcongratsmsg(result.congratulations_msg);
      setwelcomemsg(result.welcome_msg);
    })
    .catch((error) => console.log("error", error));
};

export const GetLanguages = async (setlangData) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/getAllLanguage`, requestOptions)
    .then((response) => response.json())
    .then((result) => setlangData(result))
    .catch((error) => console.log("error", error));
};

export const GetLevel = async (setlevelData) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/getAllCourseLevels`, requestOptions)
    .then((response) => response.json())
    .then((result) => setlevelData(result))
    .catch((error) => console.log("error", error));
};

export const GetCategories = async (setcat) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/course/getCourseCategory`, requestOptions)
    .then((response) => response.json())
    .then((result) => setcat(result))
    .catch((error) => console.log("error", error));
};

export const GetSubCategories = async (setsubcatData, course_cat, code) => {
  console.log(course_cat);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/managecourse/getAllCourseSubCategory/${course_cat}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(
        result.status,
        `courses/manage/${code}/#course-landing-page`
      );
      setsubcatData(result);
      console.log(result);
    })
    .catch((error) => console.log("error", error));
};

export const GetTopics = async (settopicsData, code, course_sub_cat) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/course/getTopicsBySubCategory/${course_sub_cat}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(
        result.status,
        `courses/manage/${code}/#course-landing-page`
      );
      settopicsData(result);
      console.log(result);
    })
    .catch((error) => console.log("error", error));
};

export const GetCourseLandingPage = async (
  code,
  setcourse_title,
  setcourse_subtitle,
  setcourse_desc,
  setcourse_topic,
  setpreview_img,
  seVideoSrc,
  setkeywords,
  setcourse_cat,
  setcourse_sub_cat,
  setlevel,
  setlang
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/managecourse/getcourselandingpage/${code}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(
        result.status,
        `courses/manage/${code}/#course-landing-page`
      );

      setcourse_title(result.courseTitle);
      setcourse_subtitle(result.courseSubTitle);
      setcourse_desc(result.description);
      setkeywords(result.keywords);
      setcourse_cat(result.categoryId);
      setcourse_sub_cat(result.subCategoryId);
      setlevel(result.levelId);
      setlang(result.languageId);
      setcourse_topic(result.topicId);
      setpreview_img(`${result.courseImage}`);
      seVideoSrc(`${result.promotionalVideo}`);
    })
    .catch((error) => console.log("error", error));
};

export const AddCourseLandingPage = async (
  code,
  course_title,
  course_subtitle,
  course_desc,
  lang,
  level,
  course_cat,
  course_sub_cat,
  course_topic,
  keywords,
  promo_vid,
  course_image,
  videoSrc,
  own_topic,
  setloading_btn
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("courseCode", `${code}`);
  formdata.append("course_tile", `${course_title}`);
  formdata.append("course_subtitle", `${course_subtitle}`);
  formdata.append("description", `${course_desc}`);
  formdata.append("language", `${lang}`);
  formdata.append("level", `${level}`);
  formdata.append("category", `${course_cat}`);
  formdata.append("subcategory", `${course_sub_cat}`);
  formdata.append("keywords", `${keywords}`);

  course_topic == "other"
    ? formdata.append("topic", "")
    : formdata.append("topic", `${course_topic}`);
  course_topic == "other" && formdata.append("ownTopic", `${own_topic}`);

  typeof course_image == "object" &&
    formdata.append("course_image", course_image);
  typeof promo_vid == "object" &&
    formdata.append("promotional_video", promo_vid);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/savecourselandingpage`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.variable == "200") {
        setloading_btn(false);
        SuccessAlert("Saved", result.message);
        UpdateCourseProgress(code);
      } else {
        ErrorAlert("Error", result.message);
        setloading_btn(false);
      }

      Unauthorized(
        result.status,
        `courses/manage/${code}/#course-landing-page`
      );
    })
    .catch((error) => console.log("error", error));
};

export const GetPromotions = async (code, setpromotions) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/getCoupons/${code}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, `courses/manage/${code}/#promotions`);
      if (result.variable == "404") {
        setpromotions([]);
      } else {
        setpromotions(result);
      }
    })
    .catch((error) => console.log("error", error));
};

export const AddPromotions = async (
  code,
  promo_code,
  promo_desc,
  promo_type,
  promo_amount,
  promo_date,
  setOpen
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("course_code", `${code}`);
  formdata.append("coupon_code", `${promo_code}`);
  formdata.append("coupon_description", `${promo_desc}`);
  formdata.append("promotion_type", `${promo_type}`);
  formdata.append("amount", `${promo_amount}`);
  formdata.append("ex_date", `${promo_date}`);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/addCoupons`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      if (result.variable == "200") {
        SuccessAlert("Promotion Added", result.message);
        setOpen(false);
      } else {
        ErrorAlert("Error", result.message);
      }

      Unauthorized(result.status, `courses/manage/${code}/#promotions`);
    })
    .catch((error) => console.log("error", error));
};

export const ActivatePromotions = async (code) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/setCouponActive/${code}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      if (result.variable == "200") {
        SuccessAlert("Activated", result.message);
      } else {
        ErrorAlert("Error", result.message);
      }

      Unauthorized(result.status, `courses/manage/${code}/#promotions`);
    })
    .catch((error) => console.log("error", error));
};

export const DeactivatedPromotions = async (code) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/managecourse/setCouponDeactive/${code}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      if (result.variable == "200") {
        SuccessAlert("Deactivated", result.message);
        return;
      } else {
        ErrorAlert("Error", result.message);
      }

      Unauthorized(result.status, `courses/manage/${code}/#promotions`);
    })
    .catch((error) => console.log("error", error));
};

export const GetPromotionsTypes = async (setpromo_types) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/getAllPromotionType`, requestOptions)
    .then((response) => response.json())
    .then((result) => setpromo_types(result))
    .catch((error) => console.log("error", error));
};

export const UpdatePromotions = async (
  code,
  edit_promo_code,
  edit_promo_desc,
  edit_promo_type_id,
  edit_promo_amount,
  edit_promo_date,
  setopenEdit
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  // formdata.append("course_code",` ${code}`);
  formdata.append("coupon_code", `${edit_promo_code}`);
  formdata.append("coupon_description", `${edit_promo_desc}`);
  formdata.append("promotion_type", `${edit_promo_type_id}`);
  formdata.append("amount", `${edit_promo_amount}`);
  formdata.append("ex_date", `${edit_promo_date}`);

  var requestOptions = {
    method: "PUT",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/updateCoupon`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `courses/manage/${code}/#promotions`);
      if (result.variable == "200") {
        SuccessAlert("Updated!", result.message);
        setopenEdit(false);
        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.log("error", error));
};

export const GetDiscountTypes = async (setdis_types) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/getAllDiscountType`, requestOptions)
    .then((response) => response.json())
    .then((result) => setdis_types(result))
    .catch((error) => console.log("error", error));
};

export const GetCurriculum = async (code, setsectionData) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/getCurriculum/${code}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "404") {
        setsectionData(null);
        return;
      }

      result.forEach((section) => {
        section.courseSection.sectionCurriculumItem.sort((a, b) => {
          // Handle case where both are null
          if (a.arrangeNo === null && b.arrangeNo === null) return 0;

          // Handle case where one is null and the other is not
          if (a.arrangeNo === null) return 1;
          if (b.arrangeNo === null) return -1;

          // Convert to numbers and sort numerically
          const aArrangeNo = parseInt(a.arrangeNo, 10);
          const bArrangeNo = parseInt(b.arrangeNo, 10);

          return aArrangeNo - bArrangeNo;
        });
      });

      setsectionData(result);
    })
    .catch((error) => console.log("error", error));
};

export const GetCoursePricingType = async (
  code,
  setPaid_Type,
  setloading_btn
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/managecourse/getCoursePayStatus/${code}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      setPaid_Type(parseInt(result.message));
      setloading_btn(false);
      console.log(result);
    })
    .catch((error) => console.log("error", error));
};

export const GetPriceDefault = async (
  code,
  setDGlobalPricing,
  setDDisType,
  setDDisPercent,
  setDDisAmt,
  setPriceRangeMinDefault,
  setPriceRangeMaxDefault,
  setshowDefaultValueDiscountInput,
  setshowDefaultPercentDiscountInput,
  setDGlobalNetPrice,
  setMinDefaultValue
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/managecourse/getDefaultCoursePricing/${code}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, `courses/manage/${code}/#pricing`);

      console.log(result);
      setDGlobalPricing(result.value);
      setDDisType(result.discountTypeId);
      setPriceRangeMinDefault(result.minPrice);
      setPriceRangeMaxDefault(result.maxPrice);
      setMinDefaultValue(result.minimumPrice);

      if (result.discountTypeId == 2) {
        setDDisPercent(result.discountValue);
        setshowDefaultPercentDiscountInput(true);
        setshowDefaultValueDiscountInput(false);

        setDGlobalNetPrice(
          (
            parseFloat(result.value) -
            (parseFloat(result.value) * parseFloat(result.discountValue)) / 100
          ).toFixed(2)
        );
      } else if (result.discountTypeId == 3) {
        setDDisAmt(result.discountValue);
        setshowDefaultPercentDiscountInput(false);
        setshowDefaultValueDiscountInput(true);
        setDGlobalNetPrice(
          (parseFloat(result.value) - parseFloat(result.discountValue)).toFixed(
            2
          )
        );
      } else {
        setDDisPercent(0);
        setDDisAmt(0);
        setDGlobalNetPrice(
          (parseFloat(result.value) - parseFloat(result.discountValue)).toFixed(
            2
          )
        );
      }
    })
    .catch((error) => console.log("error", error));
};

export const SavePriceDefault = async (
  code,
  DGlobalPricing,
  DDisType,
  DDisPercent,
  DDisAmt,
  DGlobalNetPrice
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("courseCode", `${code}`);
  formdata.append("globalListPrice", `${DGlobalPricing}`);
  formdata.append("discountType", `${DDisType}`);

  if (DDisType == "1") {
    formdata.append("discountAmount", `0`);
  } else if (DDisType == "2") {
    formdata.append("discountAmount", `${DDisPercent}`);
  } else if (DDisType == "3") {
    formdata.append("discountAmount", `${DDisAmt}`);
  }

  formdata.append("globalNetPrice", `${DGlobalNetPrice}`);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/addCourseDefaultPrice`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, `courses/manage/${code}/#pricing`);

      console.log(result);

      // if(result.variable == "404"){

      // }

      if (result.variable == "200") {
        SuccessAlert("Added!", result.message);
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.log("error", error));
};

export const GetCountriesListPricing = async (
  code,
  setcountriesData,
  setloading_btn,
  setGlobalTip,
  setPriceRangeMaxDefault,
  setPriceRangeMinDefault,
  setMinDefaultValue,
  // -----
  setDGlobalPricing,
  setDDisType,
  setDDisPercent,
  setDDisAmt,
  setDGlobalNetPrice,
  // -----------
  setUSADisPercent,
  setUSADisAmt,
  setUSADisType,
  setUSAListPrice,
  setUSANetPrice,
  setAusDisPercent,
  setAusDisAmt,
  setAusDisType,
  setAusListPrice,
  setAusNetPrice,
  // -----
  setBrazilDisPercent,
  setBrazilDisAmt,
  setBrazilDisType,
  setBrazilListPrice,
  setBrazilNetPrice,
  // ---------
  setCanadaDisPercent,
  setCanadaDisAmt,
  setCanadaDisType,
  setCanadaListPrice,
  setCanadaNetPrice,
  //  -------------
  setChileDisPercent,
  setChileDisAmt,
  setChileDisType,
  setChileListPrice,
  setChileNetPrice,
  // -----------
  setColumbiaDisPercent,
  setColumbiaDisAmt,
  setColumbiaDisType,
  setColumbiaListPrice,
  setColumbiaNetPrice,
  // --------------
  setEgyptDisPercent,
  setEgyptDisAmt,
  setEgyptDisType,
  setEgyptListPrice,
  setEgyptNetPrice,
  // ---------
  setEUDisPercent,
  setEUDisAmt,
  setEUDisType,
  setEUListPrice,
  setEUNetPrice,
  // ----
  setGBPDisPercent,
  setGBPDisAmt,
  setGBPDisType,
  setGBPListPrice,
  setGBPNetPrice,
  // ------------
  setIndonesiaDisPercent,
  setIndonesiaDisAmt,
  setIndonesiaDisType,
  setIndonesiaListPrice,
  setIndonesiaNetPrice,
  // ---------------
  setIsrealDisPercent,
  setIsrealDisAmt,
  setIsrealDisType,
  setIsrealListPrice,
  setIsrealNetPrice,
  // -------
  setIndiaDisPercent,
  setIndiaDisAmt,
  setIndiaDisType,
  setIndiaListPrice,
  setIndiaNetPrice,
  // -------------
  setJapanDisPercent,
  setJapanDisAmt,
  setJapanDisType,
  setJapanListPrice,
  setJapanNetPrice,
  // ---------------
  setSKDisPercent,
  setSKDisAmt,
  setSKDisType,
  setSKListPrice,
  setSKNetPrice,
  // -------------
  setMexicoDisPercent,
  setMexicoDisAmt,
  setMexicoDisType,
  setMexicoListPrice,
  setMexicoNetPrice,
  // --------------
  setMalaysiaDisPercent,
  setMalaysiaDisAmt,
  setMalaysiaDisType,
  setMalaysiaListPrice,
  setMalaysiaNetPrice,
  // -------------
  setNigeriaDisPercent,
  setNigeriaDisAmt,
  setNigeriaDisType,
  setNigeriaListPrice,
  setNIgeriaNetPrice,
  // -----------
  setNorwayDisPercent,
  setNorwayDisAmt,
  setNorwayDisType,
  setNorwayListPrice,
  setNorwayNetPrice,
  // ----------
  setPeruDisPercent,
  setPeruDisAmt,
  setPeruDisType,
  setPeruListPrice,
  setPeruNetPrice,
  // -----------
  setPhilipinesDisPercent,
  setPhiliphinesDisAmt,
  setPhilipinesDisType,
  setPhilipinesListPrice,
  setPhilipinesNetPrice,
  // ----------
  setPolandDisPercent,
  setPolandDisAmt,
  setPolandDisType,
  setPolandListPrice,
  setPolandNetPrice,
  // --------------
  setRomaniaDisPercent,
  setRomaniaDisAmt,
  setRomaniaDisType,
  setRomaniaListPrice,
  setRomaniaNetPrice,
  // --------------
  setRussiaDisDisPercent,
  setRussiaDisAmt,
  setRussiaDisType,
  setRussiaListPrice,
  setRussiaNetPrice,
  // ------------------
  setSingaporeDisPercent,
  setSingaporeDisAmt,
  setSingaporeDisType,
  setSingaporeListPrice,
  setSingaporeNetPrice,
  // -------------
  setThailandDisPercent,
  setThailandDisAmt,
  setThailandDisType,
  setThailandListPrice,
  setThailandNetPrice,
  // ---------------
  setTurkeyDisPercent,
  setTurkeyDisAmt,
  setTurkeyDisType,
  setTurkeyListPrice,
  setTurkeyNetPrice,
  // -------------
  setTaiwanDisPercent,
  setTaiwanDisAmt,
  setTaiwanDisType,
  setTaiwanListPrice,
  setTaiwanNetPrice,
  // ----------
  setVietnamDisPercent,
  setVietnamDisAmt,
  setVietmanDisType,
  setVietnamListPrice,
  setVietnamNetPrice,
  // ------------
  setSADisPercent,
  setSADisAmt,
  setSADisType,
  setSAListPrice,
  setSANetPrice,
  //  ---------
  setUSATip,
  setUSAMinValue,
  setAusTip,
  setAusminValue,
  setBrazilTip,
  setBrazilminValue,
  setCanadaTip,
  setCanadaminValue,
  setChileTip,
  setChileminValue,
  setColumbiaTip,
  setColumbiaminValue,
  setEgyptTip,
  setEgyptminValue,
  setEUTip,
  setEUminValue,
  setGBPTip,
  setGBPminValue,
  setIndonesiaTip,
  setIndonesiaminValue,
  setIsrealTip,
  setIsrealminValue,
  setIndiaTip,
  setIndiaminValue,
  setJapanTip,
  setJapanminValue,
  setSKTip,
  setSKminValue,
  setMexicoTip,
  setMexicominValue,
  setMalaysiaTip,
  setMalaysiaminValue,
  setNigeriaTip,
  setNigeriaminValue,
  setNorwayTip,
  setNorwayminValue,
  setPeruTip,
  setPeruminvalue,
  setPhilipinesTip,
  setPhilipinesminValue,
  setPolandTip,
  setPolandminValue,
  setRomaniaTip,
  setRomaniaminvalue,
  setRussiaTip,
  setRussiaminValue,
  setSingaporeTip,
  setSingaporeminValue,
  setThailandTip,
  setThailandminValue,
  setTurkeyTip,
  setTurkeyminValue,
  setTaiwanTip,
  setTaiwanminValue,
  setVietnamTip,
  setVietnamminValue,
  setSATip,
  setSAminValue
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/getCoursePricing/${code}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      setcountriesData(result);
      console.log(result);

      // ---------- AMERICA

      setUSADisType(result.prices[0].discountTypeId);
      setUSADisPercent(result.prices[0].discount);
      setUSAListPrice(result.prices[0].listPrice);
      setUSANetPrice(result.prices[0].netPrice);
      setUSADisAmt(result.prices[0].discountAmount);

      // ---------- AMERICA

      // ---------- AUSTRALIA
      setAusDisType(result.prices[1].discountTypeId);
      setAusDisPercent(result.prices[1].discount);
      setAusListPrice(result.prices[1].listPrice);
      setAusDisAmt(result.prices[1].discountAmount);
      setAusNetPrice(result.prices[1].netPrice);

      // ---------- AUSTRALIA

      // ---------- BRAZIL
      setBrazilDisType(result.prices[2].discountTypeId);
      setBrazilDisPercent(result.prices[2].discount);
      setBrazilListPrice(result.prices[2].listPrice);
      setBrazilDisAmt(result.prices[2].discountAmount);
      setBrazilNetPrice(result.prices[2].netPrice);

      // ---------- BRAZIL

      // ---------- CANADA
      setCanadaDisType(result.prices[3].discountTypeId);
      setCanadaDisPercent(result.prices[3].discount);
      setCanadaListPrice(result.prices[3].listPrice);
      setCanadaDisAmt(result.prices[3].discountAmount);
      setCanadaNetPrice(result.prices[3].netPrice);

      // ---------- CANADA

      // ---------- CHILE
      setChileDisType(result.prices[4].discountTypeId);
      setChileDisAmt(result.prices[4].discountAmount);
      setChileDisPercent(result.prices[4].discount);
      setChileListPrice(result.prices[4].listPrice);
      setChileNetPrice(result.prices[4].netPrice);

      // ---------- CHILE

      // ---------- COLUMBIA
      setColumbiaDisType(result.prices[5].discountTypeId);
      setColumbiaDisPercent(result.prices[5].discount);
      setColumbiaListPrice(result.prices[5].listPrice);
      setColumbiaDisAmt(result.prices[5].discountAmount);
      setColumbiaNetPrice(result.prices[5].netPrice);
      // ---------- COLUMBIA

      // ---------- EGYPT
      setEgyptDisType(result.prices[6].discountTypeId);
      setEgyptDisPercent(result.prices[6].discount);
      setEgyptDisAmt(result.prices[6].discountAmount);
      setEgyptListPrice(result.prices[6].listPrice);
      setEgyptNetPrice(result.prices[6].netPrice);
      // ---------- EGYPT

      // ---------- EU
      setEUDisType(result.prices[7].discountTypeId);
      setEUDisPercent(result.prices[7].discount);
      setEUDisAmt(result.prices[7].discountAmount);
      setEUListPrice(result.prices[7].listPrice);
      setEUNetPrice(result.prices[7].netPrice);

      // ---------- EU

      // ---------- GBP
      setGBPDisType(result.prices[8].discountTypeId);
      setGBPDisPercent(result.prices[8].discount);
      setGBPListPrice(result.prices[8].listPrice);
      setGBPDisAmt(result.prices[8].discountAmount);
      setGBPNetPrice(result.prices[8].netPrice);
      // ---------- GBP

      // ---------- Indonesia
      setIndonesiaDisType(result.prices[9].discountTypeId);
      setIndonesiaDisPercent(result.prices[9].discount);
      setIndonesiaListPrice(result.prices[9].listPrice);
      setIndonesiaDisAmt(result.prices[9].discountAmount);
      setIndonesiaNetPrice(result.prices[9].netPrice);

      // ---------- Indonesia

      // ---------- Isearl
      setIsrealDisType(result.prices[10].discountTypeId);
      setIsrealDisPercent(result.prices[10].discount);
      setIsrealListPrice(result.prices[10].listPrice);
      setIsrealDisAmt(result.prices[10].discountAmount);
      setIsrealNetPrice(result.prices[10].netPrice);

      // ---------- Isearl

      // ---------- India
      setIndiaDisType(result.prices[11].discountTypeId);
      setIndiaDisPercent(result.prices[11].discount);
      setIndiaListPrice(result.prices[11].listPrice);
      setIndiaDisAmt(result.prices[11].discountAmount);
      setIndiaNetPrice(result.prices[11].netPrice);

      // ---------- India

      // ---------- JAPAN
      setJapanDisType(result.prices[12].discountTypeId);
      setJapanDisPercent(result.prices[12].discount);
      setJapanListPrice(result.prices[12].listPrice);
      setJapanDisAmt(result.prices[12].discountAmount);
      setJapanNetPrice(result.prices[12].netPrice);

      // ---------- JAPAN

      // ---------- SK
      setSKDisType(result.prices[13].discountTypeId);
      setSKDisPercent(result.prices[13].discount);
      setSKListPrice(result.prices[13].listPrice);
      setSKDisAmt(result.prices[13].discountAmount);
      setSKNetPrice(result.prices[13].netPrice);

      // ---------- SK

      // ---------- Mexico
      setMexicoDisType(result.prices[14].discountTypeId);
      setMexicoDisPercent(result.prices[14].discount);
      setMexicoListPrice(result.prices[14].listPrice);
      setMexicoDisAmt(result.prices[14].discountAmount);
      setMexicoNetPrice(result.prices[14].netPrice);

      // ---------- Mexico

      // ---------- Malaysia

      setMalaysiaDisType(result.prices[15].discountTypeId);
      setMalaysiaDisPercent(result.prices[15].discount);
      setMalaysiaListPrice(result.prices[15].listPrice);
      setMalaysiaDisAmt(result.prices[15].discountAmount);
      setMalaysiaNetPrice(result.prices[15].netPrice);

      // ---------- Malaysia

      // ---------- Nigeria
      setNigeriaDisType(result.prices[16].discountTypeId);
      setNigeriaDisPercent(result.prices[16].discount);
      setNigeriaListPrice(result.prices[16].listPrice);
      setNigeriaDisAmt(result.prices[16].discountAmount);
      setNIgeriaNetPrice(result.prices[16].netPrice);

      // ---------- Nigeria

      // ---------- Norway
      setNorwayDisType(result.prices[17].discountTypeId);
      setNorwayDisPercent(result.prices[17].discount);
      setNorwayListPrice(result.prices[17].listPrice);
      setNorwayDisAmt(result.prices[17].discountAmount);
      setNorwayNetPrice(result.prices[17].netPrice);
      // ---------- Norway

      // ---------- Peru
      setPeruDisType(result.prices[18].discountTypeId);
      setPeruDisPercent(result.prices[18].discount);
      setPeruListPrice(result.prices[18].listPrice);
      setPeruDisAmt(result.prices[18].discountAmount);
      setPeruNetPrice(result.prices[18].netPrice);
      // ---------- Peru

      // ---------- Philipines
      setPhilipinesDisType(result.prices[19].discountTypeId);
      setPhilipinesDisPercent(result.prices[19].discount);
      setPhilipinesListPrice(result.prices[19].listPrice);
      setPhiliphinesDisAmt(result.prices[19].discountAmount);
      setPhilipinesNetPrice(result.prices[19].netPrice);
      // ---------- Philipines

      // ---------- Poland
      setPolandDisType(result.prices[20].discountTypeId);
      setPolandDisPercent(result.prices[20].discount);
      setPolandListPrice(result.prices[20].listPrice);
      setPolandDisAmt(result.prices[20].discountAmount);
      setPolandNetPrice(result.prices[20].netPrice);
      // ---------- Poland

      // ---------- Romania
      setRomaniaDisType(result.prices[21].discountTypeId);
      setRomaniaDisPercent(result.prices[21].discount);
      setRomaniaListPrice(result.prices[21].listPrice);
      setRomaniaDisAmt(result.prices[21].discountAmount);
      setRomaniaNetPrice(result.prices[21].netPrice);
      // ---------- Romania

      // ---------- Russian
      setRussiaDisType(result.prices[22].discountTypeId);
      setRussiaDisDisPercent(result.prices[22].discount);
      setRussiaListPrice(result.prices[22].listPrice);
      setRussiaDisAmt(result.prices[22].discountAmount);
      setRussiaNetPrice(result.prices[22].netPrice);

      // ---------- Russian

      // ---------- singapore
      setSingaporeDisType(result.prices[23].discountTypeId);
      setSingaporeDisPercent(result.prices[23].discount);
      setSingaporeListPrice(result.prices[23].listPrice);
      setSingaporeDisAmt(result.prices[23].discountAmount);
      setSingaporeNetPrice(result.prices[23].netPrice);

      // ---------- singapore

      // ---------- Thailand
      setThailandDisType(result.prices[24].discountTypeId);
      setThailandDisPercent(result.prices[24].discount);
      setThailandListPrice(result.prices[24].listPrice);
      setThailandDisAmt(result.prices[24].discountAmount);
      setThailandNetPrice(result.prices[24].netPrice);

      // ---------- Thailand

      // ---------- Turkey
      setTurkeyDisType(result.prices[25].discountTypeId);
      setTurkeyDisPercent(result.prices[25].discount);
      setTurkeyListPrice(result.prices[25].listPrice);
      setTurkeyDisAmt(result.prices[25].discountAmount);
      setTurkeyNetPrice(result.prices[25].netPrice);

      // ---------- Turkey

      // ---------- Taiwan
      setTaiwanDisType(result.prices[26].discountTypeId);
      setTaiwanDisPercent(result.prices[26].discount);
      setTaiwanListPrice(result.prices[26].listPrice);
      setTaiwanDisAmt(result.prices[26].discountAmount);
      setTaiwanNetPrice(result.prices[26].netPrice);

      // ---------- Taiwan

      // ---------- Vietnam
      setVietmanDisType(result.prices[27].discountTypeId);
      setVietnamDisPercent(result.prices[27].discount);
      setVietnamListPrice(result.prices[27].listPrice);
      setVietnamDisAmt(result.prices[27].discountAmount);
      setVietnamNetPrice(result.prices[27].netPrice);

      // ---------- Vietnam

      // ---------- SA
      setSADisType(result.prices[28].discountTypeId);
      setSADisPercent(result.prices[28].discount);
      setSAListPrice(result.prices[28].listPrice);
      setSADisAmt(result.prices[28].discountAmount);
      setSANetPrice(result.prices[28].netPrice);

      // ---------- SA

      // ------ Default Price
      setDGlobalPricing(result.globalListPrice);
      setDDisType(result.discountTypeId);
      setDDisPercent(result.discount);
      setDDisAmt(result.discountAmount);
      setDGlobalNetPrice(result.globalNetPrice);

      // ---------------
      setUSATip(result.priceRange[0].tip);
      setUSAMinValue(result.priceRange[0].minimumValue);

      setAusTip(result.priceRange[1].tip);
      setAusminValue(result.priceRange[1].minimumValue);

      setBrazilTip(result.priceRange[2].tip);
      setBrazilminValue(result.priceRange[2].minimumValue);

      setCanadaTip(result.priceRange[3].tip);
      setCanadaminValue(result.priceRange[3].minimumValue);

      setChileTip(result.priceRange[4].tip);
      setChileminValue(result.priceRange[4].minimumValue);

      setColumbiaTip(result.priceRange[5].tip);
      setColumbiaminValue(result.priceRange[5].minimumValue);

      setEgyptTip(result.priceRange[6].tip);
      setEgyptminValue(result.priceRange[6].minimumValue);

      setEUTip(result.priceRange[7].tip);
      setEUminValue(result.priceRange[7].minimumValue);

      setGBPTip(result.priceRange[8].tip);
      setGBPminValue(result.priceRange[8].minimumValue);

      setIndonesiaTip(result.priceRange[9].tip);
      setIndonesiaminValue(result.priceRange[9].minimumValue);
      // -
      setIsrealTip(result.priceRange[10].tip);
      setIsrealminValue(result.priceRange[10].minimumValue);

      setIndiaTip(result.priceRange[11].tip);
      setIndiaminValue(result.priceRange[11].minimumValue);

      setJapanTip(result.priceRange[12].tip);
      setJapanminValue(result.priceRange[12].minimumValue);

      setSKTip(result.priceRange[13].tip);
      setSKminValue(result.priceRange[13].minimumValue);

      setMexicoTip(result.priceRange[14].tip);
      setMexicominValue(result.priceRange[14].minimumValue);

      setMalaysiaTip(result.priceRange[15].tip);
      setMalaysiaminValue(result.priceRange[15].minimumValue);

      setNigeriaTip(result.priceRange[16].tip);
      setNigeriaminValue(result.priceRange[16].minimumValue);

      setNorwayTip(result.priceRange[17].tip);
      setNorwayminValue(result.priceRange[17].minimumValue);

      setPeruTip(result.priceRange[18].tip);
      setPeruminvalue(result.priceRange[18].minimumValue);

      setPhilipinesTip(result.priceRange[19].tip);
      setPhilipinesminValue(result.priceRange[19].minimumValue);

      setPolandTip(result.priceRange[20].tip);
      setPolandminValue(result.priceRange[20].minimumValue);

      setRomaniaTip(result.priceRange[21].tip);
      setRomaniaminvalue(result.priceRange[21].minimumValue);

      setRussiaTip(result.priceRange[22].tip);
      setRussiaminValue(result.priceRange[22].minimumValue);

      setSingaporeTip(result.priceRange[23].tip);
      setSingaporeminValue(result.priceRange[23].minimumValue);

      setThailandTip(result.priceRange[24].tip);
      setThailandminValue(result.priceRange[24].minimumValue);

      setTurkeyTip(result.priceRange[25].tip);
      setTurkeyminValue(result.priceRange[25].minimumValue);

      setTaiwanTip(result.priceRange[26].tip);
      setTaiwanminValue(result.priceRange[26].minimumValue);

      setVietnamTip(result.priceRange[27].tip);
      setVietnamminValue(result.priceRange[27].minimumValue);

      setSATip(result.priceRange[28].tip);
      setSAminValue(result.priceRange[28].minimumValue);

      setGlobalTip(result.priceRange[29].tip);
      setPriceRangeMaxDefault(result.priceRange[29].maxPrice);
      setPriceRangeMinDefault(result.priceRange[29].minPrice);
      setMinDefaultValue(result.priceRange[29].minimumValue);
      setloading_btn(false);

      //  -----------------
    })
    .catch((error) => console.log("error", error));
};

export const SavePriceCountries = async (code, raw, setloading_button) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "POST",
    body: JSON.stringify(raw),
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/addSingleCoursePricing`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#pricing`);

      if (result.variable == "404") {
        ErrorAlert("Error", result.message);
        setloading_button(false);
        return;
      }

      if (result.variable == "200") {
        SuccessAlert("Added!", result.message);
        setloading_button(false);
        UpdateCourseProgress(code);
      }
    })
    .catch((error) => console.log("error", error));
};

export const PricingConvertToFree = async (code, setloading_button) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/addFreeCourse/${code}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, `courses/manage/${code}/#pricing`);
      console.log(result);

      if (result.variable == "404") {
        ErrorAlert("Error", result.message);
        setloading_button(false);
        return;
      }

      if (result.variable == "200") {
        SuccessAlert("Updated", result.message);
        setloading_button(false);
        UpdateCourseProgress(code);
        return;
      }
    })
    .catch((error) => console.log("error", error));
};

export const AddCurriculumSection = async (
  code,
  section,
  setshowSectionInput,
  setsection,
  setsectionData,
  setbtn_section_loading
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("CourseCode", `${code}`);
  formdata.append("SectionName", `${section}`);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/addSection`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.statusCode == "200") {
        SuccessAlert("Section added", result.message);
        UpdateCourseProgress(code);
        setshowSectionInput(false);
        setsection("");
        setbtn_section_loading(false);
        GetCurriculum(code, setsectionData);
        return;
      }

      if (result.variable == "404") {
        ErrorAlert("Error", result.message);
        setbtn_section_loading(false);
        return;
      }
    })
    .catch((error) => console.log("error", error));
};

export const AddLectureTitle = async (
  code,
  lecturetitle,
  courseID,
  setlecturetitle,
  setshowLecInput,
  setshowCurriculumItem,
  setsectionData
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("title", `${lecturetitle}`);
  formdata.append("courseSectionId", `${courseID}`);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/addLecture`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "404") {
        ErrorAlert("Error", result.message);
        return;
      }

      if (result.variable == "200") {
        SuccessAlert("Success", result.message);
        setshowLecInput(null);
        setshowCurriculumItem(null);
        setlecturetitle("");
        GetCurriculum(code, setsectionData);
        UpdateCourseProgress(code);
        return;
      }
    })
    .catch((error) => console.log("error", error));
};

export const OwnThisContent = async (
  code,
  setbtn_loading,
  setcheckOnwership,
  setShow,
  checkInstructorVerification,
  options,
  embeddedClientRef,
  setbtn_accept_loading
) => {
  // const [options, setOptions] = useState({
  //   templateId: "itmpl_Sk2RjhY2ZzsfQd7Q3UMCCFfk"
  // });

  // const embeddedClientRef = useRef(null);

  setbtn_accept_loading(true);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/ownThisCourse/${code}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      if (result.variable == "200") {
        setShow(false);
        setcheckOnwership(true);
        setbtn_accept_loading(false);

        // -- Check if the Instructor is verified
        if (checkInstructorVerification == 0) {
          // PERSONA
          const client = new Persona.Client({
            ...options,
            environment: "sandbox",
            onLoad: (error) => {
              if (error) {
                setbtn_loading(false);
                console.error(
                  `Failed with code: ${error.code} and message ${error.message}`
                );
              }

              client.open();
            },
            onStart: (inquiryId) => {
              console.log(`Started inquiry ${inquiryId}`);
            },
            onComplete: (inquiryId) => {
              console.log(`Sending finished inquiry ${inquiryId} to backend`);
              setbtn_loading(false);

              // Verify Instructor
              ChangeInstructorVerify(code);

              // Send to Request
              RequestSubmitReview(code, setbtn_loading);

              fetch(`/server-handler?inquiry-id=${inquiryId}`);
            },
            onEvent: (name, meta) => {
              switch (name) {
                case "start":
                  console.log(`Received event: start`);
                  break;
                default:
                  console.log(
                    `Received event: ${name} with meta: ${JSON.stringify(meta)}`
                  );
                  setbtn_loading(false);
              }
            },
          });
          embeddedClientRef.current = client;

          window.exit = (force) =>
            client ? client.exit(force) : alert("Initialize client first");
          return;
        }

        // Send to Request
        RequestSubmitReview(code, setbtn_loading);
      } else {
        // return "AlreadyOwned"

        setbtn_accept_loading(false);

        setTimeout(() => {
          window.location.reload();
        }, 1500);

        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.log("error", error));
};

export const CheckOwnershipOfContent = async (code, setcourseOwnership) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/course/CheckOwnCourse/${code}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);
      setcourseOwnership(result);
    })
    .catch((error) => console.log("error", error));
};

export const CheckInstructorVerify = async (
  code,
  setcheckInstructorVerification
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/instructor/getInstructorVerify`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      setcheckInstructorVerification(result.isVerify);
    })
    .catch((error) => console.log("error", error));
};

export const CheckInstructorVerification = async (
  setcheckInstructorVerification
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/instructor/getInstructorVerify`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      setcheckInstructorVerification(result.isVerify);
    })
    .catch((error) => console.log("error", error));
};

export const ChangeInstructorVerify = async (code) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/instructor/verifyInstructorProfile`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `courses/manage/${code}`);
    })
    .catch((error) => console.log("error", error));
};

export const ChangeInstructorVerification = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/instructor/verifyInstructorProfile`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `verification`);
    })
    .catch((error) => console.log("error", error));
};

export const RequestSubmitReview = async (code, setbtn_loading) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/course/submitForReview/${code}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "200") {
        SuccessAlert("Success", result.message);
        setbtn_loading(false);

        setTimeout(() => {
          window.location.href = "/courses";
        }, 2000);

        return;
      } else {
        if (
          result.message ==
          "Instructor profile details are not complete. So please fill it and try again"
        ) {
          Swal.fire({
            title: "<strong>Information Required!</strong>",
            icon: "error",
            html: `
            ${result.message}
            `,
            showCloseButton: false,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: `
              <a  style="color:white" href="/profile?code=${code}"><b>Go to My Profile</b></a>
            `,
            confirmButtonAriaLabel: "Thumbs up, great!",
            cancelButtonText: `
              <i class="fa fa-thumbs-down"></i>
            `,
            cancelButtonAriaLabel: "Thumbs down",
          });

          setbtn_loading(false);
          return;
        }

        ErrorAlert("Error", result.message);
        setbtn_loading(false);
        return;
      }
    })
    .catch((error) => console.log("error", error));
};
export const UpdateSectionName = async (code, section, updateSectionName) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("courseCode", `${code}`);
  formdata.append("sectionId", `${section.sectionId}`);
  formdata.append("sectionName", `${updateSectionName}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/updateSectionName`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "200") {
        SuccessAlert("Updated", result.message);

        setTimeout(() => {
          window.location.reload();
        }, 1500);

        return;
      } else {
        ErrorAlert("Error", result.message);
        return;
      }
    })
    .catch((error) => console.error(error));
};

export const UpdateLectureName = async (
  code,
  lecture,
  updateLectureName,
  section
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("courseSectionId", `${section.courseSection.sectionId}`);
  formdata.append("sectionCurriculumItemId", `${lecture.id}`);
  formdata.append("curriculumItemTypeId", "1");
  formdata.append("name", `${updateLectureName}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/updateCurriculumItemName`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "200") {
        SuccessAlert("Updated", result.message);

        setTimeout(() => {
          window.location.reload();
        }, 1000);

        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const UpdateQuizName = async (
  code,
  quiz,
  updateQuizName,
  updateQuizDescription,
  section
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("courseSectionId", `${section.courseSection.sectionId}`);
  formdata.append("sectionCurriculumItemId", `${quiz.id}`);
  formdata.append("curriculumItemTypeId", "2");
  formdata.append("name", `${updateQuizName}`);
  formdata.append("description", `${updateQuizDescription}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/updateCurriculumItemName`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "200") {
        SuccessAlert("Updated", result.message);

        setTimeout(() => {
          window.location.reload();
        }, 1000);

        return;
      } else {
        ErrorAlert("Error", result.message);
        return;
      }
    })
    .catch((error) => console.error(error));
};

export const UpdateAssignmentName = async (
  code,
  assignment,
  updateAssignmentName,
  section
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("courseSectionId", `${section.courseSection.sectionId}`);
  formdata.append("sectionCurriculumItemId", `${assignment.id}`);
  formdata.append("curriculumItemTypeId", "3");
  formdata.append("name", `${updateAssignmentName}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/updateCurriculumItemName`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "200") {
        SuccessAlert("Updated", result.message);

        setTimeout(() => {
          window.location.reload();
        }, 1000);

        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const UpdateCodingExerciseName = async (
  code,
  codingExercise,
  updateCodingExerciseName,
  section
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("courseSectionId", `${section.courseSection.sectionId}`);
  formdata.append("sectionCurriculumItemId", `${codingExercise.id}`);
  formdata.append("curriculumItemTypeId", "4");
  formdata.append("name", `${updateCodingExerciseName}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/updateCurriculumItemName`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "200") {
        SuccessAlert("Updated", result.message);

        setTimeout(() => {
          window.location.reload();
        }, 1000);

        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const UpdatePraticeTestName = async (
  code,
  pt,
  updatePraticeTestName,
  section
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("courseSectionId", `${section.courseSection.sectionId}`);
  formdata.append("sectionCurriculumItemId", `${pt.id}`);
  formdata.append("curriculumItemTypeId", "5");
  formdata.append("name", `${updatePraticeTestName}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/updateCurriculumItemName`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "200") {
        SuccessAlert("Updated", result.message);

        setTimeout(() => {
          window.location.reload();
        }, 1000);

        return;
      } else {
        ErrorAlert("Error", result.message);
        return;
      }
    })
    .catch((error) => console.error(error));
};

export const DeleteResourcesFile = async (
  code,
  file,
  setcurriculumvisiblitymc,
  setshowMain,
  setsectionData,
  setshowDescRes,
  setshowContentAdd,
  setcurriculumvisiblity
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/managecourse/deleteCurriculumItemFile/${file}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);
      console.log(result);

      if (result.variable == "200") {
        SuccessAlert("Deleted", result.message);

        // setTimeout(() => {
        //   window.location.reload()

        // }, 1000);

        // setshowMain(null)
        // setshowDescRes(true)
        // setshowContentAdd(null)
        // setcurriculumvisiblity("")

        GetCurriculum(code, setsectionData);

        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const AddCurriculumDescription = async (
  code,
  ID,
  curriculum_desc,
  setcurriculum_desc,
  setshowDescription,
  setsectionData
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("CurriculumItemId", `${ID}`);
  formdata.append("Description", `${curriculum_desc}`);

  var requestOptions = {
    method: "PUT",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/addDescription`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "200") {
        SuccessAlert("Added", result.message);
        // setshowDescription(null)
        // setcurriculum_desc("")
        GetCurriculum(code, setsectionData);
        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.log("error", error));
};

export const AddCurriculumDownloadable = async (
  code,
  ID,
  file,
  setshowResources,
  setsectionData
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("CurriculumItemId", `${ID}`);
  formdata.append("downloadableFile", file);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/addDownloadableFile`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "200") {
        SuccessAlert("Added", result.message);
        GetCurriculum(code, setsectionData);
        setshowResources(null);
        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.log("error", error));
};

export const AddCurriculumExternalResourses = async (
  code,
  ID,
  curriclum_ex_res_tile,
  curriculum_ex_res_link,
  setcurriclum_ex_res_tile,
  setcurriculum_ex_res_link,
  setsectionData
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("CurriculumItemId", `${ID}`);
  formdata.append("Title", `${curriclum_ex_res_tile}`);
  formdata.append("Url", `${curriculum_ex_res_link}`);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/addExternalResource`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "200") {
        SuccessAlert("Added", result.message);
        GetCurriculum(code, setsectionData);
        setcurriclum_ex_res_tile("");
        setcurriculum_ex_res_link("");
      } else {
        ErrorAlert("Error", "Something Went Wrong");
      }
    })
    .catch((error) => console.log("error", error));
};

export const AddCurriculumSourceCode = async (
  code,
  ID,
  file,
  setsectionData
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("CurriculumItemId", `${ID}`);
  formdata.append("SourceCode", file);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/addSourceCode`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "200") {
        SuccessAlert("Added!", result.message);
        GetCurriculum(code, setsectionData);
        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.log("error", error));
};

export const AddCurriculumArticle = async (
  code,
  ID,
  article,
  setsectionData,
  setarticle,
  setshowMain,
  setshowDescRes,
  setshowContentAdd
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("CurriculumItemId", `${ID}`);
  formdata.append("Article", `${article}`);

  var requestOptions = {
    method: "PUT",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/addArticle`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "200") {
        SuccessAlert("Added", result.message);
        // setarticle("")
        // setshowMain(null)
        // setshowDescRes(true)
        // setshowContentAdd(null)
        GetCurriculum(code, setsectionData);

        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.log("error", error));
};

export const AddCurriculumVideo = async (
  code,
  ID,
  video,
  duration,
  setsectionData,
  setshowMain,
  setshowDescRes,
  setshowContentAdd,
  setcurriculumvisiblity,
  setUploadingVideo,
  setuploadingVideoName
) => {
  console.log(ID);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("CurriculumItemId", `${ID}`);
  formdata.append("Video", video);
  formdata.append("videoLength", `${duration}`);

  var requestOptions = {
    method: "PUT",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  // Swal.fire({
  //   title: "Uploading ...",
  //   timerProgressBar: true,
  //   allowOutsideClick: false,
  //   didOpen: () => {
  //     Swal.showLoading();

  fetch(`${BACKEND_LINK}/managecourse/addVideo`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "200") {
        // SuccessAlert("Uploaded",result.message)
        ReactToastSuccess("Success");
        GetCurriculum(code, setsectionData);
        UpdateCourseProgress(code);
        setUploadingVideo(null);
        setuploadingVideoName("");
        // setshowMain(null)
        // setshowDescRes(true)
        // setshowContentAdd(null)
        // setcurriculumvisiblity("")

        return;
      } else {
        ErrorAlert("Error", result.message);
        setUploadingVideo(null);
        setuploadingVideoName("");
      }
    })
    .catch((error) => console.log("error", error));

  //   }
  // })
};

export const AddCurriculumQuiz = async (
  code,
  setsectionData,
  sectionID,
  quizTitle,
  quizDesc,
  setshowQuizInput,
  setshowCurriculumItem,
  setquizTitle,
  setquizDesc
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("title", `${quizTitle}`);
  formdata.append("description", `${quizDesc}`);
  formdata.append("courseSectionId", `${sectionID}`);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/addQuiz`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "200") {
        SuccessAlert("Added", result.message);
        GetCurriculum(code, setsectionData);
        setshowQuizInput(null);
        setshowCurriculumItem(null);
        setquizTitle("");
        setquizDesc("");
        return;
      }

      if (result.variable == "404") {
        ErrorAlert("Error", result.message);
        return;
      }
    })
    .catch((error) => console.log("error", error));
};

export const AddCurriculumQnAQuiz = async (
  item,
  code,
  curriculumID,
  question,
  ID,
  answerOne,
  answerTwo,
  answerThree,
  answerFour,
  answerFive,
  answerExplainOne,
  answerExplainTwo,
  answerExplainThree,
  answerExplainFour,
  answerExplainFive,
  answerOption,
  setcurriculumvisiblitymc,
  setshowMain,
  setsectionData,
  setquestion,
  setanswerOption,
  setanswerOne,
  setanswerTwo,
  setanswerThree,
  setanswerFour,
  setanswerFive,
  setanswerExplainOne,
  setanswerExplainTwo,
  setanswerExplainThree,
  setanswerExplainFour,
  setanswerExplainFive,
  setQuizQuestionsList
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("question", `${question}`);
  formdata.append("sectionCurriculumItemId", `${ID}`);
  formdata.append("answer1", `${answerOne}`);
  formdata.append("answer2", `${answerTwo}`);
  formdata.append("answer3", `${answerThree}`);
  formdata.append("answer4", `${answerFour}`);
  formdata.append("answer5", `${answerFive}`);
  formdata.append("explanation1", `${answerExplainOne}`);
  formdata.append("explanation2", `${answerExplainTwo}`);
  formdata.append("explanation3", `${answerExplainThree}`);
  formdata.append("explanation4", `${answerExplainFour}`);
  formdata.append("explanation5", `${answerExplainFive}`);

  if (answerOption == "ans1") {
    formdata.append("correctAnswer", "1");
  } else if (answerOption == "ans2") {
    formdata.append("correctAnswer", "2");
  } else if (answerOption == "ans3") {
    formdata.append("correctAnswer", "3");
  } else if (answerOption == "ans4") {
    formdata.append("correctAnswer", "4");
  } else if (answerOption == "ans5") {
    formdata.append("correctAnswer", "5");
  }

  var requestOptions = {
    method: "PUT",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/addQuestionAndAnswers`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "200") {
        SuccessAlert("Saved", result.message);
        setcurriculumvisiblitymc("");
        setshowMain(null);

        GetCurriculum(code, setsectionData);

        setquestion("");
        setanswerOption("");
        setanswerOne("");
        setanswerTwo("");
        setanswerThree("");
        setanswerFour("");
        setanswerFive("");
        setanswerExplainOne("");
        setanswerExplainTwo("");
        setanswerExplainThree("");
        setanswerExplainFour("");
        setanswerExplainFive("");

        //  setQuizQuestionsList(item)

        return;
      }

      if (result.variable == "404") {
        ErrorAlert("Error", result.message);
        return;
      }
    })
    .catch((error) => console.log("error", error));
};

export const SetVideoPreviewAPI = async (
  code,
  video,
  status,
  setsectionData
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("videoFileName", `${video}`);
  formdata.append("PreviewVideo", `${status}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/setPreviewVideo`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      GetCurriculum(code, setsectionData);
    })
    .catch((error) => console.error(error));
};

export const GetAdminDisApproveComment = async (code, setcomment) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/course/getCourseComment/${code}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `courses/manage/${code}/#settings`);
      setcomment(result);
    })
    .catch((error) => console.log("error", error));
};

export const UnpublishCourse = async (code) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/managecourse/setUnPublishCourse/${code}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, `courses/manage/${code}/#settings`);
      console.log(result);
      if (result.variable == "200") {
        SuccessAlert("Success", "Course successfully unpublished");
        return;
      }
    })
    .catch((error) => console.log("error", error));
};

export const GetInstructorProfileDetails = async (
  setPrimary_Email,
  setfirst_Name,
  setlast_name,
  setheadline,
  setbiography,
  setwebsite,
  settwitter,
  setfacebook,
  setlinkedin,
  setyoutube,
  setlink_to_course,
  setexternal_ratings,
  setexternal_number_of_number,
  setany_comment,
  setemail,
  setprofile_img
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/instructor/getInstructorProfileDetails`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `profile`);

      setPrimary_Email(result.email == null ? "" : result.email);
      setfirst_Name(result.first_name == null ? "" : result.first_name);
      setlast_name(result.last_name == null ? "" : result.last_name);
      setheadline(result.headline == null ? "" : result.headline);
      setbiography(result.biography == null ? "" : result.biography);
      setwebsite(result.website == null ? "" : result.website);
      settwitter(result.twitter == null ? "" : result.twitter);
      setfacebook(result.facebook == null ? "" : result.facebook);
      setlinkedin(result.linkedin == null ? "" : result.linkedin);
      setyoutube(result.youtube == null ? "" : result.youtube);

      if (
        result.instructorExternalDetailsResponse &&
        result.instructorExternalDetailsResponse.length > 0
      ) {
        setlink_to_course(
          result.instructorExternalDetailsResponse[0].linkToCourse == null
            ? ""
            : result.instructorExternalDetailsResponse[0].linkToCourse
        );
        setexternal_ratings(
          result.instructorExternalDetailsResponse[0].externalRating == null
            ? ""
            : result.instructorExternalDetailsResponse[0].externalRating
        );
        setexternal_number_of_number(
          result.instructorExternalDetailsResponse[0]
            .externalNumberOfStudents == null
            ? ""
            : result.instructorExternalDetailsResponse[0]
                .externalNumberOfStudents
        );
        setany_comment(
          result.instructorExternalDetailsResponse[0].anyComments == null
            ? ""
            : result.instructorExternalDetailsResponse[0].anyComments
        );
      } else {
        setlink_to_course("");
        setexternal_ratings("");
        setexternal_number_of_number("");
        setany_comment("");
      }

      setprofile_img(result.profile_img == null ? "" : result.profile_img);
      setemail(
        result.instructorExternalEmail == null
          ? ""
          : result.instructorExternalEmail
      );
    })
    .catch((error) => console.log("error", error));
};

export const UpdateProfileDetails = async (
  uploadImage,
  first_Name,
  last_name,
  headline,
  biography,
  website,
  twitter,
  facebook,
  linkedin,
  youtube,
  link_to_course,
  external_ratings,
  external_number_of_number,
  any_comment,
  email,
  setbtn_loading
) => {
  setbtn_loading(true);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("headline", `${headline}`);
  formdata.append("website", `${website}`);
  formdata.append("biography", `${biography}`);
  formdata.append("twitter", `${twitter}`);
  formdata.append("facebook", `${facebook}`);
  formdata.append("linkedin", `${linkedin}`);
  formdata.append("youtube", `${youtube}`);
  formdata.append("firstName", `${first_Name}`);
  formdata.append("lastName", `${last_name}`);
  typeof uploadImage == "object" &&
    formdata.append("profileImage", uploadImage);
  formdata.append("linkToCourse", `${link_to_course}`);
  formdata.append("externalRating", `${external_ratings}`);
  formdata.append("externalNumberOfStudents", `${external_number_of_number}`);
  formdata.append("anyComments", `${any_comment}`);
  formdata.append("email", `${email}`);

  var requestOptions = {
    method: "PUT",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/instructor/updateInstructorProfile`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, "profile");
      console.log(result);
      if (result.variable == "200") {
        SuccessAlert("Success", "Instructor profile update successfully");
        setbtn_loading(false);
      } else {
        ErrorAlert("Error", result.message);
        setbtn_loading(false);
      }
    })
    .catch((error) => console.log("error", error));
};

export const VerifyTheInstructor = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/instructor/switchToInstructor`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, "courses");

      if (result.message == "Success") {
        console.log(result);
        window.location.href = "/courses";
      } else {
        window.history.back();
      }
    })
    .catch((error) => console.log("error", error));
};

export const GetReferralLink = async (code, setreferalCode) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/course/getReferralCodeByCourseCode/${code}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, `courses/manage/${code}/#promotions`);
      console.log(result);

      if (result.variable == "200" && result.message != null) {
        setreferalCode(`https://www.aethenos.com?ref=${result.message}`);
      } else {
        setreferalCode(``);
      }
    })
    .catch((error) => console.log("error", error));
};

export const AddFreeCouponAPI = async (
  code,
  SD,
  ED,
  couponCodeFree,
  setloading_btn
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("code", `${couponCodeFree}`);
  formdata.append("start_date", `${SD}`);
  formdata.append("end_date", `${ED}`);
  formdata.append("course_code", `${code}`);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/course/addFreeCoupon`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#promotions`);

      if (result.variable == "200") {
        SuccessAlert("Success", result.message);
        setloading_btn(false);
        setTimeout(() => {
          window.location.href = `/courses/manage/${code}/#promotions`;
          window.location.reload();
        }, 1500);
      }

      if (result.variable == "404") {
        ErrorAlert("Error", result.message);
        setloading_btn(false);
      }
    })
    .catch((error) => console.log("error", error));
};

export const GetCouponsAPI = async (code, setall_coupons) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/course/getCouponsFromCourseCode/${code}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `courses/manage/${code}/#promotions`);
      if (result.message == null) {
        setall_coupons([]);
      }

      if (result.variable == "404") {
        setall_coupons(null);
        return;
      }
      setall_coupons(result);
    })
    .catch((error) => console.log("error", error));
};

export const StatusChangeAPI = async (code, CouponCode) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/course/activeDeactiveCoupon/${CouponCode}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#promotions`);

      if (result.variable == "200") {
        SuccessAlert("Success", result.message);
      }
    })
    .catch((error) => console.log("error", error));
};

export const GetCountriesDiscountCoupons = async (
  code,
  setcountriesData,
  setUSATip,
  setUSAMinValue,
  setUSAListPrice,
  // -------------
  setAusTip,
  setAusminValue,
  setAusListPrice,
  //  ---------
  setBrazilTip,
  setBrazilminValue,
  setBrazilListPrice,
  // ---------
  setCanadaTip,
  setCanadaminValue,
  setCanadaListPrice,
  // ---------
  setChileTip,
  setChileminValue,
  setChileListPrice,
  // ------------
  setColumbiaTip,
  setColumbiaminValue,
  setColumbiaListPrice,
  // --------
  setEgyptTip,
  setEgyptminValue,
  setEgyptListPrice,
  // ---------
  setEUTip,
  setEUminValue,
  setEUListPrice,
  // ----------
  setGBPTip,
  setGBPminValue,
  setGBPListPrice,
  // -----
  setIndonesiaTip,
  setIndonesiaminValue,
  setIndonesiaListPrice,
  // -------
  setIsrealTip,
  setIsrealminValue,
  setIsrealListPrice,
  // ----------
  setIndiaTip,
  setIndiaminValue,
  setIndiaListPrice,
  // -------
  setJapanTip,
  setJapanminValue,
  setJapanListPrice,
  // --------
  setSKTip,
  setSKminValue,
  setSKListPrice,
  // -------
  setMexicoTip,
  setMexicominValue,
  setMexicoListPrice,
  // ----------
  setMalaysiaTip,
  setMalaysiaminValue,
  setMalaysiaListPrice,
  // ----------
  setNigeriaTip,
  setNigeriaminValue,
  setNigeriaListPrice,
  // ---------
  setNorwayTip,
  setNorwayminValue,
  setNorwayListPrice,
  // ----------
  setPeruTip,
  setPeruminvalue,
  setPeruListPrice,
  // ----------
  setPhilipinesTip,
  setPhilipinesminValue,
  setPhilipinesListPrice,
  // ------------
  setPolandTip,
  setPolandminValue,
  setPolandListPrice,
  // ---------
  setRomaniaTip,
  setRomaniaminvalue,
  setRomaniaListPrice,
  // ----------
  setRussiaTip,
  setRussiaminValue,
  setRussiaListPrice,
  // -------
  setSingaporeTip,
  setSingaporeminValue,
  setSingaporeListPrice,
  // ---------
  setThailandTip,
  setThailandminValue,
  setThailandListPrice,
  // -----------
  setTurkeyTip,
  setTurkeyminValue,
  setTurkeyListPrice,
  // ---------
  setTaiwanTip,
  setTaiwanminValue,
  setTaiwanListPrice,
  // -----------
  setVietnamTip,
  setVietnamminValue,
  setVietnamListPrice,
  // --------------
  setSATip,
  setSAminValue,
  setSAListPrice
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/getCoursePricing/${code}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      setcountriesData(result.prices);

      Unauthorized(result.status, `courses/manage/${code}/#promotions`);

      // ---------------
      setUSATip(result.priceRange[0].tip);
      setUSAMinValue(result.priceRange[0].minimumPrice);
      setUSAListPrice(result.prices[0].listPrice);

      setAusTip(result.priceRange[1].tip);
      setAusminValue(result.priceRange[1].minimumPrice);
      setAusListPrice(result.prices[1].listPrice);

      setBrazilTip(result.priceRange[2].tip);
      setBrazilminValue(result.priceRange[2].minimumPrice);
      setBrazilListPrice(result.prices[2].listPrice);

      setCanadaTip(result.priceRange[3].tip);
      setCanadaminValue(result.priceRange[3].minimumPrice);
      setCanadaListPrice(result.prices[3].listPrice);

      setChileTip(result.priceRange[4].tip);
      setChileminValue(result.priceRange[4].minimumPrice);
      setChileListPrice(result.prices[4].listPrice);

      setColumbiaTip(result.priceRange[5].tip);
      setColumbiaminValue(result.priceRange[5].minimumPrice);
      setColumbiaListPrice(result.prices[5].listPrice);

      setEgyptTip(result.priceRange[6].tip);
      setEgyptminValue(result.priceRange[6].minimumPrice);
      setEgyptListPrice(result.prices[6].listPrice);

      setEUTip(result.priceRange[7].tip);
      setEUminValue(result.priceRange[7].minimumPrice);
      setEUListPrice(result.prices[7].listPrice);

      setGBPTip(result.priceRange[8].tip);
      setGBPminValue(result.priceRange[8].minimumPrice);
      setGBPListPrice(result.prices[8].listPrice);

      setIndonesiaTip(result.priceRange[9].tip);
      setIndonesiaminValue(result.priceRange[9].minimumPrice);
      setIndonesiaListPrice(result.prices[9].listPrice);
      // -
      setIsrealTip(result.priceRange[10].tip);
      setIsrealminValue(result.priceRange[10].minimumPrice);
      setIsrealListPrice(result.prices[10].listPrice);

      setIndiaTip(result.priceRange[11].tip);
      setIndiaminValue(result.priceRange[11].minimumPrice);
      setIndiaListPrice(result.prices[11].listPrice);

      setJapanTip(result.priceRange[12].tip);
      setJapanminValue(result.priceRange[12].minimumPrice);
      setJapanListPrice(result.prices[12].listPrice);

      setSKTip(result.priceRange[13].tip);
      setSKminValue(result.priceRange[13].minimumPrice);
      setSKListPrice(result.prices[13].listPrice);

      setMexicoTip(result.priceRange[14].tip);
      setMexicominValue(result.priceRange[14].minimumPrice);
      setMexicoListPrice(result.prices[14].listPrice);

      setMalaysiaTip(result.priceRange[15].tip);
      setMalaysiaminValue(result.priceRange[15].minimumPrice);
      setMalaysiaListPrice(result.prices[15].listPrice);

      setNigeriaTip(result.priceRange[16].tip);
      setNigeriaminValue(result.priceRange[16].minimumPrice);
      setNigeriaListPrice(result.prices[16].listPrice);

      setNorwayTip(result.priceRange[17].tip);
      setNorwayminValue(result.priceRange[17].minimumPrice);
      setNorwayListPrice(result.prices[17].listPrice);

      setPeruTip(result.priceRange[18].tip);
      setPeruminvalue(result.priceRange[18].minimumPrice);
      setPeruListPrice(result.prices[18].listPrice);

      setPhilipinesTip(result.priceRange[19].tip);
      setPhilipinesminValue(result.priceRange[19].minimumPrice);
      setPhilipinesListPrice(result.prices[19].listPrice);

      setPolandTip(result.priceRange[20].tip);
      setPolandminValue(result.priceRange[20].minimumPrice);
      setPolandListPrice(result.prices[20].listPrice);

      setRomaniaTip(result.priceRange[21].tip);
      setRomaniaminvalue(result.priceRange[21].minimumPrice);
      setRomaniaListPrice(result.prices[21].listPrice);

      setRussiaTip(result.priceRange[22].tip);
      setRussiaminValue(result.priceRange[22].minimumPrice);
      setRussiaListPrice(result.prices[22].listPrice);

      setSingaporeTip(result.priceRange[23].tip);
      setSingaporeminValue(result.priceRange[23].minimumPrice);
      setSingaporeListPrice(result.prices[23].listPrice);

      setThailandTip(result.priceRange[24].tip);
      setThailandminValue(result.priceRange[24].minimumPrice);
      setThailandListPrice(result.prices[24].listPrice);

      setTurkeyTip(result.priceRange[25].tip);
      setTurkeyminValue(result.priceRange[25].minimumPrice);
      setTurkeyListPrice(result.prices[25].listPrice);

      setTaiwanTip(result.priceRange[26].tip);
      setTaiwanminValue(result.priceRange[26].minimumPrice);
      setTaiwanListPrice(result.prices[26].listPrice);

      setVietnamTip(result.priceRange[27].tip);
      setVietnamminValue(result.priceRange[27].minimumPrice);
      setVietnamListPrice(result.prices[27].listPrice);

      setSATip(result.priceRange[28].tip);
      setSAminValue(result.priceRange[28].minimumPrice);
      setSAListPrice(result.prices[28].listPrice);
    })
    .catch((error) => console.log("error", error));
};

export const GetPriceDefaultCoupon = async (
  code,
  setDGlobalPricing,
  setPriceRangeMinDefault,
  setPriceRangeMaxDefault,
  setMinDefaultValue,
  setDTip
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/managecourse/getDefaultCoursePricing/${code}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, `courses/manage/${code}/#pricing`);

      console.log(result);
      setDGlobalPricing(result.value);
      setPriceRangeMinDefault(result.minPrice);
      setPriceRangeMaxDefault(result.maxPrice);
      setMinDefaultValue(result.minimumPrice);
      setDTip(result.tip);
    })
    .catch((error) => console.log("error", error));
};

export const SaveDiscountDouponsAPI = async (code, raw, setloading_btn) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/course/addDiscountCoupon`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#add-coupon`);

      if (result.variable == "200") {
        SuccessAlert("Added", result.message);
        setloading_btn(false);
        setTimeout(() => {
          window.location.href = `/courses/manage/${code}/#promotions`;
          window.location.reload();
        }, 1500);
        return;
      }

      if (result.variable == "404") {
        ErrorAlert("Error", result.message);
        setloading_btn(false);
        return;
      }
    })
    .catch((error) => console.log("error", error));
};

//  Students  - Analtics
export const GetCousesOfInstructror = async (setcmbCourses) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/analytics/getCoursesByInstructor`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `performance/students`);
      setcmbCourses(result);
    })
    .catch((error) => console.error(error));
};

export const GetAllAnnoucement = async (code, setannoucements) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("courseCode", `${code}`);

  const requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/communication/getAnnouncements`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `performance/announcements`);

      if (result.length == 0) {
        setannoucements([]);
        return;
      }

      const formattedResult = result.map((r) => ({
        ...r,
        createdDate: moment(r.createdDate).format("MMMM Do YYYY, h:mm:ss a"),
      }));

      setannoucements(formattedResult);

      if (result.variable == "404") {
        setannoucements([]);
      }
    })
    .catch((error) => console.error(error));
};

function stripHTML(html) {
  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
}

export const AddAnnoucement = async (
  courseCode,
  selectedCourse,
  announcementTitle,
  AnnoucementDesc,
  setComposeVisible,
  setannouncementTitle,
  setAnnoucementDesc,
  setannoucements
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("courseCode", `${selectedCourse}`);
  formdata.append("title", `${announcementTitle}`);
  formdata.append("content", `${stripHTML(AnnoucementDesc)}`);

  const requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/communication/addAnnouncements`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `communications/announcements`);

      if (result.variable == "200") {
        SuccessAlert("Success", result.message);
        setComposeVisible(false);
        setAnnoucementDesc("");
        setannouncementTitle("");
        GetAllAnnoucement(courseCode, setannoucements);
        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const GetStudentsOfInstructor = async () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/analytics/getStudentsEnrollByCourse/123456`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
};

export const GetAllQuestions = async (courseCode, setquestions) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("courseCode", `${courseCode}`);

  const requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/communication/getAllQuestions`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `communications/qa`);

      setquestions(result);
    })
    .catch((error) => console.error(error));
};

export const AddAnswer = async (
  questionItemCode,
  answer,
  setanswer,
  courseCode,
  questions,
  setquestions,
  setanswerContent,
  setquestionItemContent
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("QuestionCode", `${questionItemCode}`);
  formdata.append("answer", `${answer}`);

  const requestOptions = {
    method: "PUT",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/communication/addAnswer`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `communications/qa`);
      if (result.variable == "200") {
        // SuccessAlert("Success", result.message);
        // setquestionItemContent("");

        // Fetch updated questions
        GetAllQuestions(courseCode, (updatedQuestions) => {
          setquestions(updatedQuestions);

          // Find the updated answer content
          const updatedQuestion = updatedQuestions.find(
            (question) => question.questionCode == questionItemCode
          );
          if (updatedQuestion) {
            setanswerContent(updatedQuestion.answer);
          }

          setanswer("");
        });
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const GetReviewByCourse = async (courseCode, setSelectedCourse) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/payment/getCourseWithReviewsByCourseCode/${courseCode}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `performance/reviews`);
      setSelectedCourse(result);
    })
    .catch((error) => console.error(error));
};

export const AddReplyToReview = async (
  comment,
  reviewCode,
  setbtnLoading,
  setcomment,
  setcmbCourses
) => {
  setbtnLoading(true);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("reviewCode", `${reviewCode}`);
  formdata.append("comment", `${comment}`);

  const requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/payment/addRespondToReview`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, `performance/reviews`);

      if (result.variable == "200") {
        SuccessAlert("Success", result.message);
        setbtnLoading(false);
        setcomment("");
        GetCousesOfInstructror(setcmbCourses);
        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const GetAllInstructorsofThePurchaseMsg = async (setinstructors) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/chat/getInstructorsToPurchasedCourses`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, "messages");
      console.log(result);
      setinstructors(result);
    })
    .catch((error) => console.error(error));
};

export const AddSendMessage = async (
  selectedInstructor,
  messageTextAdd,
  selectedCourse,
  selectedChatCode,
  setmessageTextAdd,
  GetAllChatRooms,
  setchatRooms
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("message", `${messageTextAdd}`);
  formdata.append("courseCode", `${selectedCourse}`);
  formdata.append("toUserCode", `${selectedInstructor}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/chat/sendChat`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, "communications/messages");

      if (result.variable == "200") {
        setmessageTextAdd("");
        GetAllChatRooms(setchatRooms);
      }

      GetAllChatRooms(setchatRooms);
    })
    .catch((error) => console.error(error));
};

export const GetAllChatRooms = async (setchatRooms) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/chat/getChatRoomDetailsByInstructor`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, "communications/messages");
      setchatRooms(result.chatRoomDetails);
      console.log(result);
    })
    .catch((error) => console.error(error));
};

export const GetAllChatRoomMessages = async (chatCode, setroomMessages) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/chat/getChatRoomDetailsByInstructorUsingChatRoomCode/${chatCode}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, "communications/messages");
      console.log(result);
      setroomMessages(result);
    })
    .catch((error) => console.error(error));
};

export const StudentsEnrolled = async (setstudents, courseCode) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/analytics/getStudentsEnrollByCourse/${courseCode}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, "performance/students");
      if (result.variable == "404") {
        setstudents([]);
        return;
      }

      const updatedResult = result.map((student) => ({
        ...student,
        profileImgTag:
          student.profileImg != "" ? (
            <img
              className="w-50 "
              src={`${FILE_PATH}${student.profileImg}`}
              alt={student.studentName}
            />
          ) : (
            <Avatar
              src="/static/images/avatar/1.jpg"
              alt={`${student.studentName}`}
              sx={{ width: 35, height: 35 }}
            />
          ),
      }));

      setstudents(updatedResult);
    })
    .catch((error) => console.error(error));
};

export const UpdateNotifications = async (notificationCode) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/notification/readNotification/${notificationCode}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, "courses");

      if (result.variable == "200") {
        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const GetNotificationsLatest = async (setNotifications) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/notification/getOwnNotifications`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, "courses");
      if (result && result.length > 0) {
        const latestNotification = result.sort(
          (a, b) => new Date(b.notificationTime) - new Date(a.notificationTime)
        );
        setNotifications(latestNotification);
      } else {
        setNotifications([]);
      }
    })
    .catch((error) => console.error(error));
};

export const GetNotifications = async (setNotifications) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/notification/getOwnNotifications`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, "courses");
      if (result && result.length > 0) {
        const latestNotification = result.sort(
          (a, b) => new Date(b.notificationTime) - new Date(a.notificationTime)
        );

        setNotifications(latestNotification);
      } else {
        setNotifications([]);
      }
    })
    .catch((error) => console.error(error));
};

export const getToken = async () => {
  const clientId =
    "AbhfyGv-hhPIo4dZ_Wia7_0sevNZC3B871Ndw8aDEIm8h6O59L1sV0TzgFXyCpwx-_GC93sKwsU_GtEF";
  const secret =
    "ELvI0eNofma6wegK2amivZ2GvpokEgURE8fOIpKg98D7o5iFxhk3nEUD90mT7aXmK7tImyV94aBCaVvT";
  const auth = btoa(`${clientId}:${secret}`);

  const url = "https://api-m.sandbox.paypal.com/v1/oauth2/token";
  const data = new URLSearchParams();
  data.append("grant_type", "authorization_code");
  // data.append('code', auth);

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Access Token:", data.access_token);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const PracticeTestSave = async (
  mainSectionID,
  PraticeTestCode,
  PracticeTestTitle,
  PracticeTestDesc,
  PracticeTestDuration,
  PracticeTestMinPassMark,
  PracticeTestInstructions,
  PracticeTestExLink,
  PracticeTestQuestionFile,
  PracticeTestQuestionExLink,
  PracticeTestSolutionsFile,
  PraticeTestSolutionsExLink,
  setshowPracticeTestInput,
  setshowCurriculumItem,
  setbtnLoadingPracticeTest,
  setPracticeTestTitle,
  setPracticeTestDesc,
  setPracticeTestDuration,
  setPracticeTestInstructions,
  setPracticeTestMinPassMark,
  setPracticeTestExLink,
  setPracticeTestQuestionFile,
  setPracticeTestQuestionExLink,
  setPracticeTestSolutionsFile,
  setPraticeTestSolutionsExLink,
  setPraticeTestCode,
  setshowContentAdd,
  setshowMain,
  code,
  setsectionData
) => {
  setbtnLoadingPracticeTest(true);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("courseSectionId", `${mainSectionID}`);
  formdata.append("practiceTestCode", `${PraticeTestCode}`);
  formdata.append("title", `${PracticeTestTitle}`);
  formdata.append("description", `${PracticeTestDesc}`);
  formdata.append("duration", `${PracticeTestDuration}`);
  formdata.append("minimumPassMark", `${PracticeTestMinPassMark}`);
  formdata.append("instructions", `${PracticeTestInstructions}`);
  formdata.append("externalLink", `${PracticeTestExLink}`);
  PracticeTestQuestionFile != null &&
    formdata.append("questionSheet", PracticeTestQuestionFile);
  formdata.append("questionLink", `${PracticeTestQuestionExLink}`);
  PracticeTestSolutionsFile != null &&
    formdata.append("solutionSheet", PracticeTestSolutionsFile);
  formdata.append("solutionLink", `${PraticeTestSolutionsExLink}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/addPracticeTest`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      if (result.variable == "200") {
        if (PraticeTestCode == "") {
          SuccessAlert("Success", result.message);
        } else {
          SuccessAlert("Success", "Practice test updated");
        }

        setshowContentAdd(null);
        setshowMain(null);

        setPraticeTestCode("");

        setPracticeTestTitle("");
        setPracticeTestDesc("");
        setPracticeTestDuration("");
        setPracticeTestInstructions("");
        setPracticeTestMinPassMark("");
        setPracticeTestExLink("");

        setPracticeTestQuestionFile(null);
        setPracticeTestQuestionExLink("");

        setPracticeTestSolutionsFile(null);
        setPraticeTestSolutionsExLink("");

        setbtnLoadingPracticeTest(false);

        setshowPracticeTestInput(null);
        setshowCurriculumItem(null);

        GetCurriculum(code, setsectionData);

        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const CodingExerciseSave = async (
  mainSectionID,
  CodingExerciseTitle,
  CodingExerciseCode,
  CodingExerciseDesc,
  CodingExerciseInstructions,
  CodingExerciseVideo,
  CodingExerciseDResourses,
  CodingExerciseExLink,
  CodingExerciseUploadEx,
  CodingExerciseExternalLink,
  CodingExerciseQVideo,
  CodingExercisesSolutionsFile,
  CodingExercisesExLinkSolutions,
  CodingExercisesSolutionsVideo,
  setCodingExerciseTitle,
  setCodingExerciseDesc,
  setCodingExerciseInstructions,
  setCodingExerciseVideo,
  setCodingExerciseDResourses,
  setCodingExerciseExLink,
  setCodingExerciseUploadEx,
  setCodingExerciseExternalLink,
  setCodingExerciseQVideo,
  setCodingExercisesSolutionsFile,
  setCodingExercisesExLinkSolutions,
  setCodingExercisesSolutionsVideo,
  setbtnLoadingCodingExcercise,
  setshowCodingExecInput,
  setshowCurriculumItem,
  setCodingExerciseCode,
  setshowContentAdd,
  setshowMain,
  code,
  setsectionData
) => {
  setbtnLoadingCodingExcercise(true);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("courseSectionId", `${mainSectionID}`);
  formdata.append("codingExerciseCode", `${CodingExerciseCode}`);
  formdata.append("title", `${CodingExerciseTitle}`);
  formdata.append("description", `${CodingExerciseDesc}`);
  formdata.append("instructions", `${CodingExerciseInstructions}`);
  CodingExerciseVideo != null && formdata.append("video", CodingExerciseVideo);
  CodingExerciseDResourses != null &&
    formdata.append("resource", CodingExerciseDResourses);
  formdata.append("externalLink", `${CodingExerciseExLink}`);
  CodingExerciseQVideo != null &&
    formdata.append("codingVideo", CodingExerciseQVideo);
  CodingExerciseUploadEx != null &&
    formdata.append("codingFiles", CodingExerciseUploadEx);
  formdata.append("codingLink", `${CodingExerciseExternalLink}`);
  CodingExercisesSolutionsVideo != null &&
    formdata.append("solutionVideo", CodingExercisesSolutionsVideo);
  CodingExercisesSolutionsFile != null &&
    formdata.append("solutionSheet", CodingExercisesSolutionsFile);
  formdata.append("solutionLink", `${CodingExercisesExLinkSolutions}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/addCodingExercise`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      if (result.variable == "200") {
        if (CodingExerciseCode == "") {
          SuccessAlert("Success", result.message);
        } else {
          SuccessAlert("Success", "Coding exercise updated");
        }

        setshowContentAdd(null);
        setshowMain(null);

        setCodingExerciseCode("");

        setCodingExerciseTitle("");
        setCodingExerciseDesc("");
        setCodingExerciseInstructions("");

        setCodingExerciseVideo(null);
        setCodingExerciseDResourses(null);
        setCodingExerciseExLink(null);

        setCodingExerciseUploadEx(null);
        setCodingExerciseExternalLink("");

        setCodingExerciseQVideo(null);

        setCodingExercisesSolutionsFile(null);
        setCodingExercisesExLinkSolutions("");
        setCodingExercisesSolutionsVideo(null);

        setbtnLoadingCodingExcercise(false);

        setshowCodingExecInput(null);
        setshowCurriculumItem(null);

        GetCurriculum(code, setsectionData);

        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const AssignmentSave = async (
  mainSectionID,
  AssignmentCode,
  AssignmentTitle,
  AssignmentDesc,
  AssignmentDuration,
  AssignmentInstructors,
  AssignmentVideo,
  AssignmentDResourses,
  AssignmentExLink,
  AssignmentQuestion,
  AssignmentQuestionFile,
  AssignmentQuestionLink,
  AssignmentSolutions,
  AssignmentSolutionsVideo,
  AssignmentSolutionsFile,
  AssignmentSolutionsExLink,
  setshowAssignmentInput,
  setshowCurriculumItem,
  setAssignmentTitle,
  setAssignmentDesc,
  setAssignmentDuration,
  setAssignmentInstructors,
  setAssignmentVideo,
  setAssignmentDResourses,
  setAssignmentExLink,
  setAssignmentQuestion,
  setAssignmentQuestionFile,
  setAssignmentQuestionLink,
  setAssignmentSolutions,
  setAssignmentSolutionsVideo,
  setAssignmentSolutionsFile,
  setAssignmentSolutionsExLink,
  setbtnLoadingAssignment,
  setAssignmentCode,
  setshowContentAdd,
  setshowMain,
  code,
  setsectionData
) => {
  setbtnLoadingAssignment(true);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("courseSectionId", `${mainSectionID}`);
  formdata.append("assignmentCode", `${AssignmentCode}`);
  formdata.append("title", `${AssignmentTitle}`);
  formdata.append("description", `${AssignmentDesc}`);
  formdata.append("duration", `${AssignmentDuration}`);
  formdata.append("instructions", `${AssignmentInstructors}`);
  AssignmentVideo != null && formdata.append("video", AssignmentVideo);
  AssignmentDResourses != null &&
    formdata.append("resource", AssignmentDResourses);
  formdata.append("externalLink", `${AssignmentExLink}`);
  formdata.append("questions", `${AssignmentQuestion}`);
  AssignmentQuestionFile != null &&
    formdata.append("questionSheet", AssignmentQuestionFile);
  formdata.append("questionLink", `${AssignmentQuestionLink}`);
  formdata.append("solution", `${AssignmentSolutions}`);
  AssignmentSolutionsVideo != null &&
    formdata.append("solutionVideo", AssignmentSolutionsVideo);
  AssignmentSolutionsFile != null &&
    formdata.append("solutionSheet", AssignmentSolutionsFile);
  formdata.append("solutionLink", `${AssignmentSolutionsExLink}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/addAssignment`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      if (result.variable == "200") {
        setshowContentAdd(null);
        setshowMain(null);

        if (AssignmentCode == "") {
          SuccessAlert("Success", result.message);
        } else {
          SuccessAlert("Success", "Assignment updated");
        }

        setshowAssignmentInput(null);
        setshowCurriculumItem(null);

        setAssignmentCode("");

        setAssignmentTitle("");
        setAssignmentDesc("");
        setAssignmentDuration("");
        setAssignmentInstructors("");
        setAssignmentVideo(null);
        setAssignmentDResourses(null);
        setAssignmentExLink("");

        setAssignmentQuestion("");
        setAssignmentQuestionFile(null);
        setAssignmentQuestionLink("");

        setAssignmentSolutions("");
        setAssignmentSolutionsVideo(null);
        setAssignmentSolutionsFile(null);
        setAssignmentSolutionsExLink("");
        setbtnLoadingAssignment(false);

        GetCurriculum(code, setsectionData);

        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const checkCourseCompletionStatus = async (
  code,
  setIntendedLearnersCheck,
  setSyllabusCheck,
  setPricingCheck,
  setCourseMessagesCheck,
  setPromotionsCheck,
  setCourseLandingPageCheck
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/course/checkCourseCompleteDetails/${code}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      // console.log(result)

      Unauthorized(result.status, "courses");

      setIntendedLearnersCheck(result.intendedLearners);
      setSyllabusCheck(result.curriculum);
      setPricingCheck(result.pricing);
      setCourseMessagesCheck(result.courseMessages);
      setPromotionsCheck(result.promotions);
      setCourseLandingPageCheck(result.courseLandingPage);
    })
    .catch((error) => console.error(error));
};

export const AssignmentDelete = async (code, Ccode, setsectionData) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/deleteAssignment/${code}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, "courses");

      if (result.variable == "200") {
        SuccessAlert("Deleted", result.message);
        //   setTimeout(() => {
        //     window.location.reload()
        // },2000)

        GetCurriculum(Ccode, setsectionData);

        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const PracticeTestDelete = async (code, Ccode, setsectionData) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/managecourse/deletePracticeTest/${code}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, "courses");

      if (result.variable == "200") {
        SuccessAlert("Deleted", result.message);

        //   setTimeout(() => {
        //     window.location.reload()
        // },2000)

        GetCurriculum(Ccode, setsectionData);

        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const CodingExerciseDelete = async (code, Ccode, setsectionData) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/managecourse/deleteCodingExercise/${code}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, "courses");

      if (result.variable == "200") {
        SuccessAlert("Deleted", result.message);
        //   setTimeout(() => {
        //     window.location.reload()
        // },2000)

        GetCurriculum(code, setsectionData);
        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const LectureDelete = async (id, code, setsectionData) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/deletelecture/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, "courses");

      if (result.variable == "200") {
        SuccessAlert("Deleted", result.message);
        //   setTimeout(() => {
        //     window.location.reload()
        // },2000)

        GetCurriculum(code, setsectionData);
        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const QuizDelete = async (id, code, setsectionData) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/deletequiz/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, "courses");

      if (result.variable == "200") {
        SuccessAlert("Deleted", result.message);

        //   setTimeout(() => {
        //     window.location.reload()
        // },2000)

        GetCurriculum(code, setsectionData);

        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const SectionDelete = async (id, code, setsectionData) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/managecourse/deletecourseSection/${id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, "courses");

      if (result.variable == "200") {
        SuccessAlert("Deleted", result.message);
        // setTimeout(() => {
        //     window.location.reload()
        // },2000)

        GetCurriculum(code, setsectionData);

        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const VideoDelete = async (
  id,
  code,
  setcurriculumvisiblitymc,
  setshowMain,
  setsectionData,
  setshowDescRes,
  setshowContentAdd,
  setcurriculumvisiblity
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/managecourse/deleteCurriculumItemFile/${id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, "courses");

      if (result.variable == "404") {
        ErrorAlert("Error", result.message);
        return;
      }

      if (result.variable == "200") {
        SuccessAlert("Deleted", result.message);

        // setshowMain(null)
        // setshowDescRes(true)
        // setshowContentAdd(null)
        // setcurriculumvisiblity("")

        GetCurriculum(code, setsectionData);
      } else {
        ErrorAlert("Error", result.message);
      }

      console.log(result);
    })
    .catch((error) => console.error(error));
};

export const ExternalResoucesDelete = async (id, code, setsectionData) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/managecourse/deleteExternalResources/${id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, "courses");

      if (result.variable == "200") {
        SuccessAlert("Deleted", result.message);
        // setTimeout(() => {
        //     window.location.reload()
        // },2000)
        GetCurriculum(code, setsectionData);
        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const AddWalletDetails = async (
  paypalEmail,
  paypalUsername,
  payoneerEmail,
  payoneerUsername,
  bankSortNoOne,
  bankSortNoTwo,
  bankSortNoThree,
  bankAccountNumber,
  setbtn_loading_payment_details,
  selectedValue
) => {
  setbtn_loading_payment_details(true);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("paypalUserName", `${paypalUsername}`);
  formdata.append("paypalEmail", `${paypalEmail}`);
  formdata.append("payoneerUserName", `${payoneerUsername}`);
  formdata.append("payoneerEmail", `${payoneerEmail}`);
  selectedValue == "paypal"
    ? formdata.append("paymentMethodId", "2")
    : selectedValue == "payoneer"
    ? formdata.append("paymentMethodId", "4")
    : formdata.append("paymentMethodId", "5");
  formdata.append("accountNumber", `${bankAccountNumber}`);
  formdata.append("sort1", `${bankSortNoOne}`);
  formdata.append("sort2", `${bankSortNoTwo}`);
  formdata.append("sort3", `${bankSortNoThree}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/instructorPayment/addInstructorPaymentDetails`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, "profile");
      console.log(result);

      if (result.variable == "200") {
        SuccessAlert("Success", result.message);
        setbtn_loading_payment_details(false);
        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const GetWalletDetails = async (
  setpaypalEmail,
  setpaypalUsername,
  setpayoneerEmail,
  setpayoneerUsername,
  setbankSortNoOne,
  setbankSortNoTwo,
  setbankSortNoThree,
  setbankAccountNumber,
  setSelectedValue
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/instructorPayment/getInstructorPaymentDetails`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, "profile");

      console.log(result);

      setpaypalEmail(result.paypalEmail);
      setpaypalUsername(result.paypalUserName);
      setpayoneerEmail(result.payoneerEmail);
      setpayoneerUsername(result.payoneerUserName);

      setbankSortNoOne(result.sort1);
      setbankSortNoTwo(result.sort2);
      setbankSortNoThree(result.sort3);
      setbankAccountNumber(result.accountNumber);

      if (result.selected == "") {
        setSelectedValue("paypal");
      } else {
        setSelectedValue(result.selected.toLowerCase());
      }
    })
    .catch((error) => console.error(error));
};

export const SubmitInstructorTerms = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/instructorPayment/updateInstructorTermsAgree`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, "profile");

      if (result.variable == "200") {
        SuccessAlert("Success", result.message);
        return;
      }

      if (result.variable == "404") {
        ErrorAlert("Error", result.message);
        return;
      }
    })
    .catch((error) => console.error(error));
};

export const GetCheckPricingStatus = async (setInstructorTermsCheck) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/instructorPayment/checkInstructorPaymentDetails`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, "profile");
      if (result == "true") {
        setInstructorTermsCheck(true);
      } else {
        setInstructorTermsCheck(false);
      }
    })
    .catch((error) => console.error(error));
};

export const GetCheckPricingAllStatus = async (setcheckPricingStatus) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/instructorPayment/checkAllInstructorPaymentDetailsComplete`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, "courses");
      if (result == "true") {
        setcheckPricingStatus(true);
      } else {
        setcheckPricingStatus(false);
      }
    })
    .catch((error) => console.error(error));
};

export const PasswordReset = async (confirmPassword, currentPassword) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("newPassword", `${confirmPassword}`);
  formdata.append("oldPassword", `${currentPassword}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/studentProfile/resetPassword`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Unauthorized(result.status, "account-settings");

      if (result.variable == "200") {
        SuccessAlert("Success", result.message);

        setTimeout(() => {
          window.location.href = "/courses";
        }, 2000);

        return;
      }

      if (result.variable == "404") {
        ErrorAlert("Error", result.message);
        return;
      }
    })
    .catch((error) => console.error(error));
};

export const GetRevenueOverview = async (setoverViewStatus) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/revenue/getInstructorRevenueOverview`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, "performance/overview");

      setoverViewStatus(result);
    })
    .catch((error) => console.error(error));
};

export const GetRevenueReport = async (
  setRevenueReportData,
  setrevenueDate,
  setrevenueAmount
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/revenue/getInstructorRevenueReport`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, "performance/revenue-report");

      setRevenueReportData(result.instructorRevenueReportResponses);
      setrevenueDate(result.date);
      setrevenueAmount(result.totalLifeTimeEarning);
    })
    .catch((error) => console.error(error));
};

export const GetRevenueReportByID = async (
  id,
  setrefundNo,
  setpurchasesNo,
  setpurchasedData,
  settimePeriod,
  setrefundData
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/revenue/getInstructorMonthlyRevenueExpandedReport/${id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, "performance/revenue-report");

      setrefundNo(result.totalRefunds);
      setpurchasesNo(result.totalPurchases);
      setpurchasedData(result.purchases);
      settimePeriod(result.timePeriod);
      setrefundData(result.refunds);
    })
    .catch((error) => console.error(error));
};

export const checkPaidCourseOfSyllabus = async (
  code,
  setVideoLength,
  setNoOfLessons
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/course/checkPaidCourseValidation/${code}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      Unauthorized(result.status, `courses/manage/${code}/#pricing`);
      console.log(result);
      setVideoLength(result.courseLength);
      setNoOfLessons(result.lectureCount);
    })
    .catch((error) => console.error(error));
};

export const SendEmailVerficationCode = async (
  email,
  toast,
  setbtnLoading,
  setshowVerificationInputs
) => {
  setbtnLoading(true);

  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/studentProfile/forgotPasswords/${email}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.variable == "200") {
        console.log(result);
        setshowVerificationInputs(true);
        setbtnLoading(false);

        toast.success("Verfication has been sent to your email");

        return;
      } else {
        ErrorAlert("Error", result.message);
        setbtnLoading(false);
        return;
      }
    })
    .catch((error) => console.error(error));
};

export const VerifyCode = async (
  VerficationCode,
  email,
  setcodeSuccess,
  setbtnLoading
) => {
  setbtnLoading(true);

  const formdata = new FormData();
  formdata.append("verificationCode", `${VerficationCode}`);
  formdata.append("email", `${email}`);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/studentProfile/verifyVerificationCode`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      if (result) {
        setcodeSuccess(true);
        setbtnLoading(false);

        return;
      } else {
        ErrorAlert("Error", "invalid code");
        setbtnLoading(false);
        setcodeSuccess(false);
        return;
      }
    })
    .catch((error) => console.error(error));
};

export const ChangeToNewPassword = async (
  VerficationCode,
  email,
  conPassword,
  setbtnLoading
) => {
  setbtnLoading(true);

  const formdata = new FormData();
  formdata.append("verificationCode", `${VerficationCode}`);
  formdata.append("email", `${email}`);
  formdata.append("newPassword", `${conPassword}`);

  const requestOptions = {
    method: "PUT",
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/studentProfile/updatePassword`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.variable == "200") {
        SuccessAlert("Success", result.message);

        setTimeout(() => {
          setbtnLoading(false);
          window.location.href = "/login";
        }, 2500);

        return;
      } else {
        ErrorAlert("Error", result.message);
        setbtnLoading(false);
        return;
      }
    })
    .catch((error) => console.error(error));
};

export const RevenueChart = async (setChartData) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/revenue/getInstructorRevenueReportChart`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `performance/revenue-report`);

      setChartData(result);
    })
    .catch((error) => console.error(error));
};

export const DeleteQuestionsAndAnswers = async (
  code,
  quizId,
  setsectionData
) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/managecourse/deleteQuestionAndAnswers/${quizId}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      Unauthorized(result.status, `courses/manage/${code}/#syllabus`);

      if (result.variable == "200") {
        SuccessAlert("Success", result.message);
        GetCurriculum(code, setsectionData);
        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const UpdateSubmitQuestionsAndAnswers = async (
  quizForUpdateSelected,
  code,
  curriculumID,
  question,
  ID,
  answerOne,
  answerTwo,
  answerThree,
  answerFour,
  answerFive,
  answerExplainOne,
  answerExplainTwo,
  answerExplainThree,
  answerExplainFour,
  answerExplainFive,
  newAnswerOption,
  setcurriculumvisiblitymc,
  setshowMain,
  setsectionData,
  setquestion,
  setanswerOption,
  setanswerOne,
  setanswerTwo,
  setanswerThree,
  setanswerFour,
  setanswerFive,
  setanswerExplainOne,
  setanswerExplainTwo,
  setanswerExplainThree,
  setanswerExplainFour,
  setanswerExplainFive,
  setQuizQuestionsList
) => {
  console.log(ID);
  console.log( newAnswerOption);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();
  formdata.append("question", `${question}`);
  formdata.append("quizId", `${quizForUpdateSelected}`);
  formdata.append("answer1", `${answerOne}`);
  formdata.append("answer2", `${answerTwo}`);
  formdata.append("answer3", `${answerThree}`);
  formdata.append("answer4", `${answerFour}`);
  formdata.append("answer5", `${answerFive}`);
  formdata.append("explanation1", `${answerExplainOne}`);
  formdata.append("explanation2", `${answerExplainTwo}`);
  formdata.append("explanation3", `${answerExplainThree}`);
  formdata.append("explanation4", `${answerExplainFour}`);
  formdata.append("explanation5", `${answerExplainFive}`);

  if (newAnswerOption == "ans1") {
    formdata.append("correctAnswer", "1");
  } else if (newAnswerOption == "ans2") {
    formdata.append("correctAnswer", "2");
  } else if (newAnswerOption == "ans3") {
    formdata.append("correctAnswer", "3");
  } else if (newAnswerOption == "ans4") {
    formdata.append("correctAnswer", "4");
  } else if (newAnswerOption == "ans5") {
    formdata.append("correctAnswer", "5");
  }

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`${BACKEND_LINK}/managecourse/updateQuestionAndAnswers`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.variable == "200") {
        SuccessAlert("Success", result.message);
        GetCurriculum(code, setsectionData);
        return;
      } else {
        ErrorAlert("Error", result.message);
      }
    })
    .catch((error) => console.error(error));
};

export const GetChartOverviewData = async (setChartData) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/revenue/getInstructorChartDetailsForThisMonth`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => setChartData(result))
    .catch((error) => console.error(error));
};

export const updateSectionData = async (
  courseCode,
  sectionId,
  curriculumItemId,
  arrangedNo
) => {
  // alert(courseCode)
  // alert(sectionId)
  // alert(curriculumItemId)
  // alert(arrangedNo)

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  const formdata = new FormData();

  formdata.append("courseCode", `${courseCode}`);
  formdata.append("sectionId", `${sectionId}`);
  formdata.append("curriculumItemId", `${curriculumItemId}`);
  formdata.append("arrangedNo", `${arrangedNo}`);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(
    `${BACKEND_LINK}/managecourse/updateSectionCurriculumItemOrder`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.variable == "200") {
        // SuccessAlert("Success",result.message)

        return;
      } else {
        ErrorAlert("Error", result.message);
        return;
      }
    })
    .catch((error) => console.error(error));
};


export const UpdateLessonVideo = async (formData) => {
  const requestOptions = {
    method: 'POST',
    body: formData,
    redirect: 'follow',
  };

  try {
    const response = await fetch(`${BACKEND_LINK}/api/files/upload`, requestOptions);
    const result = await response.text();
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};