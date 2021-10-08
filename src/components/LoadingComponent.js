import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
export const Loading = () => {
    return(
        <div className="col-12">
            <span>
                <FontAwesomeIcon icon={faSpinner} /> 
            </span>
            <p>Loading . . .</p>
        </div>
    );
};