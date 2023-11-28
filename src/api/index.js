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


 export const AddCourseMessages = async(code) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getMessages/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
 }
