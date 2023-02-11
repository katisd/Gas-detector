import React from "react";
import { UpadateCommand } from "../common/useGetData";

export type windowButtonProps = {
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
  return (
    <>
      {/* TODO add on off display */}
      <button
        onClick={() => {
          UpadateCommand({ LocalCommand, windowCommand, setLocalCommand });
          if (LocalCommand != windowCommand) {
            setLocalCommand(undefined);
          }
        }}
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
