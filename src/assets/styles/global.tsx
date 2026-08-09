import { Global, css, useTheme } from '@emotion/react';
import emotionReset from 'emotion-reset';
import bgImg from '@/assets/images/background.png';
import type { Theme } from '@/interfaces';

/**
 * 1. Выносим все глобальные стили в функцию,
 *    которая ЯВНО принимает theme.
 * 2. Внутри css используем ТОЛЬКО готовые значения,
 *    никаких функций и props.
 */
const globalStyles = (theme: Theme) => css`
  /* готовый reset от emotion */
  ${emotionReset}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${theme.fonts.main};
    background-color: ${theme.colors.background.main};
    background-image: url(${bgImg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: ${theme.colors.text.primary};
  }

  #root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    padding: ${theme.spacing.lg};
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  a {
    color: ${theme.colors.text.primary};
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    border: none;
    outline: none;
    padding: 0;
    background: transparent;
    font: inherit;
    color: inherit;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
  }

  button:active {
    opacity: 0.7;
  }

  main {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* ---------------- section ---------------- */

  /* ---------------- phonebook ---------------- */

  .phonebook-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-top: 32px;
  }
`;

/**
 * 3. GlobalStyles — обычный React-компонент.
 *    Здесь мы:
 *    - получаем theme из ThemeProvider через useTheme
 *    - передаём theme в globalStyles
 */
const GlobalStyles = () => {
  const theme = useTheme();

  return <Global styles={globalStyles(theme)} />;
};

export default GlobalStyles;
