import { PrivateRoute, SharedLayout } from '@/components';
import { PhonebookPage, HomePage, AuthPage } from '@/pages';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />

        <Route
          path="phonebook"
          element={
            <PrivateRoute>
              {/* Оборачиваем путь который доступен только залогиным пользователям в  PrivateRoute. внутри PrivateRoute реализована логика которая проверяет авторизован пользователь или нет. если не авторизован - отправляет на страницу /auth*/}
              <PhonebookPage />
            </PrivateRoute>
          }
        />

        <Route path="auth" element={<AuthPage />} />
      </Route>
    </Routes>
  );
};

export default App;
