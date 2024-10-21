import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Main() {

    const fetchCards = async () => {
        try {
            const promises = [];
            for (let i = 1; i <= 5; i++ ) {
                promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
            }
            const results = await Promise.all(promises);

        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }

    };

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