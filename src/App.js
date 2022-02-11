import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Game from "./Pages/Game";
import ScoreboardPage from "./Pages/ScoreboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Game />} exact/>
        <Route path='/scoreboard' element={<ScoreboardPage />} exact/>
      </Routes>
    </Router>
  );
}

export default App;