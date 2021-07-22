import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import GetRandomSong from "./components/GetRandomSong";

function App() {
  return (
    <div className='App'>
      <GetRandomSong />
    </div>
  );
}

export default App;
