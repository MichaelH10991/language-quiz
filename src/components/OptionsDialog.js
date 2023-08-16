// {
//   flex: 1,
//   borderStyle: "solid",
//   borderRadius: 9 + "px",
//   background: "#202020",
//   margin: 11 + "px",
//   padding: 10 + "px",
//   minWidth: "275px",
// }}

const Dialog = ({ children }) => {
  return (
    <div
      style={{
        // position: "absolute",
        // inlineSize: 300 + "px", makes the size fixed
        // top: 0,
        // right: 0,
        flex: "1 1 0%",
        borderStyle: "solid",
        borderWidth: 2 + "px",
        borderRadius: 9 + "px",
        background: "#202020",
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
