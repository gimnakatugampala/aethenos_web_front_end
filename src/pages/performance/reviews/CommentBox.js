import React, { useState } from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";

const CommentBox = () => {
  const [isExpanded, setIsExpanded] = useState(false); // State to track the expansion

  const data = [
    {
      userId: "02b",
      comId: "017",
      fullName: "Lily",
      userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
      text: "I think you have a point🤔",
      avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
      replies: [],
    },
  ];

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded); // Toggle the expansion state
  };

  return (
    <div>
      <button
        type="button"
        class="btn btn-outline-primary btn-block"
        onClick={handleButtonClick}
      >
        Respond
      </button>

      {isExpanded && (
        <CommentSection
          currentUser={{
            currentUserId: "01a",
            currentUserImg:
              "https://ui-avatars.com/api/name=Riya&background=random",
            currentUserProfile:
              "https://www.linkedin.com/in/riya-negi-8879631a9/",
            currentUserFullName: "Riya Negi",
          }}
          logIn={{
            loginLink: "http://localhost:3001/",
            signupLink: "http://localhost:3001/",
          }}
          data={data}
        />
      )}
    </div>
  );
};

export default CommentBox;
