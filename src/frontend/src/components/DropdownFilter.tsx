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

  // Format category names
  const formatCategoryName = (category: string) => {
    return category
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Handler for toggling options
  const handleOptionToggle = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Only display 1 selected option (too long)
  const displayText = () => {
    if (selectedOptions.length === 0) {
      return label;
    }
    if (selectedOptions.length <= 1) {
      return selectedOptions
        .map((option) => formatCategoryName(option))
        .join(", ");
    }
    return `Business Type (${selectedOptions.length} selected)`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center justify-between w-${width} p-2 ${
          isOpen
            ? "border-l border-r border-t rounded-t-lg"
            : "border rounded-lg"
        } bg-white text-black border-gray-300 transition duration-150 ease-in-out hover:bg-gray-100`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {displayText()}
        <span className="ml-2">&#9662;</span> {/* Dropdown arrow */}
      </button>
      {isOpen && (
        <ul
          className={`absolute left-0 w-${width} bg-white border border-t-0 border-gray-300 rounded-b-lg max-h-60 overflow-y-auto z-10`}
          style={{ width: "100%" }} // Ensure dropdown matches the button width
        >
          {options.map((option) => (
            <li
              key={option}
              className="p-2 hover:bg-gray-200 cursor-pointer flex items-center"
              onClick={() => handleOptionToggle(option)}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                readOnly // Prevent checkbox from being directly modified
              />
              <span className="ml-2">{formatCategoryName(option)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownFilter;
