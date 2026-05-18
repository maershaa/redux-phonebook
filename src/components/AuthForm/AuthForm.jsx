import { useNavigate } from 'react-router';
import { FormWrapper } from './AuthForm.styled';
import { useReducer } from 'react';

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
    default:
      return state;
  }
};
const AuthForm = () => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);

  const isFormValid = state.login.trim() !== '' && state.password.trim() !== '';

  const handleAuth = evt => {
    evt.preventDefault();

    navigate('/phonebook');
  };
  return (
    <FormWrapper onSubmit={handleAuth}>
      <input
        type="text"
        name="login"
        placeholder="Enter your login"
        onChange={e => dispatch({ type: 'setLogin', payload: e.target.value })}
      />
      <input
        type="text"
        name="password"
        placeholder="Enter your password"
        onChange={e =>
          dispatch({ type: 'setPassword', payload: e.target.value })
        }
      />
      <button type="submit" disabled={!isFormValid}>
        Log in
      </button>
    </FormWrapper>
  );
};

export { AuthForm };
