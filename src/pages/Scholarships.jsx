import React from 'react';
import scholarships from '../testdata/scholarships';
import ScholarshipList from '../components/ScholarshipList';
import FilterBar from '../components/FilterBar';

function Scholarships() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>SCHOLARSHIPS</h1>
      <FilterBar />
      <ScholarshipList scholarships={scholarships} />
    </div>
  );
}

export default Scholarships;
