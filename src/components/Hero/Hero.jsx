import { HeroWrapper } from '@/components/Hero/Hero.styled';

const Hero = () => {
  return (
    <HeroWrapper>
      <p className="title">React + Redux Phonebook</p>

      <h1 className="subtitle ">Приложение для управления контактами</h1>

      <p className="description">
        Phonebook позволяет добавлять, удалять и фильтровать контакты. Проект
        создан для практики React, Redux Toolkit и работы с формами.
      </p>

      <ul className="hero-actions">
        <li>
          <a href="#phonebook" className="btn">
            Открыть Phonebook
          </a>
        </li>
      </ul>
    </HeroWrapper>
  );
};

export { Hero };
