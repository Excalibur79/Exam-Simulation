
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
// import { useHistory, useParams } from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        // border: 0,
        // borderRadius: 3,
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        // color: 'white',
        // height: 48,
        // padding: '0 30px',
    },
});

const ExamCreation = () => {

    const classes = useStyles();
    // const history = useHistory();

    console.log("hello");

    return (
        <div className={classes.root} >
            The error prop toggles the error state. The helperText prop can then be used to provide feedback to the user about the error.The error prop toggles
            the error state. The helperText prop can then be used to provide feedback to the user about the error.The error prop toggles the error state. The
            helperText prop can then be used to provide feedback to the user about the error.The error prop toggles the error state. The helperText prop can
            then be used to provide feedback to the user about the error.
        </div>
    )
}

export default ExamCreation;
