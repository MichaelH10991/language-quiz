const Dialog = (props) => {
  const { phrases } = props;

  const dialogStyle = {
    border: "solid",
    borderWidth: 1 + "px",
    borderRadius: 10 + "px",
  };

  return (
    <div style={dialogStyle}>
      {phrases.map((phrase) => (
        <div>{phrase.foregin}</div>
      ))}
    </div>
  );
};

const Revise = (props) => {
  const { revise, setRevise, phrases } = props;
  return (
    <div>
      {revise && phrases.length ? <Dialog phrases={phrases} /> : <div />}
      Revise
      <input type="checkbox" onClick={() => setRevise(!revise)}></input>
    </div>
  );
};

export default Revise;
