import { progressButtonProps } from "../types/types";

const ProgressButton = ({
  animationDurationMs,
  onClick,
  children,
}: progressButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: ".25rem .5rem",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        fontSize: "smaller",
        backgroundColor: "rgb(26, 26, 26)",
      }}>
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgb(160, 0, 0)",
          animation: `progressAnimation ${animationDurationMs}ms linear forwards`,
        }}
      />
      <style>{`
        @keyframes progressAnimation {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </button>
  );
};

export default ProgressButton;
