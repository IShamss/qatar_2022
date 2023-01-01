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
import EditProfilePage from "./pages/edit-profile/edit-profile.component";
import MyReservationsPage from "./pages/my-reservations/my-reservations.component";
import { useState } from "react";

function App() {
    const [value, setValue] = useState(0);
    // window.addEventListener("storage", (e) => {
    //     console.log("storage event", e);
    //     setValue((value) => value + 1);
    // });
    const rerender = () => {
        setValue((value) => {
            return value + 1;
        });
    };
    return (
        <Router>
            <GlobalStyle />

            <Header rerender={rerender} />
            <Routes>
                <Route exact path='/' element={<AllMatches />} />
                <Route
                    exact
                    path='/signin'
                    rerender={rerender}
                    element={<SignInAndSignUpPage />}
                />
                <Route
                    exact
                    path='/reservations'
                    element={<MyReservationsPage />}
                />
                <Route exact path='/users' element={<AllUsers />} />
                <Route exact path='/addmatch' element={<AddMatch />} />
                <Route path='/match/:matchId' element={<MatchDetailsPage />} />
                <Route path='/match/:matchId/edit' element={<EditMatch />} />
                <Route
                    path='/edit-profile'
                    exact
                    element={<EditProfilePage />}
                />

                {/* <SignInAndSignUpPage /> */}
            </Routes>
        </Router>
    );
}

export default App;
