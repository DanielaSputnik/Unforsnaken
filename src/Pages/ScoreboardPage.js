import { useNavigate } from 'react-router-dom';
import Scoreboard from '../Components/Scoreboard';
import './Scoreboardpage.css';


function ScoreboardPage () {
  const navigate = useNavigate();
  return ( 
  <>
  <h1>SCOREBOARD</h1>
  <div className='scoreboard-container'>
   
    <button 
      className='btn'
      onClick={()=> navigate('/')}>Back to game</button>
      <div className='scoreboard'> 
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
 </> );
};

export default ScoreboardPage;
