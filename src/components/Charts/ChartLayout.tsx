import React, { useState } from "react";
import ChartComponents from "./ChartComponents";
// TODO - replace with real data from API
const recHour = [
  { x: "2020-02-15 18:37:39", y: 65 },
  { x: "2020-02-15 19:07:39", y: 59 },
  { x: "2020-02-15 23:27:39", y: 59 },
  { x: "2020-02-15 19:37:39", y: 66 },
];
const recDay = [
  { x: "2020-02-15", y: 65 },
  { x: "2020-02-17", y: 59 },
  { x: "2020-02-18", y: 59 },
  { x: "2020-02-19", y: 66 },
];

// display chart with toggle button
const ChartLayout = () => {
  // default display hours log
  const [hoursDisplay, setHoursDisplay] = useState(true);
  return (
    <div className="card order-2 flex-[2] shadow-xl md:order-1">
      <div className="card-body flex flex-col space-y-8">
        {/* toggle between Hours log & Days log */}
        <div className="btn-group">
          {/* hours log */}
          <input
            type="radio"
            name="options"
            data-title="Hours Log"
            className={`p-auto btn w-1/2 ${
              hoursDisplay ? "btn-active" : ""
            } font-bold`}
            onClick={() => setHoursDisplay(true)}
          />
          {/* days log */}
          <input
            type="radio"
            name="options"
            data-title="Days Log"
            className={`btn w-1/2 ${
              hoursDisplay ? "" : "btn-active"
            } font-bold`}
            onClick={() => setHoursDisplay(false)}
          />
        </div>
        {/* line chart hours log */}
        {hoursDisplay && (
          <ChartComponents
            chartData={recHour}
            chartName="Hour"
            xAisUnit="minute"
          />
        )}
        {/* line chart days log */}
        {!hoursDisplay && (
          <ChartComponents chartData={recDay} chartName="day" xAisUnit="hour" />
        )}
      </div>
    </div>
  );
};

export default ChartLayout;
