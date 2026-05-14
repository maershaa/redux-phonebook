import { HeaderWrapper, Logo } from '@/components/Header/Heder.styled';
const Header = props => {
  return (
    <HeaderWrapper>
      <nav className="nav">
        <Logo href="/" aria-label="Logo of the project">
          Feedback <span>&</span> Phonebook
        </Logo>

        <ul className="nav-list">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#feedback">Feedback</a>
          </li>
          <li>
            <a href="#phonebook">Phonebook</a>
          </li>

          <li>
            <a href="#gallery"> Gallery </a>
          </li>
        </ul>
      </nav>
    </HeaderWrapper>
  );
};

export { Header };
