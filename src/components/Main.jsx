import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Main() {
    const [cards, setCards] = useState([]);

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

        } catch (error) {
            console.error('Error fetching Pokémon:', error);
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
            </div>
        </main>
    )

}

export default Main;