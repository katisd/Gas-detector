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
  chartData: { x: string; y: number }[] | undefined | void;
  chartName: string;
  xAisUnit: "day" | "minute" | "hour";
};

// return Line chart
const ChartComponent: React.FC<ChartProps> = ({
  chartData,
  chartName,
  xAisUnit,
}) => {
  const helperColor = (gas: number) => {
    if (gas < 1700) {
      return "rgb(4, 122, 255,0.45)";
    } else if (gas < 3000) {
      return "rgb(255, 255, 0,0.45)";
    } else {
      return "rgb(255, 0, 0,0.45)";
    }
  };
  // map string to date time and sort by date ascending
  const data = {
    labels: chartData
      ?.map(({ x, y }) => ({ x: new Date(x).getTime(), y }))
      .sort((a, b) => (a.x > b.x ? 1 : -1)),
    chartName: chartName,
  };
  const color = chartData?.map(({ x, y }) => helperColor(y));
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
