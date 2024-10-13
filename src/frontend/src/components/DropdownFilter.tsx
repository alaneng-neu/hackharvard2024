import React, { useState, useRef, useEffect } from "react";

interface DropdownFilterProps {
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
  width?: string;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
  label,
  width,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false); // Close the dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Display the number of selected options or the label if none are selected
  const displayText =
    selectedOptions.length > 0 ? `${label} (${selectedOptions.length})` : label;

  return (
    <div className="relative" ref={dropdownRef} style={{ width: width }}>
      <button
        className={`flex items-center justify-between p-2 ${
          isOpen
            ? "border-l border-r border-t rounded-t-lg"
            : "border rounded-lg"
        } bg-white text-black border-gray-300 transition duration-150 ease-in-out hover:bg-gray-100`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {displayText}
        <span className="ml-2">&#9662;</span> {/* Dropdown arrow */}
      </button>
      {isOpen && (
        <ul
          className={`absolute left-0 bg-white border border-t-0 border-gray-300 rounded-b-lg max-h-60 overflow-y-auto z-10`}
          style={{ width: "100%" }} // Ensure dropdown matches the button width
        >
          {options.map((option) => (
            <li
              key={option}
              className="p-2 hover:bg-gray-200 cursor-pointer flex items-center"
              onClick={() => handleOptionClick(option)}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionClick(option)} // Handle checkbox change
              />
              <span className="ml-2">{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownFilter;
