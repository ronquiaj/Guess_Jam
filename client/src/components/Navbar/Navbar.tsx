import { FC } from "react";
import Typography from "../global/Typography/Typography";
import "./styles.scss";

const Navbar: FC = () => {
  return (
    <div className='navbar'>
      <div className='navbar--route-container'>
        <Typography variant='blue'>Play</Typography>
        <Typography variant='blue'>About</Typography>
        <Typography variant='blue'>Signup</Typography>
        <Typography variant='blue'>Login</Typography>
      </div>
      <div className='navbar--logo-container'>
        <img className='navbar--logo-container__logo' src='/images/logo.png'></img>
      </div>
    </div>
  );
};

export default Navbar;
