import { ChangeEvent, useState } from "react";

const useForm = (): [
  val: string,
  updateVal: (e: ChangeEvent<HTMLInputElement>) => void,
  reset: () => void
] => {
  const [val, setVal] = useState("");

  const updateVal = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const reset = () => {
    setVal("");
  };

  return [val, updateVal, reset];
};

export default useForm;
