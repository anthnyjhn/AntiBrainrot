import { useState } from "react";

const Section = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#1C1C1E] rounded-lg px-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-white font-semibold py-3 outline-none"
      >
        <span className="text-[17px]">{title}</span>
        {/* Apple-style Chevron animation */}
        <svg
          className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ease-in-out ${
            open ? "rotate-90" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Smooth Accordion Animation using CSS Grid */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-1 pb-2 space-y-1 divide-y divide-[#38383A] [&>div]:pt-2 [&>div:first-child]:border-t [&>div:first-child]:border-[#38383A]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
