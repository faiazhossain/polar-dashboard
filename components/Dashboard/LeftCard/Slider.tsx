import React from "react";

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  label,
  value,
  onChange,
  disabled = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`w-full h-1 rounded-full ${
          disabled ? "cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};

export default Slider;
