import React, { useEffect, useState } from 'react'
import CityAndCountry from './component/CityAndCountry/CityAndCountry'
import DateTime from './component/DateTime/DateTime'
import { useSelector } from 'react-redux'
import {
    BackgroundsAndDiscriptionsType,
    RootObject,
    WeatherApi,
    weatherTC,
} from './redux/weatherReducer'
import {
    RootReducerType,
    useAppSelector,
    useTypedDispatch,
} from './redux/store'
import Form from './component/Form/Form'
import Spinner from './component/Spinner/Spinner'
import containerCommon from './App.module.scss'
import style from './App.module.scss'
import FutureDays from './component/FutureDays/FutureDays'

import Sheduler from './component/Sheduler/Sheduler'
import SelectFromApi from './component/Select/Select'
import TodayTemperature from './component/TodayTemperature/TodayTemperature'

function App() {
    let dispatch = useTypedDispatch()

    const [cache, setCache] = useState<RootObject>({} as RootObject)
    const [selectAPI, setSelectAPI] = useState<WeatherApi>('OpenWeather')

    let currentDescription = useSelector<RootReducerType, string>(
        (state) => state.weather.descriptionCurrent
    )
    const imagesAndColorBackground = useSelector<
        RootReducerType,
        Array<BackgroundsAndDiscriptionsType>
    >((state) => state.weather.backgroundsAndTypesOfWeather)

    const searchBackground = (
        currentDescription: string
    ): BackgroundsAndDiscriptionsType => {
        switch (currentDescription) {
            case 'Clear': {
                return imagesAndColorBackground[0]
            }
            case 'Clouds': {
                return imagesAndColorBackground[1]
            }
            case 'Rain': {
                return imagesAndColorBackground[2]
            }
            default:
                return { image: '', color: '', icon: '' }
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem('cache') === null) {
            dispatch(weatherTC({ cache: cache, api: selectAPI }))
        } else {
            let getCacheWeather = sessionStorage.getItem('cache')
            if (getCacheWeather !== null) {
                setCache(JSON.parse(getCacheWeather))
                dispatch(weatherTC(JSON.parse(getCacheWeather)))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectAPI])

    let futureTemperature = useAppSelector(
        (state) => state.weather.temperatureFuture
    )
    let loading = useAppSelector((state) => state.loading.loading)

    let backgroundAndIconForMain: BackgroundsAndDiscriptionsType =
        searchBackground(currentDescription)

    const futureWeatherDays = futureTemperature.map((item, index) => {
        return (
            <FutureDays
                imagesAndColorBackground={imagesAndColorBackground}
                temperatureNumber={item.temp}
                descriptor={item.descriptor}
                daysNumber={index + 1}
                key={index}
            />
        )
    })

    const onChangeSelect = (value: WeatherApi) => {
        setSelectAPI(value)
    }

    return (
        <div
            className={style.projectBlock}
            style={{ backgroundColor: `${backgroundAndIconForMain.color}` }}
        >
            <div
                className={`${containerCommon.container} ${style.container}`}
                style={{
                    backgroundImage: `url(${backgroundAndIconForMain.image})`,
                }}
            >
                <div className={style.dateTime}>
                    {loading && <Spinner />}
                    <div className={style.dateAndTime}>
                        <DateTime />
                    </div>
                    <div className={style.date}>
                        <div className={style.selectAndForm}>
                            <SelectFromApi onChangeSelect={onChangeSelect} />
                            <Form selectAPI={selectAPI} />
                        </div>
                        <CityAndCountry />
                    </div>
                </div>
                <Sheduler />
                <div className={style.futureForecast}>
                    <TodayTemperature
                        backgroundAndIconForMain={backgroundAndIconForMain}
                    />
                    {futureWeatherDays}
                </div>
            </div>
        </div>
    )
}

export default App
