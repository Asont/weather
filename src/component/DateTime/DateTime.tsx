import React, {useEffect, useState} from 'react';
import style from "./DateTime.module.scss"


const DateTime = () => {
    useEffect(() => {
        window.setInterval(() => {
            setDate(new Date())
        }, 1000)
    }, [])


    const [date, setDate] = useState<Date>(new Date())

    let timeData = date.toLocaleString('en-GB', {hour: "numeric", minute: "numeric", hour12: true})
    let dateData = date.toLocaleString('en-GB', {month: "long", day: "2-digit", weekday: "long", year:"numeric"})

    return (
        <>
            <div className={style.time}>{timeData}</div>
            <div className={style.date}>{dateData}</div>
        </>
    );
};

export default DateTime;
