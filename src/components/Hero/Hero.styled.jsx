import styled from '@emotion/styled';

const HeroWrapper = styled.div`
  text-align: center;
  padding: 60px 20px;
  max-width: 760px;
  margin: 0 auto;

  color: ${({ theme }) => theme.colors.text.secondary};

  .title {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 2.4rem;
    font-weight: 800;
    margin-bottom: 14px;
    font-style: italic;
    letter-spacing: -0.5px;

    background: linear-gradient(105deg, #667eea 0%, #168a9c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    /* Обводка текста */
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);

    /*  свечение  */
    text-shadow:
      0 0 18px rgba(79, 140, 255, 0.25),
      0 0 30px rgba(124, 92, 255, 0.15);
  }

  .subtitle {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 26px;
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.3;
  }

  .subtitle span {
    color: ${({ theme }) => theme.colors.accent.blue};
    position: relative;
  }

  .description {
    font-size: 1rem;
    line-height: 1.75;
    margin-bottom: 22px;
    color: ${({ theme }) => theme.colors.text.secondary};

    text-align: left;
  }

  .description strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 600;
  }

  .hero-actions {
    display: flex;
    justify-content: center;
    margin-top: 28px;
  }

  .btn {
    display: inline-block;
    padding: 12px 26px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    color: white;
    background: ${({ theme }) => theme.colors.accent.blue};

    transition: all 0.2s ease;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.15);
  }

  .btn:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent.blue};
    outline-offset: 3px;
  }
`;

export { HeroWrapper };
