import React, { useState } from "react";
import classes from "./Modal2.module.css";
import ReactDOM from "react-dom";
import FormInput from "./form-input/form-input.component";
import CustomButton from "./custom-button/custom-button.component";
import Swal from "sweetalert2";
import instance from "./axios";
const Background = (props) => {
    return <div className={classes.background} onClick={props.onHide}></div>;
};
const Body = (props) => {
    const [newstadiumDetails, setNewStadiumDetails] = useState({
        name: "",
        length: "",
        width: "",
    });
    // if (matchDetails) {
    //     setNewMatchDetails({ ...matchDetails });
    // }
    const { name, length, width } = newstadiumDetails;
    const handleChange = (event) => {
        const { value, name } = event.target;

        setNewStadiumDetails({ ...newstadiumDetails, [name]: value });

        //we spread the credentials in order to then change the value of the email and password
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        instance
            .post("/stadium", {
                newstadiumDetails,
            })
            .then((response) => {
                Swal.fire({
                    title: "Success!",
                    text: "the stadium has been created successfully",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
                setNewStadiumDetails({
                    name: "",
                    length: "",
                    width: "",
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error!",
                    text: err.response.data.message,
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            });
    };

    return (
        <div className={classes.body}>
            <div className={classes.header}>{props.data.header}</div>
            <div className={classes.message}>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        handleChange={handleChange}
                        type="text"
                        name="name"
                        value={name}
                        label="Name"
                        required
                    />
                    <FormInput
                        handleChange={handleChange}
                        type="number"
                        name="length"
                        value={length}
                        label="length"
                        required
                    />
                    <FormInput
                        handleChange={handleChange}
                        type="number"
                        name="width"
                        value={width}
                        label="width"
                        required
                    />
                    <div className="buttons">
                        <CustomButton onChange={handleSubmit} type="submit">
                            add stadium
                            {/* {add ? "Add Match" : "Save Changes"} */}
                        </CustomButton>
                    </div>
                </form>
            </div>
        </div>
    );
};
function Modal2(props) {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Background onHide={props.onHide}></Background>,
                document.getElementById("background")
            )}
            {ReactDOM.createPortal(
                <Body
                    onOk={props.onOk}
                    onHide={props.onHide}
                    data={props.data}
                ></Body>,
                document.getElementById("background")
            )}
        </React.Fragment>
    );
}
export default Modal2;
