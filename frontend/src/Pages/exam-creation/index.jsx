import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { TextField, Grid, Paper, Box, styled } from '@mui/material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import './exam-creation.css';
import RichEditor from '../../Components/text-editor';
import TextInputField from '../../Components/text-input-field';
import DatePicker from '../../Components/date-time-picker/date.jsx';
import TimePicker from '../../Components/date-time-picker/time.jsx';



const useStyles = makeStyles(theme => ({
  root: {
    padding: '1.6rem',
    margin: '1rem',
    fontSize: '1.6rem',
  },
  heading: {
    fontSize: '3.2rem',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4rem',
  },
  editor: {
    marginTop: '2rem',
    paddingTop: '2rem',
  },
  addQuestionBar: {
    paddingTop: '2rem',
    height: '2rem',
  },
  button: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2.4rem',
    padding: '1.6rem',
    fontSize: '1.2rem',
    borderRadius: '.4rem',
    color: '#fff',
    // backgroundColor: '#1AB273',
    // '&:hover': {
    //   backgroundColor: '#1AB273',
    // },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const ExamCreation = () => {

  const classes = useStyles();
  const history = useHistory();



  return (
    <div className={classes.root}>
      <div className={classes.heading}> Examination Edit/Creation </div>

      {/* Section 1  */}
      <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="flex-start">
        <Grid item>
          {/*  type, handler, value,row, rowMax, multiline */}
          <TextInputField
            label="Full Marks"
            placeholder="full marks"
            disabled={false}
            required={true}
            name="Full Marks"
            fullWidth={true}
          />
        </Grid>

        <Grid item>
          {/*  type, handler, value,row, rowMax, multiline */}
          <TextInputField
            label="Exam Name"
            placeholder="exam name"
            disabled={false}
            required={true}
            name="Exam Name"
            fullWidth={true}
          />
        </Grid>

        <Grid item>
          {/*  type, handler, value,row, rowMax, multiline */}
          <TextInputField
            label="Full Marks"
            placeholder="full marks"
            disabled={false}
            required={true}
            name="Full Marks"
            fullWidth={true}
          />
        </Grid>

        <Grid item  >
          <DatePicker
            // dateTime={date2}
            label="Examination Date"
            required={true}
          // setDateTime={setDate2}
          />
        </Grid>

        <Grid item>
          <TimePicker
            // dateTime={date2}
            label="Examination Date"
            required={true}
          // setDateTime={setDate2}
          />
        </Grid>
      </Grid>


      {/* Section 2  */}
      <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="flex-start">
        sdf
      </Grid>

    </div>
  )
}

export default ExamCreation;
