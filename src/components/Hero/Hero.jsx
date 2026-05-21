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
        <strong>React</strong>, <strong>Redux Toolkit</strong>,{' '}
        <strong>React Router</strong> и работы с асинхронными запросами. Проект
        демонстрирует организацию клиентского приложения с{' '}
        <strong>глобальным состоянием</strong>, маршрутизацией и CRUD-логикой.
      </p>

      <p className="description">
        В проекте реализована простая система{' '}
        <strong>авторизации без backend</strong>: вход в систему, выход из
        аккаунта и защита приватных маршрутов. Доступ к разделу{' '}
        <strong>Phonebook</strong> имеют только{' '}
        <strong>авторизованные пользователи</strong>.
      </p>

      <p className="description">
        Пользователь может <strong>добавлять новые контакты</strong>,{' '}
        <strong>удалять существующие</strong>,{' '}
        <strong>фильтровать список</strong> и отмечать контакты как{' '}
        <strong>избранные</strong>. Состояние приложения централизовано в{' '}
        <strong>Redux Toolkit</strong>, что позволяет удобно управлять данными и
        масштабировать проект без усложнения архитектуры.
      </p>

      <p className="description">
        Проект содержит две отдельные реализации: версия с хранением данных в{' '}
        <strong>localStorage</strong> и версия с использованием{' '}
        <strong>createAsyncThunk</strong>, <strong>axios</strong> и удалённого
        API через <strong>MockAPI</strong>.
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
