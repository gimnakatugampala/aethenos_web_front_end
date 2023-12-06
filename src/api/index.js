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
     .catch(error => {
      setloading(false)
      ErrorAlert("Error","Something Went Wong")
     });

 }

 export const getEditCourse = (code,setcourse_title,setcourse_cat,setkeywords,setpreview_img,setpreview_video) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/editcourse/getCourseByCode/${code}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)

    Unauthorized(result.status,`edit-course?code=${code}`)

    setcourse_title(result.course_title)
    setcourse_cat(result.course_category_id)
    setkeywords(result.keywordArray)
    setpreview_img(`http://185.209.223.202:8080/aethenos-assert/${result.img}`)
    setpreview_video(`http://185.209.223.202:8080/aethenos-assert/${result.test_video}`)


  })
  .catch(error => console.log('error', error));
 }

 export const EditCourses = async(code,course_title,keywords,course_cat,course_img,course_video) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

  var formdata = new FormData();
  formdata.append("code", `${code}`);
  formdata.append("course_title", `${course_title}`);
  formdata.append("img", course_img);
  formdata.append("test_video", course_video);
  formdata.append("approval_type_id", "1");
  formdata.append("course_category_id", `${course_cat}`);
  formdata.append("keywords", `${keywords[0]}`);
  formdata.append("keywords", `${keywords[1]}`);
  formdata.append("keywords", `${keywords[2]}`);
  formdata.append("keywords", `${keywords[3]}`);
  formdata.append("keywords", `${keywords[4]}`);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/editcourse/updateCourse", requestOptions)
    .then(response => response.json())
    .then(result => {

      Unauthorized(result.status,`edit-course?code=${code}`)

      console.log(result)
      if(result.variable == "200"){
        SuccessAlert("Course Updated!",result.message)

        setTimeout(() => {
          window.location.href = "/courses"
        }, 1000);
      }else{
        ErrorAlert("Error",result.message)
      }

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
    
    if(result.variable == "This is not an instructor"){
      Unauthorized(401,"courses")
    }
    Unauthorized(result.status,"courses")

    setcourses(result.sort((a, b) => new Date(b.created_date) - new Date(a.created_date)))


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

 export const GetPromotions = async(code,setpromotions) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getCoupons/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      Unauthorized(result.status,`courses/manage/${code}/#promotions`)
      setpromotions(result)
    })
    .catch(error => console.log('error', error));

 }

 export const AddPromotions = async(code,
  promo_code,
  promo_desc,
  promo_type,
  promo_amount,
  promo_date,
  setOpen) =>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

  var formdata = new FormData();
  formdata.append("course_code", `${code}`);
  formdata.append("coupon_code", `${promo_code}`);
  formdata.append("coupon_description", `${promo_desc}`);
  formdata.append("promotion_type", `${promo_type}`);
  formdata.append("amount", `${promo_amount}`);
  formdata.append("ex_date", `${promo_date}`);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/addCoupons", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      if(result.variable == "200"){
        SuccessAlert("Promotion Added",result.message)
        setOpen(false)
      }else{
        ErrorAlert("Error",result.message)
      }

      Unauthorized(result.status,`courses/manage/${code}/#promotions`)
    })
    .catch(error => console.log('error', error));
 }

 export const ActivatePromotions = async(code) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/setCouponActive/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      if(result.variable == "200"){
        SuccessAlert("Activated",result.message)



      }else{
        ErrorAlert("Error",result.message)
      }

      Unauthorized(result.status,`courses/manage/${code}/#promotions`)

    })
    .catch(error => console.log('error', error));
 }


 export const DeactivatedPromotions = async(code) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/setCouponDeactive/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      if(result.variable == "200"){
        SuccessAlert("Deactivated",result.message)
        return
      }else{
        ErrorAlert("Error",result.message)
      }

      Unauthorized(result.status,`courses/manage/${code}/#promotions`)

    })
    .catch(error => console.log('error', error));

 }

 export const GetPromotionsTypes = async(setpromo_types) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getAllPromotionType", requestOptions)
    .then(response => response.json())
    .then(result => setpromo_types(result))
    .catch(error => console.log('error', error));

 }

 export const UpdatePromotions = async(code,
  edit_promo_code,
  edit_promo_desc,
  edit_promo_type_id,
  edit_promo_amount,
  edit_promo_date,
  setopenEdit) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

  var formdata = new FormData();
// formdata.append("course_code",` ${code}`);
formdata.append("coupon_code", `${edit_promo_code}`);
formdata.append("coupon_description", `${edit_promo_desc}`);
formdata.append("promotion_type", `${edit_promo_type_id}`);
formdata.append("amount", `${edit_promo_amount}`);
formdata.append("ex_date", `${edit_promo_date}`);

var requestOptions = {
  method: 'PUT',
  body: formdata,
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/updateCoupon", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)

    if(result.variable == "200"){
      SuccessAlert("Updated!",result.message)
      setopenEdit(false)
      return
    }else{
      ErrorAlert("Error",result.message)
    }

    Unauthorized(result.status,`courses/manage/${code}/#promotions`)
  })
  .catch(error => console.log('error', error));

 }

 export const GetDiscountTypes = async(setdis_types) =>{

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getAllDiscountType", requestOptions)
    .then(response => response.json())
    .then(result => setdis_types(result))
    .catch(error => console.log('error', error));

 }

 export const GetCurriculum = async(code,setsectionData) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getCurriculum/123456", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      Unauthorized(result.status,`courses/manage/${code}/#curriculum`)
      setsectionData(result)


    })
    .catch(error => console.log('error', error));
 }

 export const AddCurriculum = async(code) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

  var formdata = new FormData();
  formdata.append("courseCode", "123456");
  formdata.append("sectionName", "Test Secton Name 02");
  formdata.append("article", "Lorem");
  // formdata.append("video", fileInput.files[0], "[PROXY]");
  formdata.append("description", "Test Description");
  // formdata.append("downloadableFile", fileInput.files[0], "[PROXY]");
  formdata.append("externalResourcesTitle", "Test Resources File");
  formdata.append("externalResourcesUrl", "www.testurl.com");
  // formdata.append("sourceCode", fileInput.files[0], "[PROXY]");
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/addCurriculum", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

 }

 export const GetCoursePricingType = async(code) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getFreeCourse/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

 }

 export const GetPriceDefault = async(code,setDGlobalPricing,setDDisType,setDDisPercent,setDDisAmt,setPriceRangeMinDefault,setPriceRangeMaxDefault,setshowDefaultValueDiscountInput,setshowDefaultPercentDiscountInput,setDGlobalNetPrice) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

  var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getDefaultCoursePricing/${code}`, requestOptions)
  .then(response => response.json())
  .then(result => {

    Unauthorized(result.status,`courses/manage/${code}/#pricing`)

    console.log(result)
    setDGlobalPricing(result.value)
    setDDisType(result.discountTypeId)
    setPriceRangeMinDefault(result.minPrice)
    setPriceRangeMaxDefault(result.maxPrice)


    if(result.discountTypeId == 2){
      setDDisPercent(result.discountValue)
      setshowDefaultPercentDiscountInput(true)
      setshowDefaultValueDiscountInput(false)

      setDGlobalNetPrice((parseFloat(result.value) - parseFloat(result.value) * parseFloat(result.discountValue)/100).toFixed(2))
      
    }else if(result.discountTypeId == 3){
      setDDisAmt(result.discountValue)
      setshowDefaultPercentDiscountInput(false)
      setshowDefaultValueDiscountInput(true)
      setDGlobalNetPrice((parseFloat(result.value) - parseFloat(result.discountValue)).toFixed(2))
    }else{
      setDDisPercent(0)
      setDDisAmt(0)
    }

    
  })
  .catch(error => console.log('error', error));

 }

 export const SavePriceDefault = async(code,DGlobalPricing,DDisType,DDisPercent,DDisAmt,DGlobalNetPrice) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER.token}`);

  var formdata = new FormData();
  formdata.append("courseCode", `${code}`);
  formdata.append("globalListPrice", `${DGlobalPricing}`);
  formdata.append("discountType", `${DDisType}`);

  if(DDisType == "1"){
    formdata.append("discountAmount", `0`);
  }else if(DDisType == "2"){
    formdata.append("discountAmount", `${DDisPercent}`);
  }else if(DDisType == "3"){
    formdata.append("discountAmount", `${DDisAmt}`);
  }

  formdata.append("globalNetPrice", `${DGlobalNetPrice}`);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/addCourseDefaultPrice", requestOptions)
    .then(response => response.json())
    .then(result => {


      Unauthorized(result.status,`courses/manage/${code}/#pricing`)

      console.log(result)

      if(result.message == "Error"){
        ErrorAlert("Error",result.variable)
      }

      if(result.variable == "200"){
        SuccessAlert("Added!",result.message)
      }


    })
    .catch(error => console.log('error', error));

 }
