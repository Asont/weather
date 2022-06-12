import React from 'react'
import style from './CityAndCountry.module.scss'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../redux/store'

const CityAndCountry = (props: any) => {
    let currentCountryCode = useSelector<RootReducerType, string>(
        (state) => state.weather.country
    )
    return (
        <div className={style.countryCity}>
            <div className={style.position}>{props.city}</div>
            <div className={style.position}>{currentCountryCode}</div>
        </div>
    )
}

export default CityAndCountry