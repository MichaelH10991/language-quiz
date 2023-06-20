import { useState } from "react";

const Revise = (props) => {
  const { phrases } = props;
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
            <div>
              {phrase.english} - {phrase.foregin}
            </div>
          ))}
        </div>
      ) : undefined}
    </div>
  );
};

export default Revise;
