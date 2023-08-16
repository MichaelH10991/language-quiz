import { useState } from "react";

const incorrect = {
  color: "red",
};

const doneIncorrect = {
  ...incorrect,
  textDecoration: "line-through",
};

const doneCorrect = {
  color: "green",
  textDecoration: "line-through",
};

const computeStyle = (phrase) => {
  if (phrase.done && phrase.incorrect) {
    return doneIncorrect;
  } else if (phrase.incorrect) {
    return incorrect;
  } else if (phrase.done) {
    return doneCorrect;
  } else {
    return {};
  }
};

const Revise = (props) => {
  const { phrases, children } = props;
  const [revise, setRevise] = useState(false);

  return (
    <div>
      Revise
      <input type="checkbox" onClick={() => setRevise(!revise)}></input>
      {revise && phrases.length ? (
        <div
          style={{
            textAlign: "left",
            margin: 5 + "px",
            border: "solid",
            borderWidth: 1 + "px",
            borderRadius: 10 + "px",
            padding: 5 + "px",
          }}
        >
          {phrases.map((phrase, index) => (
            <div style={computeStyle(phrase)}>
              {phrase.english} - {phrase.foregin}
            </div>
          ))}
          {children}
        </div>
      ) : undefined}
    </div>
  );
};

export default Revise;
