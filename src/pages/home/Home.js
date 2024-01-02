import React from 'react'
import { useEffect } from 'react';
import Colors from '../../commonFunctions/Colors';
import './Home.css'
import { Alert, Space, Spin } from 'antd';
import { InfinitySpin } from  'react-loader-spinner'
import { VerifyTheInstructor, getUserStatus } from '../../api';
import Cookies from 'js-cookie'


const Home = () => {

    useEffect(() => {

        if(Cookies.get('aethenos') == null){
          window.location.href = `/login?sessionTimeout=true&rediect-url=courses`

        }else{
          VerifyTheInstructor()
          // console.log(Cookies.get('aethenos'))

          // window.location.href = "/courses";
        }

        // Check Id the User is Instructor Or NOT
      
      }, [])
      


  return (
<div className='d-flex justify-content-center w-100 align-items-center'>
<div className='sub-container-loading'>

<InfinitySpin 
  width="200"
  color={Colors.PrimaryColor}
/>
<h5 className='text-center'>Loading...</h5>

</div>

</div>
  )
}

export default Home