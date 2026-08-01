import { ButtonEl } from './Button.styled';
import { ButtonHTMLAttributes } from 'react';

// ButtonHTMLAttributes<HTMLButtonElement> — уже включает className, disabled, id, style и десятки других валидных HTML-атрибутов кнопки. Теперь TS точно знает, что можно передать в {...rest}, и подсветит опечатку или несуществующий атрибут.
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick: () => void; //onClick уже входит в ButtonHTMLAttributes, так что технически можно было бы не переопределять его
}

const Button = (props: ButtonProps) => {
  const { text, onClick, ...rest } = props;
  // В ...rest у нас передается название класса если есть
  return (
    <ButtonEl type="button" onClick={onClick} {...rest}>
      {text.trim()}
    </ButtonEl>
  );
};

export { Button };
