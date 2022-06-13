import React from 'react'
import DynamicDay from '../DinamicDay/DynamicDay'
import Temperature from '../Temperature/Temperature'
import style from './FutureDays.module.scss'
import { BackgroundsAndDiscriptionsType } from '../../redux/weatherReducer'

type FutureDaysType = {
    imagesAndColorBackground: BackgroundsAndDiscriptionsType[]
    temperatureNumber: number
    daysNumber: number
    descriptor: string
}

const FutureDays = (props: FutureDaysType) => {
    const searchIcons = (currentDescription: string): string => {
        switch (currentDescription) {
            case 'Clear': {
                return props.imagesAndColorBackground[0].icon
            }
            case 'Clouds': {
                return props.imagesAndColorBackground[1].icon
            }
            case 'Rain': {
                return props.imagesAndColorBackground[2].icon
            }
            default:
                return currentDescription
        }
    }

    let iconForDay = searchIcons(props.descriptor)

    return (
        <div className={style.futureForecastItem}>
            <div className={style.futureDayItem}>
                <DynamicDay num={props.daysNumber} />
            </div>
            <img src={iconForDay} alt={'icon'} />
            <div>
                <Temperature temp={props.temperatureNumber} />
                &#176; C
            </div>
        </div>
    )
}

export default FutureDays;