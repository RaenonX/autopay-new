import React from 'react';


type Props = {
  label: string,
  value: string | undefined,
  className?: string,
};

export const FormLikeOutput = ({label, value, className}: Props) => {
  return (
    <div className="form-floating">
      <span className={`form-control readonly ${className || ''}`}>
        {value}
      </span>
      <label>{label}</label>
    </div>
  );
};
