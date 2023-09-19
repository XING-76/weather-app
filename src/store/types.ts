export interface CityInformation {
    cityName: string;
    time: string;
    description: string;
    temperature: string;
    maxTemperature: string;
    minTemperature: string;
}

export interface CityDayItemType {
    time: string;
    icon: string;
    text: string;
    temperature: string;
}

export interface CityForecastItemType {
    weekDay: string;
    icon: string;
    text: string;
    rainChance: string;
    maxTemperature: number;
    minTemperature: number;
}

export interface CityForecastListType {
    data: Array<CityForecastItemType>;
    max: number;
    min: number;
}
