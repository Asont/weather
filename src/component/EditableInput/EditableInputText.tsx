import React, {ChangeEvent, useState} from 'react';
import style from "../Sheduler/Sheduler.module.scss";

type EditableInputTextType = {
    text:string
}

const EditableInputText = (props:EditableInputTextType) => {

    let [text, setText] = useState(props.text)
    const [editText, setEditText] = useState(false)

    const editModeText = () => {
        setEditText(true)
    }
    const viewModeText = ()=>{
        setEditText(false)
    }

    const onClickTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }


    return (
        <>
            {editText ?
                <input className={style.inputStyle} type="text" value={text} onChange={onClickTextHandler} autoFocus onBlur={viewModeText}/>
                : <p onDoubleClick={editModeText} className={style.text}>{text}</p>
            }
        </>
    );
};

export default EditableInputText;
