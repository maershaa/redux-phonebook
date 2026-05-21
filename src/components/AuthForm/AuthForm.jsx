import { useNavigate } from 'react-router-dom';
import { FormWrapper } from './AuthForm.styled';
import { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '@/redux/authSlice.js';
import { toast } from 'react-toastify';
import { selectUser, selectIsLoggedIn } from '@/redux/selectors';

// Редьюсер и состояние для локального состояния формы
const initialState = {
  login: '',
  password: '',
};

const reducer = (state, action) => {
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
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const isFormValid =
    formState.login.trim() !== '' && formState.password.trim() !== '';

  const handleAuth = evt => {
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
