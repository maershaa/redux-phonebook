import { SectionWrapper } from '@/components/Section/Section.styled';

const Section = ({ id, title, children }) => {
  return (
    <SectionWrapper id={id}>
      {title && <h2>{title}</h2>}
      {children}
    </SectionWrapper>
  );
};

export { Section };
