const Dialog = ({ children }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        border: "solid",
        borderWidth: 1 + "px",
        borderRadius: 10 + "px",
      }}
    >
      {children}
    </div>
  );
};

export default Dialog;
