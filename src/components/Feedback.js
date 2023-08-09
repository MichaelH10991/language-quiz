import ListenButton from "./ListenButton";

const Feedback = (props) => {
  const { correct, previousAns, showFeedback, flip } = props;

  // initial state, dont show any feedback.
  if (!showFeedback) {
    return undefined;
  }

  return correct ? (
    <div style={{ color: "green" }}>
      Correct;{" "}
      {flip
        ? previousAns.english
        : `${previousAns.foreginDisplay || previousAns.foregin} ${
            previousAns.pronounce || ""
          }`}
      <ListenButton
        phrase={previousAns.foreginDisplay || previousAns.foregin}
      />
    </div>
  ) : (
    <div style={{ color: "red" }}>Incorrect</div>
  );
};

export default Feedback;
