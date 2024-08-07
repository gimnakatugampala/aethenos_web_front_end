import React, { useState } from "react";
// import { CommentSection } from "react-comments-section";
import {
  Header,
  CommentText,
  CommentMetadata,
  CommentGroup,
  CommentContent,
  CommentAvatar,
  CommentActions,
  CommentAction,
  CommentAuthor,
  FormTextArea,
  Button,
  Comment,
  Form,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import ErrorAlert from "../../../commonFunctions/Alerts/ErrorAlert";
import { AddReplyToReview } from "../../../api";
import moment from "moment";
import { FILE_PATH } from "../../../commonFunctions/FilePaths";

// import Button from '@mui/material/Button';
// import "react-comments-section/dist/index.css";

const CommentBox = ({reviewCode, replies , setcmbCourses}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setcomment] = useState("")
  const [btnLoading, setbtnLoading] = useState(false)

  const data = [
    {
      userId: "02b",
      fullName: "Lily",
      userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
      comment: "I think you have a point🤔",
      rating:4,
      date: "2024-02-26",
      replies: [
      {
        userId:'###',
        comment:'###',
        name:"GK",
        userType:'2',
        created_date:'2024-02-26'
      },
      {
        userId:'###',
        comment:'###',
        name:"GK",
        userType:'2',
        created_date:'2024-02-26'
      }
    ]
    },
  ];

 
  const handleButtonClick = () => {
    setIsExpanded(!isExpanded); // Toggle the expansion state
  };

  // ----------- Add Reply ------------------
  const hanldeReply = (e) => {
    e.preventDefault()

    if(comment == ""){
      ErrorAlert("Empty Field","Please Add A Reply")
      return
    }

    AddReplyToReview(comment,reviewCode,setbtnLoading,setcomment,setcmbCourses)

  }

  return (
    <div>

      {/* {isExpanded ? (
        <Button className="m-3" onClick={handleButtonClick} ><i class="fa-solid fa-xmark mx-2"></i> Cancel</Button>
        ) : (
        <Button className="m-3"  onClick={handleButtonClick} ><i class="fa-solid fa-reply mx-2"></i> Respond</Button>

      )} */}


      {isExpanded && (
       <CommentGroup>
        <Header as='h3' dividing>
          Comments
        </Header>


        <Form onSubmit={hanldeReply} reply>
            <FormTextArea onChange={(e) => setcomment(e.target.value)} />
            {btnLoading ? (
            <Button loading primary>
              Loading
            </Button>) : (
            <Button
              content='Add Reply'
              labelPosition='left'
              icon='edit'
              primary
            />
              )}
        </Form>

        {replies.length > 0 &&  replies
        .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)) // Sort comments by createdDate
        .map((reply,index) => (
          <Comment key={index}>
            <CommentAvatar as='a' src={reply.profileImg == "" ? "../images/user-profile.png" : `${FILE_PATH}${reply.profileImg}`} />
            <CommentContent>
              <CommentAuthor as='a'>{reply.name}</CommentAuthor>
              <CommentMetadata>
                <div>{moment(reply.createdDate, "YYYYMMDD").fromNow()}</div>
              </CommentMetadata>
              <CommentText>{reply.comment}</CommentText>
              <CommentActions>
                <CommentAction active>Reply</CommentAction>
              </CommentActions>
            </CommentContent>
          </Comment>
        ))}



       
     </CommentGroup>
      )}
    </div>
  );
};

export default CommentBox;
