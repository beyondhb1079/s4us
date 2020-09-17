import React from 'react';
import scholarships from '../testdata/scholarships';
import ScholarshipList from '../components/ScholarshipList';

function ScholarshipListPage() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>SCHOLARSHIPS</h1>
      <ScholarshipList scholarships={scholarships} />
    </div>
  );
}

export default ScholarshipListPage;
