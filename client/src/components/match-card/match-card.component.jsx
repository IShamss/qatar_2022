import React from 'react';
import './match-card.styles.scss';

const MatchCard = ({ teams,date,time,stadium,linesmen,mainReferee }) => {

    return(
        <section class="container">
            <article>
                <header class="post-meta-and-title">
                <div class="post-meta">
                    <time datetime="2019-05-09 20:00">{date} , {time}</time>
                    <p class="author-name"><span class="author-name-date-padding">|</span>
                    <span>{stadium}</span>
                    </p>
                </div>
                <h2><div class="post-title">{teams[0]} VS. {teams[1]}</div></h2>
                </header>
                
                <p class="post-description">
                    Main Referee : {mainReferee} <br/>
                    Linesmen : {linesmen[0]} , {linesmen[1]}
                </p>

                <footer>
                <span class="btn">LEARN MORE</span>
                </footer>
            </article>

        </section>

    )
}

export default MatchCard;