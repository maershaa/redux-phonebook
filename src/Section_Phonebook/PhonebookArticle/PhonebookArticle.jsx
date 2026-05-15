import { Article } from '@/Section_Phonebook/PhonebookArticle/PhonebookArticle.styled';

const PhonebookArticle = ({ subtitle, children }) => {
  return (
    <Article>
      <h3>{subtitle}</h3>
      {children}
    </Article>
  );
};

export { PhonebookArticle };
