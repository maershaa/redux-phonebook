import { Wrapper, FilterInput } from './Filter.styled';
import { IoIosSearch } from 'react-icons/io';
import { ChangeEvent } from 'react';

interface FilterProps {
  value: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

const Filter = ({ value, onChange }: FilterProps) => {
  return (
    <Wrapper>
      <IoIosSearch />
      <FilterInput
        name="filter"
        onChange={onChange}
        placeholder="Search by name or number"
        type="search"
        value={value}
        aria-label="Search contacts"
      ></FilterInput>
    </Wrapper>
  );
};

export { Filter };
