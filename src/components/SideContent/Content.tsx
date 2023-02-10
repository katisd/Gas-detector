import React, { useState } from "react";
import DisplayGas from "./DisplayGas";
import ForceOpenButton from "./ForceOpenButton";
import WindowButton from "./WindowButton";

const Content: React.FC = () => {
  // TODO fetch gas status & gas volumn from API every 5 seconds
  const gasStatus = "warning";
  const gasVolumn = 2040;
  //   TODO fetch window command from API with useEffect once
  //   TODO put window command every time there are changes
  const [windowCommand, setWindowCommand] = useState(true);
  return (
    <div className="order-1 flex flex-1 flex-col space-y-5 md:order-2">
      <DisplayGas gasStatus={gasStatus} gasVolumn={gasVolumn} />
      {/* when get data from api instead of static data this warning will lost */}
      {gasStatus != "danger" ? (
        <WindowButton
          setWindowCommand={setWindowCommand}
          windowCommand={windowCommand}
        />
      ) : (
        <ForceOpenButton />
      )}
    </div>
  );
};

export default Content;
