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
  onClick: () => void;
};

const Button: FC<Props> = ({ children, onClick }: Props) => {
  return (
    <div className='button' onClick={() => onClick()}>
      {children}
    </div>
  );
};

export default Button;
