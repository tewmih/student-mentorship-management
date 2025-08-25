Recharts Common Components
This repository contains a collection of reusable React components built with recharts for displaying various types of charts. These components are designed to be easily integrated into any React application.

🚀 Installation
First, you need to install the recharts library if you haven't already.

npm install recharts@latest

📈 Components
1. LineChart
A reusable component for displaying a line or area chart. It's ideal for visualizing progress or trends over time.

Props:

data: An array of objects. Each object should contain a label (for the X-axis), a value, and a date.

title: The title displayed above the chart.

tooltipLabel: The text label for the tooltip value (e.g., "progress").

Example Usage:

import LineChart from "./ui/LineChart";

const progressData = [
  { label: "February", value: 72, date: "Feb 14th, 2020" },
  { label: "March", value: 18, date: "Mar 22nd, 2020" },
  { label: "April", value: 45, date: "Apr 8th, 2020" },
  { label: "May", value: 89, date: "May 15th, 2020" },
  { label: "June", value: 34, date: "Jun 3rd, 2020" },
  { label: "July", value: 67, date: "Jul 12th, 2020" },
  { label: "August", value: 23, date: "Aug 28th, 2020" },
  { label: "September", value: 56, date: "Sep 5th, 2020" },
  { label: "October", value: 99, date: "Oct 18th, 2020" },
  { label: "November", value: 78, date: "Nov 9th, 2020" },
  { label: "December", value: 41, date: "Dec 25th, 2020" },
];

function App() {
  return (
    <LineChart
      data={progressData}
      title="Your past Progress"
      tooltipLabel="progress"
    />
  );
}

2. PieChartComponent
A component for visualizing data as a pie chart. Perfect for showing proportional data.

Props:

data: An array of objects. Each object should have a label and a value.

Example Usage:

import PieChartComponent from "./ui/PieChartComponent";

const data1 = [
  { label: "1st year", value: 7, percentage: 75 },
  { label: "2nd year", value: 4, percentage: 42 },
  { label: "3rd year", value: 9, percentage: 91 },
  { label: "4th year", value: 2, percentage: 28 },
  { label: "5th year", value: 6, percentage: 63 },
];

const data2 = [
  { label: "1st year", value: 29, percentage: 20 },
  { label: "2nd year", value: 7, percentage: 20 },
  { label: "3rd year", value: 9, percentage: 91 },
  { label: "4th year", value: 2, percentage: 28 },
  { label: "5th year", value: 6, percentage: 63 },
];

function App() {
  return (
    <>
      <PieChartComponent data={data1} />
      <PieChartComponent data={data2} />
    </>
  );
}

3. DonutChart
A component to display a donut chart, which is a variation of a pie chart. It's often used to show a percentage or single value with a title in the center.

Props:

percentage: The numeric percentage value to display.

title: The title displayed in the center of the chart.

activeColor: The color of the filled part of the donut.

backgroundColor: The color of the empty part of the donut.

Example Usage:

import DonutChart from "./ui/DonutChart";

function App() {
  return (
    <DonutChart
      percentage={22}
      title="Customer Growth"
      activeColor="#10b981"
      backgroundColor="#d1fae5"
    />
  );
}
