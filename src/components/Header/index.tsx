import React, { useContext } from 'react';
import logo from '../../logo_full.svg';
import { MyContext } from '../../App';
import { RiSearch2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
const Header: React.FC = () => {
  const { isSignIn } = useContext(MyContext);
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="ugram" />
      </Link>
      {!isSignIn && <Link to="/sign-in">sign-in</Link>}
      {isSignIn && <div>userIcon</div>}
      <RiSearch2Line />
    </header>
  );
};

export default Header;
