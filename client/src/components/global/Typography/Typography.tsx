import { FC } from "react";
import "./styles.scss";

export type Props = {
  children: any;
  variant: "red" | "blue" | "hot-pink" | "white";
  /**
   * Whether or not this typography will light up on hover
   */
  light?: boolean;
  className?: string;
};

const Typography: FC<Props> = ({
  children,
  variant,
  light = true,
  className,
}: Props) => (
  <div className={"font " + className}>
    <span className={variant + (light ? "--on" : "")}>{children}</span>
  </div>
);
export default Typography;
