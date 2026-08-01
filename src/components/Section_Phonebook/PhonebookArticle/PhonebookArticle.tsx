import { Article } from './PhonebookArticle.styled';
import { JSX } from 'react';

interface PhonebookArticleProps {
  subtitle: string;
  children: JSX.Element;
}

const PhonebookArticle = ({ subtitle, children }: PhonebookArticleProps) => {
  return (
    <Article>
      <h3>{subtitle}</h3>
      {children}
    </Article>
  );
};

export { PhonebookArticle };
