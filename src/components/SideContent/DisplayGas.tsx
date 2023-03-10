import React from "react";

const DisplayGas = ({
  gasStatus,
  gasVolumn,
  isLoading,
}: {
  gasStatus: string | undefined;
  gasVolumn: number | undefined;
  isLoading: boolean;
}) => {
  const helper = (status: string) => {
    if (status === "SAFE") {
      return "badge-success";
    } else if (status === "WARNING") {
      return "badge-warning";
    } else {
      return "badge-error";
    }
  };
  if (isLoading) return <div className="card flex-[2]  shadow-lg"></div>;
  else {
    return (
      <>
        <div className="card flex-[2]  shadow-lg">
          <div className="card-body place-content-center items-center space-y-5">
            <h1 className="card-title text-2xl">Gas Volumn</h1>
            <h1 className="card-title text-5xl">{gasVolumn}</h1>
            <div className="space-x-5">
              <span className="card-title inline text-2xl">Status</span>
              <span
                className={`${helper(
                  gasStatus ?? ""
                )} badge inline p-2 px-7 text-xl font-semibold`}
              >
                {gasStatus}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default DisplayGas;
