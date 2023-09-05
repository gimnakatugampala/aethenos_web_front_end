import React from 'react'
import { useEffect } from 'react';
import Colors from '../../commonFunctions/Colors';
import './Home.css'
import { Alert, Space, Spin } from 'antd';
import { InfinitySpin } from  'react-loader-spinner'

const Home = () => {

    useEffect(() => {

        window.setTimeout(function(){
            window.location.href = "/courses";
        }, 1000);
        
      
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