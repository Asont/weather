import {
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
} from 'redux'
import { ActionTypeDefaultAPI, weatherReducer } from './weatherReducer'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'
import { ActionTypeLoading, loadingReducer } from './loadingReducer'
import { shedulerReducer } from './shedulerReducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

let rootReducer = combineReducers({
    weather: weatherReducer,
    loading: loadingReducer,
    sheduler: shedulerReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootReducerType = ReturnType<typeof rootReducer>

export type AppActionType = ActionTypeDefaultAPI | ActionTypeLoading // your actions type
export type TypedDispatch = ThunkDispatch<RootReducerType, any, AppActionType>
export type RootState = ReturnType<typeof store.getState>
export const useTypedDispatch = () => useDispatch<TypedDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
