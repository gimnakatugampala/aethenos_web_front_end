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

export const LoginInstructor = async(email, password,url) =>{

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
        ErrorAlert(result.message, result.variable)
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


 export const addCourse = async(course_title,course_category,course_keywords,course_image,course_test_video) =>{

   var myHeaders = new Headers();
   myHeaders.append("Authorization", `Bearer ${CURRENT_USER.token}`);
   
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
        ErrorAlert(result.message,result.variable)
      }

      Unauthorized(result.status,"add-courses")
     })
     .catch(error => console.log('error', error));

 }
 
