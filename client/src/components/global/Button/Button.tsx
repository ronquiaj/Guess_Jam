import { FC, ReactChild } from "react";
import "./styles.scss";

export type Props = {
  /**
   * Describes the text inside the button
   */
  children: ReactChild;
  /**
   * The function triggered when the button is clicked
   */
  onClick?: () => void;
  variant?: "red" | "blue";
  className?: string;
};

const Button: FC<Props> = ({ children, onClick, variant = "red", className }: Props) => {
  return (
    <div
      className={"button button--" + variant + " " + className}
      onClick={onClick && (() => onClick())}>
      {children}
    </div>
  );
};

export default Button;
