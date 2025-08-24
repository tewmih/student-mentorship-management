# How to Use Chart Components

## Quick Start - Copy & Paste

### 1. Import the components

```jsx
import DepartmentChart from "./components/barGraph/Department-chart.jsx";
import { StatsCard } from "./components/barGraph/stats-card.jsx";
import { Users } from "lucide-react";
```

### 2. Create dummy data

```jsx
// Dummy data for DepartmentChart
const dummyDepartmentData = [
  { name: "ECE", value: 58635, color: "#1aa367" },
  { name: "Civil", value: 74779, color: "#1aa367" },
  { name: "Software", value: 19027, color: "#1aa367" },
  { name: "Mechanical", value: 43887, color: "#1aa367" },
  { name: "Food Science", value: 9142, color: "#1aa367" },
];
```

### 3. Use the components

```jsx
// DepartmentChart with props
<DepartmentChart
  title="AASTU STUDENT"
  totalValue={207388}
  data={dummyDepartmentData}
  maxValue={80000}
/>

// StatsCard with props
<StatsCard
  title="Students"
  value={5423}
  subtitle="2025"
  icon={Users}
/>
```
