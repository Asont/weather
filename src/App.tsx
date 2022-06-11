import React, {useEffect, useState} from 'react';
import CityAndCountry from "./component/CityAndCountry/CityAndCountry";
import DateTime from "./component/DateTime/DateTime";
import Temperature from "./component/Temperature/Temperature";
import {useSelector} from "react-redux";
import {
    BackgroundsAndDiscriptionsType,
    RootObject,
    WeatherApi,
    weatherTC
} from "./redux/weatherReducer";
import {RootReducerType, useAppSelector, useTypedDispatch} from "./redux/store";
import Form from "./component/Form/Form";
import Spinner from "./component/Spinner/Spinner";
import containerCommon from "./App.module.scss"
import style from "./App.module.scss"
import FutureDays from "./component/FutureDays/FutureDays";

import Sheduler from "./component/Sheduler/Sheduler";
import SelectFromApi from "./component/Select/Select";



function App() {
    let dispatch = useTypedDispatch()

    const [cache, setCache] = useState<RootObject>({} as RootObject)
    const [selectAPI, setSelectAPI] = useState<WeatherApi>("OpenWeather")

    let currentDescription = useSelector<RootReducerType, string>((state) => state.weather.descriptionCurrent)
    const imagesAndColorBackground = useSelector<RootReducerType, Array<BackgroundsAndDiscriptionsType>>((state) => state.weather.backgroundsAndDiscriptions)

    const searchBackground = (currentDescription: string): BackgroundsAndDiscriptionsType => {
        switch (currentDescription) {
            case "Clear": {
                return imagesAndColorBackground[0]
            }
            case "Clouds": {
                return imagesAndColorBackground[1]
            }
            case "Rain": {
                return imagesAndColorBackground[2]
            }
            default:
                return {image: "", color: "", icon: ""}
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem("cache") === null) {
                dispatch(weatherTC({cache: cache, api: selectAPI}))
        } else {
            let getCacheWeather = sessionStorage.getItem("cache")
            if (getCacheWeather !== null) {
                setCache(JSON.parse(getCacheWeather))
                dispatch(weatherTC(JSON.parse(getCacheWeather)))
            }
        }
    }, [cache, dispatch, selectAPI])


    let temperatureCurrent = useAppSelector((state) => state.weather.temperatureCurrent)
    let futureTemperature = useAppSelector((state) => state.weather.temperatureFuture)
    let city = useAppSelector((state) => state.weather.city)
    let loading = useAppSelector((state) => state.loading.loading)
    // const onClickHandler = () => {
    //     sessionStorage.clear()
    // }

    let backgroundAndIconForMain: BackgroundsAndDiscriptionsType = searchBackground(currentDescription)

    const futureWeatherDays = futureTemperature.map((item, index) => {
        return (
            <FutureDays imagesAndColorBackground={imagesAndColorBackground} temperatureNumber={item.temp}
                        descriptor={item.descriptor} daysNumber={index + 1} key={index}/>)
    })

    const onChangeSelect = (value: WeatherApi) => {
        setSelectAPI(value)
    }

    return (
        <div className={style.projectBlock} style={{backgroundColor: `${backgroundAndIconForMain.color}`}}>
            <div className={`${containerCommon.container} ${style.container}`}
                 style={{backgroundImage: `url(${backgroundAndIconForMain.image})`}}>
                {/*<button onClick={onClickHandler}>On</button>*/}

                <div className={style.dateTime}>
                    {loading && <Spinner/>}
                    <div className={style.dateAndTime}>
                        <DateTime/>
                    </div>
                    <div className={style.date}>
                        <div className={style.selectAndForm}>
                        <SelectFromApi onChangeSelect={onChangeSelect}/>
                        <Form selectAPI={selectAPI}/>
                        </div>
                        <CityAndCountry city={city}/>
                    </div>

                </div>
                <Sheduler/>
                <div className={style.futureForecast}>
                    <div className={style.todayForecastitem}>
                        <div className={style.todayItem}>Today</div>
                        <img src={backgroundAndIconForMain.icon} alt="weather icon"
                             style={{width: "50px", height: "50px"}}/>
                        <div><Temperature temp={temperatureCurrent}/>&#176; C</div>
                    </div>
                    {futureWeatherDays}
                </div>
            </div>
        </div>


    );
}

export default App;
