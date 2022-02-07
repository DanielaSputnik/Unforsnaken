import React from 'react';
import './GameOver.css';
import SaveNewScore from './SaveNewScore';
import Scoreboard from './Scoreboard';

const SCRBRD_SIZE = 20;

const GameOverWindow = (props) => {
  return (props.isGameOver) ?  (
  <>
    <div className='game-over-window'>
        <div className='game-over-container'>
          <h1>GAME OVER</h1>

          <button 
            className='restart-btn'
            onClick={()=> {
              props.setTrigger(false);
              props.resetScore(0)
          }}>RESTART
          </button>

          <div className='results-container'>
            <div className='current-player-container'>
              <div className='player-score'>
                  <h2>YOUR SCORE: </h2>
                  <p>{props.playerScore}</p>
              </div>
              <SaveNewScore
              score={props.playerScore}  
              ></SaveNewScore>
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
