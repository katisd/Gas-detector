import React, { useEffect, useState } from "react";
import { useGetCommand, useGetLastRecord } from "../common/useGetData";
import DisplayGas from "./DisplayGas";
import ForceOpenButton from "./ForceOpenButton";
import WindowButton from "./WindowButton";

const Content: React.FC = () => {
  // TODO fetch gas status & gas volumn from API every 5 seconds
  const { data: lastRecordData, isLoading } = useGetLastRecord();
  const { data } = useGetCommand();
  const [LocalCommand, setLocalCommand] = useState<boolean | undefined>(
    undefined
  );
  const windowCommand = data?.isOpen;
  return (
    <div className="order-1 flex flex-1 flex-col space-y-5 md:order-2">
      <DisplayGas
        gasStatus={lastRecordData?.status}
        gasVolumn={lastRecordData?.gas_quantity}
        isLoading={isLoading}
      />
      {/* when get data from api instead of static data this warning will lost */}
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
