import { defineStore } from 'pinia';
import { DEFAULT_LOCAL_STORAGE_TIMEOUT } from '@/configs/serviceConfig';
import { CityInformation, CityForecastListType } from './types';
import { initCityInformationItem, initCityForecastList } from './data';
import ApiRequest from '@/service/apiRequest';
import {
    convertResponseOfSearchOnCurrentAPI,
    convertResponseOfSearchOnHourAPI,
    convertResponseOfSearchOnDaysAPI,
} from '@/components/service/dataProcessing';
import { ref } from 'vue';

export const useMainStore = defineStore('main', () => {
    const cityInformationItem = ref(initCityInformationItem as CityInformation);
    const forecastList = ref(initCityForecastList as CityForecastListType);
    const forecastItemShow = ref<string>('10');
    const isLoading = ref<boolean>(false);
    const weatherHistoryRecordList = ref([] as Array<CityInformation>);
    const weatherHistoryRecordArray = ref([] as Array<string>);

    const setLoading = () => {
        isLoading.value = !isLoading.value;
    };

    const handleSearchCurrent = async (data: {
        city: string;
        isList: boolean;
    }) => {
        try {
            const { city, isList } = data;

            const response: Promise<any> = await ApiRequest.searchToday(city);

            const convertedResponse =
                convertResponseOfSearchOnCurrentAPI(response);

            if (!isList) cityInformationItem.value = convertedResponse;

            if (isList) {
                return convertedResponse;
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearchHour = async (city: string) => {
        try {
            const response: Promise<any> = await ApiRequest.searchToday(city);

            const convertedResponse =
                convertResponseOfSearchOnHourAPI(response);

            return convertedResponse;
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearchDays = async (dataObj: { city: string; day: string }) => {
        try {
            const response: Promise<any> = await ApiRequest.searchDay(dataObj);

            const convertedResponse =
                convertResponseOfSearchOnDaysAPI(response);

            forecastList.value = convertedResponse;
        } catch (err) {
            console.log(err);
        }
    };

    const handleSetDaysItemShow = (day: string) => {
        forecastItemShow.value = day;
    };

    const handleSetWeatherHistoryRecordList = async (data: Array<string>) => {
        let output = [];

        for (let i = 0; i < data.length; i++) {
            const dataItem = {
                city: data[i],
                isList: true,
            };
            const response = await handleSearchCurrent(dataItem);

            output.push(response as CityInformation);
        }

        weatherHistoryRecordList.value = output;
    };

    const handleSetWeatherHistoryRecordArray = (data: string) => {
        handleCheckIfExpired();

        let list = weatherHistoryRecordArray.value;

        const isCityExistIndex = list.indexOf(data);

        if (isCityExistIndex !== -1) {
            list.splice(isCityExistIndex, 1);
        }

        list.unshift(data);

        if (list.length > 5) list.pop();

        weatherHistoryRecordArray.value = list;

        const expiration = new Date().getTime() + DEFAULT_LOCAL_STORAGE_TIMEOUT;
        const localData = { list: list.join(','), expiration };

        localStorage.setItem('historyRecord', JSON.stringify(localData));
    };

    const handleCheckIfExpired = () => {
        const historyRecord = localStorage?.getItem('historyRecord');

        if (historyRecord) {
            const { list, expiration } = JSON.parse(historyRecord);

            const now = new Date().getTime();

            if (now > expiration) {
                localStorage.removeItem('historyRecord');
                return null;
            }

            weatherHistoryRecordArray.value = list.split(',');
        }
    };

    const handleCheckErrorRoute = async (city: string) => {
        try {
            const response: any = await ApiRequest.searchExist(city);

            const isExists = response.length;

            if (isExists) {
                const cityName = response[0].name;

                return cityName;
            }

            if (!isExists) {
                return '';
            }
        } catch (err) {
            console.log(err);
            return '';
        }
    };

    return {
        cityInformationItem,
        forecastList,
        forecastItemShow,
        isLoading,
        weatherHistoryRecordList,
        weatherHistoryRecordArray,
        setLoading,
        handleSearchCurrent,
        handleSearchHour,
        handleSearchDays,
        handleSetDaysItemShow,
        handleSetWeatherHistoryRecordList,
        handleSetWeatherHistoryRecordArray,
        handleCheckIfExpired,
        handleCheckErrorRoute,
    };
});
