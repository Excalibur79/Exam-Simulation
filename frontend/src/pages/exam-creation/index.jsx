import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import RichEditor from '../../components/text-editor';
import TextInputField from '../../components/text-input-field';
import DatePicker from '../../components/date-time-picker/date';
import TimePicker from '../../components/date-time-picker/time';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1.6rem',
    fontSize: '1.6rem',
  },
  heading: {
    fontSize: '3.2rem',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4rem',
  },
}));

const ExamCreation = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Typography className={classes.heading}>Examination Edit/Creation</Typography>

      {/* Section 1  */}
      <Grid container spacing={2} direction='row' justifyContent='space-between' alignItems='flex-start'>
        <Grid item>
          {/*  type, handler, value,row, rowMax, multiline */}
          <TextInputField label='Full Marks' placeholder='full marks' name='Full Marks' required fullWidth />
        </Grid>

        <Grid item>
          {/*  type, handler, value,row, rowMax, multiline */}
          <TextInputField label='Exam Name' placeholder='exam name' name='Exam Name' required fullWidth />
        </Grid>

        <Grid item>
          {/*  type, handler, value,row, rowMax, multiline */}
          <TextInputField label='Full Marks' placeholder='full marks' name='Full Marks' required fullWidth />
        </Grid>

        <Grid item>
          <DatePicker
            // dateTime={date2}
            label='Examination Date'
            required
            // setDateTime={setDate2}
          />
        </Grid>

        <Grid item>
          <TimePicker
            // dateTime={date2}
            label='Examination Date'
            required
            // setDateTime={setDate2}
          />
        </Grid>
      </Grid>

      {/* Section 2  */}
      <Grid container spacing={2} direction='row' justifyContent='space-between' alignItems='flex-start'>
        sdf
      </Grid>
    </div>
  );
};

export default ExamCreation;
