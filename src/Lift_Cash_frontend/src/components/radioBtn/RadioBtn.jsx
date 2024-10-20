import { useState } from "react";
import "./RadioBtn.css";

const RadioBtn = ({ item, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(""); // State to store the selected option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Update state when the radio button is selected
    onSelect(event.target.value); // Pass the selected value back to the parent
  };

  return (
    <div>
      {item?.options.map((data, index) => (
        <div className="radio-option" key={index}>
          <label className="block">
            <input
              type="radio"
              name={`question-${item.id}`}
              value={data.value}
              checked={selectedOption === data.value} // Correct comparison here
              onChange={handleOptionChange}
              className="radio-btn"
            />
            {data.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioBtn;
