// import React from 'react';
//
// type SelectType = {
//     onChangeSelect :(value:string)=>void
// }
//
// const Select = (props:SelectType) => {
//
//     return (
//         <>
//             <select onChange={(e)=>{
//                 props.onChangeSelect(e.target.value)
//                 sessionStorage.clear()
//             }}>
//                 <option value="OpenWeatherAPI" defaultValue={"openWeatherAPI"}>openWeatherAPI</option>
//                 <option value="HomeOpenWeatherAPI">HomeOpenWeatherAPI</option>
//             </select>
//
//         </>
//     );
// };
//
// export default Select;

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type SelectType = {
    onChangeSelect :(value:string)=>void
}

export default function SelectFromApi(props:SelectType) {

    const [age, setAge] = React.useState("OpenWeatherAPI");

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value)
        props.onChangeSelect(event.target.value);
        sessionStorage.clear()
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">API</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={age}
                label="API"
                onChange={handleChange}
            >
                <MenuItem value={"OpenWeatherAPI"}>OpenWeatherAPI</MenuItem>
                <MenuItem value={"HomeOpenWeatherAPI"}>HomeOpenWeatherAPI</MenuItem>
            </Select>
        </FormControl>
    );
}
