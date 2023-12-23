import React, { useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from '@mui/material/Button';
import {GetInstructorProfileDetails} from '../../../api'

const MyProfile = () => {

    useEffect(() => {
        GetInstructorProfileDetails()
    }, [])
    

  return (
    <div className='container mb-5'>
        <h3>Profile & settings</h3>

        <Tabs
        defaultActiveKey="up"
        id="uncontrolled-tab-example"
        className="my-3"
        >
      <Tab eventKey="up" title="Udemy Profile">

        <div className='row'>
            <div className='col-md-6'>

            <div class="mb-3">
                <label class="form-label">First Name</label>
                <input type="text" class="form-control" placeholder="First Name" />
            </div>

            <div class="mb-3">
                <label class="form-label">Last Name</label>
                <input type="text" class="form-control" placeholder="Last Name" />
            </div>

            <label class="form-label">Headline</label>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Instructor at Udemy" />
                <span class="input-group-text" >60</span>
            </div>

            <div class="mb-3">
                <label  class="form-label">Biography</label>
                <textarea class="form-control"  rows="3"></textarea>
            </div>

            </div>


            <div className='col-md-6'>

            <div class="mb-3">
                <label class="form-label">Website</label>
                <input type="text" class="form-control" placeholder="URL" />
            </div>

            <label class="form-label">Twitter</label>
                <div class="input-group mb-3">
                <span class="input-group-text" >http://www.twitter.com/</span>
                <input type="text" class="form-control"  />
            </div>

            <label class="form-label">Facebook</label>
                <div class="input-group mb-3">
                <span class="input-group-text" >http://www.facebook.com/</span>
                <input type="text" class="form-control"  />
            </div>

            <label class="form-label">LinkedIn</label>
                <div class="input-group mb-3">
                <span class="input-group-text" >http://www.linkedin.com/</span>
                <input type="text" class="form-control"  />
            </div>

            <label class="form-label">Youtube</label>
                <div class="input-group mb-3">
                <span class="input-group-text" >http://www.youtube.com/</span>
                <input type="text" class="form-control"  />
            </div>

            </div>
        </div>

        <Button variant="contained">Save</Button>

        
    
        

      </Tab>

      
      <Tab eventKey="profile" title="Profile Picture">

        <div className='row'>
            <div className='col-md-6'>

            <p className='m-0 p-0'><b>Image preview</b></p>
            <label>Minimum 200x200 pixels, Maximum 6000x6000 pixels</label>

            <div className='my-4 bg-light border p-3 text-center'>
                <img src='https://img-c.udemycdn.com/user/200_H/anonymous_3.png' />
            </div>

            <div class="mb-3">
                <label for="formFile" class="form-label">Upload Image</label>
                <input class="form-control" type="file" id="formFile" />
            </div>

            </div>

        </div>

            <Button variant="contained">Save</Button>
     


      </Tab>

    </Tabs>

    </div>
  )
}

export default MyProfile