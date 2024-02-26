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

// import Button from '@mui/material/Button';
// import "react-comments-section/dist/index.css";

const CommentBox = () => {
  const [isExpanded, setIsExpanded] = useState(false); // State to track the expansion

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

  return (
    <div>

      {isExpanded ? (
        <Button className="m-3" onClick={handleButtonClick} ><i class="fa-solid fa-xmark mx-2"></i> Cancel</Button>
        ) : (
        <Button className="m-3"  onClick={handleButtonClick} ><i class="fa-solid fa-reply mx-2"></i> Respond</Button>

      )}


      {isExpanded && (
       <CommentGroup>
        <Header as='h3' dividing>
          Comments
        </Header>


        <Form reply>
            <FormTextArea />
            <Button
              content='Add Reply'
              labelPosition='left'
              icon='edit'
              primary
            />
        </Form>

       <Comment>
         <CommentAvatar as='a' src='https://react.semantic-ui.com/images/avatar/small/steve.jpg' />
         <CommentContent>
           <CommentAuthor as='a'>Steve Jobes</CommentAuthor>
           <CommentMetadata>
             <div>2 days ago</div>
           </CommentMetadata>
           <CommentText>Revolutionary!</CommentText>
           <CommentActions>
             <CommentAction active>Reply</CommentAction>
           </CommentActions>
         </CommentContent>
       </Comment>

       <Comment>
         <CommentAvatar as='a' src='https://react.semantic-ui.com/images/avatar/small/steve.jpg' />
         <CommentContent>
           <CommentAuthor as='a'>Steve Jobes</CommentAuthor>
           <CommentMetadata>
             <div>2 days ago</div>
           </CommentMetadata>
           <CommentText>Revolutionary!</CommentText>
           <CommentActions>
             <CommentAction active>Reply</CommentAction>
           </CommentActions>
         </CommentContent>
       </Comment>


       
     </CommentGroup>
      )}
    </div>
  );
};

export default CommentBox;
