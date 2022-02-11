import axios from 'axios';
import {useState} from 'react';
import './GameOver.css';
import Scoreboard from './Scoreboard';

const SCRBRD_SIZE = 10;

const GameOverWindow = (props) => {

  const [newName, setNewName] = useState('ANONYMOUS');

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const saveScore = async () => {
        const scoreData = {
            playerName : newName,
            playerScore: props.playerScore,
        };
        axios.post('http://localhost:8080/api/scores', scoreData)
            .catch(error => {alert('Ooops, something went wrong, please refresh the page.')} 
                    //Log the error into a log
                    )
            .then(setNewName('ANONYMOUS'));
    };


  return (props.isGameOver) ?  (
  <>
    <div className='game-over-window'>
        <div className='game-over-container'>
          <h3>GAME OVER</h3>  
          <button 
            className='btn'
            onClick={()=> {
              saveScore();
              props.setTrigger(false);
              props.resetScore(0);
              props.setDirection(null)
            }}>
              SAVE & RESTART
          </button>
   
          <div className='results-container'>
            <div className='current-player-container'>
            
              <div className='player-score'>
                  <h2>YOUR SCORE: </h2>
                  <p>{props.playerScore}</p>
              </div>  

              <div className='new-score'>
                <h2>Your Name:</h2>
                <input type="text" 
                    className='name-input' 
                    onChange={handleNameChange} 
                    maxLength="10" 
                    size="13"
                    placeholder='ANONYMOUS'
                    autoFocus
                />
              </div>
            </div>

            <div className='scoreboard-snippet'>
              <table>
                <thead> 
                  <tr>
                    <th>#</th>
                    <th>Player</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  <Scoreboard
                    listSize={SCRBRD_SIZE}
                    score={props.playerScore}>
                  </Scoreboard>
                </tbody>
              </table>
            </div>

          </div>
        </div>
    </div>
  </>
  ) : '';
};

export default GameOverWindow;
