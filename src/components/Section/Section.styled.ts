import styled from '@emotion/styled';

export const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin: 40px auto;
  padding: 20px;

  background-color: ${({ theme }) => theme.colors.background.transparent};
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);

  h2 {
    text-align: center;
    margin-bottom: 32px;
    font-style: italic;

    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700;
    font-size: 2rem;

    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};

    text-shadow: 1px 1px 2px ${({ theme }) => theme.colors.decorations.shadow};
  }
`;
