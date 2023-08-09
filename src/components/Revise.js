import { useState } from "react";

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
            <div style={phrase.done ? { textDecoration: "line-through" } : {}}>
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
