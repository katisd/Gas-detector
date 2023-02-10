import axios from "axios";
import React from "react";
const url = "http://group2.exceed19.online";

type windowButtonProps = {
  windowCommand: boolean | undefined;
  setLocalCommand: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  LocalCommand: boolean | undefined;
};

const WindowButton = ({
  windowCommand,
  setLocalCommand,
  LocalCommand,
}: windowButtonProps) => {
  const helper = () => {
    if (LocalCommand === undefined) {
      return windowCommand == undefined
        ? "Loading"
        : windowCommand
        ? "ON"
        : "OFF";
    } else {
      return LocalCommand ? "ON" : "OFF";
    }
  };
  let num = 0;

  const handleCommand = (LocalCommand: boolean | undefined) => {
    axios
      .put(
        `${url}/update/${
          (LocalCommand === undefined ? !windowCommand : !LocalCommand)
            ? "true"
            : "false"
        }`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    num = num + 1;
    if (LocalCommand === undefined) {
      setLocalCommand(!windowCommand);
    } else {
      setLocalCommand(!LocalCommand);
    }
  };
  return (
    <>
      {/* TODO add on off display */}
      <button
        onClick={() => handleCommand(LocalCommand)}
        className="btn-primary btn h-full flex-1 space-x-5 p-3"
      >
        <h1 className="text-xl">Smart Window</h1>
        {/* TODO add icon */}
        <h1 className="text-2xl">{helper()}</h1>
      </button>
    </>
  );
};

export default WindowButton;
