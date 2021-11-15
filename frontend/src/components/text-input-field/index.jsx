
import React from 'react';
import { TextField, Typography } from '@mui/material';

const TextInputField = ({
  label,
  placeholder,
  disabled = false,
  required,
  name,
  type,
  onChange,
  value,
  fullWidth,
  row = '',
  rowMax = '',
  multiline,
  style = {},
  labelStyle = {},
  labelClassName,
  className,
}) => {
  return (
    <>
      <Typography
        align='left'
        variant='h6'
        style={{ fontSize: '1.2rem', color: disabled ? '#D9D7D7' : null, ...labelStyle }}
        className={labelClassName}
      >
        {label}
        {required ? <span style={{ color: 'red' }}>*</span> : null}
      </Typography>

      <TextField
        fullWidth={fullWidth}
        type={type}
        name={name}
        disabled={disabled}
        required={required}
        size='small'
        variant='outlined'
        placeholder={placeholder}
        onChange={onChange}
        rows={row}
        rowsMax={rowMax}
        multiline={multiline}
        inputProps={{ style: { fontSize: '12px' } }}
        value={value}
        style={{ marginTop: '0.5rem', ...style }}
        className={className}
      />
    </>
  );
};

export default TextInputField;
