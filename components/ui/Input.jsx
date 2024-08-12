import React from 'react';

function Input({ type, placeholder, disabled, onChange, isLabel, contentLabel, extraClass, value, accept }) {
  return (
    <div className={extraClass}>
      {isLabel && (
        <label className="form-label fs-5">{contentLabel}</label>
      )}
      <div className="input-group">
        <input id='input' type={type} className="form-control" placeholder={placeholder} disabled={disabled} onChange={onChange} value={value} accept={accept}/>
      </div>
    </div>
  );
}

export default Input;