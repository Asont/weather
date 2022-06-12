import React, { ChangeEvent, useState } from 'react'
import style from '../Sheduler/Sheduler.module.scss'

type EditableInputTimeType = {
    time: string
}

const EditableInputTime = (props: EditableInputTimeType) => {
    let [time, setTime] = useState(props.time)
    const [editTime, setEditTime] = useState(false)

    const editModeTime = () => {
        setEditTime(true)
    }
    const viewModeTime = () => {
        setEditTime(false)
    }

    const onClickTimeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTime(e.currentTarget.value)
    }

    return (
        <>
            {editTime ? (
                <input
                    className={style.inputStyle}
                    type="time"
                    value={time}
                    onChange={onClickTimeHandler}
                    autoFocus
                    onBlur={viewModeTime}
                />
            ) : (
                <p onDoubleClick={editModeTime}>{time}</p>
            )}
        </>
    )
}

export default EditableInputTime;