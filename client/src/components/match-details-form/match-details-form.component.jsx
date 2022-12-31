import React,{useEffect, useState} from "react";
import dayjs from 'dayjs';
import "./match-details-form.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormControl, IconButton, InputLabel, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2"
import instance from "../axios";
import addImage from "../../assets/add.png"
import Modal2 from "../Modal2"; 
const MatchDetailsForm = ({add , matchDetails}) => {
	const [stadiums,setStadiums]=React.useState([])
    useEffect(()=>{
    instance.get("/stadiums/"
		).then((response) => {
			setStadiums(response.data.stadiums)		
		
		  }).catch((err)=>{
			Swal.fire({
				title: 'Error!',
				text: err.response.data.message,
				icon: 'error',
				confirmButtonText: 'Ok'
			  })  });
	}
  ,[])
    const [newMatchDetails, setNewMatchDetails] = useState({
		team1:"",
		team2:"",
        date:'',
        time:'',
        stadium:'',
		lineman1:'',
		lineman2:'',
        mainReferee:''
	});
    if(matchDetails){
        setNewMatchDetails({...matchDetails});
    }
    const { team1,team2,lineman1,lineman2, dateTime, stadium, mainReferee } = newMatchDetails;
	const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
	const teamOptions = ["Option1", "Option2", "Option3"];
	const handleSubmit = async (event) => {
		event.preventDefault();

		console.log(`Submit new match details: ${newMatchDetails}`);
		// const { name, value } = event.target;
	
	};

	const handleChange = (event) => {
		const { value, name } = event.target;
		
		setNewMatchDetails({ ...newMatchDetails, [name]: value });

		//we spread the credentials in order to then change the value of the email and password
	};
	const handleChangeSelect=(event,name ) => {
		setNewMatchDetails({ ...newMatchDetails, [name]: event.target.value });
	};
	const [addStadiumModal,setAddStadiumModal]=useState(false)
    return (
        <div className="match-details-container">
			{ addStadiumModal&& <Modal2
            onHide={() => {
				setAddStadiumModal(false) 
				
			           }}
            data={{
              header: "Adding a Stadium ",
            }}
          ></Modal2>}
            <h2 className="title">{add? "Add" : "Edit"} Match</h2>
            <span>Fill out the form below to {add?"add":"edit"}  match</span>
            <form onSubmit={handleSubmit}>
			<FormControl fullWidth>

			<InputLabel id="demo-simple-select-label1">team1</InputLabel>
			<Select
          labelId="demo-simple-select-label1"
          id="demo-simple-select"
          value={team1}
          label="Age"
          onChange={(e)=>{handleChangeSelect(e,"1")}}
		  style={{"marginBottom":"30px",}}
        >
		{teamOptions.map((team)=>
          <MenuItem value={"m"}key={team}>{team}</MenuItem>)}
        </Select></FormControl>
		<FormControl fullWidth>

		<InputLabel id="demo-simple-select-label2">team2</InputLabel>
		<Select
          labelId="demo-simple-select-label2"
          id="demo-simple-select"
          value={team2}
          label="Age"
          onChange={(e)=>{handleChangeSelect(e,"1")}}
		  style={{"marginBottom":"30px"}}
        >
		{teamOptions.map((team)=>
          <MenuItem value={"m"} key={team}>{team}</MenuItem>)}
        </Select>
		</FormControl>
                <div className="image-drop">
				<FormControl fullWidth>

			<InputLabel id="demo-simple-select-label3">stadium</InputLabel>

				<Select
          labelId="demo-simple-select-label3"
          id="demo-simple-select"
          value={stadium}
          label="Age"
          onChange={(e)=>{handleChangeSelect(e,"stadium")}}
		  >
		{stadiums.map((s)=>
          <MenuItem value={s._id}key={s._id}>{s.name}</MenuItem>)}
        </Select>	
		</FormControl>
					
                 <IconButton onClick={()=>{setAddStadiumModal(true)}} ><img style={{width:"20px","marginTop":"10px"}} src={addImage}/></IconButton>
				 </div>
				<FormInput
					handleChange={handleChange}
					type='text'
					name='mainReferee'
					value={mainReferee}
					label='Main Referee Name'
					required
				/>
				
				<LocalizationProvider dateAdapter={AdapterDayjs}>

					<DateTimePicker
						label="Date&Time picker"
						value={value}
						onChange={handleChange}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>

                <FormInput
					handleChange={handleChange}
					type='text'
					name='lineman1'
					value={lineman1}
					label='Lineman 1'
					required
				/>
                <FormInput
					handleChange={handleChange}
					type='text'
					name='lineman2'
					value={lineman2}
					label='Lineman 2'
					required
				/>
				<div className='buttons'>
					<CustomButton onChange={handleSubmit} type='submit'>
						{add ? "Add Match" : "Save Changes"}
					</CustomButton>
				</div>
			</form>
        </div>
    )
};

export default MatchDetailsForm;
