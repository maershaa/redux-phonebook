import styled from '@emotion/styled';

const HeroWrapper = styled.div`
  text-align: center;
  padding: 20px;
  color: ${({ theme }) => theme.colors.text.secondary};

  .subtitle {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.25rem; /* 20px */
    font-weight: 500;
    opacity: 0.9;
    margin-bottom: 16px;
  }

  .description {
    font-size: 1rem;
    opacity: 0.8;
    margin-bottom: 32px;
  }

  .hero-actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-block; /* <- важно для анимации */
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    color: white;
    background: ${({ theme }) => theme.colors.accent.blue};
    position: relative;
    overflow: hidden;
    transition:
      transform 0.2s,
      box-shadow 0.2s,
      filter 0.2s;

    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  .btn:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.15);
    filter: brightness(1.05);
  }

  .DiscoverMoreBtn {
    margin-top: 30px;
    padding: 12px 24px;

    font-weight: 500;
    background: ${({ theme }) => theme.colors.text.primary};

    :hover {
      background: ${({ theme }) => theme.colors.text.secondary};
    }
  }
`;

export { HeroWrapper };
