import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { WeatherApi } from '../../redux/weatherReducer'

type SelectType = {
    onChangeSelect: (value: WeatherApi) => void
}

export default function SelectFromApi(props: SelectType) {
    const [api, setApi] = useState<WeatherApi>('OpenWeather')

    const handleChange = (event: SelectChangeEvent) => {
        setApi(event.target.value as WeatherApi)
        props.onChangeSelect(event.target.value as WeatherApi)
        sessionStorage.clear()
    }

    return (
        <FormControl
            sx={{ m: 1, minWidth: 120, alignItems: 'center', margin: '6px 0' }}
            size="small"
        >
            <InputLabel>API</InputLabel>
            <Select value={api} label="API" onChange={handleChange}>
                <MenuItem value={'OpenWeather'}>OpenWeatherAPI</MenuItem>
                <MenuItem value={'AnotherAPI'}>HomeOpenWeatherAPI</MenuItem>
            </Select>
        </FormControl>
    )
}
