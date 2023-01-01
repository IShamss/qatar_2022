import React from "react";
import SignUp from "../../components/sign-up/sign-up.component";

const EditProfilePage = ({currentUser}) => {
    return (
        <div>
            <SignUp currentUser={currentUser} />
        </div>
    );
}

export default EditProfilePage;