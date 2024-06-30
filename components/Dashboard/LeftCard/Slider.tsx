import React from 'react';
import { Slider } from 'antd';

interface CustomSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  label,
  value,
  onChange,
  disabled = false,
}) => {
  const handleChange = (value: number) => {
    onChange(value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-2 text-center">
        {label}
      </label>
      <Slider
        min={0}
        max={100}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomSlider;
