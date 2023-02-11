import React, { useState } from "react";
import { useGetALL, useGetLastDay, useGetLastHour } from "../common/useGetData";
import ChartComponents from "./ChartComponents";

// This component display chart with toggle button
const ChartLayout = () => {
  const { data: recDay } = useGetLastDay();
  const { data: recHour } = useGetLastHour();
  const { data: recAll } = useGetALL();
  // default display hours log
  const [hoursDisplay, setHoursDisplay] = useState<
    "LastHours" | "LastDay" | "All"
  >("LastHours");
  return (
    <div className="card order-2 flex-[2] shadow-xl md:order-1">
      <div className="card-body flex flex-col space-y-8">
        {/* toggle between Hours log & Days log */}
        <div className="stresh btn-group flex">
          {/* hours log */}
          <input
            type="radio"
            name="options"
            data-title="Last Hours"
            className={`p-auto btn flex-1 ${
              hoursDisplay == "LastHours" ? "btn-active" : ""
            } font-bold`}
            onClick={() => setHoursDisplay("LastHours")}
          />
          {/* days log */}
          <input
            type="radio"
            name="options"
            data-title="Last Day"
            className={`btn flex-1 ${
              hoursDisplay == "LastDay" ? "btn-active" : ""
            } font-bold`}
            onClick={() => setHoursDisplay("LastDay")}
          />
          <input
            type="radio"
            name="options"
            data-title="ALL"
            className={`p-auto btn flex-1 ${
              hoursDisplay == "All" ? "btn-active" : ""
            } font-bold`}
            onClick={() => setHoursDisplay("All")}
          />
        </div>
        {/* line chart hours log */}
        {hoursDisplay == "LastHours" && (
          <ChartComponents
            chartData={recHour}
            chartName="Volumn"
            xAisUnit="minute"
          />
        )}
        {/* line chart days log */}
        {hoursDisplay == "LastDay" && (
          <ChartComponents
            chartData={recDay}
            chartName="Volumn"
            xAisUnit="hour"
          />
        )}
        {/* line chart all log */}
        {hoursDisplay == "All" && (
          <ChartComponents
            chartData={recAll}
            chartName="Volumn"
            xAisUnit="day"
          />
        )}
      </div>
    </div>
  );
};

export default ChartLayout;
