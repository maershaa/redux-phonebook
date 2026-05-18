import styled from '@emotion/styled';

const Article = styled.article`
  background: ${({ theme }) => theme.colors.background.card};
  padding: 24px;
  border-radius: ${({ theme }) => theme.radii.medium};
  box-shadow: ${({ theme }) => theme.shadows.card};

  h3 {
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

export { Article };
