import React from 'react';

type SelectType = {
    onChangeSelect :(value:string)=>void
}

const Select = (props:SelectType) => {

    return (
        <>
            <select onChange={(e)=>{
                props.onChangeSelect(e.target.value)
                sessionStorage.clear()
            }}>
                <option value="openWeatherAPI" defaultValue={"openWeatherAPI"}>openWeatherAPI</option>
                <option value="HomeOpenWeatherAPI">HomeOpenWeatherAPI</option>
            </select>

        </>
    );
};

export default Select;