import React, { useState } from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const SignIn = () => {
	const [userCredentials, setCredentials] = useState({
		email: '',
		password: ''
	});
	const { email, password } = userCredentials;
	const handleSubmit = async (event) => {
		event.preventDefault();

		console.log(`sign in with email: ${email} and password: ${password}`);
	
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
					type='email'
					name='email'
					value={email}
					label='Email'
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
