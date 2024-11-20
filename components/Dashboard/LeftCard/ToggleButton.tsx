import React from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Space, Switch } from 'antd';

type ToggleButtonProps = {
  onToggleChange: (checked: boolean) => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggleChange }) => (
  //   <Space direction="vertical">
  <Switch
    checkedChildren="Data Extract Mode On"
    unCheckedChildren="Data Extract Mode Off"
    onChange={onToggleChange} // Notify parent when the switch changes
  />
  //   </Space>
);

export default ToggleButton;
