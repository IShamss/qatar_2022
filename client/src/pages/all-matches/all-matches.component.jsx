import React, { useEffect } from 'react';
import instance from '../../components/axios';
import MatchCard from '../../components/match-card/match-card.component';
import './all-matches.styles.scss';
const AllMatches = () => {
    const [matches,setMatches]=React.useState([])
    const [teams,setTeams]=React.useState([])
    const [teams_M,setTeams_M]=React.useState([])
    const [stadiums,setStadiums]=React.useState([])
    const [stadiums_M,setStadiums_M]=React.useState([])
    useEffect(()=>{
    instance.get("/matches/"
		).then((response) => {
			setMatches(response.data.matches)		
		
		  }).catch((err)=>{
		console.log(err)	
        });
        instance.get("/teams/"
		).then((response) => {
			setTeams(response.data.teams)		
            let obj = {};
            for (let i = 0; i < response.data.teams.length; i++) {
              obj[response.data.teams[i]._id] = response.data.teams[i].name;
            }
            setTeams_M(obj);
		  }).catch((err)=>{
		console.log(err)	
        });
        instance.get("/stadiums/"
		).then((response) => {
			setStadiums(response.data.stadiums)		
            let obj = {};
            for (let i = 0; i < response.data.teams.length; i++) {
              obj[response.data.stadiums[i]._id] = response.data.stadiums[i].name;
            }
            setStadiums_M(obj);
		  }).catch((err)=>{
		console.log(err)	
        });
            }
  ,[])
    return (
        <div className='all-matches-container'>
            {matches.map((m)=>
            <MatchCard key={m._id}
            teams={[teams_M[m.team1],teams_M[m.team2]]}
             mainReferee={m.main_referee}
            linesmen={[m.line_man_1,m.line_man_2]}
            stadium={stadiums_M[m.stadium]} date={m.date} />)}
        </div>
    )
}

export default AllMatches;