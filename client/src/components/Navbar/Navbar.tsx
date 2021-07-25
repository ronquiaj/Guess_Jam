import { FC } from "react";
import Typography from "../global/Typography/Typography";
import { Link } from "react-router-dom";
import "./styles.scss";

const Navbar: FC = () => {
  return (
    <div className='navbar'>
      <div className='navbar--route-container'>
        <Link className='remove-link' to='/lobby'>
          <Typography variant='blue'>Play</Typography>
        </Link>
        <Link className='remove-link' to='/about'>
          <Typography variant='blue'>About</Typography>
        </Link>
        <Link className='remove-link' to='/signup'>
          <Typography variant='blue'>Signup</Typography>
        </Link>
        <Link className='remove-link' to='/login'>
          <Typography variant='blue'>Login</Typography>
        </Link>
      </div>
      <div className='navbar--logo-container'>
        <img className='navbar--logo-container__logo' src='/images/logo.png'></img>
      </div>
    </div>
  );
};

export default Navbar;
