import { Switch, Route } from "react-router-dom";
import Lobby from "./routes/Lobby/Lobby";
import Error from "./routes/Error/Error";
import GamePage from "./routes/GamePage/GamePage";
import Landing from "./routes/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <Landing />} />
        <Route exact path="/lobby" render={() => <Lobby />} />
        <Route exact path="/game" render={() => <GamePage />} />
        <Route path="*" render={() => <Error />} />
      </Switch>
    </div>
  );
}

export default App;
