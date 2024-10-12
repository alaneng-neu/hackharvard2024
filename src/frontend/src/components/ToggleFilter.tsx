import React, { useState } from "react";

interface ToggleFilterProps {
  label: string;
}

const ToggleFilter: React.FC<ToggleFilterProps> = ({ label }) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        className={`flex items-center justify-center p-2 rounded-lg transition duration-150 ease-in-out
          ${
            isOn
              ? "bg-black text-white border border-black"
              : "bg-white text-black border border-gray-300"
          }
          `}
        onClick={handleToggle}
      >
        {label}
      </button>
    </div>
  );
};

export default ToggleFilter;
