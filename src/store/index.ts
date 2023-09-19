import { defineStore } from 'pinia';
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

    const setLoading = () => {
        isLoading.value = !isLoading.value;
    };

    const handleSearchCurrent = async (city: string) => {
        try {
            const response: Promise<any> = await ApiRequest.searchToday(city);

            const convertedResponse =
                convertResponseOfSearchOnCurrentAPI(response);

            cityInformationItem.value = convertedResponse;

            handleSetWeatherHistoryRecordList(convertedResponse);
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

    const handleSetWeatherHistoryRecordList = (data: CityInformation) => {
        const list = weatherHistoryRecordList.value;

        const isCityExists = list.some(
            (item) => item.cityName === data.cityName
        );

        if (list.length < 5 && !isCityExists) {
            list.push(data);
        }

        if (list.length >= 5 && !isCityExists) {
            list.pop();
            list.unshift(data);
        }

        weatherHistoryRecordList.value = list;
    };

    return {
        cityInformationItem,
        forecastList,
        forecastItemShow,
        isLoading,
        weatherHistoryRecordList,
        setLoading,
        handleSearchCurrent,
        handleSearchHour,
        handleSearchDays,
        handleSetDaysItemShow,
        handleSetWeatherHistoryRecordList,
    };
});
