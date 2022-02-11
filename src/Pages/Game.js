import { useState, useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';
import GameOverWindow from '../Components/GameOver';
import GamePausedWindow from '../Components/GamePaused';
import Scoreboard from '../Components/Scoreboard';
import './Game.css';

const BOARD_WIDTH = 18;
const INITIAL_SNAKE = [38]
const INITIAL_APPLE = 45;
const SCORE_INCREASE = 5;
const VALID_POSITIONS = [...Array(BOARD_WIDTH*BOARD_WIDTH).keys()];
const FAST_SPEED = 50;
const NORMAL_SPEED = 150;
const SCOREBOARD_DISPLAY_SIZE = 5;


function Game() {
  const [gameOver, setGameOver] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [board, setBoard] = useState([]);
  const [snakeBody, setSnakeBody] = useState(INITIAL_SNAKE);
  const [currentSnakeHead, setCurrentSnakeHead] = useState(INITIAL_SNAKE[0]);
  const [applePosition, setApplePosition] = useState(INITIAL_APPLE);
  const [direction, setDirection] = useState(null);
  const [isFastSpeed, setIsFastSpeed] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  
  const drawBoard = () => {
    const newBoard = [];
    for (let i= 0; i < BOARD_WIDTH * BOARD_WIDTH; i++) {
      const square = i;
      newBoard.push(square);
    }
    setBoard(newBoard);
  };

  useEffect(() => {drawBoard()}, []);

  useEffect(() => {
    window.addEventListener('keydown', changeDirection)
  }, []);

  const changeDirection = (e) => {
    switch (e.key) {
      case 'ArrowRight':
        setDirection('right');
        break
      case'ArrowLeft':
        setDirection('left');
        break
      case 'ArrowUp':
        setDirection('up');
        break
      case 'ArrowDown':
        setDirection('down');
        break
      default :
        setDirection('paused');
    }
  };  

  const moveSnake = (snakeBody) => {
    let newSnakeBody = [];

    if (direction === 'paused') {
        setGamePaused(true);
        newSnakeBody = [...snakeBody];
    } else if (direction === null) {
        newSnakeBody = [...snakeBody];
        setGamePaused(false);
    } else if (applePosition !== currentSnakeHead) {
        snakeBody.splice(-1,1); 
        setGamePaused(false);
    } else {
        handleEatApple();
        setGamePaused(false);
    };
    
    if (direction === 'right') {
      if (currentSnakeHead % BOARD_WIDTH === BOARD_WIDTH-1) {
        handleCrash();
      } else  
      newSnakeBody = [currentSnakeHead+1, ...snakeBody];
    };
    if (direction === 'left') {
      if (currentSnakeHead % BOARD_WIDTH === 0) {
        handleCrash();
      } else  
      newSnakeBody = [currentSnakeHead-1, ...snakeBody];
    };
    if (direction === 'up') {
      newSnakeBody = [currentSnakeHead-BOARD_WIDTH, ...snakeBody];
    };
    if (direction === 'down' ) {
      newSnakeBody = [currentSnakeHead+BOARD_WIDTH, ...snakeBody];
    };

    setSnakeBody(newSnakeBody);
    setCurrentSnakeHead(newSnakeBody[0]);  

    if (snakeBody.slice(1).includes(newSnakeBody[0]) || !VALID_POSITIONS.includes(newSnakeBody[0]) ) {
      handleCrash();
    };
  }
  
  useEffect(()=> {
    if (!gameOver) {
      const timer = setInterval(() => {
        moveSnake(snakeBody);
      }, isFastSpeed ? FAST_SPEED : NORMAL_SPEED);
      return () => clearInterval(timer)
    }
  }, [moveSnake])
  
  const handleCrash = () => {
    setSnakeBody(INITIAL_SNAKE);
    setApplePosition(INITIAL_APPLE);
    setCurrentSnakeHead(INITIAL_SNAKE[0]);
    setGameOver(true);
   };

  const handleEatApple = () => {
    spawnNewApple();
    setScore(score + SCORE_INCREASE);
  };

  const spawnNewApple = () => {
    let newApplePosition;
    while (true) {
      newApplePosition = Math.floor(Math.random() * (BOARD_WIDTH*BOARD_WIDTH));
      if (snakeBody.includes(newApplePosition))
        continue;
      setApplePosition(newApplePosition)
        break;
    }
  };

  const changeSpeed = () => {
    setIsFastSpeed(!isFastSpeed);
  };

  const getCellStyle = (index, snakeBody, headPosition, applePosition, direction) => {
    let cellStyle;

    if ( index === headPosition ) {
        if (direction === 'up') {
          cellStyle = 'square head-up'
        }
        if (direction === 'down') {
          cellStyle = 'square head-down'
        }
        if (direction === 'right' || direction === null || direction === 'paused') {
          cellStyle = 'square head-r'
        }
        if (direction === 'left') {
          cellStyle = 'square head-l'
        }
    } else if (index === applePosition) {
      cellStyle = 'square apple'
    } else if ( snakeBody.includes(index) ) {
      cellStyle = 'square snake'
    } else cellStyle = 'square';

    return cellStyle;
  };


  return (
    <>
    <GamePausedWindow
      isGamePaused={gamePaused}
      direction={direction}
    ></GamePausedWindow>

    <GameOverWindow
      isGameOver={gameOver}
      playerScore={score}
      resetScore={setScore}
      setTrigger={setGameOver}
      setDirection={setDirection}
    ></GameOverWindow>
    
    <h1 className="game-title">UNFORSNAKEN</h1>
    <div className="game-container">
      <div className='game-board-container'>
        <div className="game-board">
          {board.map((index) => {
            let cellClassName = getCellStyle(index, snakeBody, currentSnakeHead, applePosition, direction);
            return <div 
                className={cellClassName}
                key={index}
                onKeyDown={e => changeDirection(e)}
              ></div>;
          })}
        </div>
      </div>

      <div className="game-stats-container">
        <div className="speed-settings">
          <h3>SPEED</h3>
          <label className="switch">
            <input 
              type="checkbox" 
              id="speed"
              checked={isFastSpeed}
              onChange={changeSpeed}/>
            <span className="slider"></span>
          </label>
        </div>

        <div className="game-stats-score">
          <h2 className="game-stats-text">YOUR SCORE:</h2>
          <h1 className="game-stats-value">{score}</h1>
        </div>

        <div className="game-stats-scoreboard">
          <h2 className="game-stats-text">TOP SCORES:</h2>
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
                listSize={SCOREBOARD_DISPLAY_SIZE}
                refreshOn={handleCrash}>
              </Scoreboard>
            </tbody>
          </table>
        </div>

        <button 
          className='btn'
          onClick={()=> navigate('/scoreboard')}>
              Scoreboard
        </button>

        </div>
      </div>
    </>
  );
}

export default Game;
