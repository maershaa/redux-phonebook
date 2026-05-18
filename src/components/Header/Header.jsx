import { HeaderWrapper, Logo } from '@/components/Header/Heder.styled';
import { Button } from '@/components';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '@/redux/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const handleLogInBtnClick = () => {
    navigate('/auth');
  };

  const handleLogOutBtnClick = () => {
    const login = user?.login;
    dispatch(logOut());
    toast.warn(`${login} is successfully logged out. See you later. `);
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

          {isLoggedIn && (
            <li>
              <NavLink
                to="/phonebook"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Phonebook
              </NavLink>
            </li>
          )}
        </ul>
        {!isLoggedIn ? (
          <Button onClick={handleLogInBtnClick} text={'Log in'} />
        ) : (
          <Button onClick={handleLogOutBtnClick} text={`Log out`} />
        )}{' '}
      </nav>
    </HeaderWrapper>
  );
};

export { Header };
