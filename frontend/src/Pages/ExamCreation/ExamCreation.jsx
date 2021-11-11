import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Grid, Paper, Box, styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import { DateTimePicker, LocalizationProvider, DesktopDatePicker, TimePicker } from '@mui/lab';
// import DateAdapter from '@mui/lab/AdapterMoment';
// import DateAdapter from '@mui/lab/AdapterDateFns';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useHistory, useParams } from 'react-router-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
// import Editor from 'react-markdown-editor-lite';
// import SaveIcon from '@mui/icons-material/Save';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import './examCreation.css';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';

import 'react-quill/dist/quill.snow.css'; // ES6
import ReactQuill, { Quill } from 'react-quill'; // ES6
import { ImageDrop } from 'quill-image-drop-module';
// import { ImageResize } from 'quill-image-resize-module';
// import { ImageHandler, VideoHandler } from 'quill-upload';
// Quill.register('modules/imageHandler', ImageHandler);
// Quill.register('modules/videoHandler', VideoHandler);
Quill.register('modules/imageDrop', ImageDrop);
// Quill.register('modules/ImageResize', ImageResize);

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

  // const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));
  const [add, setAdd] = useState(0);
  const [editors, setEditors] = useState([]);

  const [editorState, SetEditorState] = useState([]);
  const [text, setText] = useState('');
  const [editorHtml, seteditorHtml] = useState('');
  const [value, setValue] = useState('');

  const onEditorStateChange = () => {};

  const handleEditorChange = (value) => {
    setText({ text: value });
    console.log(value);
  };

  const modules = {
    toolbar: [
      [{ font: [] }],
      // [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
      ['link', 'image', 'video'],
      // ['clean'],
    ],
    imageDrop: true,
    // imageResize: {},
  };

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

  console.log(value);

  const toolbar = {
    options: [
      'inline',
      'blockType',
      'fontSize',
      'fontFamily',
      'list',
      'textAlign',
      'colorPicker',
      'link',
      'embedded',
      'emoji',
      'image',
      'remove',
      'history',
    ],
    image: {
      uploadCallback: (file) => {
        return new Promise((resolve, reject) => {
          resolve({ data: { link: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' } });
        });
      },
      previewImage: true,
      inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
      alt: { present: true, mandatory: false },
    },
  };

  return (
    <div className={classes.root}>
      <div className={classes.heading}> University of Engineering & Management</div>

      <p style={{ fontSize: '1.89rem', fontWeight: '800' }}> Full Marks : 20 </p>
      <div>
        <TextField
          required
          id='standard-required'
          label='Subject'
          variant='standard'
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

      <div style={{ marginBottom: '9rem', marginTop: '2rem', paddingTop: '1.4rem' }}>
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
                <AddToPhotosIcon fontSize='large' /> Add Question
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
          <button className='custom-btn btn-9'>Save</button>
        </Grid>
      </Grid>

      {/*  */}
      <Editor
        // editorState={editorState}
        toolbarClassName='toolbarClassName'
        wrapperClassName='wrapperClassName'
        editorClassName='editorClassName'
        // toolbarOnFocus
        onEditorStateChange={onEditorStateChange}
        toolbar={toolbar}
      />

      {/* <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      /> */}

      {/* QUILL  */}
      <ReactQuill
        value={text}
        // onChange={handleEditorChange}
        onChange={(html) => setText(html)}
        theme='snow'
        style={{ height: 300, marginBottom: '2rem' }}
        placeholder={'Write something awesome...'}
        modules={modules}
        // formats={formats}
      />
    </div>
  );
};

export default ExamCreation;
