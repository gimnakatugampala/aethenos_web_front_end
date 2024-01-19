import SuccessAlert from "../commonFunctions/Alerts/SuccessAlert";
import ErrorAlert from "../commonFunctions/Alerts/ErrorAlert";
import Cookies from 'js-cookie'

const CURRENT_USER = Cookies.get('aethenos');
const BACKEND_LINK = "https://aethenosinstructor.exon.lk:2053/aethenos-api/"


// Unauthorized
const Unauthorized = (result,rediect_url) =>{

  if(result == 401){
    // window.localStorage.removeItem("aethenos")
    Cookies.remove('aethenos', { path: '' })
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

        Cookies.set('aethenos', result.token, { expires: 7, path: '' })




        setloading(false)

        setTimeout(() => {
          window.location.href = `/${url}`
        }, 1500);


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
   myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);
   
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
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

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
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

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
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

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

    setcourses(result.sort((a, b) => new Date(b.course.createdDate) - new Date(a.course.createdDate)))


  })
  .catch(error => console.log('error', error));

 }

 export const GetCourseTitle = async(code,setcourse_title,setstatus_type) =>{

  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getCourseTitleAndApproveType/${code}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)

    Unauthorized(result.status,`courses/manage/${code}/#course-landing-page`)

    setcourse_title(result.title)
    setstatus_type(result.approveType)
  })
  .catch(error => console.log('error', error));

 }

 export const UpdateCourseProgress = async(code) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/courseCurriculumProgress/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

 }

 export const GetIntendedLeaners = async(code,setstudentsLearnData,setrequirementsData,setwhosData) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);
  
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

 export const AddIntendedLeaners = async(item,code,setloadingBtn) =>{

  setloadingBtn(true)

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);
  
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
        setloadingBtn(false)
        UpdateCourseProgress(code)
      }else{
        ErrorAlert("Error!",result.message)
        setloadingBtn(false)
      }
    })
    .catch(error => console.log('error', error));

 }


 export const AddCourseMessages = async(code,congratsmsg,welcomemsg,setloading_btn) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  setloading_btn(true)

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
        setloading_btn(false)
        UpdateCourseProgress(code)
      }else{
        ErrorAlert("Error!",result.message)
        setloading_btn(false)
      }

      Unauthorized(result.status,`courses/manage/${code}/#course-messages`)

    })
    .catch(error => console.log('error', error));
 }

 export const GetCourseMessages = async(code,setcongratsmsg,setwelcomemsg) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

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
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getcourselandingpage/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      console.log(result)
      Unauthorized(result.status,`courses/manage/${code}/#course-landing-page`)

      setcourse_title(result.courseTitle)
      setcourse_subtitle(result.courseSubTitle)
      setcourse_desc(result.description)
      setkeywords(result.keywords)
      setcourse_cat(result.categoryId)
      setcourse_sub_cat(result.subCategoryId)
      setlevel(result.levelId)
      setlang(result.languageId)
      setpreview_img(`${result.courseImage}`)
      seVideoSrc(`${result.promotionalVideo}`)



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
  course_image,
  setloading_btn) =>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

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
        setloading_btn(false)
        SuccessAlert("Saved",result.message)
        UpdateCourseProgress(code)
      }else{
        ErrorAlert("Error",result.message)
        setloading_btn(false)
      }

      Unauthorized(result.status,`courses/manage/${code}/#course-landing-page`)

    })
    .catch(error => console.log('error', error));

 }

 export const GetPromotions = async(code,setpromotions) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getCoupons/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      Unauthorized(result.status,`courses/manage/${code}/#promotions`)
      if(result.message == "Error"){
        setpromotions([])
      }else{
        setpromotions(result)
      }
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
    myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

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
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

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
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

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
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

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
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getCurriculum/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      Unauthorized(result.status,`courses/manage/${code}/#curriculum`)
      
      if(result.message == "Error"){
        setsectionData(null)
        return
      }
      
      setsectionData(result)

    })
    .catch(error => console.log('error', error));
 }



 export const GetCoursePricingType = async(code,setPaid_Type,setloading_btn) =>{



  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getCoursePayStatus/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      setPaid_Type(parseInt(result.message))
      setloading_btn(false)
      console.log(result)
    })
    .catch(error => console.log('error', error));

 }

 export const GetPriceDefault = async(code,setDGlobalPricing,setDDisType,setDDisPercent,setDDisAmt,setPriceRangeMinDefault,setPriceRangeMaxDefault,setshowDefaultValueDiscountInput,setshowDefaultPercentDiscountInput,setDGlobalNetPrice,setMinDefaultValue) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

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
    setMinDefaultValue(result.minimumPrice)


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
      setDGlobalNetPrice((parseFloat(result.value) - parseFloat(result.discountValue)).toFixed(2))
    }

    
  })
  .catch(error => console.log('error', error));

 }

 export const SavePriceDefault = async(code,DGlobalPricing,DDisType,DDisPercent,DDisAmt,DGlobalNetPrice) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

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

 export const GetCountriesListPricing = async(code, setcountriesData,
  setUSADisPercent,
  setDDisAmt,
  setUSADisType,
  setshowInputDisAmtUSA,
  setshowInputPercentUSA,
  setUSAListPrice,
  setUSANetPrice,
  setAusDisPercent,
  setAusDisAmt,
  setAusDisType,
  setshowInputDisAmtAus,
  setshowInputPercentAus,
  setAusListPrice,
  setAusNetPrice,
   // -----
   setBrazilDisPercent,
   setBrazilDisAmt,
   setBrazilDisType,
   setshowInputDisAmtBrzail,
   setshowInputPercentBrzail,
   setBrazilListPrice,
   setBrazilNetPrice,
    // ---------
    setCanadaDisPercent,
    setCanadaDisAmt,
    setCanadaDisType,
    setshowInputDisAmtCanada,
    setshowInputPercentCanada,
    setCanadaListPrice,
    setCanadaNetPrice,
     //  -------------
     setChileDisPercent,
     setChileDisAmt,
     setChileDisType,
     setshowInputDisAmtChile,
     setshowInputPercentChile,
     setChileListPrice,
     setChileNetPrice,
      // -----------
      setColumbiaDisPercent,
      setColumbiaDisAmt,
      setColumbiaDisType,
      setshowInputDisAmtColumbia,
      setshowInputPercentColumbia,
      setColumbiaListPrice,
      setColumbiaNetPrice,
       // --------------
       setEgyptDisPercent,
       setEgyptDisAmt,
       setEgyptDisType,
       setshowInputDisAmtEgypt,
       setshowInputPercentEgypt,
       setEgyptListPrice,
       setEgyptNetPrice,
        // ---------
      setEUDisPercent,
      setEUDisAmt,
      setEUDisType,
      setshowInputDisAmtEU,
      setshowInputPercentEU,
      setEUListPrice,
      setEUNetPrice,
      // ----
      setGBPDisPercent,
      setGBPDisAmt,
      setGBPDisType,
      setshowInputDisAmtGBP,
      setshowInputPercentGBP,
      setGBPListPrice,
      setGBPNetPrice,
        // ------------
      setIndonesiaDisPercent,
      setIndonesiaDisAmt,
      setIndonesiaDisType,
      setshowInputDisAmtIndonesia,
      setshowInputPercentIndonesia,
      setIndonesiaListPrice,
      setIndonesiaNetPrice,
      // ---------------
      setIsrealDisPercent,
      setIsrealDisAmt,
      setIsrealDisType,
      setshowInputDisAmtIsreal,
      setshowInputPercentIsreal,
      setIsrealListPrice,
      setIsrealNetPrice,
       // -------
       setIndiaDisPercent,
       setIndiaDisAmt,
       setIndiaDisType,
       setshowInputDisAmtIndia,
       setshowInputPercentIndia,
       setIndiaListPrice,
       setIndiaNetPrice,
      // -------------
      setJapanDisPercent,
      setJapanDisAmt,
      setJapanDisType,
      setshowInputDisAmtJapan,
      setshowInputPercentJapan,
      setJapanListPrice,
      setJapanNetPrice,
       // ---------------
       setSKDisPercent,
       setSKDisAmt,
       setSKDisType,
       setshowInputDisAmtSK,
       setshowInputPercentSK,
       setSKListPrice,
       setSKNetPrice,
       // -------------
      setMexicoDisPercent,
      setMexicoDisAmt,
      setMexicoDisType,
      setshowInputDisAmtMexico,
      setshowInputPercentMexico,
      setMexicoListPrice,
      setMexicoNetPrice,
      // --------------
      setMalaysiaDisPercent,
      setMalaysiaDisAmt,
      setMalaysiaDisType,
      setshowInputDisAmtMalaysia,
      setshowInputPercentMalaysia,
      setMalaysiaListPrice,
      setMalaysiaNetPrice,
      // -------------
      setNigeriaDisPercent,
      setNigeriaDisAmt,
      setNigeriaDisType,
      setshowInputDisAmtNigeria,
      setshowInputPercentNigeria,
      setNigeriaListPrice,
      setNIgeriaNetPrice,
      // -----------
      setNorwayDisPercent,
      setNorwayDisAmt,
      setNorwayDisType,
      setshowInputDisAmtNorway,
      setshowInputPercentNorway,
      setNorwayListPrice,
      setNorwayNetPrice,
      // ----------
      setPeruDisPercent,
      setPeruDisAmt,
      setPeruDisType,
      setshowInputDisAmtPeru,
      setshowInputPercentPeru,
      setPeruListPrice,
      setPeruNetPrice,
      // -----------
      setPhilipinesDisPercent,
      setPhiliphinesDisAmt,
      setPhilipinesDisType,
      setshowInputDisAmtPhilipines,
      setshowInputPercentPhilipines,
      setPhilipinesListPrice,
      setPhilipinesNetPrice,
      // ----------
      setPolandDisPercent,
      setPolandDisAmt,
      setPolandDisType,
      setshowInputDisAmtPoland,
      setshowInputPercentPoland,
      setPolandListPrice,
      setPolandNetPrice,
      // --------------
      setRomaniaDisPercent,
      setRomaniaDisAmt,
      setRomaniaDisType,
      setshowInputDisAmtRomania,
      setshowInputPercentRomania,
      setRomaniaListPrice,
      setRomaniaNetPrice,
       // --------------
       setRussiaDisDisPercent,
       setRussiaDisAmt,
       setRussiaDisType,
       setshowInputDisAmtRussia,
       setshowInputPercentRussia,
       setRussiaListPrice,
       setRussiaNetPrice,
        // ------------------
      setSingaporeDisPercent,
      setSingaporeDisAmt,
      setSingaporeDisType,
      setshowInputDisAmtSingapore,
      setshowInputPercentSingapore,
      setSingaporeListPrice,
      setSingaporeNetPrice,
      // -------------
      setThailandDisPercent,
      setThailandDisAmt,
      setThailandDisType,
      setshowInputDisAmtThailand,
      setshowInputPercentThailand,
      setThailandListPrice,
      setThailandNetPrice,
      // ---------------
      setTurkeyDisPercent,
      setTurkeyDisAmt,
      setTurkeyDisType,
      setshowInputDisAmtTurkey,
      setshowInputPercentTurkey,
      setTurkeyListPrice,
      setTurkeyNetPrice,
      // -------------
      setTaiwanDisPercent,
      setTaiwanDisAmt,
      setTaiwanDisType,
      setshowInputDisAmtTaiwan,
      setshowInputPercentTaiwan,
      setTaiwanListPrice,
      setTaiwanNetPrice,
      // ----------
      setVietnamDisPercent,
      setVietnamDisAmt,
      setVietmanDisType,
      setshowInputDisAmtVietnam,
      setshowInputPercentVietnam,
      setVietnamListPrice,
      setVietnamNetPrice,
       // ------------
       setSADisPercent,
       setSADisAmt,
       setSADisType,
       setshowInputDisAmtSA,
       setshowInputPercentSA,
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
      ) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);


  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getCoursePricing/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {

      setcountriesData(result)
      console.log(result)

      // ---------- AMERICA 
      if(result[0].discountTypeId == 2){
        
        setUSADisType(result[0].discountTypeId)
        setshowInputPercentUSA(true)  
        setshowInputDisAmtUSA(false)
        setUSADisPercent(result[0].discountValue)
        setUSAListPrice(result[0].value)
        setUSANetPrice((parseFloat(result[0].value) - parseFloat(result[0].value) * parseFloat(result[0].discountValue)/100).toFixed(2))
        
      }else if(result[0].discountTypeId == 3){

        setUSADisType(result[0].discountTypeId)
        setDDisAmt(result[0].discountValue)
        setshowInputPercentUSA(false)
        setshowInputDisAmtUSA(true)
        setUSANetPrice((parseFloat(result[0].value) - parseFloat(result[0].discountValue)).toFixed(2))
      }else{
        setUSADisType(result[0].discountTypeId)
        setshowInputDisAmtUSA(false)
        setshowInputPercentUSA(false)  
        setUSAListPrice(result[0].value)
        setUSANetPrice(result[0].value)
      }
      // ---------- AMERICA 


       // ---------- AUSTRALIA 
       if(result[1].discountTypeId == 2){
        
        setAusDisType(result[1].discountTypeId)
        setshowInputPercentAus(true)  
        setshowInputDisAmtAus(false)
        setAusDisPercent(result[1].discountValue)
        setAusListPrice(result[1].value)
        setAusNetPrice((parseFloat(result[1].value) - parseFloat(result[1].value) * parseFloat(result[1].discountValue)/100).toFixed(2))
        
      }else if(result[1].discountTypeId == 3){

        setAusDisType(result[1].discountTypeId)
        setAusDisAmt(result[1].discountValue)
        setshowInputPercentAus(false)
        setshowInputDisAmtAus(true)
        setAusNetPrice((parseFloat(result[1].value) - parseFloat(result[1].discountValue)).toFixed(2))
      }else{
        setAusDisType(result[1].discountTypeId)
        setshowInputDisAmtAus(false)
        setshowInputPercentAus(false)  
        setAusListPrice(result[1].value)
        setAusNetPrice(result[1].value)
      }
      // ---------- AUSTRALIA 


      // ---------- BRAZIL 
      if(result[2].discountTypeId == 2){
    
        setBrazilDisType(result[2].discountTypeId)
        setshowInputPercentBrzail(true)  
        setshowInputDisAmtBrzail(false)
        setBrazilDisPercent(result[2].discountValue)
        setBrazilListPrice(result[2].value)
        setBrazilNetPrice((parseFloat(result[2].value) - parseFloat(result[2].value) * parseFloat(result[2].discountValue)/100).toFixed(2))
        
      }else if(result[2].discountTypeId == 3){

        setBrazilDisType(result[2].discountTypeId)
        setBrazilDisAmt(result[2].discountValue)
        setshowInputPercentBrzail(false)
        setshowInputDisAmtBrzail(true)
        setBrazilNetPrice((parseFloat(result[2].value) - parseFloat(result[2].discountValue)).toFixed(2))
      }else{
        setBrazilDisType(result[2].discountTypeId)
        setshowInputDisAmtBrzail(false)
        setshowInputPercentBrzail(false)  
        setBrazilListPrice(result[2].value)
        setBrazilNetPrice(result[2].value)
      }
      // ---------- BRAZIL 

       // ---------- CANADA 
       if(result[3].discountTypeId == 2){
    
        setCanadaDisType(result[3].discountTypeId)
        setshowInputPercentCanada(true)  
        setshowInputDisAmtCanada(false)
        setCanadaDisPercent(result[3].discountValue)
        setCanadaListPrice(result[3].value)
        setCanadaNetPrice((parseFloat(result[3].value) - parseFloat(result[3].value) * parseFloat(result[3].discountValue)/100).toFixed(2))
        
      }else if(result[3].discountTypeId == 3){

        setCanadaDisType(result[3].discountTypeId)
        setCanadaDisAmt(result[3].discountValue)
        setshowInputPercentCanada(false)
        setshowInputDisAmtCanada(true)
        setCanadaListPrice(result[3].value)
        setCanadaNetPrice((parseFloat(result[3].value) - parseFloat(result[3].discountValue)).toFixed(2))
      }else{
        setCanadaDisType(result[3].discountTypeId)
        setshowInputDisAmtCanada(false)
        setshowInputPercentCanada(false)  
        setCanadaListPrice(result[3].value)
        setCanadaNetPrice(result[3].value)
      }
      // ---------- CANADA 

        // ---------- CHILE 
        if(result[4].discountTypeId == 2){

          setChileDisType(result[4].discountTypeId)
          setshowInputPercentChile(true)  
          setshowInputDisAmtChile(false)
          setChileDisPercent(result[4].discountValue)
          setChileListPrice(result[4].value)
          setChileNetPrice((parseFloat(result[4].value) - parseFloat(result[4].value) * parseFloat(result[4].discountValue)/100).toFixed(2))
          
        }else if(result[4].discountTypeId == 3){
  
          setChileDisType(result[4].discountTypeId)
          setChileDisAmt(result[4].discountValue)
          setshowInputPercentChile(false)
          setshowInputDisAmtChile(true)
          setChileListPrice(result[4].value)
          setChileNetPrice((parseFloat(result[4].value) - parseFloat(result[4].discountValue)).toFixed(2))
        }else{
          setChileDisType(result[4].discountTypeId)
          setshowInputDisAmtChile(false)
          setshowInputPercentChile(false)  
          setChileListPrice(result[4].value)
          setChileNetPrice(result[4].value)
        }
        // ---------- CHILE 

          // ---------- COLUMBIA 
          if(result[5].discountTypeId == 2){

            setColumbiaDisType(result[5].discountTypeId)
            setshowInputDisAmtColumbia(false)  
            setshowInputPercentColumbia(true)
            setColumbiaDisPercent(result[5].discountValue)
            setColumbiaListPrice(result[5].value)
            setColumbiaNetPrice((parseFloat(result[5].value) - parseFloat(result[5].value) * parseFloat(result[5].discountValue)/100).toFixed(2))
            
          }else if(result[5].discountTypeId == 3){
    
            setColumbiaDisType(result[5].discountTypeId)
            setColumbiaDisAmt(result[5].discountValue)
            setshowInputDisAmtColumbia(true)
            setshowInputPercentColumbia(false)
            setColumbiaListPrice(result[5].value)
            setColumbiaNetPrice((parseFloat(result[5].value) - parseFloat(result[5].discountValue)).toFixed(2))
          }else{
            setColumbiaDisType(result[5].discountTypeId)
            setshowInputPercentColumbia(false)
            setshowInputDisAmtColumbia(false)  
            setColumbiaListPrice(result[5].value)
            setColumbiaNetPrice(result[5].value)
          }
          // ---------- COLUMBIA 

            // ---------- EGYPT 
            if(result[6].discountTypeId == 2){

            setEgyptDisType(result[6].discountTypeId)
            setshowInputDisAmtEgypt(false)  
            setshowInputPercentEgypt(true)
            setEgyptDisPercent(result[6].discountValue)
            setEgyptListPrice(result[6].value)
            setEgyptNetPrice((parseFloat(result[6].value) - parseFloat(result[6].value) * parseFloat(result[6].discountValue)/100).toFixed(2))
            
          }else if(result[6].discountTypeId == 3){
    
            setEgyptDisType(result[6].discountTypeId)
            setEgyptDisAmt(result[6].discountValue)
            setshowInputDisAmtEgypt(true)
            setshowInputPercentEgypt(false)
            setEgyptListPrice(result[6].value)
            setEgyptNetPrice((parseFloat(result[6].value) - parseFloat(result[6].discountValue)).toFixed(2))
          }else{
            setEgyptDisType(result[6].discountTypeId)
            setshowInputPercentEgypt(false)
            setshowInputDisAmtEgypt(false)  
            setEgyptListPrice(result[6].value)
            setEgyptNetPrice(result[6].value)
          }
          // ---------- EGYPT 

          // ---------- EU 
          if(result[7].discountTypeId == 2){

          setEUDisType(result[7].discountTypeId)
          setshowInputDisAmtEU(false)  
          setshowInputPercentEU(true)
          setEUDisPercent(result[7].discountValue)
          setEUListPrice(result[7].value)
          setEUNetPrice((parseFloat(result[7].value) - parseFloat(result[7].value) * parseFloat(result[7].discountValue)/100).toFixed(2))
          
        }else if(result[7].discountTypeId == 3){
  
          setEUDisType(result[7].discountTypeId)
          setEUDisAmt(result[7].discountValue)
          setshowInputDisAmtEU(true)
          setshowInputPercentEU(false)
          setEUListPrice(result[7].value)
          setEUNetPrice((parseFloat(result[7].value) - parseFloat(result[7].discountValue)).toFixed(2))
        }else{
          setEUDisType(result[7].discountTypeId)
          setshowInputPercentEU(false)
          setshowInputDisAmtEU(false)  
          setEUListPrice(result[7].value)
          setEUNetPrice(result[7].value)
        }
        // ---------- EU 

          // ---------- GBP 
          if(result[8].discountTypeId == 2){

            setGBPDisType(result[8].discountTypeId)
            setshowInputDisAmtGBP(false)  
            setshowInputPercentGBP(true)
            setGBPDisPercent(result[8].discountValue)
            setGBPListPrice(result[8].value)
            setGBPNetPrice((parseFloat(result[8].value) - parseFloat(result[8].value) * parseFloat(result[8].discountValue)/100).toFixed(2))
            
          }else if(result[8].discountTypeId == 3){
    
            setGBPDisType(result[8].discountTypeId)
            setGBPDisAmt(result[8].discountValue)
            setshowInputDisAmtGBP(true)
            setshowInputPercentGBP(false)
            setGBPListPrice(result[8].value)
            setGBPNetPrice((parseFloat(result[8].value) - parseFloat(result[8].discountValue)).toFixed(2))
          }else{
            setGBPDisType(result[8].discountTypeId)
            setshowInputPercentGBP(false)
            setshowInputDisAmtGBP(false)  
            setGBPListPrice(result[8].value)
            setGBPNetPrice(result[8].value)
          }
          // ---------- GBP 


        // ---------- Indonesia 
        if(result[9].discountTypeId == 2){

        setIndonesiaDisType(result[9].discountTypeId)
        setshowInputDisAmtIndonesia(false)  
        setshowInputPercentIndonesia(true)
        setIndonesiaDisPercent(result[9].discountValue)
        setIndonesiaListPrice(result[9].value)
        setIndonesiaNetPrice((parseFloat(result[9].value) - parseFloat(result[9].value) * parseFloat(result[9].discountValue)/100).toFixed(2))
        
      }else if(result[9].discountTypeId == 3){

        setIndonesiaDisType(result[9].discountTypeId)
        setIndonesiaDisAmt(result[9].discountValue)
        setshowInputDisAmtIndonesia(true)
        setshowInputPercentIndonesia(false)
        setIndonesiaListPrice(result[9].value)
        setIndonesiaNetPrice((parseFloat(result[9].value) - parseFloat(result[9].discountValue)).toFixed(2))
      }else{
        setIndonesiaDisType(result[9].discountTypeId)
        setshowInputPercentIndonesia(false)
        setshowInputDisAmtIndonesia(false)  
        setIndonesiaListPrice(result[9].value)
        setIndonesiaNetPrice(result[9].value)
      }
      // ---------- Indonesia 

        // ---------- Isearl 
        if(result[10].discountTypeId == 2){

        setIsrealDisType(result[10].discountTypeId)
        setshowInputDisAmtIsreal(false)  
        setshowInputPercentIsreal(true)
        setIsrealDisPercent(result[10].discountValue)
        setIsrealListPrice(result[10].value)
        setIsrealNetPrice((parseFloat(result[10].value) - parseFloat(result[10].value) * parseFloat(result[10].discountValue)/100).toFixed(2))
        
      }else if(result[10].discountTypeId == 3){

        setIsrealDisType(result[10].discountTypeId)
        setIsrealDisAmt(result[10].discountValue)
        setshowInputDisAmtIsreal(true)
        setshowInputPercentIsreal(false)
        setIsrealListPrice(result[10].value)
        setIsrealNetPrice((parseFloat(result[10].value) - parseFloat(result[10].discountValue)).toFixed(2))
      }else{
        setIsrealDisType(result[10].discountTypeId)
        setshowInputPercentIsreal(false)
        setshowInputDisAmtIsreal(false)  
        setIsrealListPrice(result[10].value)
        setIsrealNetPrice(result[10].value)
      }
      // ---------- Isearl 

      // ---------- India 
      if(result[11].discountTypeId == 2){

        setIndiaDisType(result[11].discountTypeId)
        setshowInputDisAmtIndia(false)  
        setshowInputPercentIndia(true)
        setIndiaDisPercent(result[11].discountValue)
        setIndiaListPrice(result[11].value)
        setIndiaNetPrice((parseFloat(result[11].value) - parseFloat(result[11].value) * parseFloat(result[11].discountValue)/100).toFixed(2))
        
      }else if(result[11].discountTypeId == 3){

        setIndiaDisType(result[11].discountTypeId)
        setIndiaDisAmt(result[11].discountValue)
        setshowInputDisAmtIndia(true)
        setshowInputPercentIndia(false)
        setIndiaListPrice(result[11].value)
        setIndiaNetPrice((parseFloat(result[11].value) - parseFloat(result[11].discountValue)).toFixed(2))
      }else{
        setIndiaDisType(result[11].discountTypeId)
        setshowInputPercentIndia(false)
        setshowInputDisAmtIndia(false)  
        setIndiaListPrice(result[11].value)
        setIndiaNetPrice(result[11].value)
      }
      // ---------- India 


      // ---------- JAPAN 
      if(result[12].discountTypeId == 2){

        setJapanDisType(result[12].discountTypeId)
        setshowInputDisAmtJapan(false)  
        setshowInputPercentJapan(true)
        setJapanDisPercent(result[12].discountValue)
        setJapanListPrice(result[12].value)
        setJapanNetPrice((parseFloat(result[12].value) - parseFloat(result[12].value) * parseFloat(result[12].discountValue)/100).toFixed(2))
        
      }else if(result[12].discountTypeId == 3){

        setJapanDisType(result[12].discountTypeId)
        setJapanDisAmt(result[12].discountValue)
        setshowInputDisAmtJapan(true)
        setshowInputPercentJapan(false)
        setJapanListPrice(result[12].value)
        setJapanNetPrice((parseFloat(result[12].value) - parseFloat(result[12].discountValue)).toFixed(2))
      }else{
        setJapanDisType(result[12].discountTypeId)
        setshowInputPercentJapan(false)
        setshowInputDisAmtJapan(false)  
        setJapanListPrice(result[12].value)
        setJapanNetPrice(result[12].value)
      }
      // ---------- JAPAN


        // ---------- SK 
        if(result[13].discountTypeId == 2){

        setSKDisType(result[13].discountTypeId)
        setshowInputDisAmtSK(false)  
        setshowInputPercentSK(true)
        setSKDisPercent(result[13].discountValue)
        setSKListPrice(result[13].value)
        setSKNetPrice((parseFloat(result[13].value) - parseFloat(result[13].value) * parseFloat(result[13].discountValue)/100).toFixed(2))
        
      }else if(result[13].discountTypeId == 3){

        setSKDisType(result[13].discountTypeId)
        setSKDisAmt(result[13].discountValue)
        setshowInputDisAmtSK(true)
        setshowInputPercentSK(false)
        setSKListPrice(result[13].value)
        setSKNetPrice((parseFloat(result[13].value) - parseFloat(result[13].discountValue)).toFixed(2))
      }else{
        setSKDisType(result[13].discountTypeId)
        setshowInputPercentSK(false)
        setshowInputDisAmtSK(false)  
        setSKListPrice(result[13].value)
        setSKNetPrice(result[13].value)
      }
      // ---------- SK


         // ---------- Mexico 
         if(result[14].discountTypeId == 2){

          setMexicoDisType(result[14].discountTypeId)
          setshowInputDisAmtMexico(false)  
          setshowInputPercentMexico(true)
          setMexicoDisPercent(result[14].discountValue)
          setMexicoListPrice(result[14].value)
          setMexicoNetPrice((parseFloat(result[14].value) - parseFloat(result[14].value) * parseFloat(result[14].discountValue)/100).toFixed(2))
          
        }else if(result[14].discountTypeId == 3){
  
          setMexicoDisType(result[14].discountTypeId)
          setMexicoDisAmt(result[14].discountValue)
          setshowInputDisAmtMexico(true)
          setshowInputPercentMexico(false)
          setMexicoListPrice(result[14].value)
          setMexicoNetPrice((parseFloat(result[14].value) - parseFloat(result[14].discountValue)).toFixed(2))
        }else{
          setMexicoDisType(result[14].discountTypeId)
          setshowInputPercentMexico(false)
          setshowInputDisAmtMexico(false)  
          setMexicoListPrice(result[14].value)
          setMexicoNetPrice(result[14].value)
        }
        // ---------- Mexico


        // ---------- Malaysia 
        if(result[15].discountTypeId == 2){

          setMalaysiaDisType(result[15].discountTypeId)
          setshowInputDisAmtMalaysia(false)  
          setshowInputPercentMalaysia(true)
          setMalaysiaDisPercent(result[15].discountValue)
          setMalaysiaListPrice(result[15].value)
          setMalaysiaNetPrice((parseFloat(result[15].value) - parseFloat(result[15].value) * parseFloat(result[15].discountValue)/100).toFixed(2))
          
        }else if(result[15].discountTypeId == 3){
  
          setMalaysiaDisType(result[15].discountTypeId)
          setMalaysiaDisAmt(result[15].discountValue)
          setshowInputDisAmtMalaysia(true)
          setshowInputPercentMalaysia(false)
          setMalaysiaListPrice(result[15].value)
          setMalaysiaNetPrice((parseFloat(result[15].value) - parseFloat(result[15].discountValue)).toFixed(2))
        }else{
          setMalaysiaDisType(result[15].discountTypeId)
          setshowInputPercentMalaysia(false)
          setshowInputDisAmtMalaysia(false)  
          setMalaysiaListPrice(result[15].value)
          setMalaysiaNetPrice(result[15].value)
        }
        // ---------- Malaysia


        // ---------- Nigeria 
        if(result[16].discountTypeId == 2){

        setNigeriaDisType(result[16].discountTypeId)
        setshowInputDisAmtNigeria(false)  
        setshowInputPercentNigeria(true)
        setNigeriaDisPercent(result[16].discountValue)
        setNigeriaListPrice(result[16].value)
        setNIgeriaNetPrice((parseFloat(result[16].value) - parseFloat(result[16].value) * parseFloat(result[16].discountValue)/100).toFixed(2))
        
      }else if(result[16].discountTypeId == 3){

        setNigeriaDisType(result[16].discountTypeId)
        setNigeriaDisAmt(result[16].discountValue)
        setshowInputDisAmtNigeria(true)
        setshowInputPercentNigeria(false)
        setNigeriaListPrice(result[16].value)
        setNIgeriaNetPrice((parseFloat(result[16].value) - parseFloat(result[16].discountValue)).toFixed(2))
      }else{
        setNigeriaDisType(result[16].discountTypeId)
        setshowInputPercentNigeria(false)
        setshowInputDisAmtNigeria(false)  
        setNigeriaListPrice(result[16].value)
        setNIgeriaNetPrice(result[16].value)
      }
      // ---------- Nigeria

      // ---------- Norway 
      if(result[17].discountTypeId == 2){

        setNorwayDisType(result[17].discountTypeId)
        setshowInputDisAmtNorway(false)  
        setshowInputPercentNorway(true)
        setNorwayDisPercent(result[17].discountValue)
        setNorwayListPrice(result[17].value)
        setNorwayNetPrice((parseFloat(result[17].value) - parseFloat(result[17].value) * parseFloat(result[17].discountValue)/100).toFixed(2))
        
      }else if(result[17].discountTypeId == 3){

        setNorwayDisType(result[17].discountTypeId)
        setNorwayDisAmt(result[17].discountValue)
        setshowInputDisAmtNorway(true)
        setshowInputPercentNorway(false)
        setNorwayListPrice(result[17].value)
        setNorwayNetPrice((parseFloat(result[17].value) - parseFloat(result[17].discountValue)).toFixed(2))
      }else{
        setNorwayDisType(result[17].discountTypeId)
        setshowInputPercentNorway(false)
        setshowInputDisAmtNorway(false)  
        setNorwayListPrice(result[17].value)
        setNorwayNetPrice(result[17].value)
      }
      // ---------- Norway


       // ---------- Peru 
       if(result[18].discountTypeId == 2){

        setPeruDisType(result[18].discountTypeId)
        setshowInputDisAmtPeru(false)  
        setshowInputPercentPeru(true)
        setPeruDisPercent(result[18].discountValue)
        setPeruListPrice(result[18].value)
        setPeruNetPrice((parseFloat(result[18].value) - parseFloat(result[18].value) * parseFloat(result[18].discountValue)/100).toFixed(2))
        
      }else if(result[18].discountTypeId == 3){

        setPeruDisType(result[18].discountTypeId)
        setPeruDisAmt(result[18].discountValue)
        setshowInputDisAmtPeru(true)
        setshowInputPercentPeru(false)
        setPeruListPrice(result[18].value)
        setPeruNetPrice((parseFloat(result[18].value) - parseFloat(result[18].discountValue)).toFixed(2))
      }else{
        setPeruDisType(result[18].discountTypeId)
        setshowInputPercentPeru(false)
        setshowInputDisAmtPeru(false)  
        setPeruListPrice(result[18].value)
        setPeruNetPrice(result[18].value)
      }
      // ---------- Peru

      // ---------- Philipines 
      if(result[19].discountTypeId == 2){

      setPhilipinesDisType(result[19].discountTypeId)
      setshowInputDisAmtPhilipines(false)  
      setshowInputPercentPhilipines(true)
      setPhilipinesDisPercent(result[19].discountValue)
      setPhilipinesListPrice(result[19].value)
      setPhilipinesNetPrice((parseFloat(result[19].value) - parseFloat(result[19].value) * parseFloat(result[19].discountValue)/100).toFixed(2))
      
    }else if(result[19].discountTypeId == 3){

      setPhilipinesDisType(result[19].discountTypeId)
      setPhiliphinesDisAmt(result[19].discountValue)
      setshowInputDisAmtPhilipines(true)
      setshowInputPercentPhilipines(false)
      setPhilipinesListPrice(result[19].value)
      setPhilipinesNetPrice((parseFloat(result[19].value) - parseFloat(result[19].discountValue)).toFixed(2))
    }else{
      setPhilipinesDisType(result[19].discountTypeId)
      setshowInputPercentPhilipines(false)
      setshowInputDisAmtPhilipines(false)  
      setPhilipinesListPrice(result[19].value)
      setPhilipinesNetPrice(result[19].value)
    }
    // ---------- Philipines

    // ---------- Poland 
    if(result[20].discountTypeId == 2){

      setPolandDisType(result[20].discountTypeId)
      setshowInputDisAmtPoland(false)  
      setshowInputPercentPoland(true)
      setPolandDisPercent(result[20].discountValue)
      setPolandListPrice(result[20].value)
      setPolandNetPrice((parseFloat(result[20].value) - parseFloat(result[20].value) * parseFloat(result[20].discountValue)/100).toFixed(2))
      
    }else if(result[20].discountTypeId == 3){

      setPolandDisType(result[20].discountTypeId)
      setPolandDisAmt(result[20].discountValue)
      setshowInputDisAmtPoland(true)
      setshowInputPercentPoland(false)
      setPolandListPrice(result[20].value)
      setPolandNetPrice((parseFloat(result[20].value) - parseFloat(result[20].discountValue)).toFixed(2))
    }else{
      setPolandDisType(result[20].discountTypeId)
      setshowInputPercentPoland(false)
      setshowInputDisAmtPoland(false)  
      setPolandListPrice(result[20].value)
      setPolandNetPrice(result[20].value)
    }
    // ---------- Poland


    // ---------- Romania 
    if(result[21].discountTypeId == 2){

      setRomaniaDisType(result[21].discountTypeId)
      setshowInputDisAmtRomania(false)  
      setshowInputPercentRomania(true)
      setRomaniaDisPercent(result[21].discountValue)
      setRomaniaListPrice(result[21].value)
      setRomaniaNetPrice((parseFloat(result[21].value) - parseFloat(result[21].value) * parseFloat(result[21].discountValue)/100).toFixed(2))
      
    }else if(result[21].discountTypeId == 3){

      setRomaniaDisType(result[21].discountTypeId)
      setRomaniaDisAmt(result[21].discountValue)
      setshowInputDisAmtRomania(true)
      setshowInputPercentRomania(false)
      setRomaniaListPrice(result[21].value)
      setRomaniaNetPrice((parseFloat(result[21].value) - parseFloat(result[21].discountValue)).toFixed(2))
    }else{
      setRomaniaDisType(result[21].discountTypeId)
      setshowInputPercentRomania(false)
      setshowInputDisAmtRomania(false)  
      setRomaniaListPrice(result[21].value)
      setRomaniaNetPrice(result[21].value)
    }
    // ---------- Romania

    // ---------- Russian 
    if(result[22].discountTypeId == 2){

      setRussiaDisType(result[22].discountTypeId)
      setshowInputDisAmtRussia(false)  
      setshowInputPercentRussia(true)
      setRussiaDisDisPercent(result[22].discountValue)
      setRussiaListPrice(result[22].value)
      setRussiaNetPrice((parseFloat(result[22].value) - parseFloat(result[22].value) * parseFloat(result[22].discountValue)/100).toFixed(2))
      
    }else if(result[22].discountTypeId == 3){

      setRussiaDisType(result[22].discountTypeId)
      setRussiaDisAmt(result[22].discountValue)
      setshowInputDisAmtRussia(true)
      setshowInputPercentRussia(false)
      setRussiaListPrice(result[22].value)
      setRussiaNetPrice((parseFloat(result[22].value) - parseFloat(result[22].discountValue)).toFixed(2))
    }else{
      setRussiaDisType(result[22].discountTypeId)
      setshowInputPercentRussia(false)
      setshowInputDisAmtRussia(false)  
      setRussiaListPrice(result[22].value)
      setRussiaNetPrice(result[22].value)
    }
    // ---------- Russian

    // ---------- singapore 
    if(result[23].discountTypeId == 2){

      setSingaporeDisType(result[23].discountTypeId)
      setshowInputDisAmtSingapore(false)  
      setshowInputPercentSingapore(true)
      setSingaporeDisPercent(result[23].discountValue)
      setSingaporeListPrice(result[23].value)
      setSingaporeNetPrice((parseFloat(result[23].value) - parseFloat(result[23].value) * parseFloat(result[23].discountValue)/100).toFixed(2))
      
    }else if(result[23].discountTypeId == 3){

      setSingaporeDisType(result[23].discountTypeId)
      setSingaporeDisAmt(result[23].discountValue)
      setshowInputDisAmtSingapore(true)
      setshowInputPercentSingapore(false)
      setSingaporeListPrice(result[23].value)
      setSingaporeNetPrice((parseFloat(result[23].value) - parseFloat(result[23].discountValue)).toFixed(2))
    }else{
      setSingaporeDisType(result[23].discountTypeId)
      setshowInputPercentSingapore(false)
      setshowInputDisAmtSingapore(false)  
      setSingaporeListPrice(result[23].value)
      setSingaporeNetPrice(result[23].value)
    }
    // ---------- singapore

    // ---------- Thailand 
    if(result[24].discountTypeId == 2){

    setThailandDisType(result[24].discountTypeId)
    setshowInputDisAmtThailand(false)  
    setshowInputPercentThailand(true)
    setThailandDisPercent(result[24].discountValue)
    setThailandListPrice(result[24].value)
    setThailandNetPrice((parseFloat(result[24].value) - parseFloat(result[24].value) * parseFloat(result[24].discountValue)/100).toFixed(2))
    
  }else if(result[24].discountTypeId == 3){

    setThailandDisType(result[24].discountTypeId)
    setThailandDisAmt(result[24].discountValue)
    setshowInputDisAmtThailand(true)
    setshowInputPercentThailand(false)
    setThailandListPrice(result[24].value)
    setThailandNetPrice((parseFloat(result[24].value) - parseFloat(result[24].discountValue)).toFixed(2))
  }else{
    setThailandDisType(result[24].discountTypeId)
    setshowInputPercentThailand(false)
    setshowInputDisAmtThailand(false)  
    setThailandListPrice(result[24].value)
    setThailandNetPrice(result[24].value)
  }
  // ---------- Thailand


    // ---------- Turkey 
    if(result[25].discountTypeId == 2){

      setTurkeyDisType(result[25].discountTypeId)
      setshowInputDisAmtTurkey(false)  
      setshowInputPercentTurkey(true)
      setTurkeyDisPercent(result[25].discountValue)
      setTurkeyListPrice(result[25].value)
      setTurkeyNetPrice((parseFloat(result[25].value) - parseFloat(result[25].value) * parseFloat(result[25].discountValue)/100).toFixed(2))
      
    }else if(result[25].discountTypeId == 3){
  
      setTurkeyDisType(result[25].discountTypeId)
      setTurkeyDisAmt(result[25].discountValue)
      setshowInputDisAmtTurkey(true)
      setshowInputPercentTurkey(false)
      setTurkeyListPrice(result[25].value)
      setTurkeyNetPrice((parseFloat(result[25].value) - parseFloat(result[25].discountValue)).toFixed(2))
    }else{
      setTurkeyDisType(result[25].discountTypeId)
      setshowInputPercentTurkey(false)
      setshowInputDisAmtTurkey(false)  
      setTurkeyListPrice(result[25].value)
      setTurkeyNetPrice(result[25].value)
    }
    // ---------- Turkey

    // ---------- Taiwan 
    if(result[26].discountTypeId == 2){

      setTaiwanDisType(result[26].discountTypeId)
      setshowInputDisAmtTaiwan(false)  
      setshowInputPercentTaiwan(true)
      setTaiwanDisPercent(result[26].discountValue)
      setTaiwanListPrice(result[26].value)
      setTaiwanNetPrice((parseFloat(result[26].value) - parseFloat(result[26].value) * parseFloat(result[26].discountValue)/100).toFixed(2))
      
    }else if(result[26].discountTypeId == 3){
  
      setTaiwanDisType(result[26].discountTypeId)
      setTaiwanDisAmt(result[26].discountValue)
      setshowInputDisAmtTaiwan(true)
      setshowInputPercentTaiwan(false)
      setTaiwanListPrice(result[26].value)
      setTaiwanNetPrice((parseFloat(result[26].value) - parseFloat(result[26].discountValue)).toFixed(2))
    }else{
      setTaiwanDisType(result[26].discountTypeId)
      setshowInputPercentTaiwan(false)
      setshowInputDisAmtTaiwan(false)  
      setTaiwanListPrice(result[26].value)
      setTaiwanNetPrice(result[26].value)
    }
    // ---------- Taiwan

    // ---------- Vietnam 
    if(result[27].discountTypeId == 2){

      setVietmanDisType(result[27].discountTypeId)
      setshowInputDisAmtVietnam(false)  
      setshowInputPercentVietnam(true)
      setVietnamDisPercent(result[27].discountValue)
      setVietnamListPrice(result[27].value)
      setVietnamNetPrice((parseFloat(result[27].value) - parseFloat(result[27].value) * parseFloat(result[27].discountValue)/100).toFixed(2))
      
    }else if(result[27].discountTypeId == 3){
  
      setVietmanDisType(result[27].discountTypeId)
      setVietnamDisAmt(result[27].discountValue)
      setshowInputDisAmtVietnam(true)
      setshowInputPercentVietnam(false)
      setVietnamListPrice(result[27].value)
      setVietnamNetPrice((parseFloat(result[27].value) - parseFloat(result[27].discountValue)).toFixed(2))
    }else{
      setVietmanDisType(result[27].discountTypeId)
      setshowInputPercentVietnam(false)
      setshowInputDisAmtVietnam(false)  
      setVietnamListPrice(result[27].value)
      setVietnamNetPrice(result[27].value)
    }
    // ---------- Vietnam

    // ---------- SA 
    if(result[28].discountTypeId == 2){

      setSADisType(result[28].discountTypeId)
      setshowInputDisAmtSA(false)  
      setshowInputPercentSA(true)
      setSADisPercent(result[28].discountValue)
      setSAListPrice(result[28].value)
      setSANetPrice((parseFloat(result[28].value) - parseFloat(result[28].value) * parseFloat(result[28].discountValue)/100).toFixed(2))
      
    }else if(result[28].discountTypeId == 3){
  
      setSADisType(result[28].discountTypeId)
      setSADisAmt(result[28].discountValue)
      setshowInputDisAmtSA(true)
      setshowInputPercentSA(false)
      setSAListPrice(result[28].value)
      setSANetPrice((parseFloat(result[28].value) - parseFloat(result[28].discountValue)).toFixed(2))
    }else{
      setSADisType(result[28].discountTypeId)
      setshowInputPercentSA(false)
      setshowInputDisAmtSA(false)  
      setSAListPrice(result[28].value)
      setSANetPrice(result[28].value)
    }
    // ---------- SA


    // ---------------
    setUSATip(result[0].tip)
    setUSAMinValue(result[0].minimumPrice)

    setAusTip(result[1].tip)
    setAusminValue(result[1].minimumPrice)

    setBrazilTip(result[2].tip)
    setBrazilminValue(result[2].minimumPrice)

    setCanadaTip(result[3].tip)
    setCanadaminValue(result[3].minimumPrice)

    setChileTip(result[4].tip)
    setChileminValue(result[4].minimumPrice)

    setColumbiaTip(result[5].tip)
    setColumbiaminValue(result[5].minimumPrice)

    setEgyptTip(result[6].tip)
    setEgyptminValue(result[6].minimumPrice)

    setEUTip(result[7].tip)
    setEUminValue(result[7].minimumPrice)

    setGBPTip(result[8].tip)
    setGBPminValue(result[8].minimumPrice)

    setIndonesiaTip(result[9].tip)
    setIndonesiaminValue(result[9].minimumPrice)
// -
    setIsrealTip(result[10].tip)
    setIsrealminValue(result[10].minimumPrice)

    setIndiaTip(result[11].tip)
    setIndiaminValue(result[11].minimumPrice)

    setJapanTip(result[12].tip)
    setJapanminValue(result[12].minimumPrice)

    setSKTip(result[13].tip)
    setSKminValue(result[13].minimumPrice)

    setMexicoTip(result[14].tip)
    setMexicominValue(result[14].minimumPrice)

    setMalaysiaTip(result[15].tip)
    setMalaysiaminValue(result[15].minimumPrice)

    setNigeriaTip(result[16].tip)
    setNigeriaminValue(result[16].minimumPrice)

    setNorwayTip(result[17].tip)
    setNorwayminValue(result[17].minimumPrice)

    setPeruTip(result[18].tip)
    setPeruminvalue(result[18].minimumPrice)

    setPhilipinesTip(result[19].tip)
    setPhilipinesminValue(result[19].minimumPrice)

    setPolandTip(result[20].tip)
    setPolandminValue(result[20].minimumPrice)


    setRomaniaTip(result[21].tip)
    setRomaniaminvalue(result[21].minimumPrice)

    setRussiaTip(result[22].tip)
    setRussiaminValue(result[22].minimumPrice)

    setSingaporeTip(result[23].tip)
    setSingaporeminValue(result[23].minimumPrice)

    setThailandTip(result[24].tip)
    setThailandminValue(result[24].minimumPrice)

    setTurkeyTip(result[25].tip)
    setTurkeyminValue(result[25].minimumPrice)

    setTaiwanTip(result[26].tip)
    setTaiwanminValue(result[26].minimumPrice)

    setVietnamTip(result[27].tip)
    setVietnamminValue(result[27].minimumPrice)

    setSATip(result[28].tip)
    setSAminValue(result[28].minimumPrice)






    //  -----------------

    })
    .catch(error => console.log('error', error));
 }

 export const SavePriceCountries = async(code,raw,setloading_button) =>{


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

var requestOptions = {
  method: 'POST',
  body: JSON.stringify(raw),
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/addSingleCoursePricing", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)

    Unauthorized(result.status,`courses/manage/${code}/#pricing`)

    if(result.message == "Error"){
      ErrorAlert("Error",result.variable)
      setloading_button(false)
      return
    }

    if(result.variable == "200"){
      SuccessAlert("Added!",result.message)
      setloading_button(false)
      UpdateCourseProgress(code)
    }

  })
  .catch(error => console.log('error', error));

 }

 export const PricingConvertToFree = async(code) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);


  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/addFreeCourse/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      Unauthorized(result.status,`courses/manage/${code}/#pricing`)
      console.log(result)

      if(result.message == "Error"){
        ErrorAlert("Error",result.variable)
        return
      }

      if(result.variable == "200"){
        SuccessAlert("Updated",result.message)
        UpdateCourseProgress(code)
        return
      }

    })
    .catch(error => console.log('error', error));
 }
 
 export const AddCurriculumSection = async(code,section,setshowSectionInput,setsection,setsectionData) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("CourseCode", `${code}`);
  formdata.append("SectionName", `${section}`);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/addSection", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      Unauthorized(result.status,`courses/manage/${code}/#curriculum`)

      if(result.message == "Course section Added successfully"){
          SuccessAlert("Section Added",result.message)
          UpdateCourseProgress(code)
          setshowSectionInput(false)
          setsection("")
          GetCurriculum(code,setsectionData) 
          return
      }
    })
    .catch(error => console.log('error', error));

 }

 export const AddLectureTitle = async(code,lecturetitle,courseID,setlecturetitle,setshowLecInput,setshowCurriculumItem,setsectionData) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("title", `${lecturetitle}`);
  formdata.append("courseSectionId", `${courseID}`);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/addLecture", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      Unauthorized(result.status,`courses/manage/${code}/#curriculum`)

      if(result.message == "Error"){
        ErrorAlert("Error",result.variable)
        return
      }

      if(result.variable == "200"){
        SuccessAlert("Success",result.message)
        setshowLecInput(null)
        setshowCurriculumItem(null)
        setlecturetitle("")
        GetCurriculum(code,setsectionData)
        return
      }

    })
    .catch(error => console.log('error', error));

 }

 export const OwnThisContent = async(code,setShow) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/ownThisCourse/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      if(result.variable == "200"){
        // return "Owned"
        setShow(false)
      }else{
        // return "AlreadyOwned"

        ErrorAlert("Error","Something Went Wrong")
      }
    })
    .catch(error => console.log('error', error));

 }

 export const CheckContentOwnership = async(code,setcourseOwnership) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getCourseIsOwned/${code}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      Unauthorized(result.status,`courses/manage/${code}/#curriculum`)
      setcourseOwnership(result)
    })
    .catch(error => console.log('error', error));

 }

 export const RequestSubmitReview = async(code) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/submitForReview/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      Unauthorized(result.status,`courses/manage/${code}/#curriculum`)

      if(result.variable == "200"){
        SuccessAlert("Success",result.message);

        setTimeout(() => {
          window.location.href = "/courses"
        }, 1300);

        return
      }

    })
    .catch(error => console.log('error', error));

 }

 export const AddCurriculumDescription = async(code,ID,curriculum_desc,setcurriculum_desc,setshowDescription,setsectionData) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("CurriculumItemId", `${ID}`);
  formdata.append("Description", `${curriculum_desc}`);

  var requestOptions = {
    method: 'PUT',
    body: formdata,
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/addDescription", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      Unauthorized(result.status,`courses/manage/${code}/#curriculum`)

      if(result.variable == "200"){
        SuccessAlert("Added",result.message)
        setshowDescription(null)
        setcurriculum_desc("")
        GetCurriculum(code,setsectionData)
        return
      }
    
    })
    .catch(error => console.log('error', error));

 }

 export const AddCurriculumDownloadable = async(code,ID,file,setshowResources,setsectionData) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
formdata.append("CurriculumItemId", `${ID}`);
formdata.append("downloadableFile", file);

var requestOptions = {
  method: 'POST',
  body: formdata,
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/addDownloadableFile", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    Unauthorized(result.status,`courses/manage/${code}/#curriculum`)

    if(result.variable == "200"){
      SuccessAlert("Added",result.message)
      GetCurriculum(code,setsectionData)
      setshowResources(null)
      return
    }

  })
  .catch(error => console.log('error', error));

 }

 export const AddCurriculumExternalResourses = async(code,ID,curriclum_ex_res_tile,curriculum_ex_res_link,setcurriclum_ex_res_tile,setcurriculum_ex_res_link,setsectionData) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("CurriculumItemId", `${ID}`);
  formdata.append("Title", `${curriclum_ex_res_tile}`);
  formdata.append("Url", `${curriculum_ex_res_link}`);

var requestOptions = {
  method: 'POST',
  body: formdata,
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/addExternalResource", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    Unauthorized(result.status,`courses/manage/${code}/#curriculum`)

    if(result.variable == "200"){
      SuccessAlert("Added",result.message)
      GetCurriculum(code,setsectionData)
      setcurriclum_ex_res_tile("")
      setcurriculum_ex_res_link("")
    }else{
      ErrorAlert("Error","Something Went Wrong")
    }

    

  })
  .catch(error => console.log('error', error));

 }

 export const AddCurriculumSourceCode = async(code,ID,file,setsectionData) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
formdata.append("CurriculumItemId", `${ID}`);
formdata.append("SourceCode", file);

var requestOptions = {
  method: 'POST',
  body: formdata,
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/addSourceCode", requestOptions)
  .then(response => response.json())
  .then(result => {

    console.log(result)
    Unauthorized(result.status,`courses/manage/${code}/#curriculum`)

    if(result.variable == "200"){
      SuccessAlert("Added!",result.message)
      GetCurriculum(code,setsectionData)
      return
    }
  
  })
  .catch(error => console.log('error', error));

 }

 export const AddCurriculumArticle = async(code,ID,article,setsectionData,setarticle,setshowMain) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
formdata.append("CurriculumItemId", `${ID}`);
formdata.append("Article", `${article}`);

var requestOptions = {
  method: 'PUT',
  body: formdata,
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/addArticle", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    Unauthorized(result.status,`courses/manage/${code}/#curriculum`)

    if(result.variable == "200"){
      SuccessAlert("Added",result.message)
      setarticle("")
      setshowMain(null)
      GetCurriculum(code,setsectionData)

      return
    }

  })
  .catch(error => console.log('error', error));

 }

 export const AddCurriculumVideo = async(code,ID,video,setsectionData,setshowMain) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("CurriculumItemId", `${ID}`);
  formdata.append("Video", video);

  var requestOptions = {
    method: 'PUT',
    body: formdata,
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/addVideo", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      Unauthorized(result.status,`courses/manage/${code}/#curriculum`)

      if(result.variable == "200"){
        SuccessAlert("Uploaded",result.message)
        GetCurriculum(code,setsectionData)
        UpdateCourseProgress(code)
        setshowMain(null)
        return
      }

    })
    .catch(error => console.log('error', error));

 }

 export const AddCurriculumQuiz = async(code,setsectionData,sectionID,quizTitle,quizDesc,setshowQuizInput,setshowCurriculumItem,setquizTitle,setquizDesc) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
  formdata.append("title", `${quizTitle}`);
  formdata.append("description", `${quizDesc}`);
  formdata.append("courseSectionId", `${sectionID}`);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/addQuiz", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      Unauthorized(result.status,`courses/manage/${code}/#curriculum`)

      if(result.variable == "200"){
        SuccessAlert("Added",result.message)
        GetCurriculum(code,setsectionData)
        setshowQuizInput(null)
        setshowCurriculumItem(null)
        setquizTitle("")
        setquizDesc("")
        return
      }

      if(result.message == "Error"){
        ErrorAlert("Error",result.variable)
        return
      }

    })
    .catch(error => console.log('error', error));

 }

 export const AddCurriculumQnAQuiz = async(code,curriculumID,question,ID,answerOne,answerTwo,answerThree,answerFour,answerFive,answerExplainOne,answerExplainTwo,answerExplainThree,answerExplainFour,answerExplainFive,answerOption,setcurriculumvisiblitymc,setshowMain,setsectionData) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var formdata = new FormData();
formdata.append("question", `${question}`);

if(curriculumID != "" ){
  formdata.append("quizId", `${curriculumID}`)
}


formdata.append("answer", `${answerOne},${answerTwo},${answerThree},${answerFour},${answerFive}`);
formdata.append("explanation", `${answerExplainOne},${answerExplainTwo},${answerExplainThree},${answerExplainFour},${answerExplainFive}`);


if(answerOption == "ans1"){
  formdata.append("correctAnswer", "true,false,false,false,false");
}else if(answerOption == "ans2"){
  formdata.append("correctAnswer", "false,true,false,false,false");
}else if(answerOption == "ans3"){
  formdata.append("correctAnswer", "false,false,true,false,false");
}else if(answerOption == "ans4"){
  formdata.append("correctAnswer", "false,false,false,true,false");
}else if(answerOption == "ans5"){
  formdata.append("correctAnswer", "false,false,false,false,true");
}

formdata.append("lectureId", `${ID}`);

var requestOptions = {
  method: 'PUT',
  body: formdata,
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/addQuestionAndAnswers", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)

    Unauthorized(result.status,`courses/manage/${code}/#curriculum`)

    if(result.variable == "200"){
      SuccessAlert("Added",result.message)
      setcurriculumvisiblitymc("")
      setshowMain(null)
      GetCurriculum(code,setsectionData)
      return
    }

    if(result.message == "Error"){
      ErrorAlert("Error",result.variable)
      return
    }




  })
  .catch(error => console.log('error', error));


 }

 export const GetAdminDisApproveComment = async(code,setcomment) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getCourseComment/${code}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result)
      Unauthorized(result.status,`courses/manage/${code}/#settings`)
      setcomment(result)
    })
    .catch(error => console.log('error', error));


 }

 export const UnpublishCourse = async(code) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/setUnPublishCourse/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      Unauthorized(result.status,`courses/manage/${code}/#settings`)
      console.log(result)
      if(result.variable == "200"){
        SuccessAlert("Success","Course Successfully Unpublished")
        return
      }
    })
    .catch(error => console.log('error', error));
 }

 export const GetInstructorProfileDetails = async(setfirst_Name,
  setlast_name,
  setheadline,
  setbiography,
  setwebsite,
  settwitter,
  setfacebook,
  setlinkedin,
  setyoutube,
  setprofile_img) =>{

  var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);


var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/instructor/getInstructorProfileDetails", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    Unauthorized(result.status,`profile`)
    setfirst_Name(result.first_name == null ? "" : result.first_name)
    setlast_name(result.last_name == null ? "" : result.last_name)
    setheadline(result.headline == null ? "" : result.headline)
    setbiography(result.biography == null ? "" : result.biography)
    setwebsite(result.website == null ? "" : result.website)
    settwitter(result.twitter == null ? "" : result.twitter)
    setfacebook(result.facebook == null ? "" : result.facebook)
    setlinkedin(result.linkedin == null ? "" : result.linkedin)
    setyoutube(result.youtube == null ? "" : result.youtube)
    setprofile_img(result.profile_img == null ? "" : result.profile_img)
  })
  .catch(error => console.log('error', error));

 }

 export const UpdateProfileDetails = async(
  uploadImage,
  first_Name,
  last_name,
  headline,
  biography,
  website,
  twitter,
  facebook,
  linkedin,
  youtube) =>{

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
formdata.append("profileImage", uploadImage);

var requestOptions = {
  method: 'PUT',
  body: formdata,
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/instructor/updateInstructorProfile", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

 }

 export const VerifyTheInstructor = async() =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/instructor/switchToInstructor", requestOptions)
    .then(response => response.json())
    .then(result => {
      Unauthorized(result.status,"courses") 

      if(result.message == "Success"){
        console.log(result)
        window.location.href = "/courses"
      }else{
        window.history.back()
      }

    })
    .catch(error => console.log('error', error));
 }

 export const GetReferralLink = async(code,setreferalCode) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getReferralCodeByCourseCode/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      Unauthorized(result.status,`courses/manage/${code}/#promotions`)
      console.log(result)

      if(result.variable == "200" && result.message != null){
        setreferalCode(`https://www.aethenos.com/course/draft/${code}/?referralCode=${result.message}`)
      }else{
        setreferalCode(``)
      }
    })
    .catch(error => console.log('error', error));
 }

 export const AddFreeCouponAPI = async(code,SD,ED,couponCodeFree,setloading_btn) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

      var formdata = new FormData();
    formdata.append("code", `${couponCodeFree}`);
    formdata.append("start_date", `${SD}`);
    formdata.append("end_date", `${ED}`);
    formdata.append("course_code", `${code}`);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/course/addFreeCoupon", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)

        Unauthorized(result.status,`courses/manage/${code}/#promotions`)

        if(result.variable == "200"){
          SuccessAlert("Success",result.message)
          setloading_btn(false)
          setTimeout(() => {
          
            window.location.href = `/courses/manage/${code}/#promotions`
            window.location.reload()
          }, 1500);
        }

        if(result.message == "Error"){
          ErrorAlert("Error",result.variable)
          setloading_btn(false)
        }

      })
      .catch(error => console.log('error', error));

 }

 export const GetCouponsAPI = async(code,setall_coupons) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/getCouponsFromCourseCode/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      Unauthorized(result.status,`courses/manage/${code}/#promotions`)
      if(result.message == null){
        setall_coupons([])
      }

      if(result.message == "Error"){
        setall_coupons(null)
        return
      }
      setall_coupons(result)
    })
    .catch(error => console.log('error', error));
 }

 export const StatusChangeAPI = async(code,CouponCode) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/course/activeDeactiveCoupon/${CouponCode}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      Unauthorized(result.status,`courses/manage/${code}/#promotions`)

      if(result.variable == "200"){
        SuccessAlert("Success",result.message)
      }
    })
    .catch(error => console.log('error', error));

 }


 export const GetCountriesDiscountCoupons = async(code,setcountriesData,
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
  setSAListPrice) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${CURRENT_USER}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`https://aethenosinstructor.exon.lk:2053/aethenos-api/managecourse/getCoursePricing/${code}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)
      setcountriesData(result)

      Unauthorized(result.status,`courses/manage/${code}/#promotions`)


       // ---------------
       setUSATip(result[0].tip)
       setUSAMinValue(result[0].minimumPrice)
       setUSAListPrice(result[0].value)
   
       setAusTip(result[1].tip)
       setAusminValue(result[1].minimumPrice)
       setAusListPrice(result[1].value)
   
       setBrazilTip(result[2].tip)
       setBrazilminValue(result[2].minimumPrice)
       setBrazilListPrice(result[2].value)
   
       setCanadaTip(result[3].tip)
       setCanadaminValue(result[3].minimumPrice)
       setCanadaListPrice(result[3].value)
   
       setChileTip(result[4].tip)
       setChileminValue(result[4].minimumPrice)
       setChileListPrice(result[4].value)
   
       setColumbiaTip(result[5].tip)
       setColumbiaminValue(result[5].minimumPrice)
       setColumbiaListPrice(result[5].value)
   
       setEgyptTip(result[6].tip)
       setEgyptminValue(result[6].minimumPrice)
       setEgyptListPrice(result[6].value)
   
       setEUTip(result[7].tip)
       setEUminValue(result[7].minimumPrice)
       setEUListPrice(result[7].value)
   
       setGBPTip(result[8].tip)
       setGBPminValue(result[8].minimumPrice)
       setGBPListPrice(result[8].value)
   
       setIndonesiaTip(result[9].tip)
       setIndonesiaminValue(result[9].minimumPrice)
       setIndonesiaListPrice(result[9].value)
   // -
       setIsrealTip(result[10].tip)
       setIsrealminValue(result[10].minimumPrice)
       setIsrealListPrice(result[10].value)
   
       setIndiaTip(result[11].tip)
       setIndiaminValue(result[11].minimumPrice)
       setIndiaListPrice(result[11].value)
   
       setJapanTip(result[12].tip)
       setJapanminValue(result[12].minimumPrice)
       setJapanListPrice(result[12].value)
   
       setSKTip(result[13].tip)
       setSKminValue(result[13].minimumPrice)
       setSKListPrice(result[13].value)
   
       setMexicoTip(result[14].tip)
       setMexicominValue(result[14].minimumPrice)
       setMexicoListPrice(result[14].value)
   
       setMalaysiaTip(result[15].tip)
       setMalaysiaminValue(result[15].minimumPrice)
       setMalaysiaListPrice(result[15].value)
   
       setNigeriaTip(result[16].tip)
       setNigeriaminValue(result[16].minimumPrice)
       setNigeriaListPrice(result[16].value)
   
       setNorwayTip(result[17].tip)
       setNorwayminValue(result[17].minimumPrice)
       setNorwayListPrice(result[17].value)
   
       setPeruTip(result[18].tip)
       setPeruminvalue(result[18].minimumPrice)
       setPeruListPrice(result[18].value)
   
       setPhilipinesTip(result[19].tip)
       setPhilipinesminValue(result[19].minimumPrice)
       setPhilipinesListPrice(result[19].value)
   
       setPolandTip(result[20].tip)
       setPolandminValue(result[20].minimumPrice)
       setPolandListPrice(result[20].value)
   
   
       setRomaniaTip(result[21].tip)
       setRomaniaminvalue(result[21].minimumPrice)
       setRomaniaListPrice(result[21].value)
   
       setRussiaTip(result[22].tip)
       setRussiaminValue(result[22].minimumPrice)
       setRussiaListPrice(result[22].value)
   
       setSingaporeTip(result[23].tip)
       setSingaporeminValue(result[23].minimumPrice)
       setSingaporeListPrice(result[23].value)
   
       setThailandTip(result[24].tip)
       setThailandminValue(result[24].minimumPrice)
       setThailandListPrice(result[24].value)
   
       setTurkeyTip(result[25].tip)
       setTurkeyminValue(result[25].minimumPrice)
       setTurkeyListPrice(result[25].value)
   
       setTaiwanTip(result[26].tip)
       setTaiwanminValue(result[26].minimumPrice)
       setTaiwanListPrice(result[26].value)
   
       setVietnamTip(result[27].tip)
       setVietnamminValue(result[27].minimumPrice)
       setVietnamListPrice(result[27].value)
   
       setSATip(result[28].tip)
       setSAminValue(result[28].minimumPrice)
       setSAListPrice(result[28].value)



    })
    .catch(error => console.log('error', error));

 }

 export const GetPriceDefaultCoupon = async(code,setDGlobalPricing,setPriceRangeMinDefault,setPriceRangeMaxDefault,setMinDefaultValue,setDTip) =>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);

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
    setPriceRangeMinDefault(result.minPrice)
    setPriceRangeMaxDefault(result.maxPrice)
    setMinDefaultValue(result.minimumPrice)
    setDTip(result.tip)


    
  })
  .catch(error => console.log('error', error));

 }


 export const SaveDiscountDouponsAPI = async(code,raw,setloading_btn) =>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${CURRENT_USER}`);
  myHeaders.append( 'Content-Type','application/json');

  


  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(raw),
    redirect: 'follow'
  };

  fetch("https://aethenosinstructor.exon.lk:2053/aethenos-api/course/addDiscountCoupon", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      Unauthorized(result.status,`courses/manage/${code}/#add-coupon`)

      if(result.variable == "200"){
        SuccessAlert("Added",result.message)
        setloading_btn(false)
        setTimeout(() => {
          
          window.location.href = `/courses/manage/${code}/#promotions`
          window.location.reload()
        }, 1500);
        return
      }

      if(result.message == "Error"){
        ErrorAlert("Error",result.variable)
        setloading_btn(false)
        return
      }

    })
    .catch(error => console.log('error', error));

 }