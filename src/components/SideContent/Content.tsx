import React, { useState } from "react";
import { useGetCommand, useGetLastRecord } from "../common/useGetData";
import DisplayGas from "./DisplayGas";
import ForceOpenButton from "./ForceOpenButton";
import WindowButton from "./WindowButton";

const Content: React.FC = () => {
  const { data: lastRecordData, isLoading } = useGetLastRecord();
  const [LocalCommand, setLocalCommand] = useState<boolean | undefined>(
    undefined
  );
  const { data: serverCommandData } = useGetCommand(setLocalCommand);
  const windowCommand = serverCommandData?.isOpen;
  return (
    <div className="order-1 flex flex-1 flex-col space-y-5 md:order-2">
      <DisplayGas
        gasStatus={lastRecordData?.status}
        gasVolumn={lastRecordData?.gas_quantity}
        isLoading={isLoading}
      />
      {lastRecordData?.status != "DANGER" ? (
        <WindowButton
          LocalCommand={LocalCommand}
          setLocalCommand={setLocalCommand}
          windowCommand={windowCommand}
        />
      ) : (
        <ForceOpenButton />
      )}
    </div>
  );
};

export default Content;
