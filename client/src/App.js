import "./App.css";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import AllMatches from "./pages/all-matches/all-matches.component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./global.styles";

function App() {
    return (
        <Router>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route exact path='/' element={<AllMatches />} />
                <Route exact path='/signin' element={<SignInAndSignUpPage />} />
                {/* <SignInAndSignUpPage /> */}
            </Routes>
        </Router>
    );
}

export default App;
