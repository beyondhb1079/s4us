import React from 'react';
import FilterDropDown from './FilterDropdown';
import AmountFilter from './AmountFilter';

const majors = {
  che: 'Chemical Eng.',
  cs: 'Computer Science',
  ds: 'Data Science',
};

const grades = {
  12: 'Highschool Senior',
  13: 'College Freshman',
  14: 'College Sophomore',
  15: 'College Junior',
  16: 'College Senior',
};

function FilterBar() {
  return (
    <div>
      <FilterDropDown label="Major" items={majors} />
      <FilterDropDown label="Grade" items={grades} />
      <AmountFilter />
    </div>
  );
}

export default FilterBar;
