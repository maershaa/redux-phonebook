import styled from '@emotion/styled';

export const FeedbackNotification = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 16px;

  margin-top: 24px;
  margin-bottom: 24px;

  padding: 16px 24px;
  max-width: 50%;
  min-height: 50px;
  margin-left: auto;
  margin-right: auto;

  background: #ede9fe;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  text-align: center;
  opacity: 0.85;

  svg {
    width: 28px;
    height: 28px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  p {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;
