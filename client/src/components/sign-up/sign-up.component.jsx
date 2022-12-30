import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-up.styles.scss';
import instance from "../axios"
import { SwipeableDrawer, switchClasses } from '@mui/material';
import Swal from 'sweetalert2'
export default  function SignUp () {
	
	const [userCredentials, setCredentials] = useState({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const { displayName, email, password, confirmPassword } = userCredentials;
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
		"first_name": "Ahmed",
		"last_name": "Elgarf",
		"birth_date": "10-04-1999",
		"gender": "M",
		"email_address": "ahmedelgarf94@gmail.com",
		"role": 1}
		).then((response) => {
			Swal.fire({
				title: 'Success!',
				text: "your account has been created successfully, You can Login now :D",
				icon: 'success',
				confirmButtonText: 'Ok'
			  });
			 setCredentials({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: ''
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

	return (
		<div className='sign-up'>
			<h2 className='title'>I Don't Have An Account</h2>
			<span>Sign Up With Your Email And Password</span>
			<form className='sign-up-form' onSubmit={handleSubmit}>
				<FormInput
					type='text'
					name='displayName'
					value={displayName}
					label='Name'
					onChange={handleChange}
					required
				/>
				<FormInput
					type='email'
					name='email'
					value={email}
					label='Email'
					onChange={handleChange}
					required
				/>
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
				<CustomButton inverted type='submit'>SIGN UP</CustomButton>
			</form>
		</div>
	);
};

