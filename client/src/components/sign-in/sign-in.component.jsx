import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import instance from '../axios';
import Swal from 'sweetalert2'
const SignIn = ({setCurrentUser}) => {
	const [userCredentials, setCredentials] = useState({
		email: '',
		password: ''
	});
	const navigate = useNavigate();

	const { email, password } = userCredentials;
	const handleSubmit = async (event) => {
		event.preventDefault();

		instance.post("/auth/signin",
		{
			"email_or_username": email,
		"password": password,}
		).then((response) => {
			Swal.fire({
				title: 'Success!',
				text: "have loggeed in successfully :D",
				icon: 'success',
				confirmButtonText: 'Ok'
			  });
			//   console.log(response.data.user)
			setCurrentUser(response.data.user)
			navigate('/');

		  }).catch((err)=>{
			Swal.fire({
				title: 'Error!',
				text: err.response.data.message,
				icon: 'error',
				confirmButtonText: 'Ok'
			  })  });

	};

	const handleChange = (event) => {
		const { value, name } = event.target;
		setCredentials({
			...userCredentials,
			[name]: value
		});
		//we spread the credentials in order to then change the value of the email and password
	};

	return (
		<div className='sign-in'>
			<h2>I Already Have An Account</h2>
			<span>Sign-in With Your Email And Password</span>

			<form onSubmit={handleSubmit}>
				<FormInput
					handleChange={handleChange}
					type='text'
					name='email'
					value={email}
					label='Name/Email'
					required
				/>
				<FormInput
					handleChange={handleChange}
					type='password'
					name='password'
					value={password}
					label='Password'
					required
				/>
				<div className='buttons'>
					<CustomButton onChange={handleSubmit} type='submit'>
						Sign In
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
