import React from 'react'
import style from './CityAndCountry.module.scss'
import { useAppSelector } from '../../redux/store'

const CityAndCountry = () => {
    let currentCountryCode = useAppSelector((state) => state.weather.country)
    let city = useAppSelector((state) => state.weather.city)

    return (
        <div className={style.countryCity}>
            <div className={style.position}>{city}</div>
            <div className={style.position}>{currentCountryCode}</div>
        </div>
    )
}

export default CityAndCountry