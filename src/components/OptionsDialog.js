const Dialog = ({ children }) => {
  return (
    <div
      style={{
        // position: "absolute",
        // inlineSize: 300 + "px", makes the size fixed
        top: 0,
        right: 0,
        border: "solid",
        borderWidth: 1 + "px",
        borderRadius: 10 + "px",
        margin: 11 + "px",
        padding: 10 + "px",
        minWidth: "275px",
      }}
    >
      {children}
    </div>
  );
};

export default Dialog;
