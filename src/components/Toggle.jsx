import React from "react";

const Toggle = ({ enabled, onChange }) => {
  return (
    <button
      onClick={onChange}
      className={`w-[51px] h-[25px] flex items-center rounded-full p-[2px] transition-colors duration-300 ease-in-out ${
        enabled ? "bg-[#34C759]" : "bg-[#39393D]"
      }`}
    >
      <div
        className={`w-[31px] h-[21px] bg-white rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.15)] transform transition-transform duration-300 ease-in-out ${
          enabled ? "translate-x-[16px]" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default Toggle;
