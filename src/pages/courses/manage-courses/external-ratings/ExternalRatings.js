import React, { useEffect, useState } from "react";
import { Typography, Paper, Container, Box, Button, Grid } from "@mui/material";
import { Card } from "antd";

const ExternalRatings = () => {
  return (
    <div className="col-md-10 px-4 mb-4 course-landing-page-responsive">
      <Card className="py-2 my-2">
        <Typography className="p-3" variant="h4">
          External Ratings
        </Typography>
        <hr />

        <Container maxWidth="md">
          <Box my={4}>

            </Box>
          </Container>
      </Card>
    </div>
  )
}

export default ExternalRatings