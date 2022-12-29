import React from 'react';
import {
	HeaderContainer,
	LogoContainer,
	OptionsContainer,
	OptionLink
} from './header.styles';

// import { ReactComponent as Logo } from '../../assets/result.svg';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Header = () => {
    const currentUser = null;
    
    
    return(
	<HeaderContainer>
		<LogoContainer to='/'>
			<SportsSoccerIcon fontSize='large' />
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to='/users'>USERS</OptionLink>
			<OptionLink to='/addmatch' >ADD MATCH</OptionLink>
			{currentUser ? (
				//here I didn't use a link because the 'to' attibute is required
				<OptionLink as='div' >
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