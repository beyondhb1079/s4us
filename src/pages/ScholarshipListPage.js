import React from 'react';
import scholarships from '../test/scholarshipsTest';
import ScholarshipList from '../components/ScholarshipList';

function createScholarshipList(scholarship){
    return (
        <ScholarshipList 
        id={scholarship.id}
        name={scholarship.name}
        amount={scholarship.amount}
        deadline={scholarship.deadline}
        website={scholarship.website}
        />
    );
}

function ScholarshipListView(){
    return(
        <div>
            <h1>SCHOLARSHIPS</h1>
            {scholarships.map(createScholarshipList)}
        </div>
    );
}

export default ScholarshipListView;