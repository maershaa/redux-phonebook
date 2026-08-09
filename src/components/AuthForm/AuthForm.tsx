import { useReducer, SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { selectUser, selectIsLoggedIn } from '@/redux/selectors';

import { FormWrapper } from './AuthForm.styled';
import { logIn } from '@/redux/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

interface AuthFormState {
  login: string;
  password: string;
}

type AuthFormAction =
  | { type: 'setLogin'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'reset' };

// Редьюсер и состояние для локального состояния формы
const initialState: AuthFormState = {
  login: '',
  password: '',
};

const reducer = (state: AuthFormState, action: AuthFormAction) => {
  switch (action.type) {
    case 'setLogin':
      return {
        ...state,
        login: action.payload,
      };
    case 'setPassword':
      return {
        ...state,
        password: action.payload,
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

//Компонент
const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const isFormValid =
    formState.login.trim() !== '' && formState.password.trim() !== '';

  const handleAuth = (evt: SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isLoggedIn) {
      toast.error(`You are already logged in as ${user?.login}`);
      return;
    }

    dispatch(logIn(formState));

    dispatchFormState({ type: 'reset' });

    toast.success(`You are successfully logged in as ${formState.login}.`);

    navigate('/phonebook');
  };

  return (
    <FormWrapper onSubmit={handleAuth}>
      <input
        type="text"
        name="login"
        placeholder="Enter your login"
        onChange={e =>
          dispatchFormState({ type: 'setLogin', payload: e.target.value })
        }
      />
      <input
        type="text"
        name="password"
        placeholder="Enter your password"
        onChange={e =>
          dispatchFormState({ type: 'setPassword', payload: e.target.value })
        }
      />

      <button type="submit" disabled={!isFormValid}>
        Log in
      </button>
    </FormWrapper>
  );
};

export { AuthForm };
