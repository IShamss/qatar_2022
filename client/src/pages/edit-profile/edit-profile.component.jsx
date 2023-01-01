import React, { useState, useEffect } from "react";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import "../../components/sign-up/sign-up.styles.scss";
import instance from "../../components/axios";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { loadUser,saveUser } from "../../assets/utils";

const EditProfilePage = () => {
    const currentUser = loadUser();
    const [userCredentials, setCredentials] = useState({
        id: currentUser._id,
        password: currentUser.password,
        confirmPassword: "",
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        birth_date: new Date(currentUser.birth_date),
        gender: currentUser.gender,
        nationality: currentUser.nationality,
    });

    const {
        password,
        confirmPassword,
        first_name,
        last_name,
        birth_date,
        gender,
        nationality,
    } = userCredentials;
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords Does Not Match");
            return;
        }
        instance
            .patch(`/user/${userCredentials.id}`, {
                password: password,
                first_name: first_name,
                last_name: last_name,
                birth_date: birth_date,
                gender: gender,
                nationality: nationality,
            })
            .then((response) => {
                saveUser(response.data.user);
                Swal.fire({
                    title: "Success!",
                    text: "your account has been updated successfully :D",
                    icon: "success",
                    confirmButtonText: "Ok",
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    };

    const handleChangeDate = (newValue) => {
        setCredentials({ ...userCredentials, birth_date: newValue });
    };
    const handleChangeGender = (event) => {
        setCredentials({ ...userCredentials, gender: event.target.value });
    };
    return (
        <div className="edit-profile-container">
            <div className={`sign-up half-width`}>
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        label="Password"
                        onChange={handleChange}
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        label="Confirm Password"
                        onChange={handleChange}
                        required
                    />
                    <FormInput
                        type="text"
                        name="first_name"
                        value={first_name}
                        label="First Name"
                        onChange={handleChange}
                        required
                    />
                    <FormInput
                        type="text"
                        name="last_name"
                        value={last_name}
                        label="Last Name"
                        onChange={handleChange}
                        required
                    />
                    <FormInput
                        type="text"
                        name="nationality"
                        value={nationality ? nationality : ""}
                        label="Nationality"
                        onChange={handleChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Gender
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="Age"
                            onChange={handleChangeGender}
                            style={{ marginBottom: "30px" }}
                        >
                            <MenuItem value={"m"}>Male</MenuItem>
                            <MenuItem value={"f"}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Birth Date"
                            inputFormat="MM/dd/yyyy"
                            value={birth_date}
                            onChange={handleChangeDate}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    style={{ marginBottom: "30px" }}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    <CustomButton inverted type="submit">
                        edit
                    </CustomButton>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePage;
