import { FC } from "react";
import Button from "../../components/global/Button/Button";
import "./styles.scss";

const GamePage: FC = () => {
  return (
    <div className='container'>
      <div className='container--button-container'>
        <Button onClick={() => alert("Hi")}>Hi</Button>
        <Button onClick={() => alert("Hi")}>Hi</Button>
        <Button onClick={() => alert("Hi")}>Hi</Button>
        <Button onClick={() => alert("Hi")}>Hi</Button>
      </div>
    </div>
  );
};

export default GamePage;
