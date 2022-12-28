import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Montserrat', sans-serif;
        padding: 20px 60px;
        @media screen and (max-width:800px){
            padding:10px;
        }
    }
    a {
        text-decoration: none;
        color: rgb(0, 0, 0);
    }
    * {
        box-sizing: border-box;
    }
`;
