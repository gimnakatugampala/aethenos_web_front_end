import React from "react";
import { MDBContainer } from "mdbreact";
import "./QA.css";
import { Paper, Typography } from "@mui/material";
import Colors from "../../../commonFunctions/Colors";

const scrollContainerStyle = {
  maxHeight: '500px',
  overflowY: 'auto',
  overflowX: 'hidden',
  height: '90vh',
  display: 'flex',
  flexDirection: 'column',
};

const ScrollBarPage = ({answerContent ,  questionItemContent }) => {
  // const scrollContainerStyle = {  maxHeight: "500px" ,   overflowX: 'hidden' , height: '95vh'};
  return (
    <MDBContainer>
    <div
      className="scrollbar mt-2 scrollbar-primary mx-auto bg-light"
      style={scrollContainerStyle}
    >
      <Paper
        elevation={3}
        style={{
          margin: '10px',
          padding: '15px',
          backgroundColor: '#fff',
          color: '#000',
          width: 'fit-content',
          alignSelf: 'flex-start',
          textAlign: 'left',
        }}
      >
        <Typography variant="body1">{questionItemContent}</Typography>
      </Paper>

      {answerContent != null && (
        <Paper
          elevation={3}
          style={{
            margin: '10px',
            padding: '15px',
            backgroundColor: Colors.PrimaryColor,
            color: '#fff',
            width: 'fit-content',
            alignSelf: 'flex-end',
            textAlign: 'right',
          }}
        >
          <Typography variant="body1">{answerContent}</Typography>
        </Paper>
      )}
    </div>
  </MDBContainer>
  );
};
export default ScrollBarPage;
