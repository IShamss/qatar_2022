import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../components/axios";
import "./match-details.styles.scss";
import CustomButton from "../../components/custom-button/custom-button.component";
import { loadUser } from "../../assets/utils";
import Modal3 from "../../components/Modal3";

const MatchDetailsPage = () => {
    const currentUser = loadUser();
    const params = useParams();
    const [matchDetails, setMatchDetails] = useState({});
    const [matchDetails_mena, setMatchDetails_mena] = useState({});
    const [stadiumDetails, setStadiumDetails] = useState({});
    const [w, setW] = useState(0);
    const [h, setH] = useState(0);
    const [vacant, setVacant] = useState([]);
    const [up, setUp] = useState(0);
    useEffect(() => {
        instance
            .get("/match/" + params.matchId)
            .then((response) => {
                //     console.log(response.data.match);
                setMatchDetails_mena(response.data.match);
                setUp((prev) => {
                    return prev + 1;
                });
            })
            .catch((err) => console.log(err));
        instance
            .get("/reserved/" + params.matchId)
            .then((response) => {
                setVacant(response.data.vacant);
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        if (matchDetails_mena.stadium)
            instance
                .get("/stadium/" + matchDetails_mena.stadium)
                .then((response) => {
                    setStadiumDetails(response.data.stadium);
                    setW(response.data.stadium.width);
                    setH(response.data.stadium.length);
                })
                .catch((err) => console.log(err));
    }, [up]);
    // useEffect(() => {
    //     if (matchDetails_mena.stadium)
    // }, [up]);

    //sunny
    useEffect(() => {
        instance
            .get("/match/info/" + params.matchId)
            .then((response) => {
                // console.log(response.data.match)
                setMatchDetails(response.data.match);
                console.log(currentUser);
            })
            .catch((err) => console.log(err));
    }, []);
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="match-details-content-container">
            {showModal && (
                <Modal3
                    width={w}
                    height={h}
                    valid={vacant}
                    onHide={() => {
                        setShowModal(false);
                        // instance
                        //     .get("/stadiums/")
                        //     .then((response) => {
                        //         setStadiums(response.data.stadiums);
                        //     })
                        //     .catch((err) => {
                        //         Swal.fire({
                        //             title: "Error!",
                        //             text: err.response.data.message,
                        //             icon: "error",
                        //             confirmButtonText: "Ok",
                        //         });
                        //     });
                    }}
                    data={{
                        header: "reserving a ticket",
                    }}
                ></Modal3>
            )}
            <div className="match-details-container-2">
                <div className="details-element1">
                    {/* <div className="content">{matchDetails.team1_name} </div> */}
                    <h2 className="title">{matchDetails.team1_name}</h2>
                </div>
                <div className="details-element2">
                    <h2 className="title">VS.</h2>
                </div>
                <div className="details-element3">
                    {/* <div className="content">{matchDetails.team2_name}</div> */}
                    <h2 className="title">{matchDetails.team2_name}</h2>
                </div>
                <div className="details-element4">
                    <h2 className="title">Stadium</h2>
                    <div className="content">{matchDetails.stadium_name}</div>
                </div>
                <div className="details-element5">
                    <h2 className="title">Date</h2>
                    <div className="content">{matchDetails.date}</div>
                </div>
                <div className="details-element6">
                    <h2 className="title">Main Referee</h2>
                    <div className="content">{matchDetails.main_referee}</div>
                </div>
                <div className="details-element8">
                    <h2 className="title">Lineman 1</h2>
                    <div className="content">{matchDetails.line_man_1} </div>
                </div>
                <div className="details-element7">
                    <h2 className="title">Lineman 2</h2>
                    <div className="content">{matchDetails.line_man_2}</div>
                </div>
            </div>
            <div className="actions-flex">
                <CustomButton
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    Buy Ticket
                </CustomButton>
                {currentUser ? (
                    currentUser.role === 2 || currentUser.role === 3 ? (
                        <CustomButton>UPDATE MATCH</CustomButton>
                    ) : null
                ) : null}
            </div>
        </div>
    );
};

export default MatchDetailsPage;
