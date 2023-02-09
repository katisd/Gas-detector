// chartjs import
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
  ChartOptions,
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
  chartData: { x: string; y: number }[];
  chartName: string;
  xAisUnit: "day" | "minute" | "hour";
};

// return Line chart
const ChartComponent: React.FC<ChartProps> = ({
  chartData,
  chartName,
  xAisUnit,
}) => {
  // map string to date and sort by date ascending
  const data = {
    labels: chartData
      .map(({ x, y }) => ({ x: new Date(x), y }))
      .sort((a, b) => (a.x > b.x ? 1 : -1)),
    chartName: chartName,
  };
  const Data = {
    labels: [],
    datasets: [
      {
        pointRadius: 8,
        hoverRadius: 10,
        pointBackgroundColor: "rgb(4, 122, 255,0.2)",
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
  return <Line data={Data} options={options} width={400} height={200} />;
};
export default ChartComponent;
