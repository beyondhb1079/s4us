import React from 'react';
import FilterDropDown from './FilterDropdown';

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

const amounts = {
  500: '> 500',
  1000: '> 1000',
  5000: '> 5000',
};

function FilterBar() {
  return (
    <div>
      <FilterDropDown label="Major" items={majors} />
      <FilterDropDown label="Grade" items={grades} />
      <FilterDropDown label="Amount" items={amounts} />
    </div>
  );
}

export default FilterBar;
