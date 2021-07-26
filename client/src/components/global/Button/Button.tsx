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
};

const Button: FC<Props> = ({ children, onClick, variant = "red" }: Props) => {
  return (
    <div className={"button button--" + variant} onClick={onClick && (() => onClick())}>
      {children}
    </div>
  );
};

export default Button;
