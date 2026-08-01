import { HeroWrapper } from '@/components/Hero/Hero.styled';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <HeroWrapper>
      <p className="title">React + Redux Phonebook</p>

      <h1 className="subtitle">
        Приложение для управления <span>контактами</span>
      </h1>

      <p className="description">
        Phonebook — это учебное SPA-приложение, созданное для практики{' '}
        <strong>React</strong>, <strong>Redux Toolkit</strong> и{' '}
        <strong>React Router</strong>. Оно позволяет управлять списком контактов
        и демонстрирует работу с <strong>глобальным состоянием</strong> и
        маршрутизацией.
      </p>

      <p className="description">
        В проекте реализована простая система{' '}
        <strong>авторизации без backend</strong>: вход в систему, выход из
        аккаунта и защита маршрутов. Доступ к разделу <strong>Phonebook</strong>{' '}
        имеют только <strong>авторизованные пользователи</strong>.
      </p>

      <p className="description">
        Пользователь может <strong>добавлять новые контакты</strong>,{' '}
        <strong>удалять существующие</strong> и{' '}
        <strong>фильтровать список</strong> по имени. Состояние приложения
        централизовано в <strong>Redux Toolkit</strong>, что позволяет удобно
        управлять данными и масштабировать проект без усложнения архитектуры.
      </p>

      <ul className="hero-actions">
        <li>
          <Link to="/phonebook" className="btn">
            Открыть Phonebook
          </Link>
        </li>
      </ul>
    </HeroWrapper>
  );
};

export { Hero };
