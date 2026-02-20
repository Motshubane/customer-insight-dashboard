import React from "react";

export interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon, color }) => (
  <div className={`p-4 rounded-lg shadow-md flex items-center gap-4 ${color || "bg-#f4f3f2"}`}>
    {icon && <div className="text-2xl">{icon}</div>}
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default KpiCard;
