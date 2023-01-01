import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "../match-details/match-details.styles.scss";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import Swal from "sweetalert2";
import instance from "../../components/axios";
import addImage from "../../assets/add.png";
import Modal2 from "../../components/Modal2";
import { useParams } from "react-router-dom";

const EditMatch = () => {
    const params = useParams();
    const [stadiums, setStadiums] = React.useState([]);
    const [teams, setTeams] = React.useState([]);
    useEffect(() => {
        instance
            .get("/stadiums/")
            .then((response) => {
                setStadiums(response.data.stadiums);
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error!",
                    text: err.response.data.message,
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            });

        instance
            .get("/teams/")
            .then((response) => {
                setTeams(response.data.teams);
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error!",
                    text: err.response.data.message,
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            });
        instance
            .get(`/match/${params.matchId}`)
            .then((response) => {
                setNewMatchDetails((prev) => {
                    return { ...prev, ...response.data.match };
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
    }, []);
    const [newMatchDetails, setNewMatchDetails] = useState({
        team1: "",
        team2: "",
        date: new Date(),
        stadium: "",
        line_man_1: "",
        line_man_2: "",
        main_referee: "",
    });
    const {
        team1,
        team2,
        line_man_1,
        line_man_2,
        date,
        stadium,
        main_referee,
    } = newMatchDetails;
    const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
    const teamOptions = ["Option1", "Option2", "Option3"];
    const handleSubmit = async (event) => {
        event.preventDefault();
        let send = {
            ...newMatchDetails,
        };
        delete send["__v"];
        delete send["_id"];
        instance
            .patch(`/match/${params.matchId}`, send)
            .then((response) => {
                Swal.fire({
                    title: "Success!",
                    text: "the match has been updated successfully",
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
        const { value, name } = event.target;

        setNewMatchDetails({ ...newMatchDetails, [name]: value });

        //we spread the credentials in order to then change the value of the email and password
    };
    const handleChangeSelect = (event, name) => {
        setNewMatchDetails({ ...newMatchDetails, [name]: event.target.value });
    };
    const handleChangeDate = (newValue) => {
        setNewMatchDetails({ ...newMatchDetails, date: newValue });
    };
    const [addStadiumModal, setAddStadiumModal] = useState(false);
    return (
        <div className="edit-profile-container">
            <div className={`sign-up half-width`}>
                <div className="match-details-container">
                    {addStadiumModal && (
                        <Modal2
                            onHide={() => {
                                setAddStadiumModal(false);
                                instance
                                    .get("/stadiums/")
                                    .then((response) => {
                                        setStadiums(response.data.stadiums);
                                    })
                                    .catch((err) => {
                                        Swal.fire({
                                            title: "Error!",
                                            text: err.response.data.message,
                                            icon: "error",
                                            confirmButtonText: "Ok",
                                        });
                                    });
                            }}
                            data={{
                                header: "Adding a Stadium ",
                            }}
                        ></Modal2>
                    )}
                    <h2 className="title">Edit Match</h2>
                    <span>Fill out the form below to {"edit"} match</span>
                    <form
                        onSubmit={handleSubmit}
                        style={{ paddingTop: "30px" }}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label1">
                                team1
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label1"
                                id="demo-simple-select"
                                value={team1}
                                label="Age"
                                onChange={(e) => {
                                    handleChangeSelect(e, "team1");
                                }}
                                style={{ marginBottom: "30px" }}
                                required
                            >
                                {teams.map((team) => (
                                    <MenuItem value={team._id} key={team._id}>
                                        {team.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label2">
                                team2
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label2"
                                id="demo-simple-select"
                                value={team2}
                                label="Age"
                                onChange={(e) => {
                                    handleChangeSelect(e, "team2");
                                }}
                                style={{ marginBottom: "30px" }}
                                required
                            >
                                {teams.map((team) => (
                                    <MenuItem value={team._id} key={team._id}>
                                        {team.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className="image-drop">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label3">
                                    stadium
                                </InputLabel>

                                <Select
                                    labelId="demo-simple-select-label3"
                                    id="demo-simple-select"
                                    value={stadium}
                                    label="Age"
                                    onChange={(e) => {
                                        handleChangeSelect(e, "stadium");
                                    }}
                                    required
                                >
                                    {stadiums.map((s) => (
                                        <MenuItem value={s._id} key={s._id}>
                                            {s.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <IconButton
                                onClick={() => {
                                    setAddStadiumModal(true);
                                }}
                            >
                                <img
                                    style={{ width: "20px", marginTop: "10px" }}
                                    src={addImage}
                                />
                            </IconButton>
                        </div>
                        <FormInput
                            handleChange={handleChange}
                            type="text"
                            name="main_referee"
                            value={main_referee}
                            label="Main Referee Name"
                            required
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Date&Time picker"
                                value={date}
                                onChange={handleChangeDate}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                        </LocalizationProvider>

                        <FormInput
                            handleChange={handleChange}
                            type="text"
                            name="line_man_1"
                            value={line_man_1}
                            label="Lineman 1"
                            required
                        />
                        <FormInput
                            handleChange={handleChange}
                            type="text"
                            name="line_man_2"
                            value={line_man_2}
                            label="Lineman 2"
                            required
                        />
                        <div className="buttons">
                            <CustomButton onChange={handleSubmit} type="submit">
                                {"Save Changes"}
                            </CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditMatch;
