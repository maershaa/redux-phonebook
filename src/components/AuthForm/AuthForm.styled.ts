import styled from '@emotion/styled';

const FormWrapper = styled.form`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  input {
    width: 100%;
    padding: 10px 12px;
    border-radius: 12px;
    font-size: 14px;
    border: 1px solid ${({ theme }) => theme.colors.border.light};
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
    background: ${({ theme }) => theme.colors.accent.blue};
  }

  button:disabled {
    color: white;
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
    box-shadow: none;
  }
`;

export { FormWrapper };
