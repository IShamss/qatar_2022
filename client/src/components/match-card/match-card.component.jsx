import React from "react";
import { Link } from "react-router-dom";
import "./match-card.styles.scss";

const MatchCard = ({
    matchId,
    teams,
    date,
    time,
    stadium,
    linesmen,
    mainReferee,
}) => {
    return (
        <section className="match-card-container">
            <article>
                <header className="post-meta-and-title">
                    <div className="post-meta">
                        <time>{date}</time>
                        <p className="author-name">
                            <span className="author-name-date-padding">|</span>
                            <span>{stadium}</span>
                        </p>
                    </div>
                    <h2>
                        <div className="post-title">
                            {teams[0]} VS. {teams[1]}
                        </div>
                    </h2>
                </header>

                <p className="post-description">
                    Main Referee : {mainReferee} <br />
                    Linesmen : {linesmen[0]} , {linesmen[1]}
                </p>

                <footer>
                    <Link to={`/match/${matchId}`}>
                        <span className="btn">SHOW MORE</span>
                    </Link>
                </footer>
            </article>
        </section>
    );
};

export default MatchCard;
