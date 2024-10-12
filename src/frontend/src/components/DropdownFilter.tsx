import React, { useState } from "react";

interface DropdownFilterProps {
  options: string[];
  label: string;
  width: string;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  options,
  label,
  width,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative">
      <button
        className={`flex items-center justify-between p-2 w-${width} ${
          isOpen
            ? "border-l border-r border-t rounded-t-lg"
            : "border rounded-lg"
        } bg-white text-black border-gray-300 transition duration-150 ease-in-out hover:bg-gray-100`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedOption ? selectedOption : label}
        <span className="ml-2">&#9662;</span> {/* Dropdown arrow */}
      </button>
      {isOpen && (
        <ul className="absolute left-0 w-full bg-white border border-t-0 border-gray-300 rounded-b-lg max-h-60 overflow-y-auto z-10">
          {options.map((option) => (
            <li
              key={option}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownFilter;
