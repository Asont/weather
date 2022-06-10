import {applyMiddleware, combineReducers, createStore} from "redux";
import {ActionTypeDefaultAPI, weatherReducer} from "./weatherReducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk"
import {ActionTypeLoading, loadingReducer} from "./loadingReducer";
import {ActionTypeHome, homeWeatherReducer} from "./homeWeatherReducer";
import {shedulerReducer} from "./shedulerReducer";
import {useDispatch} from "react-redux";

let rootReducer = combineReducers({
    weather:weatherReducer,
    homeWeather:homeWeatherReducer,
    loading:loadingReducer,
    sheduler:shedulerReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootReducerType = ReturnType<typeof rootReducer>

export type AppActionType = ActionTypeDefaultAPI | ActionTypeHome | ActionTypeLoading  // your actions type
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<RootReducerType, any, AppActionType>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();

