import React from "react";

import Toggle from "./Toggle";

// 2. Row Component (Cleaned up for Apple's "Inset Grouped" look)
const Row = ({ label, value, onToggle }) => {
  return (
    <div className="flex justify-between items-center text-white py-2">
      <span className="text-[15px]">{label}</span>
      <Toggle enabled={value} onChange={onToggle} />
    </div>
  );
};

export default Row;
