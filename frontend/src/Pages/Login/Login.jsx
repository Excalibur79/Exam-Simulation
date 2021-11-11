import React from 'react';
import './login.css';
import { TextField, Button, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlankIcon';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PersonIcon from '@material-ui/icons/Person';

const Login = () => {
  return (
    <div>
      <div classname='icon'>
        <div classname='icon_class'>
          <PersonIcon fontsize='large' />
        </div>
        <div classname='text'>Log In</div>
      </div>

      <div classname='row m-2'>
        <TextField id='email' classname='p-2' type='text' variant='outlined' label='Enter Your Email' fullwidth />
        <TextField id='password' classname='p-2' type='text' variant='outlined' label='Enter Your Password' fullwidth />
        <FormControlLabel
          control={
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontsize='small' />}
              checkedIcon={<CheckBoxIcon fontsize='small' />}
              name='checked1'
            />
          }
          label='Remember me'
        />
        <Button variant='contained' color='primary'>
          Log In
        </Button>
      </div>
      <Divider variant='middle' />
      <p classname='text-center'>
        <Link to='Signup' classname='text-black-50'>
          <h5>Create Account</h5>
        </Link>
      </p>
    </div>
  );
};

export default Login;
