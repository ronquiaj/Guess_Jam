import { FC } from "react";

type Props = {
  /**
   * Describes the text inside the button
   */
  text: string;
  /**
   * The function triggered when the button is clicked
   */
  onClick: () => void;
};

const Button: FC<Props> = ({ text, onClick }: Props) => {
  return <div onClick={() => onClick()}>{text}</div>;
};

export default Button;
