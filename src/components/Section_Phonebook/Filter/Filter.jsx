import { Wrapper, FilterInput } from './Filter.styled';
import { IoIosSearch } from 'react-icons/io';

const Filter = ({ value, onChange }) => {
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
