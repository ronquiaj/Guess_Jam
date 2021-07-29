import { FC, useState } from "react";
import Typography from "../global/Typography/Typography";
import Hamburger from "../global/Hamburger/Hamburger";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import "./styles.scss";
import Button from "../global/Button/Button";

const Navbar: FC = () => {
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState<boolean>(false);
  const smallScreen = 660 >= width;
  return (
    <>
      <div className="navbar">
        {!smallScreen ? (
          <div className="navbar--route-container">
            <Link className="remove-link" to="/lobby">
              <Typography
                className="navbar--route-container--links"
                variant="blue"
              >
                Play
              </Typography>
            </Link>
            <Link className="remove-link" to="/about">
              <Typography
                className="navbar--route-container--links"
                variant="blue"
              >
                About
              </Typography>
            </Link>
            <Link className="remove-link" to="/signup">
              <Typography
                className="navbar--route-container--links"
                variant="blue"
              >
                Signup
              </Typography>
            </Link>
            <Link className="remove-link" to="/login">
              <Typography
                className="navbar--route-container--links"
                variant="blue"
              >
                Login
              </Typography>
            </Link>
          </div>
        ) : (
          <Hamburger
            className="navbar--hamburger"
            onClick={() => setOpen(!open)}
            open={open}
          />
        )}
        <div className="navbar--logo-container">
          <img
            alt="logo"
            className="navbar--logo-container__logo"
            src="/images/logo.png"
          ></img>
        </div>
      </div>

      <div
        className={`navbar--open ${
          open && smallScreen ? "navbar--open__show" : "navbar--open__close"
        }`}
      >
        <Link className="remove-link" to="/lobby">
          <Button className="navbar--open__button" variant="blue">
            Play
          </Button>
        </Link>
        <Link className="remove-link" to="/about">
          <Button className="navbar--open__button" variant="blue">
            About
          </Button>
        </Link>
        <Link className="remove-link" to="/signup">
          <Button className="navbar--open__button" variant="blue">
            Signup
          </Button>
        </Link>
        <Link className="remove-link" to="/login">
          <Button className="navbar--open__button" variant="blue">
            Login
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
