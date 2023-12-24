import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from '@mui/material/Button';
import {GetInstructorProfileDetails, UpdateProfileDetails} from '../../../api'

const MyProfile = () => {

    const [first_Name, setfirst_Name] = useState("")
    const [last_name, setlast_name] = useState("")
    const [headline, setheadline] = useState("")
    const [biography, setbiography] = useState("")
    const [website, setwebsite] = useState("")
    const [twitter, settwitter] = useState("")
    const [facebook, setfacebook] = useState("")
    const [linkedin, setlinkedin] = useState("")
    const [youtube, setyoutube] = useState("")
    const [profile_img, setprofile_img] = useState("")
    const [uploadImage, setuploadImage] = useState("")

    useEffect(() => {
        GetInstructorProfileDetails(setfirst_Name,
            setlast_name,
            setheadline,
            setbiography,
            setwebsite,
            settwitter,
            setfacebook,
            setlinkedin,
            setyoutube,
            setprofile_img)
    }, [])
    
    // Save Profile Data
    const handleProfileData = () =>{
        console.log(uploadImage)
        console.log(first_Name)
        console.log(last_name)
        console.log(headline)
        console.log(biography)
        console.log(website)
        console.log(twitter)
        console.log(facebook)
        console.log(linkedin)
        console.log(youtube)

        UpdateProfileDetails(uploadImage,
            first_Name,
            last_name,
            headline,
            biography,
            website,
            twitter,
            facebook,
            linkedin,
            youtube)

    }

    // Image Upload
    const handleImageUpload = (event) =>{
        const input =  event.target;
    //   const previewImage = document.getElementById('previewImage');

         setuploadImage(input.files[0])

      if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
          console.log(e.target.result)
          setprofile_img(e.target.result)
          // The e.target.result contains the temporary link to the image
        //   console.log('Temporary Link:', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    }

  

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
                <input value={first_Name} onChange={(e) => setfirst_Name(e.target.value)} type="text" class="form-control" placeholder="First Name" />
            </div>

            <div class="mb-3">
                <label class="form-label">Last Name</label>
                <input value={last_name} onChange={(e) => setlast_name(e.target.value)} type="text" class="form-control" placeholder="Last Name" />
            </div>

            <label class="form-label">Headline</label>
            <div class="input-group mb-3">
                <input value={headline} onChange={(e) => setheadline(e.target.value)} type="text" class="form-control" placeholder="Instructor at Udemy" />
                <span class="input-group-text" >60</span>
            </div>

            <div class="mb-3">
                <label  class="form-label">Biography</label>
                <textarea value={biography} onChange={(e) => setbiography(e.target.value)} class="form-control"  rows="3"></textarea>
            </div>

            </div>


            <div className='col-md-6'>

            <div class="mb-3">
                <label class="form-label">Website</label>
                <input value={website} onChange={(e) => setwebsite(e.target.value)} type="text" class="form-control" placeholder="URL" />
            </div>

            <label class="form-label">Twitter</label>
                <div class="input-group mb-3">
                <span class="input-group-text" >http://www.twitter.com/</span>
                <input value={twitter} onChange={(e) => settwitter(e.target.value)} type="text" class="form-control"  />
            </div>

            <label class="form-label">Facebook</label>
                <div class="input-group mb-3">
                <span class="input-group-text" >http://www.facebook.com/</span>
                <input value={facebook} onChange={(e) => setfacebook(e.target.value)} type="text" class="form-control"  />
            </div>

            <label class="form-label">LinkedIn</label>
                <div class="input-group mb-3">
                <span class="input-group-text" >http://www.linkedin.com/</span>
                <input value={linkedin} onChange={(e) => setlinkedin(e.target.value)} type="text" class="form-control"  />
            </div>

            <label class="form-label">Youtube</label>
                <div class="input-group mb-3">
                <span class="input-group-text" >http://www.youtube.com/</span>
                <input value={youtube} onChange={(e) => setyoutube(e.target.value)} type="text" class="form-control"  />
            </div>

            </div>
        </div>

        <Button  onClick={handleProfileData} variant="contained">Save</Button>

        
    
        

      </Tab>

      
      <Tab eventKey="profile" title="Profile Picture">

        <div className='row'>
            <div className='col-md-6'>

            <p className='m-0 p-0'><b>Image preview</b></p>
            <label>Minimum 200x200 pixels, Maximum 6000x6000 pixels</label>

            <div className='my-4 bg-light border p-3 text-center'>
               {profile_img == "" ? <img src='https://img-c.udemycdn.com/user/200_H/anonymous_3.png' /> : <img id='previewImage' src={profile_img} />  } 
            </div>

            <div class="mb-3">
                <label for="formFile" class="form-label">Upload Image</label>
                <input onChange={(e) => handleImageUpload(e)} accept='image/*' class="form-control" type="file" id="formFile" />
            </div>

            </div>

        </div>

            <Button onClick={handleProfileData} variant="contained">Save</Button>
     


      </Tab>

    </Tabs>

    </div>
  )
}

export default MyProfile