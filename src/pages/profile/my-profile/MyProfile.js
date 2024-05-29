import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from '@mui/material/Button';
import {GetCheckPricingStatus, GetInstructorProfileDetails, SubmitInstructorTerms, UpdateProfileDetails} from '../../../api'
import Spinner from 'react-bootstrap/Spinner';
import ErrorAlert from '../../../commonFunctions/Alerts/ErrorAlert';
import { FILE_PATH } from '../../../commonFunctions/FilePaths';
import Radio from '@mui/material/Radio';


import Alert from 'react-bootstrap/Alert';
import InfoIcon from '@mui/icons-material/Info';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { AddWalletDetails, GetPaypalProfileDetails, GetWalletDetails } from '../../../api';
import Form from 'react-bootstrap/Form';
import Checkbox from '@mui/material/Checkbox';
import { useLocation } from 'react-router-dom';



const labelCheckBox = { inputProps: { 'aria-label': 'Checkbox demo' } };


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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
    const [preview_img, setpreview_img] = useState("")

    const [btn_loading, setbtn_loading] = useState(false)

    // ============= RADIO BUTTON / Payment Details ===========
    const [selectedValue, setSelectedValue] = React.useState('paypal');
    const [btn_loading_payment_details, setbtn_loading_payment_details] = useState(false)

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

    // ===================== CHECK INTSURTCOR TERMS ===============
    const [InstructorTermsCheck, setInstructorTermsCheck] = useState(false)

    const handleSubmitInstructorTerms = (e) =>{
      if(InstructorTermsCheck == false){
        ErrorAlert("Please Select","Please Accept Instructor Terms")
        return
      }

      SubmitInstructorTerms()

    }

    // ============== GET THE QUERY ========
    const query = useQuery();
    const code = query.get('code');

    

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
        console.log(typeof uploadImage)
        console.log(first_Name)
        console.log(last_name)
        console.log(headline)
        console.log(biography)
        console.log(website)
        console.log(twitter)
        console.log(facebook)
        console.log(linkedin)
        console.log(youtube)

        if(first_Name == ""){
            ErrorAlert("Error","Please Enter First Name")
            return
        }else if(last_name == ""){
            ErrorAlert("Error","Please Enter Last Name")
            return
        }else if(headline == ""){
          ErrorAlert("Error","Please Enter Headline")
          return
        }else if(biography == ""){
          ErrorAlert("Error","Please Enter Biography")
          return
      }

        UpdateProfileDetails(uploadImage,
            first_Name,
            last_name,
            headline,
            biography,
            website,
            twitter,
            facebook,
            linkedin,
            youtube,
            setbtn_loading)

    }

    // const [preview_img, setpreview_img] = useState("")
    // Image Upload
    const handleImageUpload = (event) =>{
        const input =  event.target;
    //   const previewImage = document.getElementById('previewImage');

         setuploadImage(input.files[0])

      if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
          console.log(e.target.result)
          setpreview_img(e.target.result)
          // The e.target.result contains the temporary link to the image
        //   console.log('Temporary Link:', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    }


    // ============== PAYOUT DETAILS =================
    const [paypalEmail, setpaypalEmail] = useState("")
    const [paypalUsername, setpaypalUsername] = useState("")
  
    const [payoneerEmail, setpayoneerEmail] = useState("")
    const [payoneerUsername, setpayoneerUsername] = useState("")
  

  
    useEffect(() => {
      GetWalletDetails(setpaypalEmail,setpaypalUsername,setpayoneerEmail,setpayoneerUsername,setSelectedValue)

      GetCheckPricingStatus(setInstructorTermsCheck)

    }, [])
    


    const handleConnectWallet = () =>{
      if(selectedValue == "paypal"){

        if(paypalEmail == ""){
          ErrorAlert("Empty Field","Please Fill Email")
          return
        }
    
        if(paypalUsername == ""){
          ErrorAlert("Empty Field","Please Fill Username")
          return
        }

        AddWalletDetails(paypalEmail,paypalUsername,payoneerEmail,payoneerUsername,setbtn_loading_payment_details,selectedValue)

      }else{

        if(payoneerEmail == ""){
          ErrorAlert("Empty Field","Please Fill Email")
          return
        }
    
        if(payoneerUsername == ""){
          ErrorAlert("Empty Field","Please Fill Username")
          return
        }

        AddWalletDetails(paypalEmail,paypalUsername,payoneerEmail,payoneerUsername,setbtn_loading_payment_details,selectedValue)

      }
    }
  

  return (
    <div className='container mb-5'>
        <h3>Instructor Details</h3>

        <Tabs
        defaultActiveKey="up"
        id="uncontrolled-tab-example"
        className="my-3"
        >
          <Tab eventKey="up" title="Aethenos Profile">

            <div className='row'>

            <div className='col-md-5'>

                <p className='m-0 p-0'><b>Image preview</b></p>
                <label>Minimum 200x200 pixels, Maximum 6000x6000 pixels</label>

                {preview_img == "" ? (
                  <div className='my-4 bg-light border p-3 text-center'>
                    {profile_img == "" ? <img src='https://img-c.udemycdn.com/user/200_H/anonymous_3.png' /> : <img style={{height:'100px',objectFit:'cover'}} id='previewImage' src={`${FILE_PATH}/${profile_img}`} />  } 
                  </div>
              ) : (
                <div className='my-4 bg-light border p-3 text-center'>
                    { <img style={{height:'100px',objectFit:'cover'}} id='previewImage' src={`${preview_img}`} />  } 
                </div>
              )}

                </div>

                <div className='col-md-4'>
                <div className='mt-5'>
                    <label for="formFile" class="form-label">Upload Image</label>
                    <input onChange={(e) => handleImageUpload(e)} accept='image/*' class="form-control" type="file" id="formFile" />
                </div>

                </div>

                <div className='col-md-6'>

                <div class="mb-3">
                    <label class="form-label">First Name <span className='text-danger'>*</span></label>
                    <input value={first_Name} onChange={(e) => setfirst_Name(e.target.value)} type="text" class="form-control" placeholder="First Name" />
                </div>

                <div class="mb-3">
                    <label class="form-label">Last Name <span className='text-danger'>*</span></label>
                    <input value={last_name} onChange={(e) => setlast_name(e.target.value)} type="text" class="form-control" placeholder="Last Name" />
                </div>

                <label class="form-label">Headline<span className='text-danger'>*</span></label>
                <div class="input-group mb-3">
                    <input maxLength={60} value={headline} onChange={(e) => setheadline(e.target.value)} type="text" class="form-control" placeholder="Instructor at Aethenos" />
                    <span class="input-group-text" >{60 - headline.length}</span>
                </div>

                <div class="mb-3">
                    <label  class="form-label">Biography<span className='text-danger'>*</span></label>
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

            {btn_loading ? <Button  variant="contained"><Spinner size="sm" animation="border" variant="light" /></Button> : <Button  onClick={handleProfileData} variant="contained">Save</Button>}

            

            
        
            

          </Tab>

      

          <Tab eventKey="instructor-terms" title="Instructor Terms">

            <div className='row mt-5 mx-auto '>
                <div className='col-md-6 text-center'>
                <p >When you are signing up to become an instructor on the Aethenos platform, you are required to agree to abide by the <a href='/instructor-terms'>Instructor Terms.</a></p>
                <p>It is important to read them as they cover details about the Aethenos platform that relevant to instructors such as payments, pricing, and your obligations as an instructor. </p>
                <p><Checkbox checked={InstructorTermsCheck} onChange={(e) => setInstructorTermsCheck(e.target.checked)} size="small" /> I have read and agree to the Aethenos Instructor Terms.</p>

                    <Button onClick={handleSubmitInstructorTerms} variant="contained">Save</Button>
                </div>
            </div>

        


          </Tab>

          <Tab eventKey="payout-tax-details" title="Payment Details">

            <div className='container'>
                <h3>Payment Method</h3>

                <Alert variant="secondary">
                    <div className='d-flex justify-content-start align-items-start'>
                        <InfoIcon className='mr-2' />
                        <p className='m-0 p-0'><b>Select your payout method below.</b></p>
                    </div>
                   
                </Alert>

                <Card>
                <CardContent>

                <div className='row'>

                    <div className='col-md-12 my-3'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <Radio
                              checked={selectedValue === 'paypal'}
                              onChange={handleChange}
                              value="paypal"
                              name="radio-buttons"
                              inputProps={{ 'aria-label': 'A' }}
                            />
                                <img width={100} src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png' />
                            </div>

                            <div className='row'>
                            <div className='col-md-6'>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Control disabled={selectedValue != 'paypal'} value={paypalEmail} onChange={(e) => setpaypalEmail(e.target.value)}  type="email" placeholder="Enter Paypal Email" />
                                </Form.Group>
                            </Form>
                            </div>
                            <div className='col-md-6'>
                            <Form>
                                <Form.Group  controlId="exampleForm.ControlInput1">
                                <Form.Control disabled={selectedValue != 'paypal'} value={paypalUsername} onChange={(e) => setpaypalUsername(e.target.value)}  type="text" placeholder="Enter Paypal Username" />
                                </Form.Group>
                            </Form>

                            </div>
                      

                            </div>

                            </div>

                    </div>

                    <div className='col-md-12 my-3'>
                    <div className='d-flex justify-content-between'>
                            <div>
                            <Radio
                              checked={selectedValue === 'payoneer'}
                              onChange={handleChange}
                              value="payoneer"
                              name="radio-buttons"
                              inputProps={{ 'aria-label': 'B' }}
                            />
                                <img width={100} src='/images/payoneer.png' />
                            </div>

                            <div className='row'>
                            <div className='col-md-6'>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Control disabled={selectedValue != 'payoneer'} value={payoneerEmail} onChange={(e) => setpayoneerEmail(e.target.value)} type="email" placeholder="Enter Payoneer Email" />
                                </Form.Group>
                            </Form>
                            </div>
                            <div className='col-md-6'>
                            <Form>
                                <Form.Group  controlId="exampleForm.ControlInput1">
                                <Form.Control disabled={selectedValue != 'payoneer'} value={payoneerUsername} onChange={(e) => setpayoneerUsername(e.target.value)}  type="text" placeholder="Enter Payoneer Email" />
                                </Form.Group>
                            </Form>

                            </div>
                        

                            </div>

                            </div>

                    </div>

                    <div className='col-md-12 my-3'>
                      {btn_loading_payment_details ? (
                        <Button variant="contained"><Spinner  size="sm" animation="border" variant="light" /></Button>
                      ) : (
                        <Button onClick={handleConnectWallet} variant="contained">Save</Button>
                      )}
                    </div>
                </div>

                  

            
                {code != null && (
                <div className='mx-auto text-center'>
                <Button className='mx-auto ' variant="contained"><a className='text-white' href={`/courses/manage/${code}/`}>Go back to course</a></Button>
                </div>
                )}

                </CardContent>
        
            </Card>
            </div>
            


          </Tab>

    </Tabs>

    </div>
  )
}

export default MyProfile