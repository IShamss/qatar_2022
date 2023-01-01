import React, { useState,useEffect } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-up.styles.scss';
import instance from "../axios"
import Swal from 'sweetalert2'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
export default  function SignUp ({currentUser}) {
	

	const [userCredentials, setCredentials] = useState({
		displayName: '',
		password: '',
		confirmPassword: '',
		first_name: '',
		last_name: '',
		birth_date:new Date(),
		email_address: '',
		gender:'m',
		to_be_a_manager:0,
		nationality:'',

	});


	const { displayName, password, confirmPassword,first_name,last_name,birth_date,email_address,gender,nationality,to_be_a_manager } = userCredentials;
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert('Passwords Does Not Match');
			return;
		}
		instance.post("/auth/signup",
		{
			"user_name": displayName,
		"password": password,
		"first_name": first_name,
		"last_name": last_name,
		"birth_date": birth_date,
		"gender": gender,
		"email_address": email_address,
		"role": 1,to_be_a_manager:to_be_a_manager,
		"nationality":""
	}
		).then((response) => {
			Swal.fire({
				title: 'Success!',
				text: "your account has been created successfully, You can Login now :D",
				icon: 'success',
				confirmButtonText: 'Ok'
			  });
			 setCredentials({
				displayName: '',
				password: '',
				confirmPassword: '',
				first_name: '',
				last_name: '',
				birth_date:new Date(),
				email_address: '',
				gender:'m',
				to_be_a_manager:0,
				nationality:'',
		
					});
		
		  }).catch((err)=>{
			Swal.fire({
				title: 'Error!',
				text: err.response.data.message,
				icon: 'error',
				confirmButtonText: 'Ok'
			  })  });
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	};
	
	  const handleChangeDate = (newValue) => {
		setCredentials({ ...userCredentials, birth_date: newValue });

	  };
	  const handleChangeGender=(event ) => {
	setCredentials({ ...userCredentials, gender: event.target.value });

	  };
	  const handleChangeCheck=(event,name ) => {
		
	
		setCredentials({ ...userCredentials, [name]: event.target.value=='on'});
	
		  };

	return (
		<div className='sign-up'>
			<h2 className='title'>I Don't Have An Account</h2>
			<span>Sign Up With Your Email And Password</span>
			<form className='sign-up-form' onSubmit={handleSubmit}>
				{currentUser?null:<FormInput
					type='text'
					name='displayName'
					value={displayName}
					label='User Name'
					onChange={handleChange}
					required
				/>}
				
				<FormInput
					type='password'
					name='password'
					value={password}
					label='Password'
					onChange={handleChange}
					required
				/>
				<FormInput
					type='password'
					name='confirmPassword'
					value={confirmPassword}
					label='Confirm Password'
					onChange={handleChange}
					required
				/>
				<FormInput
					type='text'
					name='first_name'
					value={first_name}
					label='First Name'
					onChange={handleChange}
					required
				/>
				<FormInput
					type='text'
					name='last_name'
					value={last_name}
					label='Last Name'
					onChange={handleChange}
					required
				/><FormInput
				type='text'
				name='nationality'
				value={nationality}
				label='Nationality'
				onChange={handleChange}
				/>
				  <FormControl fullWidth>
					
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Age"
          onChange={handleChangeGender}
		  style={{"marginBottom":"30px"}}
        >
          <MenuItem value={"m"}>Male</MenuItem>
          <MenuItem value={"f"}>Female</MenuItem>
        </Select>
      </FormControl >
				 <LocalizationProvider dateAdapter={AdapterDateFns}>
				   <DesktopDatePicker
          label="Birth Date"
          inputFormat="MM/dd/yyyy"
          value={birth_date}
          onChange={handleChangeDate}
          renderInput={(params) => <TextField {...params} />}
        /></LocalizationProvider>
		{currentUser?null :<FormInput
					type='text'
					name='email_address'
					value={email_address}
					label='Email Address'
					onChange={handleChange}
					required
				/> }
				
				 <FormGroup>
				 <FormControlLabel control={<Checkbox  	onChange={(e)=>{handleChangeCheck(e,"to_be_a_manager")}}/>} label="I want to contribute as a manager" />
      {/* <FormControlLabel control={<Checkbox value={to_be_an_admin} onChange={(e)=>{handleChangeCheck(e,"to_be_an_admin")}}/>} label="I'm an admin site" /> */}
    </FormGroup>
				<CustomButton inverted type='submit'>SIGN UP</CustomButton>
			</form>
		</div>
	);
};

