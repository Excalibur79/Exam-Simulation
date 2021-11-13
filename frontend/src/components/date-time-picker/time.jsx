

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import { TextField, Typography } from '@mui/material';
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


const styles = (theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 192,
    },

    cssLabel: {
        color: 'red',
    },

    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: '#1AB273 !important',
        },
    },

    cssFocused: {},

    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'rgba(0, 0, 0, 0.15) !important',
        color: 'black',
        // backgroundColor:'white'
    },
    resize: {
        fontSize: 12,
        height: 1,
        // color: "rgba(0, 0, 0, 0.15)",
        color: 'black',
    },
    disable: {
        color: '#D9D7D7',
        fontSize: 12,
        height: 1,
    },
});

const DateField = (props) => {
    const { dateTime, setDateTime, changeDateTime, optionIndex, classes, width, height, label, disabled, type = 'datetime-local', required } = props;

    const [value, setValue] = React.useState(new Date(''));  // 2014-08-18T21:11:54
    const handleChange1 = (e) => {
        // let dateTime = e.target.value.concat(':00.000');
        // if (setDateTime) setDateTime(e.target.value);
        // if (changeDateTime) changeDateTime(optionIndex, e.target.value);
    };

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Typography align='left' variant='h6' style={{ fontSize: '1.2rem', color: disabled ? '#D9D7D7' : null }}>
                {label}
                {required ? <span style={{ color: 'red' }}>*</span> : null}
            </Typography >

            <form className={classes.container} noValidate autoComplete='off'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        label="Time"
                        value={value}
                        onChange={handleChange}
                        // renderInput={(params) => <TextField {...params} />}    //   <------  put the textField here 
                        renderInput={(params) => <TextField
                            {...params}
                            id='datetime-local'
                            type={type}
                            className={classes.textField}
                            value={dateTime}
                            onChange={(e) => handleChange1(e)}
                            variant='outlined'
                            InputLabelProps={{
                                shrink: true,
                                classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                },
                            }}
                            // InputProps={{
                            //     classes: {
                            //         root: classes.cssOutlinedInput,
                            //         focused: classes.cssFocused,
                            //         notchedOutline: classes.notchedOutline,
                            //         input: disabled ? classes.disable : classes.resize,
                            //     },
                            // }}
                            style={{ width }}
                            disabled={disabled}
                        />}
                    />
                </LocalizationProvider>
            </form>
        </div>
    );
};

export default withStyles(styles)(DateField);
