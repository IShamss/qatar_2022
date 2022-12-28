import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-up.styles.scss';
const SignUp = () => {
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
		
        console.log(`sign up with email and password: ${email} and ${password} and ${displayName} and ${confirmPassword}`)
	
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



export default (SignUp);