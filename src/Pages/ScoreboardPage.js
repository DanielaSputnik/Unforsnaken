import { useNavigate } from 'react-router-dom';
import Scoreboard from '../Components/Scoreboard';


function ScoreboardPage () {
  const navigate = useNavigate();
  return (
  <div>
    <h1 className='game-title'>SCOREBOARD</h1>
    <button 
      className='btn'
      onClick={()=> navigate('/')}>Back to game</button>
      <div className='game-stats-scoreboard'> 
      <table>
        <thead> 
          <tr>
              <th>#</th>
              <th>Player</th>
              <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <Scoreboard/>                
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default ScoreboardPage;
