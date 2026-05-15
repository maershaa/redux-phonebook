import { Component } from 'react';
import { ButtonEl } from './Button.styled';
const Button = props => {
  const { text, onClick, ...rest } = props;
  // В ...rest у нас передается название класса
  return (
    <ButtonEl type="button" onClick={onClick} {...rest}>
      {text.trim()}
    </ButtonEl>
  );
};

export { Button };
