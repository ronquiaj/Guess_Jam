import { FC } from "react";
import "./styles.scss";

export type Props = {
  children: any;
  onClick: () => void;
  className?: string;
};

const SolidButton: FC<Props> = ({ children, onClick, className }: Props) => {
  return (
    <div className={`solid-button ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default SolidButton;
