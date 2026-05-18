import { SharedLayout } from '@/components';
import { PhonebookPage, HomePage, AuthPage } from '@/pages';
import { Route, Routes } from 'react-router';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="phonebook" element={<PhonebookPage />} />
        <Route path="auth" element={<AuthPage />} />
      </Route>
    </Routes>
  );
};

export default App;
