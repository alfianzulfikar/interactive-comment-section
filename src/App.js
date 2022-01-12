import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import InputBox from "./components/InputBox";
import data from "./data.json";

function App() {
  const [comments, setComments] = useState(data.comments);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [replyBoxId, setReplyBoxId] = useState(false);
  const [commentId, setCommentId] = useState(false);
  const [input, setInput] = useState("");
  const [replyInput, setReplyInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const addComment = (e, type, replyingTo) => {
    e.preventDefault();
    if (type === "comment") {
      let id;
      let check = true;
      while (check) {
        id = Math.floor(Math.random() * 101);
        for (let i = 0; i < comments.length; i++) {
          if (comments[i].id === id) {
            i = comments.length;
            check = true;
          } else {
            if (comments[i].replies.length > 0) {
              for (let j = 0; j < comments[i].replies.length; j++) {
                if (comments[i].replies[j].id === id) {
                  j = comments[i].replies.length;
                  check = true;
                } else {
                  check = false;
                }
              }
              if (check) {
                i = comments.length;
              }
            } else {
              check = false;
            }
          }
        }
      }
      const newComment = {
        id: Math.floor(Math.random() * 101),
        content: input,
        createdAt: "Just now",
        score: 0,
        user: data.currentUser,
        replies: [],
      };
      setComments([...comments, newComment]);
      setInput("");
      setReplyInput("");
      setShowReplyBox(false);
      setShowEditBox(false);
      setReplyBoxId(false);
    } else {
      const content = replyInput.replace(`@${replyingTo} `, "");
      const newReply = {
        id: Math.floor(Math.random() * 101),
        content,
        createdAt: "Just now",
        score: 0,
        replyingTo,
        user: data.currentUser,
      };
      let comments_temp = [];
      for (let i = 0; i < comments.length; i++) {
        comments_temp.push(comments[i]);
        if (comments[i].id === commentId) {
          comments_temp[comments_temp.length - 1].replies.push(newReply);
        }
      }
      setComments(comments_temp);
      setInput("");
      setReplyInput("");
      setShowReplyBox(false);
      setShowEditBox(false);
      setReplyBoxId(false);
    }
  };

  const editComment = (e, replyingTo, commentData) => {
    e.preventDefault();
    const content = replyInput.replace(`@${replyingTo} `, "");
    let updatedComment = {
      id: commentData.id,
      content,
      createdAt: "Just now",
      score: commentData.score,
    };

    if (replyingTo) {
      updatedComment = {
        ...updatedComment,
        replyingTo,
      };
    }

    updatedComment = {
      ...updatedComment,
      user: commentData.user,
    };

    if (!replyingTo) {
      updatedComment = {
        ...updatedComment,
        replies: commentData.replies,
      };
    }

    let comments_temp = [];
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id === updatedComment.id) {
        comments_temp.push(updatedComment);
      } else {
        comments_temp.push(comments[i]);
        if (comments[i].replies.length > 0) {
          let array_temp = [];
          for (let j = 0; j < comments[i].replies.length; j++) {
            if (comments[i].replies[j].id === updatedComment.id) {
              array_temp.push(updatedComment);
            } else {
              array_temp.push(comments[i].replies[j]);
            }
          }
          comments_temp[comments_temp.length - 1].replies = array_temp;
        }
      }
    }
    setComments(comments_temp);
    setInput("");
    setReplyInput("");
    setShowReplyBox(false);
    setShowEditBox(false);
    setReplyBoxId(false);
  };

  const deleteComment = (id) => {
    let comments_temp = [];
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id !== id) {
        comments_temp.push(comments[i]);
        if (comments[i].replies.length > 0) {
          let replies_temp = [];
          for (let j = 0; j < comments[i].replies.length; j++) {
            if (comments[i].replies[j].id !== id) {
              replies_temp.push(comments[i].replies[j]);
            }
          }
          comments_temp[comments_temp.length - 1].replies = replies_temp;
        }
      }
    }
    setComments(comments_temp);
    setShowModal(false);
  };

  const upvote = (id) => {
    let comments_temp = [];
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id === id) {
        comments_temp.push({ ...comments[i], score: comments[i].score + 1 });
      } else {
        comments_temp.push(comments[i]);
        if (comments[i].replies.length > 0) {
          let replies_temp = [];
          for (let j = 0; j < comments[i].replies.length; j++) {
            if (comments[i].replies[j].id === id) {
              replies_temp.push({
                ...comments[i].replies[j],
                score: comments[i].replies[j].score + 1,
              });
            } else {
              replies_temp.push(comments[i].replies[j]);
            }
          }
          comments_temp[comments_temp.length - 1].replies = replies_temp;
        }
      }
    }
    setComments(comments_temp);
  };

  const downvote = (id) => {
    let comments_temp = [];
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id === id) {
        if (comments[i].score > 0) {
          comments_temp.push({ ...comments[i], score: comments[i].score - 1 });
        } else {
          comments_temp.push(comments[i]);
        }
      } else {
        comments_temp.push(comments[i]);
        if (comments[i].replies.length > 0) {
          let replies_temp = [];
          for (let j = 0; j < comments[i].replies.length; j++) {
            if (comments[i].replies[j].id === id) {
              if (comments[i].replies[j].score > 0) {
                replies_temp.push({
                  ...comments[i].replies[j],
                  score: comments[i].replies[j].score - 1,
                });
              } else {
                replies_temp.push(comments[i].replies[j]);
              }
            } else {
              replies_temp.push(comments[i].replies[j]);
            }
          }
          comments_temp[comments_temp.length - 1].replies = replies_temp;
        }
      }
    }
    setComments(comments_temp);
  };

  return (
    <div className="container">
      <div className="card-wrapper">
        {comments.map((item) => (
          <Card
            data={item}
            key={item.id}
            currentUser={data.currentUser}
            showReplyBox={showReplyBox}
            setShowReplyBox={setShowReplyBox}
            showEditBox={showEditBox}
            setShowEditBox={setShowEditBox}
            replyInput={replyInput}
            setReplyInput={setReplyInput}
            setShowModal={setShowModal}
            replyBoxId={replyBoxId}
            setReplyBoxId={setReplyBoxId}
            setCommentId={setCommentId}
            deleteComment={deleteComment}
            addComment={addComment}
            editComment={editComment}
            upvote={upvote}
            downvote={downvote}
          />
        ))}
      </div>
      <InputBox
        currentUser={data.currentUser}
        input={input}
        setInput={setInput}
        action={addComment}
        type="comment"
      />
      {showModal && (
        <div className="modal-wrapper">
          <div className="absolute-background"></div>
          <div className="modal">
            <p className="modal-title">Delete comment</p>
            <p className="modal-info">
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone
            </p>
            <div className="modal-btn-wrapper">
              <button
                className="modal-btn modal-btn-deny"
                onClick={() => setShowModal(false)}
              >
                No, Cancel
              </button>
              <button
                className="modal-btn modal-btn-confirm"
                onClick={() => deleteComment(showModal)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
