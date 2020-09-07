import React from 'react';
import './scholarshipList.css';

function ScholarshipList(props){
    return(
        <div class="scholarship-row">
            <ul>
                <li>{props.name}</li>
                <li>{props.amount}</li>
                <li>{props.deadline}</li>
                <li>favorte btn</li>
            </ul>
        </div>
    );
}

export default ScholarshipList;