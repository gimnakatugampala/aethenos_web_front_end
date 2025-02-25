import React, { useEffect, useState } from "react";
import { Typography, Paper, Container, Box, Button, Grid } from "@mui/material";
import { Card } from "antd";
import { GetAdminDisApproveComment, UnpublishCourse } from "../../../../api";

function App({status_type, code}) {

  const [comment, setcomment] = useState("")

  useEffect(() => {
    GetAdminDisApproveComment(code,setcomment)
  }, [code,comment])


  const handleunpublish = () =>{
    UnpublishCourse(code)
  }
  

  return (
    <div className="col-md-10 px-4 mb-4 course-landing-page-responsive">
      <Card className="py-2 my-2">
        <Typography className="p-3" variant="h4">
          Settings
        </Typography>
        <hr />

        <Container maxWidth="md">
          <Box my={4}>
            {comment != "" && (
            <Paper
              elevation={0}
              sx={{
                padding: 3,
                borderRadius: 2,
                backgroundColor: "#f0f0f0",
                borderColor: "red",
              }}
            >
              <Typography variant="h6" color="error" gutterBottom>
                DISAPPROVED
              </Typography>
              <Typography variant="body1" gutterBottom>
                {comment}
              </Typography>
            </Paper>
            )}
          </Box>
          {/* {status_type == "Approved" && ( */}

          <Box my={4}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
              Do you want to unpublish this course?
              </Typography>
              <Typography variant="body1">
              By unpublishing, new students won't be able to view or buy your course. Existing students will still have access to the course.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container justifyContent="flex-end">
                    <Button onClick={handleunpublish} variant="contained" color="primary">
                      Unpublish
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Box>
          {/* )} */}
        </Container>
      </Card>
    </div>
  );
}

export default App;
