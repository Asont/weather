import React from 'react'
import Temperature from '../Temperature/Temperature'
import style from './TodayTemperature.module.scss'
import { useAppSelector } from '../../redux/store'
import { BackgroundsAndDiscriptionsType } from '../../redux/weatherReducer'

type TodayTemperatureType = {
    backgroundAndIconForMain: BackgroundsAndDiscriptionsType
}

const TodayTemperature = (props: TodayTemperatureType) => {
    let temperatureCurrent = useAppSelector(
        (state) => state.weather.temperatureCurrent
    )

    return (
        <div className={style.todayForecastItem}>
            <div className={style.todayItem}>Today</div>
            <img src={props.backgroundAndIconForMain.icon} alt="weather icon" />
            <div>
                <Temperature temp={temperatureCurrent} />
                &#176; C
            </div>
        </div>
    )
}

export default TodayTemperature