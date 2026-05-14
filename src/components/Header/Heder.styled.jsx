import styled from '@emotion/styled';

export const HeaderWrapper = styled.header`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  padding: 0 ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.transparent};
  backdrop-filter: blur(30px);
  border-radius: ${({ theme }) => theme.radii.medium};

  nav {
    display: flex;
    align-items: center;
    justify-content: space-around;
    column-gap: 20px;
    min-height: 40px;
    border-radius: 24px;
  }

  nav ul {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
    column-gap: 20px;
  }

  ul li a {
    color: ${({ theme }) => theme.colors.text.primary};
    position: relative;
    display: inline-block;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.6s ease;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 1px;
      background-color: currentColor;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.6s ease;
    }

    &:hover::after {
      transform: scaleX(1);
    }

    &:active {
      opacity: 0.7;
    }

    &:focus-visible {
      outline: 3px solid ${({ theme }) => theme.colors.text.primary};
      outline-offset: 4px;
    }
  }
`;

export const Logo = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 24px;
  font-weight: 800;
  text-decoration: none;
  letter-spacing: -0.5px;

  transition: all 0.3s ease;

  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;

  display: inline-block;
  padding: 5px 0;

  &:hover {
    transform: translateY(-2px);
    filter: drop-shadow(0 4px 6px rgba(57, 60, 191, 0.3));
    opacity: 0.9;
  }

  span {
    -webkit-text-fill-color: #251236;
    font-weight: 400;
    margin: 0 2px;
    opacity: 0.6;
  }
`;
