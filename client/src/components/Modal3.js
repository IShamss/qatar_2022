import React, { useEffect, useState } from "react";
import classes from "./Modal3.module.css";
import ReactDOM from "react-dom";
import FormInput from "./form-input/form-input.component";
import CustomButton from "./custom-button/custom-button.component";
import Swal from "sweetalert2";
import instance from "./axios";
import { Button } from "@mui/material";
import usePagination from "@mui/material/usePagination/usePagination";
import { useParams } from "react-router-dom";
import { loadUser } from "../assets/utils";
const Background = (props) => {
    return <div className={classes.background} onClick={props.onHide}></div>;
};
const Body = (props) => {
    const params = useParams();
    function k(o) {
        return Array.from(Array(o).keys());
    }
    const [width, setWidth] = useState(props.width);
    const [widthArray, setWidthArray] = useState(k(props.width));
    const [heightArray, setHeightArray] = useState(k(props.height));
    const [valid, setValid] = useState(props.valid);

    const [chosen, setChosen] = useState([]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        instance
            .post("/reservation", {
                match: params.matchId,
                user: loadUser(),
                // user: "63af4c89f8d580a9469b2fb6",
                places: chosen,
            })
            .then((response) => {
                Swal.fire({
                    title: "Success!",
                    text: "the reservation done successfully",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
                props.onHide();
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
                {heightArray.map((h) => (
                    <div className={classes.row} key={`h` + h}>
                        {widthArray.map((w) => (
                            <div
                                key={h * width + 1 + w}
                                style={{ width: `calc(100%/${width})` }}
                                className={`${classes.seat} 
                                ${
                                    chosen.indexOf(h * width + 1 + w) != -1 &&
                                    classes.chosen
                                } 
                                ${
                                    valid.indexOf(h * width + 1 + w) == -1 &&
                                    classes.invalid
                                }
                                `}
                                onClick={() => {
                                    if (valid.indexOf(h * width + 1 + w) !== -1)
                                        if (
                                            chosen.indexOf(h * width + 1 + w) !=
                                            -1
                                        )
                                            setChosen((prev) => {
                                                let index = prev.indexOf(
                                                    h * width + 1 + w
                                                );
                                                let re = prev.splice(
                                                    index,
                                                    index + 1
                                                );
                                                return [...prev];
                                            });
                                        else
                                            setChosen((prev) => {
                                                return [
                                                    ...prev,
                                                    h * width + 1 + w,
                                                ];
                                            });
                                }}>
                                {h * width + 1 + w}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <form className={classes.form} onSubmit={handleSubmit}>
                <button
                    className={classes.button}
                    type='submit'
                    disabled={!chosen.length}>
                    reserve
                </button>
            </form>
        </div>
    );
};
function Modal3(props) {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Background onHide={props.onHide}></Background>,
                document.getElementById("background")
            )}
            {ReactDOM.createPortal(
                <Body
                    width={props.width}
                    height={props.height}
                    onOk={props.onOk}
                    onHide={props.onHide}
                    data={props.data}
                    valid={props.valid}></Body>,
                document.getElementById("background")
            )}
        </React.Fragment>
    );
}
export default Modal3;
