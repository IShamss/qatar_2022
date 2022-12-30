// use form input component with custom button component
// to make a page that creates a new match
import React from "react";
import { useParams } from "react-router-dom";
import MatchDetailsForm from "../../components/match-details-form/match-details-form.component";


const EditMatch = () => {
    const params = useParams();
    
    return (
        <div>
            <MatchDetailsForm add={false}/>
        </div>
    )
}

export default EditMatch;