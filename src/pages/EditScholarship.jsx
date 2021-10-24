import React from 'react';
import { useLocation } from 'react-router-dom';

function EditScholarship() {
  const location = useLocation();
  console.log(location?.state?.scholarship);
  return (
    <>
      <p>hello there</p>
    </>
  );
}

export default EditScholarship;
