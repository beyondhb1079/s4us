import React from 'react';
import scholarships from '../testdata/scholarships';
import {useParams} from 'react-router-dom';

function ScholarshipDetailsPage(){
    const {id} = useParams();
    //will get replaced once we make actual api calls
    const scholarship= scholarships.filter(item => item.id === id)[0];

    return(
        scholarship ? 
        <div>
            <h1>{scholarship.name}</h1>
            <h2>{scholarship.amount}</h2>
            <h3>{scholarship.deadline}</h3>
            <h3>{scholarship.website}</h3>
            <h3>{scholarship.school}</h3>
            <h3>{scholarship.year}</h3>
            <p>{scholarship.description}</p>
        </div> : <h1>Scholarship Not Found</h1>
    );
}

export default ScholarshipDetailsPage;