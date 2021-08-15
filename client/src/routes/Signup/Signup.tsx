import { FC } from "react";
import useForm from "../../hooks/useForm";

const Signup: FC = () => {
  const [name, setName] = useForm();
  const [password, setPassword] = useForm();
  const [email, setEmail] = useForm();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("clicked");
      }}
    >
      <input value={email} onChange={setEmail} placeholder="Email" />
      <input value={password} onChange={setPassword} placeholder="Password" />
      <input value={name} onChange={setName} placeholder="Username" />
      <button>Click me</button>
    </form>
  );
};

export default Signup;
