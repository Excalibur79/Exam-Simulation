
import React from 'react';
import { TextField, Typography } from '@mui/material';

const TextInputField = ({ label, placeholder, disabled, required, name, type, handler, value, fullWidth, row, rowMax, multiline }) => {
    return (
        <>
            <Typography align='left' variant='h6' style={{ fontSize: '1.2rem', color: disabled ? '#D9D7D7' : null }}>
                {label}
                {required ? <span style={{ color: 'red' }}>*</span> : null}
            </Typography >

            <TextField
                fullWidth={fullWidth}
                type={type}
                name={name}
                disabled={disabled}
                required={required}
                size='small'
                variant='outlined'
                placeholder={placeholder}
                onChange={handler}
                rows={row ? row : ''}
                rowsMax={rowMax ? rowMax : ''}
                multiline={multiline || false}
                inputProps={{ style: { fontSize: '12px' } }}
                value={value}
                style={{ marginTop: '0.5rem', width: '18rem' }}
            />
        </>
    );
};

export default TextInputField;
