import React, { useState } from "react";

const ColorPicker = ({ onChange }) => {
  const [selectedColor, setSelectedColor] = useState("#000000"); // Initial color is black

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setSelectedColor(newColor);
    onChange(newColor); // Call the onChange callback with the selected color
  };

  return (
    <input
      type="color"
      value={selectedColor}
      onChange={handleColorChange}
      style={{ width: "100%" }}
    />
  );
};

export default ColorPicker;
