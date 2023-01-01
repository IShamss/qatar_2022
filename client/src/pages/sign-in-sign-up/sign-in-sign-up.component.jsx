import React from 'react';
import './sign-in-sign-up.styles.scss';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const SignInAndSignUpPage = ({rerender}) => (
	<div className='sign-in-and-sign-up'>
		<SignIn rerender={rerender} />
		<SignUp />
	</div>
);

export default SignInAndSignUpPage;