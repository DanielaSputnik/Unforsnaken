import axios from 'axios';
import React, { useState } from 'react';
import './SaveNewScore.css'

const SaveNewScore = ({score}) => {
    const [newName, setNewName] = useState('ANONYMOUS');

    const handleNameChange = (e) => {
        setNewName(e.target.value);
        console.log(newName);
    };

    const saveScore = async () => {
        const scoreData = {
            playerName : newName,
            playerScore: score,
        };
        axios.post('url..', scoreData)
            .then(response => {console.log(response)})
            .catch(error => {console.log(error)})
    };

  return (
     <>
        <div className='new-score'>
            <h2>Your Name:</h2>
            <input type="text" 
                className='name-input' 
                onChange={handleNameChange} 
                maxLength="10" 
                size="15"
                placeholder={newName}
            />
            <button
                className='name-submit-btn' 
                onClick={saveScore}
            >SUBMIT</button>
        </div>
    </>
    )
};

export default SaveNewScore;
