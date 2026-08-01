import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '@/redux/selectors';
import { Navigate } from 'react-router-dom';
import { JSX } from 'react';
//  Navigate — это программный redirect. Если пользователь не авторизован находясь на /phonebook, то его автоматически перекинет на: /auth

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? children : <Navigate to="/auth" replace />;
};

export { PrivateRoute };
