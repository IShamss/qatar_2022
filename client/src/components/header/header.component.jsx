import React,{useState} from 'react';
import {
	HeaderContainer,
	LogoContainer,
	OptionsContainer,
	OptionLink
} from './header.styles';

// import { ReactComponent as Logo } from '../../assets/result.svg';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { saveUser,loadUser } from '../../assets/utils';
import { useNavigate } from 'react-router-dom';



const Header = ({rerender}) => {
    const currentUser = loadUser();
		const navigate = useNavigate();

    const SignOut=()=>{
		// setCurrentUser(null);
		saveUser(null);
		rerender();
		navigate('/');

	}
	
    return(
	<HeaderContainer>
		<LogoContainer to='/'>
			<SportsSoccerIcon fontSize='large' />
		</LogoContainer>
		<OptionsContainer>
			{currentUser?(currentUser.role === 3 ?<OptionLink to='/users'>USERS</OptionLink> : null):null}
			{currentUser ? (currentUser.role === 2 || currentUser.role===3 ?<OptionLink to='/addmatch' >ADD MATCH</OptionLink> : null):null}
			{currentUser ? <OptionLink to='/reservations' >MY MATCHES</OptionLink> :null}
			{currentUser ? <OptionLink to='/edit-profile' >
					{currentUser.user_name}
				</OptionLink>:null}
			{currentUser ? (
				//here I didn't use a link because the 'to' attibute is required
				
				<OptionLink onClick={SignOut} as='div' >
					SIGN OUT
				</OptionLink>
			) : (
				<OptionLink to='/signin'>SIGN IN</OptionLink>
			)}
			{/* <CartIcon /> */}
            <ShoppingCartIcon fontSize='small' />
		</OptionsContainer>
		
	</HeaderContainer>

)};

export default (Header);