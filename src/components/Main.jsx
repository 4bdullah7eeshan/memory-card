import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Main() {
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [cards, setCards] = useState([]);
    const [clickedCards, setClickedCards] = useState([]);


    const shuffleCards = (cards) => {
        return cards.sort(() => Math.random() - 0.5);
    };

    const fetchCards = async () => {
        try {
            const promises = [];
            for (let i = 1; i <= 5; i++ ) {
                promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
            }
            const results = await Promise.all(promises);
            const pokemonData = results.map((result) => ({
                id: result.data.id,
                name: result.data.name,
                image: result.data.sprites.front_default,
            }));
            setCards(shuffleCards(pokemonData));
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }

    };

    const handleCardClick = (id) => {
        if (clickedCards.includes(id)) {
            // game over
            setCurrentScore(0);
            setClickedCards([]);
            if (currentScore > bestScore) {
                setBestScore(currentScore);
            }
            
            
        } else {
            // game continues
            
        }
        
    };

    useEffect(() => {
        fetchCards();
    }, []);

    return (
        <main>
            <div className='scoreboard'>
                <p>Score: </p>
                <p>Best Score: </p>
            </div>

            <div className='cards'>
                {/* card will be mapped and placed here */}
                {cards.map((card) => (
                    <div key={card.id} className="card">
                        <img src={card.image} alt={card.name} />
                        <p>{card.name}</p>
                    </div>
                ))}
            </div>
        </main>
    )

}

export default Main;