import React from 'react'

type DynamicDayType = {
    num: number
}

const DynamicDay = (props: DynamicDayType) => {
    const date = new Date()

    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const f = (date: any, num: number) => {
        let day = date.getDay()
        if (day + num >= 7) {
            return day + num - 7
        }
        return `${day + num}`
    }
    let a = +f(date, props.num)

    return <>{days[a]}</>
}

export default DynamicDay