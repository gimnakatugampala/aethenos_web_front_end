import React from 'react'
import { InfinitySpin } from  'react-loader-spinner'
import './MainLoader.css'
import Colors from '../../Colors'
const MainLoaderCourse = () => {
    return (
        <div id="main-cover-spin">
          <div className="text-center main-spin">
            <InfinitySpin 
            width="200"
            color={Colors.PrimaryColor}
            />
            <h5>Uploading...</h5>
          </div>
        </div>
    
      )
}

export default MainLoaderCourse


