import React from 'react';
import scholarships from '../test/scholarshipsTest';


function ScholarshipDetailsPage({match}){
    //will get replaced once we make actual api calls
    const scholarshipInfo = scholarships.filter(item => item.id === match.params.id);

    return(
        <div>
            <h1>{scholarshipInfo[0].name}</h1>
            <h2>${scholarshipInfo[0].amount}</h2>
            <h3>{scholarshipInfo[0].deadline}</h3>
            <h3>{scholarshipInfo[0].website}</h3>
            <h3>{scholarshipInfo[0].school}</h3>
            <h3>{scholarshipInfo[0].year}</h3>
            <p>{scholarshipInfo[0].description}</p>
        </div>
    );
}

export default ScholarshipDetailsPage;