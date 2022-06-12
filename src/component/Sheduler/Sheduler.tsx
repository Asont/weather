import React from 'react'
import style from './Sheduler.module.scss'
import EditableInputTime from '../EditableInput/EditableInputTime'
import EditableInputText from '../EditableInput/EditableInputText'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../redux/store'
import { DataType } from '../../redux/shedulerReducer'

const Sheduler = () => {
    const data = useSelector<RootReducerType, Array<DataType>>(
        (state) => state.sheduler.shedulerData
    )

    const newData = data.map((item, index) => {
        return (
            <div key={index}>
                <EditableInputTime time={item.time} />
                <EditableInputText text={item.text} />
            </div>
        )
    })

    return <div className={style.editableSpan}>{newData}</div>
}

export default Sheduler;