import React from 'react'

type TemperatureType = {
    temp: number
}

const Temperature = (props: TemperatureType) => {
    let t = Math.round(props.temp)

    return <>{t}</>
}

export default Temperature