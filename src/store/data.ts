import {
    CityInformation,
    CityDayItemType,
    CityForecastItemType,
    CityForecastListType,
} from './types';

export const initCityInformationItem: CityInformation = {
    cityName: '',
    time: '',
    description: '',
    temperature: '',
    maxTemperature: '',
    minTemperature: '',
};

export const initCityDayItem: CityDayItemType = {
    time: '',
    icon: '',
    text: '',
    temperature: '',
};

export const initCityForecastItem: CityForecastItemType = {
    weekDay: '',
    icon: '',
    text: '',
    rainChance: '',
    maxTemperature: 0,
    minTemperature: 0,
};

export const initCityForecastList: CityForecastListType = {
    data: [initCityForecastItem],
    max: 0,
    min: 0,
};
