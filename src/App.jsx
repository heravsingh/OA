import React, { useState } from "react";

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "First comment",
      replies: [],
      isStarred: false,
      timestamp: Date.now(),
    },
    {
      id: 2,
      text: "Second comment",
      replies: [],
      isStarred: false,
      timestamp: Date.now(),
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handlePostComment = () => {
    if (!newComment) return;
    const newCommentObj = {
      id: comments.length + 1,
      text: newComment,
      replies: [],
      isStarred: false,
      timestamp: Date.now(),
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  const handleReplyToComment = (id, replyText) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: comment.replies.length + 1,
              text: replyText,
              timestamp: Date.now(),
            },
          ],
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleToggleStar = (id) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, isStarred: !comment.isStarred };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleSortComments = (sortType) => {
    let sortedComments = [];
    switch (sortType) {
      case "latest":
        sortedComments = [...comments].sort(
          (a, b) => b.timestamp - a.timestamp
        );
        break;
      case "replies":
        sortedComments = [...comments].sort(
          (a, b) => b.replies.length - a.replies.length
        );
        break;
      default:
        sortedComments = [...comments];
        break;
    }
    setSortBy(sortType);
    setComments(sortedComments);
  };

  return (
    <div class="container">
      <h2>Comments</h2>
      <textarea
        class="txtarea"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button class="post" onClick={handlePostComment}>
        POST
      </button>
      <div className="sortBy">
        <label class="sortLabel">Sort By:</label>
        <select
          class="sort"
          value={sortBy}
          onChange={(e) => handleSortComments(e.target.value)}
        >
          <option value="">Select</option>
          <option value="latest">Latest</option>
        </select>
      </div>
      <ul class="comments">
        {comments.map((comment) => (
          <li class="comment" key={comment.id}>
            {comment.text}
            <div className="actionBtns">
              <button class="star" onClick={() => handleToggleStar(comment.id)}>
                {comment.isStarred ? "Unstar" : "Star"}
              </button>
              <button
                class="delete"
                onClick={() => handleDeleteComment(comment.id)}
              >
                Delete
              </button>
            </div>
            <ul class="cReplies">
              {comment.replies.map((reply) => (
                <li key={reply.id}>
                  {reply.text}
                </li>
              ))}
              <li>
                <textarea
                  placeholder="Write a reply..."
                  onBlur={(e) =>
                    handleReplyToComment(comment.id, e.target.value)
                  }
                />
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;