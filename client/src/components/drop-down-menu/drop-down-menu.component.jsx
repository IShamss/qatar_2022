import React from "react";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const DropDownMenu=({label, options})=>{

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return(
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label={label}
                onChange={handleChange}
            >
                {options.map((option, index)=>(
                    
                    <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
            
            </Select>
        </FormControl>
    )
}

export default DropDownMenu