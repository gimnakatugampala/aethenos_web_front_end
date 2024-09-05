import React, { useEffect, useState } from "react";
import { Typography, Paper, Container, Box, Button, Grid } from "@mui/material";
import { Card } from "antd";
import Form from "react-bootstrap/Form";
import ErrorAlert from "../../../../commonFunctions/Alerts/ErrorAlert";

const ExternalRatings = () => {
    

    const [link_to_course, setlink_to_course] = useState("");
    const [external_ratings, setexternal_ratings] = useState("");
    const [external_number_of_number, setexternal_number_of_number] = useState("");
    const [any_comment, setany_comment] = useState("");

    const handleExternalRatings = () =>{


        const rating = parseFloat(external_ratings);
        if (rating < 0 || rating > 5) {
          ErrorAlert("Error", "External rating should be between 1 to 5");
          return;
        }
    }
  

  return (
    <div className="col-md-10 px-4 mb-4 course-landing-page-responsive">
      <Card className="py-2 my-2">

      <div className='d-flex justify-content-between p-1'>
        <Typography className="p-3" variant="h4">
          External Ratings
        </Typography>

        <Button onClick={handleExternalRatings}  variant="contained">SAVE</Button>
     </div>

        <hr />

        <Container maxWidth="md">
          <Box my={4}>

          
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
            

            </Box>
          </Container>
      </Card>
    </div>
  )
}

export default ExternalRatings