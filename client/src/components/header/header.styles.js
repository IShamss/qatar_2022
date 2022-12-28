import styled from "styled-components";
import { Link } from "react-router-dom";

// const OptionContainerStyles = css`
// 	//we will use this multiple times so we made it like this
// 	cursor: pointer;
// 	padding: 10px 15px;
// `;

export const HeaderContainer = styled.div`
    height: 40px;
    padding-top: 20px;
    width: 80%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    @media screen and (max-width: 800px) {
        padding: 10px;
        height: 60px;
        margin-bottom: 20px;
    }
`;
export const LogoContainer = styled(Link)`
    //styling with components
    // height: 100%;
    width: 80px;
    padding: 25px;
    @media screen and (max-width: 800px) {
        padding: 0px;
        width: 50px;
    }
`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 0;
    @media screen and (max-width: 800px) {
        width: 80%;
        font-size: 15px;
        justify-content: center;
    }
`;

export const OptionLink = styled(Link)`
    cursor: pointer;
    padding: 10px 15px;
    @media screen and (max-width: 800px) {
        padding: 9px;
    }
`;
// export const OptionDiv = styled.div`
// 	${OptionContainerStyles}
// `;
