import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import instance from '../../components/axios';
import "./match-details.styles.scss";
import CustomButton from "../../components/custom-button/custom-button.component";


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
        instance.get("/match/info/"+params.matchId).then(response=>{
            console.log(response.data.match)
            setMatchDetails(response.data.match)
        })
        .catch(err=>console.log(err))
    },[])
    


    return (<div className="match-details-content-container">
        <div className="match-details-container">
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
                <h2 className="title">Stadium
                </h2>
                <div className="content">{matchDetails.stadium_name}</div>
            </div>
            <div className="details-element5">
                <h2 className="title">Date
                </h2>
                <div className="content">{matchDetails.date}</div>
            </div>
            <div className="details-element6">
                <h2 className="title">Main Referee
                </h2>
                <div className="content">{matchDetails.main_referee}</div>
            </div>
            <div className="details-element8">
                <h2 className="title">Lineman 1
                </h2>
                <div className="content">{matchDetails.line_man_1} </div>
            </div>
            <div className="details-element7">
                <h2 className="title">Lineman 2
                </h2>
                <div className="content">{matchDetails.line_man_2}</div>
            </div>
            
        </div>
        <CustomButton>Buy Ticket</CustomButton>
    </div>)
}

export default MatchDetailsPage;