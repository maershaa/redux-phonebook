import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

//  Navigate — это программный redirect. Если пользователь не авторизован находясь на /phonebook, то его автоматически перекинет на: /auth

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/auth" replace />;
};

export { PrivateRoute };
