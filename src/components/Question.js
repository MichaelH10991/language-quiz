const Question = (props) => {
  const { phrase, language, peek, flip } = props;
  if (!phrase) {
    return "No more questions.";
  }

  const capitalized = language.charAt(0).toUpperCase() + language.slice(1);

  const question = () => {
    if (flip) {
      return (
        <div style={{ whiteSpace: "nowrap" }}>
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
                <div>WARN: No pronounciation provided!</div>
              )}
            </i>
          </div>
        </div>
      );
    }
    return (
      <div style={{ whiteSpace: "nowrap" }}>
        <span>What is "</span>
        <span style={{ color: peek ? "green" : " " }}>
          {!peek ? phrase.english : phrase.foreginDisplay || phrase.foregin}
        </span>
        <span>" in {capitalized}</span>
        <div style={{ color: "#ffffff00" }}>
          <i>
            {phrase.pronounce ? (
              phrase.pronounce
            ) : (
              <div style={{ color: "#ffffff00" }}>Empty</div>
            )}
          </i>
        </div>
      </div>
    );
  };

  return question();
};

export default Question;
