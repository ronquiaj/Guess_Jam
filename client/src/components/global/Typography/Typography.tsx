import { FC, ReactChild } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

export type Props = {
  children: ReactChild;
  variant: "red" | "blue" | "hot-pink";
  /**
   * Whether or not this typography will light up on hover
   */
  light?: boolean;
  className?: string;
};

const Typography: FC<Props> = ({ children, variant, light = true, className }: Props) => (
  <div className={"font " + className}>
    <span className={variant + (light ? "--on" : "")}>{children}</span>
  </div>
);
export default Typography;
