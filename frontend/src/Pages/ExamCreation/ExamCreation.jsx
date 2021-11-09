import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Grid, Paper, Box, styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import {
  DateTimePicker,
  LocalizationProvider,
  DesktopDatePicker,
  TimePicker,
} from '@mui/lab';
// import DateAdapter from '@mui/lab/AdapterMoment';
// import DateAdapter from '@mui/lab/AdapterDateFns';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useHistory, useParams } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
// import SaveIcon from '@mui/icons-material/Save';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import './examCreation.css';
import Editor from 'react-markdown-editor-lite';

const useStyles = makeStyles({
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
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

var count = 0;

const Editor_Markdown = () => {
  const classes = useStyles();
  const history = useHistory();
  const mdParser = new MarkdownIt();

  const [htmlText, setHtmlText] = useState();

  const ImageUploadHandler = async (file, callback) => {
    console.log('file : ', file);
    // const Picture = await uploadImg(file);
    // console.log(Picture);
    // callback(Picture);
  };

  //  EDITOR ON CHANGE  HANDLER (runs for a single change in the editor)
  function EditorChangeHandler({ html, text }) {
    console.log('HTML text = ', html);
    // console.log('Mark Down text = ', text)
    // document.getElementById("blogBody").innerHTML = html;
    setHtmlText(html);
    // document.getElementById('blogBody').querySelector('img').classList.add("imgStyle");
    // var imageTag = document.getElementById('blogBody').querySelectorAll('img');
    // console.log(imageTag);
    // for (var i = 0; i < imageTag.length; ++i) {
    // imageTag[i].classList.add('imgStyle');                          // apply styling to the pic using js when render in the same page
    // }
  }

  return (
    <div className={classes.editor}>
      <MdEditor
        style={{ height: '36rem' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={EditorChangeHandler}
        onImageUpload={ImageUploadHandler}
        placeholder={'Start framing question...'}
      />
    </div>
  );
};

const ExamCreation = () => {
  const classes = useStyles();
  const history = useHistory();

  const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));
  const [add, setAdd] = useState(0);
  const [editors, setEditors] = useState([]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const AddQuestionHandler = () => {
    console.log('a');
    setEditors([...editors, 0]);
  };

  useEffect(() => {
    console.log(editors);
  }, [editors]);

  useEffect(() => {
    if (add) {
      console.log('helloasdfaf');
    }
  }, [add]);

  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        {' '}
        University of Engineering & Management
      </div>

      <p style={{ fontSize: '1.89rem', fontWeight: '800' }}>
        {' '}
        Full Marks : 20{' '}
      </p>
      <div>
        <TextField
          required
          id="standard-required"
          label="Subject"
          variant="standard"
          fullWidth={true}
          inputProps={{ style: { fontSize: '1.6rem' } }}
          style={{ marginTop: '0.5rem', width: '22rem' }}
          // InputProps={{ fontSize: '2rem' }}
          // classes={{ fontSize: '2rem' }}
        />

        {/* <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <Stack spacing={3}>
                        <DesktopDatePicker
                            label="Date desktop"
                            inputFormat="MM/dd/yyyy"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            label="Time"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DateTimePicker
                            label="Date&Time picker"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider> */}
      </div>

      <div
        style={{
          marginBottom: '9rem',
          marginTop: '2rem',
          paddingTop: '1.4rem',
        }}
      >
        <Box lg={{ flexGrow: 1 }}>
          <Grid container spacing={2} className={classes.addQuestionBar}>
            <Grid item xs={12} lg={12} md={12}>
              <Item
                style={{
                  fontSize: '2rem',
                  backgroundColor: '#e63946',
                  color: '#fff',
                  fontWeight: '600',
                }}
                onClick={() => AddQuestionHandler()}
              >
                <AddToPhotosIcon fontSize="large" /> Add Question
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
      {editors.map((x, index) => {
        return <Editor_Markdown key={index} />;
      })}

      <Grid container className={classes.button}>
        <Grid item xs={12} lg={12} md={12}>
          <button className="custom-btn btn-9">
            {' '}
            {/* <SaveIcon fontSize="large" style={{ paddingRight: ".6rem" }} /> */}{' '}
            Save
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExamCreation;
