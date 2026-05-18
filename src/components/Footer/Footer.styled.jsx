import styled from '@emotion/styled';

export const FooterWrapper = styled.footer`
  width: 100%;
  max-width: 1200px;
  margin: 40px auto 20px; /* Отступы: сверху от контента страницы, снизу от края экрана */

  padding: 0 ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) =>
    theme.colors.background.transparent || 'rgba(255, 255, 255, 0.4)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2); /* Такая же тонкая рамка стекла, как в хедере */
  border-radius: ${({ theme }) => theme.radii.medium || '16px'};
  box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.02); /* Легкая тень вверх */

  .footer-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 60px;
    flex-wrap: wrap;
    gap: 16px;
    padding: 10px 0;
  }

  .copyright {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.primary};
    opacity: 0.6;
    font-weight: 400;
  }

  .footer-links {
    display: flex;
    align-items: center;
    column-gap: 24px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .footer-links a {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    opacity: 0.6;
    transition: all 0.3s ease;
    position: relative;
    padding: 4px 0;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: #a855f7; /* Цвет линии из градиента логотипа хедера */
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 0.3s ease;
    }

    &:hover {
      opacity: 1;
      color: #a855f7;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }
`;
