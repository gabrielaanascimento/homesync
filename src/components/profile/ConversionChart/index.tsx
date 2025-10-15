"use client";

import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Vendido", value: 30, color: "#3B82F6" },
  { name: "Não Vendido", value: 25, color: "#EF4444" },
  { name: "Em Processo", value: 25, color: "#6B7280" },
];

export default function ConversionChart() {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "40px",
        backgroundColor: "white",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        height: "300px",
      }}
    >
      <h3 style={{ color: "#004EFF", fontWeight: 600, marginBottom: "1px", fontSize: "30px", textAlign: "center" }}>Taxa de Conversão</h3>
      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <PieChart width={300} height={300}>
            <Pie
             data={data}
             dataKey="value" 
             cx="50%"
             cy="50%" 
             innerRadius={50}
             outerRadius={70}
             paddingAngle={5}
             label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color}/> 
              ))}
            </Pie>
          </PieChart>
      </div>
    </div>
  );
}
