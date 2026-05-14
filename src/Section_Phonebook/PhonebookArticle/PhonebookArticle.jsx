import PropTypes from 'prop-types';
import { Article } from '@/components/Section_Phonebook/PhonebookArticle/PhonebookArticle.styled';

const PhonebookArticle = ({ subtitle, children }) => {
  return (
    <Article>
      <h3>{subtitle}</h3>
      {children}
    </Article>
  );
};

PhonebookArticle.propTypes = {
  subtitle: PropTypes.number.isRequired, //!проверка чтобы знать как будет выглядеть ошибка.  надо string
  children: PropTypes.node.isRequired,
};

export { PhonebookArticle };
