import React from 'react';
import { TextField, Typography } from '@mui/material';

const Dropdown = ({
  label,
  disabled,
  value,
  handler,
  required,
  options,
  name,
  fullWidth,
  labelStyle = {},
  labelClassName,
  style = {},
}) => {
  return (
    <>
      <Typography
        align='left'
        variant='p'
        style={{ color: disabled ? '#D9D7D7' : null, ...labelStyle }}
        className={labelClassName}
      >
        {label}
        {required ? <span style={{ color: 'red' }}>*</span> : null}
      </Typography>

      <div>
        <TextField
          fullWidth={fullWidth}
          select
          size='small'
          variant='outlined'
          name={name}
          value={value}
          onChange={handler}
          SelectProps={{ native: true }}
          style={{ marginTop: '0.5rem', ...style }}
        >
          <option value='' disabled>
            Select
          </option>
          {options &&
            options.map((item, idx) => (
              <option key={idx} value={item.value}>
                {item.label ? item.label : item}
              </option>
            ))}
        </TextField>
      </div>
    </>
  );
};

export default Dropdown;
