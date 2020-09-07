import React from 'react';

function ScholarshipList(props){
    return(
        <div>
            <ul>
                <li>{props.name}</li>
                <li>{props.amount}</li>
                <li>{props.deadline}</li>
                <li>favorte btn</li>
            </ul>
            <p>{props.website}</p>
        </div>
    );
}

export default ScholarshipList;