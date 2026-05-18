import { HeaderWrapper, Logo } from '@/components/Header/Heder.styled';
import { Button } from '@/components';
import { NavLink, Link, useNavigate } from 'react-router';
const Header = () => {
  const navigate = useNavigate();

  const handelLogInBtnClick = () => {
    navigate('/auth');
  };
  return (
    <HeaderWrapper>
      <nav className="nav">
        <Logo as={Link} to="/" aria-label="Logo of the project">
          Auth <span>&</span> Phonebook
        </Logo>

        <ul className="nav-list">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="phonebook"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Phonebook
            </NavLink>
          </li>
        </ul>

        <Button onClick={handelLogInBtnClick} text={'Log in'} />
      </nav>
    </HeaderWrapper>
  );
};

export { Header };
