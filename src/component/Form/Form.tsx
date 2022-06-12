import React, { useState } from 'react'
import { useFormik } from 'formik'
import { searchWeatherTC, WeatherApi } from '../../redux/weatherReducer'
import style from './Form.module.scss'
import { useTypedDispatch } from '../../redux/store'
import { Button, TextField } from '@material-ui/core'

type FormikType = {
    search?: string
}

type FormType = {
    selectAPI: WeatherApi
}

const Form = (props: FormType) => {
    let dispatch = useTypedDispatch()
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState(' ')

    const formik = useFormik({
        initialValues: {
            search: '',
        },
        validate: (values) => {
            const errors: FormikType = {}
            if (values.search === '') {
                setErrorText('Empty')
                setError(true)
            } else {
                setError(false)
                setErrorText(' ')
                return errors
            }
        },
        onSubmit: (values) => {
            dispatch(
                searchWeatherTC({ city: values.search, api: props.selectAPI })
            )
            values.search = ''
        },
    })

    return (
        <form onSubmit={formik.handleSubmit} className={style.form}>
            <TextField
                helperText={errorText}
                error={error}
                variant="outlined"
                type="text"
                name="search"
                size="small"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.search}
                label={'Enter the city'}
            />
            <Button type="submit" className={style.formButton}>
                Search
            </Button>
        </form>
    )
}

export default Form;