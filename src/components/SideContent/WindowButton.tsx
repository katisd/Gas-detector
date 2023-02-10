import React from "react";

type windowButtonProps = {
  windowCommand: boolean;
  setWindowCommand: React.Dispatch<React.SetStateAction<boolean>>;
};

const WindowButton = ({
  windowCommand,
  setWindowCommand,
}: windowButtonProps) => {
  return (
    <>
      {/* TODO add on off display */}
      <button
        onClick={() => setWindowCommand(!windowCommand)}
        className="btn btn-primary h-full flex-1 space-x-5 p-3"
      >
        <h1 className="text-xl">Smart Window</h1>
        {/* TODO add icon */}
        <h1 className="text-2xl">{windowCommand ? "ON" : "OFF"}</h1>
      </button>
    </>
  );
};

export default WindowButton;
