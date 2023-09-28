import React, { useState } from 'react';

const ReviewCommentBox = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [likedComments, setLikedComments] = useState([]);

  const handleAddComment = (parentId = null) => {
    if (newComment.trim() === '') return;

    const commentObject = {
      id: Date.now(),
      text: newComment,
      likes: 0,
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

  const handleLike = (type, id) => {
    if (likedComments.includes(id)) {
      // User has already liked this comment or reply
      return;
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });

    setComments(updatedComments);
    setLikedComments([...likedComments, id]); // Track that the user has liked this comment or reply
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
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button className="btn btn-primary mt-2" onClick={() => handleAddComment(null)}>
          Add Comment
        </button>
      </div>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-3">
            <p>{comment.text}</p>
            <button className="btn btn-outline-primary" onClick={() => handleLike('comment', comment.id)}>
              Like ({comment.likes})
            </button>
            <button className="btn btn-outline-primary ml-2" onClick={() => handleReply(comment.id)}>
              Reply
            </button>
            {replyToCommentId === comment.id && (
              <div className="ml-3">
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                ></textarea>
                <button className="btn btn-primary mt-2" onClick={handleSubmitReply}>
                  Submit Reply
                </button>
                <button className="btn btn-secondary mt-2 ml-2" onClick={handleCancelReply}>
                  Cancel
                </button>
              </div>
            )}
            {comment.replies.map((reply) => (
              <div key={reply.id} className="ml-3 mb-2">
                <p>{reply.text}</p>
                <button className="btn btn-outline-primary" onClick={() => handleLike('reply', reply.id)}>
                  Like ({reply.likes})
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCommentBox;
