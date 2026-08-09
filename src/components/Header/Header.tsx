import { HeaderWrapper, Logo } from '@/components/Header/Heder.styled';
import { Button } from '@/components';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from '@/redux/authSlice';
import { toast } from 'react-toastify';
import { selectUser, selectIsLoggedIn } from '@/redux/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

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
        <Logo to="/" aria-label="Logo of the project">
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
