import React, { PureComponent } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data02 = [
  { name: "Pending Task", value: 50 },
  { name: "Completed Task", value: 30 },
  { name: "Submitted Task", value: 20 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6384",
  "#36A2EB",
];

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={430}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data02}
            cx={90}
            cy={100}
            innerRadius={50}
            outerRadius={70}
          >
            {data02.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
