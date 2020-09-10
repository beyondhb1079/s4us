import React from 'react';
import scholarships from '../test/scholarshipsTest';
import ScholarshipList from '../components/ScholarshipList';


function ScholarshipListView(){
    return(
        <div>
            <h1>SCHOLARSHIPS</h1>
            <ScholarshipList scholarships={scholarships}/>
        </div>
    );
}

export default ScholarshipListView;