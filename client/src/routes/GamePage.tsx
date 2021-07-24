import { FC } from "react";
import Button from "../components/global/Button/Button";

const GamePage: FC = () => {
  return (
    <div>
      <Button onClick={() => alert("Hi")}>Hi</Button>
      <Button onClick={() => alert("Hi")}>Hi</Button>
      <Button onClick={() => alert("Hi")}>Hi</Button>
      <Button onClick={() => alert("Hi")}>Hi</Button>
    </div>
  );
};

export default GamePage;
