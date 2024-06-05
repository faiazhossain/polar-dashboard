// Slider.tsx
import React from "react";

interface SliderProps {
  label: string;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ label, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    onChange(newValue);
  };

  return (
    <div className="mb-4">
      <label className="text-sm text-[#808080] mb-1 block">{label}:</label>
      <input
        type="range"
        min={0}
        max={100}
        onChange={handleChange}
        className="w-full"
      />
    </div>
  );
};

export default Slider;
