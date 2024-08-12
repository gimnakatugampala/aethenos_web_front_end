import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "@mui/material/Button";
import {
  GetCheckPricingStatus,
  GetInstructorProfileDetails,
  SubmitInstructorTerms,
  UpdateProfileDetails,
} from "../../../api";
import Spinner from "react-bootstrap/Spinner";
import ErrorAlert from "../../../commonFunctions/Alerts/ErrorAlert";
import { FILE_PATH } from "../../../commonFunctions/FilePaths";
import Radio from "@mui/material/Radio";

import Alert from "react-bootstrap/Alert";
import InfoIcon from "@mui/icons-material/Info";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  AddWalletDetails,
  GetPaypalProfileDetails,
  GetWalletDetails,
} from "../../../api";
import Form from "react-bootstrap/Form";
import Checkbox from "@mui/material/Checkbox";
import { useLocation } from "react-router-dom";

const labelCheckBox = { inputProps: { "aria-label": "Checkbox demo" } };

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MyProfile = () => {
  const [first_Name, setfirst_Name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [headline, setheadline] = useState("");
  const [biography, setbiography] = useState("");
  const [website, setwebsite] = useState("");
  const [twitter, settwitter] = useState("");
  const [facebook, setfacebook] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [youtube, setyoutube] = useState("");
  const [email, setemail] = useState("");
  const [profile_img, setprofile_img] = useState("");
  const [uploadImage, setuploadImage] = useState("");
  const [preview_img, setpreview_img] = useState("");

  const [link_to_course, setlink_to_course] = useState("");
  const [external_ratings, setexternal_ratings] = useState("");
  const [external_number_of_number, setexternal_number_of_number] =
    useState("");
  const [any_comment, setany_comment] = useState("");

  const [btn_loading, setbtn_loading] = useState(false);

  // ============= RADIO BUTTON / Payment Details ===========
  const [selectedValue, setSelectedValue] = React.useState("paypal");
  const [btn_loading_payment_details, setbtn_loading_payment_details] =
    useState(false);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // ===================== CHECK INTSURTCOR TERMS ===============
  const [InstructorTermsCheck, setInstructorTermsCheck] = useState(false);

  const handleSubmitInstructorTerms = (e) => {
    if (InstructorTermsCheck == false) {
      ErrorAlert("Please Select", "Please Accept Instructor Terms");
      return;
    }

    SubmitInstructorTerms();
  };

  // ============== GET THE QUERY ========
  const query = useQuery();
  const code = query.get("code");

  function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }

  // Save Profile Data
  const handleProfileData = () => {
    // console.log(typeof uploadImage)
    // console.log(first_Name)
    // console.log(last_name)
    // console.log(headline)
    // console.log(biography)
    // console.log(website)
    // console.log(twitter)
    // console.log(facebook)
    // console.log(linkedin)
    // console.log(youtube)


    // console.log(profile_img)
    // console.log(uploadImage)
    // console.log(preview_img)


    // console.log(link_to_course);
    // console.log(external_ratings);
    // console.log(external_number_of_number);
    // console.log(any_comment);

    if(profile_img == "" && uploadImage == "" && preview_img == ""){
      ErrorAlert("Error", "Please add a profile image");
      return;
    }

    if (first_Name == "") {
      ErrorAlert("Error", "Please Enter First Name");
      return;
    } else if (last_name == "") {
      ErrorAlert("Error", "Please Enter Last Name");
      return;
    } else if (headline == "") {
      ErrorAlert("Error", "Please Enter Headline");
      return;
    } else if (biography == "") {
      ErrorAlert("Error", "Please Enter Biography");
      return;
    }

    const rating = parseFloat(external_ratings);
    if (rating < 0 || rating > 5) {
      ErrorAlert("Error", "External rating should be between 1 to 5");
      return;
    }

    if (email != "") {
      if (!isValidEmail(email)) {
        ErrorAlert("Error", "Please enter a valid email address.");
        return;
      }
    }

    UpdateProfileDetails(
      uploadImage,
      first_Name,
      last_name,
      headline,
      biography,
      website,
      twitter,
      facebook,
      linkedin,
      youtube,
      link_to_course,
      external_ratings,
      external_number_of_number,
      any_comment,
      email,
      setbtn_loading
    );
  };

  // const [preview_img, setpreview_img] = useState("")
  // Image Upload
  const handleImageUpload = (event) => {
    const input = event.target;
    //   const previewImage = document.getElementById('previewImage');

    setuploadImage(input.files[0]);

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        console.log(e.target.result);
        setpreview_img(e.target.result);
        // The e.target.result contains the temporary link to the image
        //   console.log('Temporary Link:', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  // ============== PAYOUT DETAILS =================
  const [paypalEmail, setpaypalEmail] = useState("");
  const [paypalUsername, setpaypalUsername] = useState("");

  const [payoneerEmail, setpayoneerEmail] = useState("");
  const [payoneerUsername, setpayoneerUsername] = useState("");

  const [bankAccountNumber, setbankAccountNumber] = useState("");
  const [bankSortNoOne, setbankSortNoOne] = useState("");
  const [bankSortNoTwo, setbankSortNoTwo] = useState("");
  const [bankSortNoThree, setbankSortNoThree] = useState("");

  useEffect(() => {
    GetWalletDetails(
      setpaypalEmail,
      setpaypalUsername,
      setpayoneerEmail,
      setpayoneerUsername,
      setbankSortNoOne,
      setbankSortNoTwo,
      setbankSortNoThree,
      setbankAccountNumber,
      setSelectedValue
    );

    GetCheckPricingStatus(setInstructorTermsCheck);
  }, []);

  useEffect(() => {
    GetInstructorProfileDetails(
      setfirst_Name,
      setlast_name,
      setheadline,
      setbiography,
      setwebsite,
      settwitter,
      setfacebook,
      setlinkedin,
      setyoutube,
      setlink_to_course,
      setexternal_ratings,
      setexternal_number_of_number,
      setany_comment,
      setemail,
      setprofile_img
    );
  }, []);

  const handleConnectWallet = () => {
    if (selectedValue == "paypal") {
      if (paypalEmail == "") {
        ErrorAlert("Empty Field", "Please Fill Email");
        return;
      }

      if (paypalUsername == "") {
        ErrorAlert("Empty Field", "Please Fill Username");
        return;
      }

      AddWalletDetails(
        paypalEmail,
        paypalUsername,
        payoneerEmail,
        payoneerUsername,
        bankSortNoOne,
        bankSortNoTwo,
        bankSortNoThree,
        bankAccountNumber,
        setbtn_loading_payment_details,
        selectedValue
      );
    } else if (selectedValue == "payoneer") {
      if (payoneerEmail == "") {
        ErrorAlert("Empty Field", "Please Fill Email");
        return;
      }

      if (payoneerUsername == "") {
        ErrorAlert("Empty Field", "Please Fill Username");
        return;
      }

      AddWalletDetails(
        paypalEmail,
        paypalUsername,
        payoneerEmail,
        payoneerUsername,
        bankSortNoOne,
        bankSortNoTwo,
        bankSortNoThree,
        bankAccountNumber,
        setbtn_loading_payment_details,
        selectedValue
      );
    } else if (selectedValue == "uk") {
      if (bankSortNoOne == "") {
        ErrorAlert("Empty Field", "Enter Sort No one");
        return;
      }

      if (bankSortNoTwo == "") {
        ErrorAlert("Empty Field", "Enter Sort No two");
        return;
      }

      if (bankSortNoThree == "") {
        ErrorAlert("Empty Field", "Enter Sort No three");
        return;
      }

      if (bankAccountNumber == "") {
        ErrorAlert("Empty Field", "Enter Bank Account number");
        return;
      }

      if (bankAccountNumber.length > 8) {
        ErrorAlert("Empty Field", "Only enter 8 characters for account number");
        return;
      }

      AddWalletDetails(
        paypalEmail,
        paypalUsername,
        payoneerEmail,
        payoneerUsername,
        bankSortNoOne,
        bankSortNoTwo,
        bankSortNoThree,
        bankAccountNumber,
        setbtn_loading_payment_details,
        selectedValue
      );
    }
  };

  return (
    <div className="all-courses-container mb-5">
      <div
        className="row mb-4 mx-2"
        style={{ justifyContent: "space-between" }}
      >
        <div className="col-md-4">
          <Typography variant="h4" gutterBottom>
            Instructor Details
          </Typography>
        </div>
      </div>

      <Card className="p-3">
        <Tabs
          defaultActiveKey="up"
          id="uncontrolled-tab-example"
          className="my-3 mx-5"
        >
          <Tab eventKey="up" title="Your Profile">
            <div className="row mx-4" style={{ justifyContent: "center" }}>
              <div className="col-md-8">
                <p className="m-0 p-0">
                  <b>Profile picture</b>
                </p>
                <label>Minimum 200x200 pixels, Maximum 6000x6000 pixels</label>

                {preview_img == "" ? (
                  <div className="my-4 bg-light border p-3 text-center">
                    {profile_img == "" ? (
                      <img src="https://img-c.udemycdn.com/user/200_H/anonymous_3.png" />
                    ) : (
                      <img
                        style={{ height: "100px", objectFit: "cover" }}
                        id="previewImage"
                        src={`${FILE_PATH}/${profile_img}`}
                      />
                    )}
                  </div>
                ) : (
                  <div className="my-4 bg-light border p-3 text-center">
                    {
                      <img
                        style={{ height: "100px", objectFit: "cover" }}
                        id="previewImage"
                        src={`${preview_img}`}
                      />
                    }
                  </div>
                )}
              </div>

              <div className="col-md-4">
                <div className="mt-5">
                  <label for="formFile" class="form-label">
                    Upload Image <span className="text-danger">*</span>
                  </label>
                  <input
                    onChange={(e) => handleImageUpload(e)}
                    accept="image/*"
                    class="form-control"
                    type="file"
                    id="formFile"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div class="mb-3">
                  <label class="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    value={first_Name}
                    onChange={(e) => setfirst_Name(e.target.value)}
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    value={last_name}
                    onChange={(e) => setlast_name(e.target.value)}
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                  />
                </div>

                <label class="form-label">
                  Headline<span className="text-danger">*</span>
                </label>
                <div class="input-group mb-3">
                  <input
                    maxLength={60}
                    value={headline}
                    onChange={(e) => setheadline(e.target.value)}
                    type="text"
                    class="form-control"
                    placeholder="Your occupation, specialization, and qualification"
                  />
                  <span class="input-group-text">{60 - headline.length}</span>
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Biography<span className="text-danger">*</span>
                  </label>
                  <textarea
                    placeholder="Your professional and personal profile."
                    value={biography}
                    onChange={(e) => setbiography(e.target.value)}
                    class="form-control"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div className="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    type="text"
                    class="form-control"
                    placeholder="Enter an Email"
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label">Website</label>
                  <input
                    value={website}
                    onChange={(e) => setwebsite(e.target.value)}
                    type="text"
                    class="form-control"
                    placeholder="URL"
                  />
                </div>

                <label class="form-label">Twitter</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">http://www.twitter.com/</span>
                  <input
                    value={twitter}
                    onChange={(e) => settwitter(e.target.value)}
                    type="text"
                    class="form-control"
                  />
                </div>

                <label class="form-label">Facebook</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">http://www.facebook.com/</span>
                  <input
                    value={facebook}
                    onChange={(e) => setfacebook(e.target.value)}
                    type="text"
                    class="form-control"
                  />
                </div>

                <label class="form-label">LinkedIn</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">http://www.linkedin.com/</span>
                  <input
                    value={linkedin}
                    onChange={(e) => setlinkedin(e.target.value)}
                    type="text"
                    class="form-control"
                  />
                </div>

                <label class="form-label">Youtube</label>
                <div class="input-group mb-3">
                  <span class="input-group-text">http://www.youtube.com/</span>
                  <input
                    value={youtube}
                    onChange={(e) => setyoutube(e.target.value)}
                    type="text"
                    class="form-control"
                  />
                </div>
              </div>

              <Card className="col-md-11  border border-secondary p-4 m-3">
                <div>
                  <Form.Label>
                    <b>External course link and ratings (optional):</b>
                  </Form.Label>
                  <p>
                    You can provide a link to any external site or platform
                    where you have the same course available below (optional).
                    This will help us fast-track your course approval.
                  </p>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      <b>Link to course:</b>
                    </Form.Label>
                    <Form.Control
                      value={link_to_course}
                      onChange={(e) => setlink_to_course(e.target.value)}
                      type="text"
                      placeholder="https://www.link.com"
                    />
                  </Form.Group>

                  <p>
                    You can also provide the ratings and number of students for
                    your externally hosted course below (optional). We will
                    verify and display same as external ratings and external
                    number of students on our site. This may help you with
                    initial course enrollments until you gain sufficient reviews
                    and student numbers on our site. We will NOT be disclosing
                    the external course site or platform details.
                  </p>

                  <p>
                    Please fill in below details if you wish to display your
                    external course ratings and number of students on our site.
                  </p>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      <b>External rating (number of stars out of 5):</b>
                    </Form.Label>
                    <Form.Control
                      value={external_ratings}
                      onChange={(e) => setexternal_ratings(e.target.value)}
                      type="text"
                      placeholder="Enter a Number"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      <b>External number of students:</b>
                    </Form.Label>
                    <Form.Control
                      value={external_number_of_number}
                      onChange={(e) =>
                        setexternal_number_of_number(e.target.value)
                      }
                      type="text"
                      placeholder="Enter the No of Students"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>
                      <b>Any comments:</b>
                    </Form.Label>
                    <Form.Control
                      value={any_comment}
                      onChange={(e) => setany_comment(e.target.value)}
                      as="textarea"
                      rows={4}
                    />
                  </Form.Group>

                  <p>
                    <b>
                      <i>
                        Note: We will only display external rating and number of
                        students if we are able to independently verify same by
                        following the course link you have provided.
                      </i>
                    </b>
                  </p>
                </div>
              </Card>
            </div>

        

            <div style={{ float: "right" }}>
              {btn_loading ? (
                <Button variant="contained">
                  <Spinner size="sm" animation="border" variant="light" />
                </Button>
              ) : (
                <Button onClick={handleProfileData} variant="contained">
                  Save
                </Button>
              )}
            </div>

            {/* {code != null && (
                    <div className="mx-auto text-center">
                      <br />
                      <br />
                      <br />
                      <br />
                      <Button className="mx-auto " variant="contained">
                        <a
                          className="text-white"
                          href={`/courses/manage/${code}/`}
                        >
                          Go back to course
                        </a>
                      </Button>
                    </div>
                  )} */}

          </Tab>

          <Tab eventKey="instructor-terms" title="Instructor Terms">
            <div className="row mt-5 mx-auto ">
              <div className="col-md-12 text-center">
                <p>
                  When you are signing up to become an instructor on the
                  Aethenos platform, you are required to agree to abide by the{" "}
                  <a href="/instructor-terms">Instructor Terms.</a>
                </p>
                <p>
                  It is important to read them as they cover details about the
                  Aethenos platform that relevant to instructors such as
                  payments, pricing, and your obligations as an instructor.{" "}
                </p>
                <p>
                  <Checkbox
                    checked={InstructorTermsCheck}
                    onChange={(e) => setInstructorTermsCheck(e.target.checked)}
                    size="small"
                  />{" "}
                  I have read and agree to the Aethenos Instructor Terms.
                </p>

                <Button
                  onClick={handleSubmitInstructorTerms}
                  variant="contained"
                  className="mt-3"
                >
                  Save
                </Button>
              </div>
            </div>
          </Tab>

          <Tab eventKey="payout-tax-details" title="Payment Details">
            <div className="container">
              <h3>Payment Method</h3>

              <Alert variant="secondary">
                <div className="d-flex justify-content-start align-items-start">
                  <InfoIcon className="mr-2" />
                  <p className="m-0 p-0">
                    <b>Select your payout method below.</b>
                  </p>
                </div>
              </Alert>

              <Card>
                <CardContent>
                  <div className="row">
                    <div className="col-md-12 my-3">
                      <div className="d-flex justify-content-between">
                        <div>
                          <Radio
                            checked={selectedValue === "paypal"}
                            onChange={handleChange}
                            value="paypal"
                            name="radio-buttons"
                            inputProps={{ "aria-label": "A" }}
                          />
                          <img
                            width={100}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png"
                          />
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <Form>
                              <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Control
                                  disabled={selectedValue != "paypal"}
                                  value={paypalEmail}
                                  onChange={(e) =>
                                    setpaypalEmail(e.target.value)
                                  }
                                  type="email"
                                  placeholder="Enter Paypal Email"
                                />
                              </Form.Group>
                            </Form>
                          </div>
                          <div className="col-md-6">
                            <Form>
                              <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Control
                                  disabled={selectedValue != "paypal"}
                                  value={paypalUsername}
                                  onChange={(e) =>
                                    setpaypalUsername(e.target.value)
                                  }
                                  type="text"
                                  placeholder="Enter Paypal Username"
                                />
                              </Form.Group>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 my-3">
                      <div className="d-flex justify-content-between">
                        <div>
                          <Radio
                            checked={selectedValue === "payoneer"}
                            onChange={handleChange}
                            value="payoneer"
                            name="radio-buttons"
                            inputProps={{ "aria-label": "B" }}
                          />
                          <img width={100} src="/images/payoneer.png" />
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <Form>
                              <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Control
                                  disabled={selectedValue != "payoneer"}
                                  value={payoneerEmail}
                                  onChange={(e) =>
                                    setpayoneerEmail(e.target.value)
                                  }
                                  type="email"
                                  placeholder="Enter Payoneer Email"
                                />
                              </Form.Group>
                            </Form>
                          </div>
                          <div className="col-md-6">
                            <Form>
                              <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Control
                                  disabled={selectedValue != "payoneer"}
                                  value={payoneerUsername}
                                  onChange={(e) =>
                                    setpayoneerUsername(e.target.value)
                                  }
                                  type="text"
                                  placeholder="Enter Payoneer Username"
                                />
                              </Form.Group>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 my-3">
                      <div className="d-flex justify-content-between">
                        <div>
                          <Radio
                            checked={selectedValue === "uk"}
                            onChange={handleChange}
                            value="uk"
                            name="radio-buttons"
                            inputProps={{ "aria-label": "B" }}
                          />
                          {/* <img width={100} src='/images/payoneer.png' /> */}
                          <span>
                            <b>Bank account (UK only)</b>
                          </span>
                        </div>

                        <div className="row">
                          <div className="col-md-5"></div>

                          <div className="col-md-7">
                            <div className="row my-2">
                              <div className="col-md-3">
                                <span>
                                  <b>Sort code</b>
                                </span>
                              </div>

                              <div className="col-md-3">
                                <Form.Control
                                  disabled={selectedValue != "uk"}
                                  value={bankSortNoOne}
                                  onChange={(e) =>
                                    setbankSortNoOne(e.target.value)
                                  }
                                  type="text"
                                />
                              </div>
                              <div className="col-md-3">
                                <Form.Control
                                  disabled={selectedValue != "uk"}
                                  value={bankSortNoTwo}
                                  onChange={(e) =>
                                    setbankSortNoTwo(e.target.value)
                                  }
                                  type="text"
                                />
                              </div>
                              <div className="col-md-3">
                                <Form.Control
                                  disabled={selectedValue != "uk"}
                                  value={bankSortNoThree}
                                  onChange={(e) =>
                                    setbankSortNoThree(e.target.value)
                                  }
                                  type="text"
                                />
                              </div>
                            </div>

                            <div className="col-md-4">
                              <span>
                                <b>Account number</b>
                              </span>
                            </div>
                            <Form>
                              <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Control
                                  disabled={selectedValue != "uk"}
                                  value={bankAccountNumber}
                                  onChange={(e) =>
                                    setbankAccountNumber(e.target.value)
                                  }
                                  type="text"
                                  placeholder="Account Number"
                                />
                              </Form.Group>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ float: "right" }}>
                      {btn_loading_payment_details ? (
                        <Button variant="contained">
                          <Spinner
                            size="sm"
                            animation="border"
                            variant="light"
                          />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleConnectWallet}
                          variant="contained"
                        >
                          Save
                        </Button>
                      )}
                    </div>
                  </div>

                  {code != null && (
                    <div className="mx-auto text-center">
                      <Button className="mx-auto " variant="contained">
                        <a
                          className="text-white"
                          href={`/courses/manage/${code}/`}
                        >
                          Go back to course
                        </a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
};

export default MyProfile;
