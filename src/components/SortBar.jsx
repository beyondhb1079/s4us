import React from 'react';
import FilterDropDown from './FilterDropdown';

const sort = {
  amountLow: 'Amount (Low to High)',
  amountHigh: 'Amount (High to Low)',
  deadlineEarly: 'Deadline (Earliest to Latest)',
  deadlineLatest: 'Deadline (Latest to Earliest)',
};

function FilterBar() {
  return (
    <div>
      <FilterDropDown label="Sorting" items={sort} />
    </div>
  );
}

export default FilterBar;
