import ListenButton from "./ListenButton";

const OutputComponent = (props) => {
  const { word, pronounce } = props;
  return (
    <>
      <div style={{ marginBottom: "0.5em" }}>{word}</div>
      <div style={{ marginBottom: "0.5em" }}>{pronounce}</div>
    </>
  );
};

const output = (flip, previousAns) =>
  flip ? (
    <OutputComponent word={previousAns.local} />
  ) : (
    <OutputComponent
      word={previousAns.foreignDisplay || previousAns.foreign}
      pronounce={previousAns.pronounce || ""}
    />
  );

const Feedback = (props) => {
  const { correct, previousAns, showFeedback, flip } = props;

  // initial state, dont show any feedback.
  if (!showFeedback) {
    return undefined;
  }

  return correct ? (
    <div className="feedback positive">
      <div>Correct!</div>
      <div>{output(flip, previousAns)}</div>
      <ListenButton
        phrase={previousAns.foreignDisplay || previousAns.foreign}
        language={previousAns.language}
      />
    </div>
  ) : (
    <div className="feedback negative">Incorrect</div>
  );
};

export default Feedback;
