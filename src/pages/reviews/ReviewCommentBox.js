import React, { useState } from 'react';
import Button from '@mui/material/Button';


const ReviewCommentBox = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyToCommentId, setReplyToCommentId] = useState(null);

  const handleAddComment = (parentId = null) => {
    if (newComment.trim() === '') return;

    const commentObject = {
      id: Date.now(),
      text: newComment,
      parentId: parentId,
      replies: [],
    };

    if (parentId === null) {
      setComments([...comments, commentObject]);
    } else {
      const updatedComments = comments.map((comment) => {
        if (comment.id === parentId) {
          return { ...comment, replies: [...comment.replies, commentObject] };
        }
        return comment;
      });
      setComments(updatedComments);
    }

    setNewComment('');
  };

  const handleReply = (commentId) => {
    setReplyToCommentId(commentId);
  };

  const handleCancelReply = () => {
    setReplyToCommentId(null);
    setReplyText('');
  };

  const handleSubmitReply = () => {
    if (replyText.trim() === '') return;

    handleAddComment(replyToCommentId);
    setReplyText('');
    setReplyToCommentId(null);
  };

  return (
    <div className="container mt-4">
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="my-3">
            <p>{comment.text}</p>
            <Button variant="contained" className="btn btn-outline-primary" onClick={() => handleReply(comment.id)}>
              Reply
            </Button>
            {replyToCommentId === comment.id && (
              <div className="my-3">
                <textarea
                  className="form-control my-3"
                  rows="2"
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                ></textarea>
                <Button variant="contained" className="m-2" onClick={handleSubmitReply}>
                  Submit Reply
                </Button>
                <Button variant="outlined" className="m-2" onClick={handleCancelReply}>
                  Cancel
                </Button>
              </div>
            )}
            {comment.replies.map((reply) => (
              <div key={reply.id} className="my-2">
                <p>{reply.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <Button className="mt-2"  onClick={() => handleAddComment(null)} variant="contained">Add Comment</Button>

      </div>
    </div>
  );
};

export default ReviewCommentBox;
