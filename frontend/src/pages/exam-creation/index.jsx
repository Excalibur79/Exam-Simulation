import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Grid, Typography, Paper, Input, Box, Button, TextField } from '@mui/material';
import RichEditor from 'components/text-editor';
import TextInputField from 'components/text-input-field';
import DatePicker from 'components/date-time-picker/date';
import TimePicker from 'components/date-time-picker/time';
import DropdownField from 'components/dropdown-field';
import palette from 'utilities/palette';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '1.6rem',
    padding: '2rem',
  },
  heading: {
    fontSize: '3.2rem',
    textAlign: 'center',
    marginBottom: '4rem',
  },
}));

var count = 0;

const ExamCreation = () => {
  const classes = useStyles();
  const history = useHistory();

  const [selected, setSelected] = useState('');
  const [addNew, setAddNew] = useState(false);
  const [optionArr, setOptionArr] = useState([]); //  [{} , {}]

  const [val, setVal] = useState(null);

  console.log('Dropdown  ', selected);

  const AddNewOption = () => {
    console.log('added');
    setOptionArr([...optionArr, { id: count++, data: val }]);
    setAddNew(!addNew);
    setVal('');
  };

  useEffect(() => {
    console.log('MODIFIED ARRAY = ', optionArr);
  }, [optionArr]);

  const abc = () => {};

  const ButtonText = [
    {
      title: 'Upload CSV',
      onClickTrigger: abc(),
    },
    {
      title: 'Preview',
      onClickTrigger: abc(),
    },
    {
      title: 'Save',
      onClickTrigger: abc(),
    },
    {
      title: 'Discard',
      onClickTrigger: abc(),
    },
  ];

  const Options = [
    'MCQ - 1 correct option',
    'MCQ - More than 1 correct option',
    '1 word answer',
    'Numerical',
    'Fill in the blanks',
    'Match the following',
  ];

  return (
    <div className={classes.root}>
      <Typography className={classes.heading}>Examination Edit/Creation</Typography>

      <Box
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        {ButtonText.map((item, key) => {
          return (
            <>
              <Box sx={{ marginRight: '2.3rem' }}>
                <Button variant='contained'>{item.title}</Button>
              </Box>
            </>
          );
        })}
      </Box>

      {/* Section 1  */}
      <Grid container spacing={2} direction='row' style={{ marginTop: '1rem' }}>
        <Grid item>
          <TextInputField label='Exam Name' placeholder='JEE Mains' name='Exam Name' required />
        </Grid>
        <Grid item>
          <TextInputField label='Exam Time(mins)' placeholder='180' name='Full Marks' required />
        </Grid>
        <Grid item>
          <TextInputField label='Full Marks' placeholder='100' name='Full Marks' required />
        </Grid>
        <Grid item>
          <DatePicker label='Examination Date' required />
        </Grid>
        <Grid item>
          <TimePicker label='Examination Time' required />
        </Grid>
      </Grid>

      {/* Section 2  */}
      <Grid container direction='row' style={{ marginTop: '1rem' }}>
        <Grid item xs={12} lg={4} md={6}>
          <div style={{ paddingBottom: '1.5rem' }}>
            <DropdownField
              label='Question Type'
              placeholder='question type'
              name='Question Type'
              required
              options={Options}
              value={selected}
              handler={(e) => setSelected(e.target.value)}
            />
          </div>

          {/* Editor  */}
          <RichEditor />

          {(selected === 'MCQ - 1 correct option' || selected === 'MCQ - More than 1 correct option') && (
            <div style={{ paddingLeft: '1.6rem', marginLeft: '1.5rem', marginBottom: '6rem' }}>
              <Typography variant='subtitle2' style={{ paddingTop: '2rem' }}>
                {' '}
                Options :{' '}
              </Typography>

              <Typography variant='h6' style={{ paddingTop: '2rem', fontWeight: '600' }} onClick={() => setAddNew(!addNew)}>
                <AddCircleIcon style={{ paddingTop: '4px', marginTop: '4px' }} /> Add Option
              </Typography>

              {!addNew && (
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}
                >
                  <Box sx={{ marginRight: '2rem', paddingBottom: '1.6rem' }}>
                    <TextField
                      id='standard-basic'
                      placeholder='type...'
                      label='New Option'
                      variant='standard'
                      name='newOption'
                      value={val}
                      onChange={(e) => setVal(e.target.value)}
                    />
                  </Box>

                  <Box>
                    <Button style={{ backgroundColor: palette.primary1, color: palette.white }} onClick={() => AddNewOption()}>
                      {' '}
                      + ADD{' '}
                    </Button>
                  </Box>
                </Box>
              )}

              {optionArr &&
                optionArr.length != 0 &&
                optionArr.map((item, index) => {
                  return (
                    <>
                      <div>
                        {index + 1}) {item.data}
                      </div>
                    </>
                  );
                })}
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ExamCreation;
