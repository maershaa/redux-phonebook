import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.header`
  width: 100%;
  max-width: 1200px;
  margin: 20px auto 0; /* Добавили небольшой отступ сверху, чтобы стеклянный эффект смотрелся красиво */

  padding: 0 ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) =>
    theme.colors.background.transparent || 'rgba(255, 255, 255, 0.4)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2); /* Тонкая рамка для эффекта стекла */
  border-radius: ${({ theme }) => theme.radii.medium || '16px'};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 64px;
  }

  nav ul {
    display: flex;
    align-items: center;
    column-gap: 32px; /* Увеличили расстояние между ссылками */
    list-style: none;
    margin: 0 auto;
    padding: 0;
  }

  ul li a {
    color: ${({ theme }) => theme.colors.text.primary};
    position: relative;
    display: inline-block;
    font-size: 15px; /* Чуть изящнее */
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    padding: 8px 0;
    opacity: 0.7; /* В неактивном состоянии ссылки слегка приглушены */
    transition:
      opacity 0.3s ease,
      color 0.3s ease;

    /* Плавная линия подчеркивания при ховере и для активного класса */
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: #6366f1; /* Цвет в тон градиента логотипа */
      transform: scaleX(0);
      transform-origin: center; /* Линия расходится из центра — это выглядит дороже */
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
      opacity: 1;
    }

    &:hover::after {
      transform: scaleX(1);
    }

    /* Стиль для активной ссылки из react-router */
    &.active {
      opacity: 1;
      font-weight: 600;
      color: #6366f1;

      &::after {
        transform: scaleX(1);
        background-color: #6366f1;
      }
    }

    &:active {
      opacity: 0.6;
    }

    &:focus-visible {
      outline: 2px solid #6366f1;
      outline-offset: 4px;
      border-radius: 4px;
    }
  }

  /* Красивая кнопка "Log in" в стиле мягкого минимализма */
  /* button {
    font-size: 14px;
    font-weight: 600;
    padding: 8px 18px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    background-color: #ffffff;
    color: #111827;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
    transition: all 0.2s ease;

    &:hover {
      background-color: #f9fafb;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    &:active {
      transform: translateY(0);
      background-color: #f3f4f6;
    }
  } */
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 22px;
  font-weight: 800;
  text-decoration: none;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition:
    transform 0.3s ease,
    filter 0.3s ease;

  /* Элегантный градиент */
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;

  &:hover {
    transform: translateY(-1px);
    filter: drop-shadow(0 4px 12px rgba(99, 102, 241, 0.25));
  }

  span {
    /* Убрали жесткий темный цвет #251236, заменили на мягкий градиентный полутон */
    -webkit-text-fill-color: initial;
    color: #a855f7;
    font-weight: 300;
    opacity: 0.8;
  }
`;

export { HeaderWrapper, Logo };
