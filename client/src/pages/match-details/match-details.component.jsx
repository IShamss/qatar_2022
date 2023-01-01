import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import instance from '../../components/axios';


const MatchDetailsPage = () => {
    const params = useParams();
    // const match = {
    //     matchId: params.matchId,
    //     teams:["team1","team2"],
    //     mainReferee:"Ahmed",
    //     linesmen:["Lineman1","lineman2"],
    //     time:"15:40",
    //     stadium:"stadiumname",
    //     date:"May 9, 2019"
    // }
    const [matchDetails,setMatchDetails]=useState({})

    useEffect(()=>{
        instance.get("/match/"+params.matchId).then(response=>{
            console.log(response.data.match)
            setMatchDetails(response.data.match)
        })
        .catch(err=>console.log(err))
    },[])
    


    return <div className="match-details-container">
        <div className="details-element">
            <h2 className="title">Teams
            </h2>
            <div className="content">{matchDetails.team1} , {matchDetails.team2}</div>
        </div>
        <div className="details-element">
            <h2 className="title">Stadium
            </h2>
            <div className="content">{matchDetails.stadium}</div>
        </div>
        <div className="details-element">
            <h2 className="title">Date
            </h2>
            <div className="content">{matchDetails.date}</div>
        </div>
        <div className="details-element">
            <h2 className="title">Main Referee
            </h2>
            <div className="content">{matchDetails.main_referee}</div>
        </div>
        <div className="details-element">
            <h2 className="title">Linesmen
            </h2>
            <div className="content">{matchDetails.line_man_1} , {matchDetails.line_man_2}</div>
        </div>
        
    </div>;
}

export default MatchDetailsPage;