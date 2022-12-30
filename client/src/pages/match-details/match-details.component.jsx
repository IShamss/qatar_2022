import React from "react";
import { useParams } from "react-router-dom";

const MatchDetailsPage = () => {
    const params = useParams();
    const match = {
        matchId: params.matchId,
        teams:["team1","team2"],
        mainReferee:"Ahmed",
        linesmen:["Lineman1","lineman2"],
        time:"15:40",
        stadium:"stadiumname",
        date:"May 9, 2019"
    }
    return <div className="match-details-container">
        <div className="details-element">
            <h2 className="title">Teams
            </h2>
            <div className="content">{match.teams[0]} , {match.teams[1]}</div>
        </div>
        <div className="details-element">
            <h2 className="title">Stadium
            </h2>
            <div className="content">{match.stadium}</div>
        </div>
        <div className="details-element">
            <h2 className="title">Date
            </h2>
            <div className="content">{match.date}</div>
        </div>
        <div className="details-element">
            <h2 className="title">Time
            </h2>
            <div className="content">{match.time}</div>
        </div>
        <div className="details-element">
            <h2 className="title">Main Referee
            </h2>
            <div className="content">{match.mainReferee}</div>
        </div>
        <div className="details-element">
            <h2 className="title">Linesmen
            </h2>
            <div className="content">{match.linesmen[0]} , {match.linesmen[1]}</div>
        </div>
        
    </div>;
}

export default MatchDetailsPage;