import React from 'react';

interface InputProps {
  label: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, type, onChange }) => {
  return (
    <div className="input-container">
      <label>{label}</label>
      <input type={type} onChange={onChange} />
    </div>
  );
};

export default Input;