import { HeaderWrapper, Logo } from '@/components/Header/Heder.styled';
import { NavLink, Link } from 'react-router';
const Header = () => {
  const handelLogInBtnClick = () => {
    console.log('клик для логина');
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

        <button type="button" onClick={handelLogInBtnClick}>
          Log in
        </button>
      </nav>
    </HeaderWrapper>
  );
};

export { Header };
