import React,{useState} from "react";
import dayjs from 'dayjs';
import "./match-details-form.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';




const MatchDetailsForm = ({add , matchDetails}) => {
    const [newMatchDetails, setNewMatchDetails] = useState({
		teams:["",""],
        date:'',
        time:'',
        stadium:'',
        linesmen:["",""],
        mainReferee:''
	});
    if(matchDetails){
        setNewMatchDetails(matchDetails);
    }
    const { teams, date, time, stadium, linesmen, mainReferee } = newMatchDetails;
	const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

	const handleSubmit = async (event) => {
		event.preventDefault();

		console.log(`Submit new match details: ${newMatchDetails}`);
		// const { name, value } = event.target;
	
	};

	const handleChange = (event) => {
		const { value, name } = event.target;
		
		// setCredentials({
		// 	...userCredentials,
		// 	[name]: value
		// });
        // console.log(`name: ${name} value: ${value}`);
		setNewMatchDetails({ ...newMatchDetails, [name]: value });

		//we spread the credentials in order to then change the value of the email and password
	};
    return (
        <div className="match-details-container">
            <h2 className="title">{add? "Add" : "Edit"} Match</h2>
            <span>Fill out the form below to {add?"add":"edit"}  match</span>
            <form onSubmit={handleSubmit}>
				<FormInput
					type='text'
					name='team1'
					value={teams[0]}
					label='First Team'
                    handleChange={handleChange}
					required
				/>
                <FormInput
					handleChange={handleChange}
					type='text'
					name='team2'
					value={teams[1]}
					label='Second Team'
					required
				/>
                <FormInput
					handleChange={handleChange}
					type='text'
					name='stadium'
					value={stadium}
					label='Stadium Name'
					required
				/>
                <FormInput
					handleChange={handleChange}
					type='text'
					name='MainReferee'
					value={mainReferee}
					label='Main Referee Name'
					required
				/>
				{/* <FormInput
					handleChange={handleChange}
					type='text'
					name='date'
					value={date}
					label='Date'
					required
				/>
                <FormInput
					handleChange={handleChange}
					type='text'
					name='time'
					value={time}
					label='Time'
					required
				/> */}
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
					value={linesmen[0]}
					label='Lineman 1'
					required
				/>
                <FormInput
					handleChange={handleChange}
					type='text'
					name='lineman2'
					value={linesmen[1]}
					label='Lineman 2'
					required
				/>
				<div className='buttons'>
					<CustomButton onChange={handleSubmit} type='submit'>
						{add ? "Add Match" : "Edit Match"}
					</CustomButton>
				</div>
			</form>
        </div>
    )
};

export default MatchDetailsForm;
