import { FC, useState, useEffect } from "react";
import Button from "../../components/global/Button/Button";
import ReadySetGo from "./components/ReadySetGo/ReadySetGo";
import "./styles.scss";

const GamePage: FC = () => {
  useEffect(() => {}, []);

  return (
    <div className="container">
      <ReadySetGo
        className="container--ready-set-go"
        time={1000}
        animationOver={() => console.log("hi")}
      />
      <div className="container--button-container">
        <Button onClick={() => alert("Hi")}>Hi</Button>
        <Button onClick={() => alert("Hi")}>Hi</Button>
        <Button onClick={() => alert("Hi")}>Hi</Button>
        <Button onClick={() => alert("Hi")}>Hi</Button>
      </div>
    </div>
  );
};

export default GamePage;
