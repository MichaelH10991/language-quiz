import { calculateScore } from "../utils";

const Question = (props) => {
  const { phrase, language, peek, flip, questions } = props;
  if (!phrase) {
    const score = calculateScore(questions);
    return (
      <div>
        Well done, smarty pants.
        <br />
        <div style={{ marginBottom: "1em" }}>
          You got {score.correct}{" "}
          {score.correct === 1 ? "question" : "questions"} right and{" "}
          {score.incorrect} {score.incorrect === 1 ? "question" : "questions"}{" "}
          wrong.
          <br />
          Your score is {score.percentage}
          <br />
          Click the "Revise" button to see your breakdown.
        </div>
      </div>
    );
  }

  const capitalized = language.charAt(0).toUpperCase() + language.slice(1);

  const question = () => {
    if (flip) {
      return (
        <div style={{ marginBottom: "1em" }}>
          <span>What is "</span>
          <span style={{ color: peek ? "green" : " " }}>
            {!peek ? phrase.foregin : phrase.english}
          </span>
          <span>" in English</span>
          <div style={{ color: "lightcoral" }}>
            <i>
              {phrase.pronounce ? (
                phrase.pronounce
              ) : (
                <div>No pronounciation provided</div>
              )}
            </i>
          </div>
        </div>
      );
    }
    return (
      <div style={{ marginBottom: "1em" }}>
        <span>What is "</span>
        <span style={{ color: peek ? "green" : " " }}>
          {!peek ? phrase.english : phrase.foreginDisplay || phrase.foregin}
        </span>
        <span>" in {capitalized}</span>
        <div style={{ visibility: "hidden" }}>
          <i>{phrase.foregin}</i>
        </div>
      </div>
    );
  };

  return question();
};

export default Question;
