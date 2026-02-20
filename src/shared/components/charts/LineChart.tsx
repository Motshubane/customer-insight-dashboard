import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js"; 
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface LineChartProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
}

const LineChart: React.FC<LineChartProps> = ({ labels, datasets }) => {
  const data = {
    labels,
    datasets: datasets.map(ds => ({ ...ds, fill: false, tension: 0.3 })),
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // fixes type error
      },
      title: {
        display: true,
        text: "Line Chart",
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default LineChart;