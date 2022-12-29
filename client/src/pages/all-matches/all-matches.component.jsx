import React from 'react';
import MatchCard from '../../components/match-card/match-card.component';
import './all-matches.styles.scss';
const AllMatches = () => {
    return (
        <div className='all-matches-container'>
            <MatchCard teams={["team1","team2"]} mainReferee="Ahmed"
            linesmen={["Lineman1","lineman2"]} stadium="stadiumname" date="May 9, 2019"
            time="15:40" />
        </div>
    )
}

export default AllMatches;