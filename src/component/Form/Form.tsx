import React from 'react';
import {useFormik} from 'formik';
import {searchWeatherTC} from "../../redux/weatherReducer";
import style from "./Form.module.scss"
import {searchHomeWeatherTC} from "../../redux/homeWeatherReducer";
import {useTypedDispatch} from "../../redux/store";
import {Button, TextField} from "@material-ui/core";

type FormikType = {
    search?: string
}

type FormType = {
    selectAPI:string
}

const Form = (props:FormType) => {

    let dispatch = useTypedDispatch()

    const formik = useFormik({
        initialValues: {
            search: "",
        },
        validate: (values) => {
            const errors: FormikType = {};
            if (values.search === "") {
                errors.search = 'Invalid search address'
            }
            return errors
        },
        onSubmit: values => {
            if(props.selectAPI==="openWeatherAPI"){
                dispatch(searchWeatherTC(values.search))}
            else{
                dispatch(searchHomeWeatherTC(values.search))
            }
            values.search = ""
        },
    })

    return <form onSubmit={formik.handleSubmit} className={style.form}>
        <div>
            <TextField
                type="text"
                name="search"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.search}
                // className={style.input}
                placeholder={"Enter the city"}
            />
            <Button type="submit">
                Search
            </Button>
            {formik.errors.search ? <div style={{color: "black"}}>{formik.errors.search}</div> : null}
        </div>
    </form>


};

export default Form;