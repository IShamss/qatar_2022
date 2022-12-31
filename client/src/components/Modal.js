import React from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
const Background = (props) => {
  return <div className={classes.background} onClick={props.onHide}></div>;
};
const Body = (props) => {
  return (
    <div className={classes.body}>
      <div className={classes.header}>{props.data.header}</div>
      <div className={classes.message}>{props.data.message}</div>
      <div className={classes.actions}>
        <button
          className={classes.button}
          onClick={props.onOk ? props.onOk : props.onHide}
        >
          {props.data.button}
        </button>
      </div>
    </div>
  );
};
function Modal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Background onHide={props.onHide}></Background>,
        document.getElementById("background")
      )}
      {ReactDOM.createPortal(
        <Body onOk={props.onOk} onHide={props.onHide} data={props.data}></Body>,
        document.getElementById("background")
      )}
    </React.Fragment>
  );
}
export default Modal;
