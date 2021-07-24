import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GetRandomSong from "./components/GetRandomSong";
import Lobby from "./routes/Lobby";
import Error from "./routes/Error";
import GamePage from "./routes/GamePage";
import Landing from "./routes/Landing";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' render={() => <Landing />} />
          <Route exact path='/lobby' render={() => <Lobby />} />
          <Route exact path='/game' render={() => <GamePage />} />
          <Route path='*' render={() => <Error />} />
        </Switch>
        <Navbar />
        <GetRandomSong />
      </Router>
    </div>
  );
}

export default App;
