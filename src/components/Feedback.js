const Feedback = (props) => {
  const { correct, previousAns, showFeedback, flip } = props;

  if (!showFeedback) {
    return undefined;
  }

  return correct ? (
    <div style={{ color: "green" }}>
      Correct;{" "}
      {flip
        ? previousAns.english
        : `${previousAns.foregin} ${previousAns.pronounce || ""}`}
    </div>
  ) : (
    <div style={{ color: "red" }}>Incorrect</div>
  );
};

export default Feedback;
