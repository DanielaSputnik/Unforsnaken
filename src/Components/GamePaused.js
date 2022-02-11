import './GamePaused.css';

const GamePausedWindow = (props) => {
    return (props.isGamePaused) ?  (
        <>
          <div className='game-paused-window'>
            <div className='game-paused-container'>
                <h4>GAME PAUSED</h4>
                <h3> PRESS ANY ARROW TO CONTINUE</h3>
            </div>
          </div>
        </>
        ) : '';
      };
      
export default GamePausedWindow