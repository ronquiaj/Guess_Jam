import { FC } from "react";
import "./styles.scss";

export type Props = {
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
  return (
    <div className='button' onClick={() => onClick()}>
      {text}
    </div>
  );
};

export default Button;
