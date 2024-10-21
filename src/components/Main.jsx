import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Main() {

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