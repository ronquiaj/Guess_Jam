import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/global/Button/Button";
import Typography from "../../components/global/Typography/Typography";
import "./styles.scss";

const Lobby: FC = () => {
  return (
    <div className='lobby-container'>
      <Typography className='lobby-container--header' variant='hot-pink' light={false}>
        The Lobby
      </Typography>
      <div className='lobby-container--button-container'>
        <Link className='remove-link' to='/'>
          <Button>Quick Start</Button>
        </Link>
        <Link className='remove-link' to='/friend-lobby'>
          <Button>Play With Friends</Button>
        </Link>
        <Link className='remove-link' to='/game'>
          <Button>Solo Game</Button>
        </Link>
      </div>
    </div>
  );
};

export default Lobby;
