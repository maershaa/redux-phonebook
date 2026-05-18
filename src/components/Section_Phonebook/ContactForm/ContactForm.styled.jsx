import styled from '@emotion/styled';

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  svg {
    position: absolute;
    left: 12px;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text.placeholder};
    pointer-events: none;
  }

  /* Находим родителя .input-wrapper, внутри которого есть инпут с именем phoneInput */
  .input-wrapper:has(input[name='phoneNumber']) svg {
    position: static;
  }

  input {
    width: 100%;
    padding: 10px 12px 10px 38px; /* отступ слева под иконку */
    border-radius: 12px;
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.colors.border.light};
  }

  input[name='phoneNumber'] {
    padding-left: 10px; /* уменьшаем отступ слева */
  }

  input:focus {
    outline: none;
    border-color: #6a5cff;
  }

  button {
    font-weight: 600;
    border: none;

    width: 100%;
    padding: 12px;
    border-radius: 12px;
    font-size: 14px;
    color: white;
    opacity: 1;
    background: linear-gradient(135deg, #6be585, #36d1dc);
  }

  button:disabled {
    color: white;
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
    box-shadow: none;
  }

  .input-wrapper.valid input {
    border-color: green;
  }

  .input-wrapper.invalid input {
    border-color: red;
  }
`;

const GenderGroup = styled.fieldset`
  border: none;
  padding: 0;
  display: flex;
  gap: 16px;
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};

  input[type='radio'] {
    padding: 10px;
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid ${({ theme }) => theme.colors.border.light};
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    transition:
      border 0.2s,
      background 0.2s;
  }

  input[type='radio']:checked {
    background-color: ${({ theme }) => theme.colors.border.light};
    border-color: ${({ theme }) => theme.colors.border.light};
  }

  &:hover input[type='radio'] {
    border-color: ${({ theme }) => theme.colors.border.light};
  }
`;

export { Form, GenderGroup, RadioOption };
