import React from 'react';
import scholarships from '../testdata/scholarships';
import ScholarshipList from '../components/ScholarshipList';
import Filter from '../components/Filter';

function Scholarships() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>SCHOLARSHIPS</h1>
      <Filter />
      <ScholarshipList scholarships={scholarships} />
    </div>
  );
}

export default Scholarships;
