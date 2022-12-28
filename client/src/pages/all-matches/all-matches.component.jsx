import React from 'react';
import MatchCard from '../../components/match-card/match-card.component';

const AllMatches = () => {


    return (
        <div>
            <MatchCard teams={["team1","team2"]} mainReferee="Ahmed"
            linesmen={["Lineman1","lineman2"]} stadium="stadiumname" date="May 9, 2019"
            time="15:40" />
        </div>
    )
}

export default AllMatches;