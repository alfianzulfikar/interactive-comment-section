import InputBox from "../InputBox";
import styles from "./Card.module.css";
import { ReactComponent as IconPlus } from "../../images/icon-plus.svg";
import { ReactComponent as IconMinus } from "../../images/icon-minus.svg";
import { ReactComponent as IconEdit } from "../../images/icon-edit.svg";
import { ReactComponent as IconDelete } from "../../images/icon-delete.svg";
import { ReactComponent as IconReply } from "../../images/icon-reply.svg";

const Card = ({
  data,
  currentUser,
  showReplyBox,
  setShowReplyBox,
  showEditBox,
  setShowEditBox,
  setReplyInput,
  replyInput,
  setShowModal,
  replyBoxId,
  setReplyBoxId,
  setCommentId,
  addComment,
  editComment,
  upvote,
  downvote,
}) => {
  return (
    <div>
      <div className={styles.card}>
        <div className={styles.option}>
          <div className={styles.vote}>
            <IconPlus
              className={styles.vote_btn}
              onClick={() => upvote(data.id)}
            />
            <p>{data.score}</p>
            <IconMinus
              className={styles.vote_btn}
              onClick={() => downvote(data.id)}
            />
          </div>
          {currentUser.username === data.user.username ? (
            <div className={styles.current_user_option}>
              <div
                className={styles.delete_btn}
                onClick={() => setShowModal(data.id)}
              >
                <IconDelete />
                <label>Delete</label>
              </div>
              <div
                className={styles.edit_btn}
                onClick={() => {
                  if (showEditBox === data.id) {
                    setShowEditBox(false);
                  } else {
                    setShowEditBox(data.id);
                    setShowReplyBox(false);
                    setReplyBoxId(false);
                    setReplyInput(data.content);
                  }
                }}
              >
                <IconEdit />
                <label>Edit</label>
              </div>
            </div>
          ) : (
            <div
              className={styles.reply_btn}
              onClick={() => {
                if (replyBoxId === data.id) {
                  setShowReplyBox(false);
                  setReplyBoxId(false);
                } else {
                  setShowReplyBox(true);
                  setShowEditBox(false);
                  setReplyInput("");
                  setReplyBoxId(data.id);
                  setCommentId(data.id);
                }
              }}
            >
              <IconReply />
              <label>Reply</label>
            </div>
          )}
        </div>
        <div className={styles.comment_wrapper}>
          <div className={styles.profile}>
            <img
              src={require(`../../images/avatars/${data.user.image.webp.replace(
                "./images/avatars/",
                ""
              )}`)}
              alt={data.user.image.webp.replace("./images/avatars/", "")}
              className={styles.profile_img}
            ></img>
            <div className={styles.name_wrapper}>
              <p className={styles.profile_name}>{data.user.username}</p>
              {currentUser.username === data.user.username && (
                <span className={styles.you_label}>you</span>
              )}
            </div>
            <p className={styles.card_time}>{data.createdAt}</p>
          </div>
          {showEditBox === data.id ? (
            <InputBox
              input={replyInput}
              setInput={setReplyInput}
              type={"edit"}
              commentData={data}
              action={editComment}
            />
          ) : (
            <p className={styles.main_comment}>{data.content}</p>
          )}
        </div>
      </div>
      {showReplyBox && replyBoxId === data.id && (
        <InputBox
          currentUser={currentUser}
          input={replyInput}
          setInput={setReplyInput}
          replyingTo={data.user.username}
          type={"reply"}
          action={addComment}
        />
      )}
      {data.replies.length > 0 && (
        <div className={styles.reply_wrapper}>
          {data.replies.map((reply) => (
            <div key={reply.id}>
              <div className={styles.card}>
                <div className={styles.option}>
                  <div className={styles.vote}>
                    <IconPlus
                      className={styles.vote_btn}
                      onClick={() => upvote(reply.id)}
                    />
                    <p>{reply.score}</p>
                    <IconMinus
                      className={styles.vote_btn}
                      onClick={() => downvote(reply.id)}
                    />
                  </div>
                  {currentUser.username === reply.user.username ? (
                    <div className={styles.current_user_option}>
                      <div
                        className={styles.delete_btn}
                        onClick={() => setShowModal(reply.id)}
                      >
                        <IconDelete />
                        <label>Delete</label>
                      </div>
                      <div
                        className={styles.edit_btn}
                        onClick={() => {
                          if (showEditBox === reply.id) {
                            setShowEditBox(false);
                          } else {
                            setShowEditBox(reply.id);
                            setShowReplyBox(false);
                            setReplyBoxId(false);
                            setReplyInput(reply.content);
                          }
                        }}
                      >
                        <IconEdit />
                        <label>Edit</label>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={styles.reply_btn}
                      onClick={() => {
                        if (replyBoxId === reply.id) {
                          setShowReplyBox(false);
                          setReplyBoxId(false);
                        } else {
                          setShowReplyBox(true);
                          setShowEditBox(false);
                          setReplyInput("");
                          setReplyBoxId(reply.id);
                          setCommentId(data.id);
                        }
                      }}
                    >
                      <IconReply />
                      <label>Reply</label>
                    </div>
                  )}
                </div>
                <div className={styles.comment_wrapper}>
                  <div className={styles.profile}>
                    <img
                      src={require(`../../images/avatars/${reply.user.image.webp.replace(
                        "./images/avatars/",
                        ""
                      )}`)}
                      alt={reply.user.image.webp.replace(
                        "./images/avatars/",
                        ""
                      )}
                      className={styles.profile_img}
                    ></img>
                    <div className={styles.name_wrapper}>
                      <p className={styles.profile_name}>
                        {reply.user.username}
                      </p>
                      {currentUser.username === reply.user.username && (
                        <span className={styles.you_label}>you</span>
                      )}
                    </div>
                    <p className={styles.card_time}>{reply.createdAt}</p>
                  </div>
                  {showEditBox === reply.id ? (
                    <InputBox
                      input={replyInput}
                      setInput={setReplyInput}
                      type={"edit"}
                      replyingTo={reply.replyingTo}
                      commentData={reply}
                      action={editComment}
                    />
                  ) : (
                    <p className={styles.main_comment}>
                      <span className={styles.replying_to}>
                        @{reply.replyingTo}
                      </span>
                      {reply.content}
                    </p>
                  )}
                </div>
              </div>
              {showReplyBox && replyBoxId === reply.id && (
                <InputBox
                  currentUser={currentUser}
                  input={replyInput}
                  setInput={setReplyInput}
                  replyingTo={reply.user.username}
                  type={"reply"}
                  action={addComment}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
