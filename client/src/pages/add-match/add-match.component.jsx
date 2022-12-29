// use form input component with custom button component
// to make a page that creates a new match
import React from "react";
import MatchDetailsForm from "../../components/match-details-form/match-details-form.component";

import "./add-match.styles.scss";

const AddMatch = () => {

    return (
        <div>
            <MatchDetailsForm add={true}/>
        </div>
    )
}

export default AddMatch;