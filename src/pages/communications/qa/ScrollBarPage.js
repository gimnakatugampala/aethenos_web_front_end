import React from "react";
import { MDBContainer } from "mdbreact";
import "./QA.css";
import { Paper, Typography } from "@mui/material";
import Colors from "../../../commonFunctions/Colors";

const ScrollBarPage = ({answerContent ,  questionItemContent }) => {
  const scrollContainerStyle = {  maxHeight: "500px" };
  return (
    <MDBContainer>
      <div
        className="scrollbar scrollbar-primary  mt-5 mx-auto"
        style={scrollContainerStyle}
      >
        <p>
          {questionItemContent}
        </p>

        {answerContent != null && (

      <Paper
      elevation={3}
      style={{
        margin: '10px',
        padding: '10px',
        backgroundColor: Colors.PrimaryColor,
        color:"#fff"
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
