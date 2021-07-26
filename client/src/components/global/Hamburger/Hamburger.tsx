import { FC } from "react";
import "./styles.scss";

export type Props = {
  open: boolean;
  onClick?: () => void;
  className?: string;
};

const Hamburger: FC<Props> = ({ open = false, onClick, className }: Props) => {
  return (
    <div className={"hamburger " + className} onClick={onClick}>
      {!open ? (
        <span className='hamburger--container'>
          <div className='hamburger--container__bar'></div>
          <div className='hamburger--container__bar'></div>
          <div className='hamburger--container__bar'></div>
        </span>
      ) : (
        <span className='hamburger--close'>&#10006;</span>
      )}
    </div>
  );
};

export default Hamburger;
