import { SectionWrapper } from '@/components/Section/Section.styled';
import { FC, JSX } from 'react';

type SectionProps = {
  title?: string;
  children: JSX.Element;
};

const Section = ({ title, children }: SectionProps) => {
  return (
    <SectionWrapper>
      {title && <h2>{title}</h2>}
      {children}
    </SectionWrapper>
  );
};

export { Section };
