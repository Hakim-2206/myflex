import React, {useEffect, useRef, useState} from 'react';
import './TitleCards.css'
import cards_data from "../../assets/cards/Cards_data.js";
import {Link} from "react-router-dom";


const TitleCards = ({title, category}) => {


    const [apiData, setApiData] = useState([])
    const cardsRef = useRef()

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTViOWE2MDYzYzIzMTZmZmFjZTBlZjc0MWEwYjFkNyIsIm5iZiI6MTczOTYyNjgwOS42NTkwMDAyLCJzdWIiOiI2N2IwOTkzOWM0NjUxMDNlMDQzNWIxMDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.SIUcnC6aoeNSbcmwly_09WwzZERBqJr6KtbUmPJ0A2A'
        }
    };


    const handleWheel = (event) => {
        event.preventDefault()
        cardsRef.current.scrollLeft += event.deltaY
    }

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel)
    }, []);

    return (
        <div className="title-cards">
            <h2>{title ? title : "Popular on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} key={index} className="card">
                        <img src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path} alt=""/>
                        <p>{card.original_title}</p>
                        <p></p>
                    </Link>
                })}
            </div>
        </div>
    );
}

export default TitleCards;