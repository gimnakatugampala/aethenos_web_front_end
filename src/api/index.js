import SuccessAlert from "../commonFunctions/Alerts/SuccessAlert";
import ErrorAlert from "../commonFunctions/Alerts/ErrorAlert";
const CURRENT_USER = JSON.parse(window.localStorage.getItem("aethenos"));


// Unauthorized
const Unauthorized = (result,rediect_url) =>{

  if(result == 401){
    window.localStorage.removeItem("aethenos")
    window.location.href = `/login?sessionTimeout=true&rediect-url=${rediect_url}`
  }

}

export const LoginInstructor = async(email, password,url,setloading) =>{

  setloading(true)

  var formdata = new FormData();
  formdata.append("email", `${email}`);
  formdata.append("password", `${password}`);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/authentication/instructor", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      if(result.message == "incorrect password."){
        setloading(false)
        ErrorAlert(result.message, result.variable)
        return
      }else{

        SuccessAlert("Login Successful!","Successfully Login as an Instructor")

        const user = {
          token:result.token,
          email:result.email,
          firstname:result.fname,
          lastname:result.lname,
          status:"Instructor"
        }

        window.localStorage.setItem("aethenos", JSON.stringify(user));

        setloading(false)

        window.location.href = `/${url}`

      }
    })
    .catch(error => console.log('error', error));

}

export const InstructorVerify = async() =>{
     
     if(CURRENT_USER != null){
 
       if(CURRENT_USER.status == "Instructor"){
 
         return true
 
       }else if(CURRENT_USER.status == "Student"){
         return false
       }
         
     }else{
 
       return false
     }
 
 }

 export const getCourseCategories = async(setcategories) =>{

   var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getCourseCategory", requestOptions)
      .then(response => response.json())
      .then(result => {
         const convertedArray = result.map(item => ({
            label: item.name,
            value: item.id,
          }));

         setcategories(convertedArray)
      })
      .catch(error => console.log('error', error));
 }


 export const addCourse = async(course_title,course_category,course_keywords,course_image,course_test_video,setloading) =>{


    setloading(true)

   var myHeaders = new Headers();
   myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);
   
   var formdata = new FormData();
   formdata.append("course_title", `${course_title}`);
   formdata.append("img", course_image);
   formdata.append("test_video", course_test_video);
   formdata.append("approval_type_id", "1");
   formdata.append("course_category_id", `${course_category}`);
   formdata.append("keywords", `${course_keywords[0]}`);
   formdata.append("keywords", `${course_keywords[1]}`);
   formdata.append("keywords", `${course_keywords[2]}`);
   formdata.append("keywords", `${course_keywords[3]}`);
   formdata.append("keywords", `${course_keywords[4]}`);
   
   var requestOptions = {
     method: 'POST',
     headers: myHeaders,
     body: formdata,
     redirect: 'follow'
   };
   
   fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/course/addCourse", requestOptions)
     .then(response => response.json())
     .then(result => {

      console.log(result)

      if(result.message == "Error"){
        setloading(false)
        ErrorAlert(result.message,result.variable)
        return
      }

      if(result.variable == "200"){
        setloading(false)
        SuccessAlert("Course Added!",result.message)
  
        window.location.href = "/courses"
  
      }

      Unauthorized(result.status,"add-courses")
     })
     .catch(error => console.log('error', error));

 }
 
 export const GetAllCourses = async(setcourses) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getCourseByInstructor", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    setcourses(result)
    Unauthorized(result.status,"courses")
  })
  .catch(error => console.log('error', error));

 }

 export const GetCourseTitle = async(code,setcourse_title,setstatus_type) =>{

  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getCourseTitleAndApproveType/${code}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    setcourse_title(result.title)
    setstatus_type(result.approveType)
  })
  .catch(error => console.log('error', error));

 }

 export const GetIntendedLeaners = async(code,setstudentsLearnData,setrequirementsData,setwhosData) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getIntendedLearners/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      Unauthorized(result.status,`courses/manage/${code}/#intended-learners`)

      setstudentsLearnData(result.studentsLearn)
      setrequirementsData(result.requirements)
      setwhosData(result.who)

      console.log(result)
    
    })
    .catch(error => console.log('error', error));

 }

 export const AddIntendedLeaners = async(item,code) =>{

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);
  
  var raw = JSON.stringify(item);
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/saveIntendedLearners", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      Unauthorized(result.status,`courses/manage/${code}/#intended-learners`)

      if(result.variable == "200"){
        SuccessAlert("Saved!",result.message)
      }else{
        ErrorAlert("Error!",result.message)
      }
    })
    .catch(error => console.log('error', error));

 }


 export const AddCourseMessages = async(code,congratsmsg,welcomemsg) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

  var formdata = new FormData();
  formdata.append("course_code", `${code}`);
  formdata.append("congratulations_msg", `${congratsmsg}`);
  formdata.append("welcome_msg", `${welcomemsg}`);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/savemessages", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)



      if(result.variable == "200"){
        SuccessAlert("Saved!",result.message)
      }else{
        ErrorAlert("Error!",result.message)
      }

      Unauthorized(result.status,`courses/manage/${code}/#course-messages`)

    })
    .catch(error => console.log('error', error));
 }

 export const GetCourseMessages = async(code,setcongratsmsg,setwelcomemsg) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getMessages/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      setcongratsmsg(result.congratulations_msg)
      setwelcomemsg(result.welcome_msg)


    })
    .catch(error => console.log('error', error));
 }



 export const GetLanguages = async(setlangData) =>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getAllLanguage", requestOptions)
      .then(response => response.json())
      .then(result => setlangData(result))
      .catch(error => console.log('error', error));
 }

 export const GetLevel = async(setlevelData) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getAllCourseLevels", requestOptions)
    .then(response => response.json())
    .then(result => setlevelData(result))
    .catch(error => console.log('error', error));
 }

 export const GetCategories = async(setcat) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getCourseCategory", requestOptions)
    .then(response => response.json())
    .then(result => setcat(result))
    .catch(error => console.log('error', error));

 }

 export const GetSubCategories = async(setsubcatData) =>{
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getAllCourseSubCategory", requestOptions)
    .then(response => response.json())
    .then(result => setsubcatData(result))
    .catch(error => console.log('error', error));
 }

 export const GetCourseLandingPage = async(code,setcourse_title,setcourse_subtitle,setcourse_desc,setpreview_img,seVideoSrc,setkeywords,setcourse_cat,setcourse_sub_cat,setlevel,setlang) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getcourselandingpage/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      console.log(result)

      setcourse_title(result.courseTitle)
      setcourse_subtitle(result.courseSubTitle)
      setcourse_desc(result.description)
      setkeywords(result.keywords)
      setcourse_cat(result.category)
      setcourse_sub_cat(result.courseSubTitle)
      setlevel(result.level)
      setlang(result.language)
      setpreview_img(`http://185.209.223.202:8080/aethenos-assert/${result.courseImage}`)
      seVideoSrc(`http://185.209.223.202:8080/aethenos-assert/${result.promotionalVideo}`)

      Unauthorized(result.status,`courses/manage/${code}/#course-landing-page`)
    })
    .catch(error => console.log('error', error));

 }

 export const AddCourseLandingPage = async(
  code,
  course_title,
  course_subtitle,
  course_desc,
  lang,
  level,
  course_cat,
  course_sub_cat,
  keywords,
  promo_vid,
  course_image) =>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

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
  formdata.append("course_image", course_image);
  formdata.append("promotional_video", promo_vid);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/savecourselandingpage", requestOptions)
    .then(response => response.json())
    .then(result => {
      
      if(result.variable == "200"){
        SuccessAlert("Saved",result.message)
      }else{
        ErrorAlert("Error",result.message)
      }

      Unauthorized(result.status,`courses/manage/${code}/#course-landing-page`)

    })
    .catch(error => console.log('error', error));

 }



