import "./App.css";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import AllMatches from "./pages/all-matches/all-matches.component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./global.styles";
import AllUsers from "./pages/all-users/all-users.component";
import AddMatch from "./pages/add-match/add-match.component";
import MatchDetailsPage from "./pages/match-details/match-details.component";

function App() {
    return (
        <Router>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route exact path='/' element={<AllMatches />} />
                <Route exact path='/signin' element={<SignInAndSignUpPage />} />
                <Route exact path='/users' element={<AllUsers />} />
                <Route exact path='/addmatch' element={<AddMatch />} />
                <Route path='/match/:matchId' element={<MatchDetailsPage />} />
                {/* <SignInAndSignUpPage /> */}
            </Routes>
        </Router>
    );
}

export default App;
