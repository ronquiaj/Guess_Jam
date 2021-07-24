import { FC, ReactChild } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

export type Props = {
  children: ReactChild;
  variant: "red" | "blue";
};

const Typography: FC<Props> = ({ children, variant }: Props) => (
  <div className={"font"}>
    <span className={variant === "blue" ? "blue" : "red"}>{children}</span>
  </div>
);
export default Typography;
