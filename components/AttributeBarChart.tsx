import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartValueLabelPlugin } from "./ChartValueLabelPlugin ";
import { getNextMultipleOfTwenty } from "@/utils/getNextMultipleOfTwenty";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartValueLabelPlugin
);

interface AttributeBarChartProps {
  attributes: { name: string; value: number }[];
}

const AttributeBarChart: React.FC<AttributeBarChartProps> = ({
  attributes,
}) => {
  const getBarColor = (value: number) => {
    if (value >= 80) {
      return "rgba(22, 171, 141, 0.8)"; // Green
    } else if (value >= 50) {
      return "rgba(255, 206, 86, 0.8)"; // Yellow
    } else {
      return "rgba(207, 8, 41, 0.8)"; // Red
    }
  };

  const data = {
    labels: attributes.map((attr) => attr.name),
    datasets: [
      {
        label: "Attributes",
        data: attributes.map((attr) => attr.value),
        backgroundColor: attributes.map((attr) => getBarColor(attr.value)),
        borderColor: attributes.map((attr) =>
          getBarColor(attr.value).replace("0.6", "1")
        ),
        borderWidth: 1,
      },
    ],
  };

  const maxAttributeValue = getNextMultipleOfTwenty(
    Math.max(...attributes.map((attr) => attr.value))
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Player Attributes",
      },
      valueLabel: {}, // Enable the value label plugin
    },
    scales: {
      y: {
        beginAtZero: true,
        max: maxAttributeValue, // Increase max to the next multiple of 20 plus buffer
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default AttributeBarChart;
