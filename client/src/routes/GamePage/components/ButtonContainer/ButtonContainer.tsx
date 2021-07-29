import { FC } from "react";
import Button from "../../../../components/global/Button/Button";

export type Props = {
  buttons: {
    onClick: () => void;
    buttonName: string;
    /**
     * Optional parameter for rendering string on the button. If the criteria is false, then we render the alternateName
     */
    condition?: {
      criteria: boolean;
      alternateName: string;
    };
  }[];
};

const ButtonContainer: FC<Props> = ({ buttons }: Props) => {
  return (
    <div
    //   className={`gamepage--button-container ${
    //     !openingCountdownOver &&
    //     "gamepage-container--center-col--button-container--disabled"
    //   }`}
    >
      {buttons.map((button) => (
        <Button onClick={button.onClick}>
          {button.condition
            ? button.condition.criteria
              ? button.buttonName
              : button.condition.alternateName
            : button.buttonName}
        </Button>
      ))}
    </div>
  );
};

export default ButtonContainer;
