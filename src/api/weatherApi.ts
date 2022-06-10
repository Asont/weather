import axios from "axios";
import {ResponseWeatherType} from "../1";


export const instanceForIp = axios.create({
    baseURL:'https://geo.ipify.org/api/v2/country,city?apiKey=at_1mKZqQKPkIu5QZNfjiWRwEUvwmEk6&ipAddress=',
})

export const instanceForWeather = axios.create({
    baseURL:'https://api.openweathermap.org/data/2.5/',
})


export const searchIP = {
    getIP(){
        return instanceForIp.get<IPType>("")
    }
}

export const weatherApi = {
    getWeather(result:any){
        return instanceForWeather.get<ResponseWeatherType>(`onecall?lat=${result.data.location.lat}&lon=${result.data.location.lng}&units=metric&appid=97b3012794b85f4b514439ece20456a1`)
    }
}



export type IPType = {
    ip: string;
    location: RootObjectLocation;
    domains: string[];
    as: RootObjectAs;
    isp: string;
}
export type RootObjectLocation = {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
}
export type RootObjectAs = {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
}