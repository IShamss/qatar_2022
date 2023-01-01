import "./App.css";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import AllMatches from "./pages/all-matches/all-matches.component";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./global.styles";
import AllUsers from "./pages/all-users/all-users.component";
import AddMatch from "./pages/add-match/add-match.component";
import MatchDetailsPage from "./pages/match-details/match-details.component";
import EditMatch from "./pages/edit-match/edit-match.component";
import { useState } from "react";
import EditProfilePage from "./pages/edit-profile/edit-profile.component";
import MyReservationsPage from "./pages/my-reservations/my-reservations.component";

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <Router>
            <GlobalStyle />
            <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
            <Routes>
                <Route exact path='/' element={<AllMatches />} />
                <Route
                    exact
                    path='/signin'
                    element={
                        <SignInAndSignUpPage setCurrentUser={setCurrentUser} />
                    }
                />
                <Route
                    exact
                    path='/reservations'
                    element={<MyReservationsPage />}
                />
                <Route exact path='/users' element={<AllUsers />} />
                <Route exact path='/addmatch' element={<AddMatch />} />
                <Route
                    path='/match/:matchId'
                    currentUser={currentUser}
                    element={<MatchDetailsPage />}
                />
                <Route path='/match/:matchId/edit' element={<EditMatch />} />
                <Route
                    path='/edit-profile'
                    exact
                    element={
                        <EditProfilePage
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                        />
                    }
                />

                {/* <SignInAndSignUpPage /> */}
            </Routes>
        </Router>
    );
}

export default App;
