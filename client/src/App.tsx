import { Switch, Route, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSong } from "./contexts/SongContext";
import Lobby from "./routes/Lobby/Lobby";
import Error from "./routes/Error/Error";
import GamePage from "./routes/GamePage/GamePage";
import Landing from "./routes/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const history = useHistory();
  const { setCurrentSong } = useSong();

  // Actions that we can enforce on every page change
  useEffect(() => {
    return history.listen((location) => {
      if (setCurrentSong) {
        setCurrentSong("");
      }
    });
  }, [history]);

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
