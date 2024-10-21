import { useState, useEffect } from 'react';
import axios from 'axios';

function Main() {
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [cards, setCards] = useState([]);
    const [clickedCards, setClickedCards] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [difficulty, setDifficulty] = useState('easy');

    const getNumberOfCards = () => {
        if (difficulty === 'easy') return 5;
        if (difficulty === 'medium') return 8;
        return 12;
    };

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
            setGameOver(true);

            if (currentScore > bestScore) {
                setBestScore(currentScore);
            }
            
            
        } else {
            // game continues
            setClickedCards([...clickedCards, id]);
            setCurrentScore(currentScore + 1);
            
        }
        setCards(shuffleCards(cards));
        
    };

    const restartGame = () => {
        setCurrentScore(0);
        setClickedCards([]);
        setGameOver(false);
        fetchCards();
    };

    useEffect(() => {
        fetchCards();
    }, []);

    return (
        <main>
            <div className='scoreboard'>
                <p>Score: {currentScore}</p>
                <p>Best Score: {bestScore}</p>
            </div>

            <div className='cards'>
                {/* card will be mapped and placed here */}
                {cards.map((card) => (
                    <div key={card.id} className="card" onClick={() => handleCardClick(card.id)}>
                        <img src={card.image} alt={card.name} />
                        <p>{card.name}</p>
                    </div>
                ))}
            </div>

            {gameOver && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Game Over</h2>
                        <p>Your Score: {currentScore}</p>
                        <p>Best Score: {bestScore}</p>
                        <button onClick={restartGame}>Restart Game</button>
                    </div>
                </div>
            )}
        </main>
    )

}

export default Main;