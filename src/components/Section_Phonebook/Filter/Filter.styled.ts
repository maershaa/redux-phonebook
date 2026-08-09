import styled from '@emotion/styled';

const Wrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: left;

  max-width: 400px;
  margin: 0 auto 20px auto;

  svg {
    position: absolute;
    left: 12px;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text.placeholder};
    pointer-events: none;
  }
`;
const FilterInput = styled.input`
  width: 100%;
  padding: 10px 12px 10px 38px;
  border-radius: 12px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};

  :focus {
    outline: none;
    border-color: #6a5cff;
  }
`;

export { Wrapper, FilterInput };
