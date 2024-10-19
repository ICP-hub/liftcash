import React, { useEffect, useRef, useState } from "react";
import "./DropdownBtn.css";

const DropdownBtn = ({ item, onSelect }) => {
  const [selectedPriorities, setSelectedPriorities] = useState({
    priority1: "",
    priority2: "",
    priority3: "",
  });

  const handleSelect = (e, priorityKey) => {
    setSelectedPriorities({
      ...selectedPriorities,
      [priorityKey]: e.target.value,
    });
  };

  // Track previous selected priorities to avoid unnecessary calls
  const prevSelectedPrioritiesRef = useRef(selectedPriorities);

  // Effect to handle when all priorities are selected
  useEffect(() => {
    const allSelected = Object.values(selectedPriorities).every(Boolean);

    if (
      allSelected &&
      prevSelectedPrioritiesRef.current !== selectedPriorities
    ) {
      onSelect(selectedPriorities);
      prevSelectedPrioritiesRef.current = selectedPriorities;
    }
  }, [selectedPriorities, onSelect]);

  // Filter out already selected priorities from available options
  const availableOptions = (exclude = []) => {
    return item.options.filter((option) => !exclude.includes(option));
  };

  return (
    <div className="dropdown-main-div">
      <ul className="dropdown-ul">
        {item.options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
      <form>
        {/* First Dropdown */}
        <div className="dropdown-option-main">
          <select
            id="priority1"
            value={selectedPriorities.priority1} // Value from state
            onChange={(e) => handleSelect(e, "priority1")}
            className="dropdown-option"
          >
            <option value="">Select Priority 1</option>
            {availableOptions([
              selectedPriorities.priority2,
              selectedPriorities.priority3,
            ]).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Second Dropdown */}
        <div className="mb-4">
          <select
            id="priority2"
            value={selectedPriorities.priority2} // Value from state
            onChange={(e) => handleSelect(e, "priority2")}
            className="dropdown-option"
            disabled={!selectedPriorities.priority1} // Enable after priority1 is selected
          >
            <option value="">Select Priority 2</option>
            {availableOptions([
              selectedPriorities.priority1,
              selectedPriorities.priority3,
            ]).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Third Dropdown */}
        <div className="mb-4">
          <select
            id="priority3"
            value={selectedPriorities.priority3} // Value from state
            onChange={(e) => handleSelect(e, "priority3")}
            className="dropdown-option"
            disabled={!selectedPriorities.priority2} // Enable after priority2 is selected
          >
            <option value="">Select Priority 3</option>
            {availableOptions([
              selectedPriorities.priority1,
              selectedPriorities.priority2,
            ]).map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default DropdownBtn;
