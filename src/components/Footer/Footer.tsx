import { FooterWrapper } from './Footer.styled';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Потребуется импорт иконок, если используете их

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="footer-container">
        <p className="copyright">
          &copy; 2026 Auth & Phonebook. All rights reserved.
        </p>

        <ul className="footer-links">
          <li>
            <a
              href="https://github.com/maershaa/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub
                size={20}
                style={{ verticalAlign: 'middle', marginRight: '6px' }}
              />
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/valeriiayefremova/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin
                size={20}
                style={{ verticalAlign: 'middle', marginRight: '6px' }}
              />
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </FooterWrapper>
  );
};

export { Footer };
