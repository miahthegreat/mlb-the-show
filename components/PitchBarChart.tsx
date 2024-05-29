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

interface PitchBarChartProps {
  pitches: { name: string; speed: number; control: number; movement: number }[];
}

const PitchBarChart: React.FC<PitchBarChartProps> = ({ pitches }) => {
  const data = {
    labels: pitches.map((pitch) => pitch.name),
    datasets: [
      {
        label: "Speed",
        data: pitches.map((pitch) => pitch.speed),
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Control",
        data: pitches.map((pitch) => pitch.control),
        backgroundColor: "rgba(255, 206, 86, 0.8)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "Movement",
        data: pitches.map((pitch) => pitch.movement),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const maxPitchValue = getNextMultipleOfTwenty(
    Math.max(
      ...pitches.flatMap((pitch) => [
        pitch.speed,
        pitch.control,
        pitch.movement,
      ])
    )
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Pitch Attributes",
      },
      valueLabel: {}, // Enable the value label plugin
    },
    scales: {
      y: {
        beginAtZero: true,
        max: maxPitchValue, // Increase max to the next multiple of 20 plus buffer
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default PitchBarChart;
