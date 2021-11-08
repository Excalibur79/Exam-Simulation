import React from 'react'
import './App.css';
import {TextField, Button, Divider} from '@material-ui/core';
import {Link} from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlankIcon';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const  Signup=()=> {
    return (
        <div>
            <div classname="icon">
                <div classname="icon_class">
                    <PersonAddIcon fontsize="large"/>
                </div>
                <div classname="text">Sign Up</div>
            </div>  

            <div classname="row m-2">
                <div classname="col-6 p-2">
                    <TextField id="firstname" type="text" variant="outlined" label="Enter Your First Name" fullwidth/>
                </div>
                <div classname="col-6 p-2">
                    <TextField id="lastname" type="text" variant="outlined" label="Enter Your Last Name" fullwidth/>
                </div>
            </div> 

            <div classname="row m-2">
            <TextField id="email" classname="p-2" type="text" variant="outlined" label="Enter Your Email" fullwidth/>
            <TextField id="password" classname="p-2"type="text" variant="outlined" label="Enter Your Password" fullwidth/>
            <TextField id="password" classname="p-2"type="text" variant="outlined" label="Confirm Your Password" fullwidth/>
            <FormControlLabel
                    control={
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontsize="small" />}
                            checkedIcon={<CheckBoxIcon fontsize="small" />}
                            name="checked1"
                        />
                    }
                    label="I agree to all terms and conditions"
                />
            <Button variant="contained" color="primary">Create Account</Button>
            </div> 
            <Divider variant="middle"/>
            <p classname="text-center">
                <Link to="/Login" classname="text-black-50">
                    <h5>Already have an Account?</h5>
                </Link>
            </p>
        </div>
    )
}

export default Signup