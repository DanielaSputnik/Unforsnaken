// import { useState, useEffect} from 'react';
// import GameOverWindow from './Components/GameOver';
// import './App.css';
// import Scoreboard from './Components/Scoreboard';

// const BOARD_WIDTH = 18;
// const INIT_SNAKE = [38]
// const INIT_APPLE = 45;
// const VALID_POSITIONS = [...Array(BOARD_WIDTH*BOARD_WIDTH).keys()];
// const FAST_SPEED = 100;
// const SLOW_SPEED = 200;
// const TOP_SCORES_SIZE = 5;

// function App() {
//   const [gameOver, setGameOver] = useState(true);
//   const [board, setBoard] = useState([]);
//   const [snakeBody, setSnakeBody] = useState(INIT_SNAKE);
//   const [currentSnakeHead, setCurrentSnakeHead] = useState(snakeBody[0]);
//   const [applePosition, setApplePosition] = useState(INIT_APPLE);
//   const [direction, setDirection] = useState(null);
//   const [slowerSpeed, setSlowerSpeed] = useState(false);
//   const [score, setScore] = useState(0);
//   const [cellClasss, setCellClasss] = useState('square');

//   const drawBoard = () => {
//     const newBoard = [];
//     for (let i= 0; i < BOARD_WIDTH * BOARD_WIDTH; i++) {
//       const square = i;
//       newBoard.push(square);
//     }
//     setBoard(newBoard);
//   };
//   useEffect(() => {drawBoard()}, []);

//   useEffect(() => {
//     window.addEventListener('keydown', changeDirection)
//   }, []);

//   const changeDirection = (e) => {
//     switch (e.key) {
//       case 'ArrowRight':
//         setDirection('right')
//         break
//       case'ArrowLeft':
//         setDirection('left')
//         break
//       case 'ArrowUp':
//         setDirection('up')
//         break
//       case 'ArrowDown':
//         setDirection('down')
//         break
//       default :
//         setDirection(null)  
//     }
//   };  

//   const moveSnake = (snakeBody) => {
//     let newSnakeBody = [];
//     let snakeHead = currentSnakeHead;
//     let cellStyle;
//     console.log('running')

//     if (direction === null) {
//       newSnakeBody = [...snakeBody];
//     } else if (applePosition !== snakeHead) {
//       snakeBody.splice(-1,1); 
//     } else {
//       handleEatApple();
//     };
    
//     if (direction === 'right' ) {
//       if (snakeHead % BOARD_WIDTH === BOARD_WIDTH-1) {
//         handleCrash()
//       } else  
//         newSnakeBody = [snakeHead+1, ...snakeBody];
//         cellStyle = 'square head-r';
//     };
//      if (direction === 'left') {
//       if (snakeHead % BOARD_WIDTH === 0) {
//         handleCrash()
//       } else  
//         newSnakeBody = [snakeHead-1, ...snakeBody];
//         cellStyle = 'square head-l'
//     };
//     if (direction === 'up') {
//       newSnakeBody = [snakeHead-BOARD_WIDTH, ...snakeBody];
//       cellStyle = 'square head-up';      
//     };
//     if (direction === 'down' ) {
//       newSnakeBody = [snakeHead+BOARD_WIDTH, ...snakeBody];
//       cellStyle = 'square head-down';
//     };
    
//     setSnakeBody(newSnakeBody);
//     snakeHead = newSnakeBody[0]
//     setCurrentSnakeHead(snakeHead);

//     if (snakeBody.slice(1).includes(snakeHead) || !VALID_POSITIONS.includes(snakeHead) ) {
//       handleCrash();
//       setDirection(null);
//     };
//     return cellStyle;
//   }

//   const handleEatApple = () => {
//     spawnNewApple();
//     setScore(score + 5);
//   };

//   const spawnNewApple = () => {
//     let newApplePosition;
//     while (true) {
//       newApplePosition = Math.floor(Math.random() * (BOARD_WIDTH*BOARD_WIDTH))
//       if (snakeBody.includes(newApplePosition))
//         continue;
//       setApplePosition(newApplePosition)
//         break;
//     }
//   };

//  const handleCrash = () => {
//     setSnakeBody(INIT_SNAKE);
//     setApplePosition(INIT_APPLE);
//     setGameOver(true);
//   };

//   const getCellStyle = (index, snakeBody, headPosition, applePosition, direction) => {
//     let cellStyle;

//     if ( index === headPosition ) {
//         if (direction === 'up') {
//           cellStyle = 'square head-up'
//         }
//         if (direction === 'down') {
//           cellStyle = 'square head-down'
//         }
//         if (direction === 'right' || direction === null) {
//           cellStyle = 'square head-r'
//         }
//         if (direction === 'left') {
//           cellStyle = 'square head-l'
//         }
//     } else if (index === applePosition) {
//       cellStyle = 'square apple'
//     } else if ( snakeBody.includes(index)) {
//       cellStyle = 'square snake'
//     } else cellStyle = 'square';

//     return cellStyle;
//   };

//   const changeSpeed = () => {
//     setSlowerSpeed(!slowerSpeed);
//   };

//   useEffect(()=> {
//     if (!gameOver) {
//       const timer = setInterval(() => {
//         moveSnake(snakeBody);
//       }, slowerSpeed ? FAST_SPEED : SLOW_SPEED)
//       return () => clearInterval(timer)
//     }
//   }, [moveSnake])
  

//   return (
//     <>
//     <GameOverWindow
//       isGameOver={gameOver}
//       playerScore={score}
//       resetScore={setScore}
//       setTrigger={setGameOver}
//     ></GameOverWindow>
//     <h1 className="game-title">UNFORSNAKEN</h1>
//     <div></div>
//     <div className="game-container">
//       <div className='game-board-container'>
//         <div className="game-board">
//           {board.map((index) => {
//             let cellClassName = getCellStyle(index, snakeBody, currentSnakeHead, applePosition, direction);
//             return <div 
//                 className={cellClassName}
//                 key={index}
//                 square-id={index}
//                 tabIndex={-1}
//                 onKeyDown={e => changeDirection(e)}
//               ></div>;
//           })}
//         </div>
//       </div>

//       <div className="side-panel-container">
//         <div className="speed-settings">
//           <p>SPEED</p>
//           <label className="switch">
//             <input 
//               type="checkbox" 
//               id="speed"
//               checked={slowerSpeed}
//               onChange={changeSpeed}/>
//             <span className="slider"></span>
//           </label>
//         </div>
//         <div className="game-stats-container">
//           <div className="game-stats-scores">
//             <h2 className="game-stats-text">Score:</h2>
//             <h1 className="game-stats-value">{score}</h1>
//             <h2 className="game-stats-text">Highest Score:</h2>
//             <h2 className="game-stats-value">120</h2>
//           </div>
//           <div className="game-stats-scoreboard">
//             <h2 className="game-stats-text">Scoreboard:</h2>
//             <table>
//               <thead> 
//                 <tr>
//                     <th>#</th>
//                     <th>Player</th>
//                     <th>Score</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <Scoreboard
//                   listSize={TOP_SCORES_SIZE}>
//                 </Scoreboard>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }

// export default App;



import React from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Game from "./Pages/Game";
import ScoresPage from "./Pages/ScoresPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Game />} exact/>
        <Route path='/scores' element={<ScoresPage/>} exact/>
      </Routes>
    </Router>
  );
}

export default App;