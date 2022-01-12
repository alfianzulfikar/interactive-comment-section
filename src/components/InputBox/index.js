import styles from "./InputBox.module.css";

const InputBox = ({
  currentUser,
  input,
  setInput,
  action,
  type,
  replyingTo,
  commentData,
}) => {
  return (
    <div className={currentUser ? styles.input_box : styles.input_box_edit}>
      <form
        onSubmit={(e) => {
          if (type === "edit") {
            action(e, replyingTo, commentData);
          } else {
            action(e, type, replyingTo);
          }
        }}
      >
        {type === "comment" ? (
          <textarea
            rows={3}
            placeholder="Add a comment..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.input_box_textarea}
          />
        ) : (
          <textarea
            rows={3}
            placeholder="Add a comment..."
            defaultValue={replyingTo ? "@" + replyingTo + " " + input : input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.input_box_textarea}
          />
        )}
        <div
          className={
            currentUser ? styles.submit_wrapper : styles.submit_wrapper_edit
          }
        >
          {currentUser && (
            <img
              src={require(`../../images/avatars/${currentUser.image.webp.replace(
                "./images/avatars/",
                ""
              )}`)}
              className={styles.current_user_img}
              alt="Current user"
            />
          )}
          <button type="submit" className={styles.input_box_button}>
            {type === "comment"
              ? "send"
              : type === "reply"
              ? "reply"
              : "update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputBox;
