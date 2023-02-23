// import chartjs-adapter-date-fns
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  type ChartOptions,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

type ChartProps = {
  chartData: { x: string; y: number; status: string }[] | undefined | void;
  chartName: string;
  xAisUnit: "day" | "minute" | "hour";
};

// return Line chart
const ChartComponent: React.FC<ChartProps> = ({
  chartData,
  chartName,
  xAisUnit,
}) => {
  const helperColor = (status: string) => {
    if (status == "SAFE") {
      return "rgb(4, 122, 255,0.45)";
    } else if (status == "WARNING") {
      return "rgb(255, 255, 0,0.45)";
    } else if (status == "DANGER") {
      return "rgb(255, 0, 0,0.45)";
    }
  };
  // map string to date time and sort by date ascending
  const sortedData = chartData
    ?.map(({ x, y, status }) => ({
      x: new Date(x).getTime(),
      y: y,
      status: status,
    }))
    .sort((a, b) => (a.x > b.x ? 1 : -1));
  const data = {
    labels: sortedData?.map(({ x, y }) => ({ x, y })),
    chartName: chartName,
  };
  const color = sortedData?.map(({ status }) => helperColor(status));
  const Data = {
    labels: [],
    datasets: [
      {
        pointRadius: 8,
        hoverRadius: 10,
        pointBackgroundColor: color,
        data: data.labels,
        label: data.chartName,
      },
    ],
  };
  const options: ChartOptions<"line"> = {
    scales: {
      // xAxis type is time
      x: {
        title: {
          display: true,
          text: "Time",
          font: {
            size: 14,
          },
        },
        type: "time",
        time: {
          // unit is depend on props
          unit: xAisUnit,
        },
      },
      y: {
        title: {
          display: true,
          text: "Gas Value",
          font: {
            size: 14,
          },
        },
      },
    },
    // hide legend
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return chartData ? (
    <Line data={Data} options={options} width={400} height={200} />
  ) : (
    // TODO Skeleton Loading for chart
    <></>
  );
};
export default ChartComponent;
