
import React from 'react';
import { TextField, Typography } from "@mui/material";


const Dropdown = ({ label, disabled, value, handler, required, options, name, fullWidth, labelStyle = {}, labelClassName, style = {}, }) => {

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
                select
                size='small'
                variant='outlined'
                name={name}
                value={value}
                onChange={handler}
                inputProps={{ style: { fontSize: '13px', alignItems: 'center', alignContent: 'center', justifyContent: 'center' } }}
                SelectProps={{ native: true }}
                style={{ marginTop: '0.5rem', width: '18rem', ...style }}
            >
                <option value='' disabled>
                    Select
                </option>
                {options && options.map((item, idx) => (
                    <option key={idx} value={item.value} style={{ fontSize: '10px', padding: '.1rem auto', margin: '.1rem auto' }}> { }
                        {item.label ? item.label : item}
                    </option>
                ))}
            </TextField>
        </>
    )
}

export default Dropdown;
