import DateUtils from '@/utils/dateUtils';
import ArrayUtils from '@/utils/arrayUtils';
import { CityDayItemType, CityForecastListType } from '@/store/types';

/**
 * 查詢 回傳欄位值轉換
 * @param response
 * @returns
 */
export const convertResponseOfSearchOnCurrentAPI = (response: any) => {
    const {
        current: {
            condition: { text },
            temp_c,
        },
        location: { name, localtime },
        forecast,
    } = response;

    return {
        cityName: name,
        time: DateUtils.getCurrentTime(localtime),
        description: text,
        temperature: `${Math.round(temp_c)}°`,
        maxTemperature: `${Math.round(forecast.forecastday[0].day.maxtemp_c)}°`,
        minTemperature: `${Math.round(forecast.forecastday[0].day.mintemp_c)}°`,
    };
};

/**
 * 查詢 24 小時 回傳欄位值轉換
 * @param response
 * @returns
 */
export const convertResponseOfSearchOnHourAPI = (
    response: any
): Array<CityDayItemType> => {
    const {
        location: { localtime },
        forecast: { forecastday },
    } = response;

    const currentHour = DateUtils.getHour(localtime);

    const sunrise = DateUtils.convertTo24Hour(forecastday[0].astro.sunrise);
    const sunset = DateUtils.convertTo24Hour(forecastday[0].astro.sunset);

    const sunriseHour = Number(sunrise?.split(':')[0]);
    const sunsetHour = Number(sunset?.split(':')[0]);

    const newData = forecastday[0].hour.map((item: any) => {
        const {
            time,
            temp_c,
            condition: { icon, text },
        } = item;

        const itemHour = DateUtils.getHour(time);

        const itemTemperature = Math.round(temp_c);

        if (itemHour === currentHour) {
            const items = [
                {
                    time: itemHour.toString(),
                    icon: icon,
                    text: text,
                    temperature: `${itemTemperature}°`,
                },
                {
                    time: 'Now',
                    icon: icon,
                    text: text,
                    temperature: `${itemTemperature}°`,
                },
            ];

            return items;
        }

        if (itemHour === sunriseHour) {
            const items = [
                {
                    time: itemHour.toString(),
                    icon: icon,
                    text: text,
                    temperature: `${itemTemperature}°`,
                },
                {
                    time: sunrise,
                    icon: 'https://i.imgur.com/8gxRiw7_d.jpg',
                    text: 'sunrise',
                    temperature: 'Sunrise',
                },
            ];

            return items;
        }

        if (itemHour === sunsetHour) {
            const items = [
                {
                    time: itemHour.toString(),
                    icon: icon,
                    text: text,
                    temperature: `${itemTemperature}°`,
                },
                {
                    time: sunset,
                    icon: 'https://i.imgur.com/0uCw2sf_d.jpg',
                    text: 'sunset',
                    temperature: 'Sunset',
                },
            ];

            return items;
        }

        return {
            time: itemHour.toString(),
            icon: icon,
            temperature: `${itemTemperature}°`,
        };
    });

    const flatData = newData.flat();

    const sortedData = ArrayUtils.sortedDataFrom(
        flatData,
        'Now'
    ) as Array<CityDayItemType>;

    return sortedData;
};

/**
 * 查詢指定天數 回傳欄位值轉換
 * @param response
 * @returns
 */
export const convertResponseOfSearchOnDaysAPI = (response: any) => {
    const {
        forecast: { forecastday },
    } = response;

    let maxTotal = -Infinity;
    let minTotal = Infinity;

    const newData = forecastday.map((item: any) => {
        const {
            date,
            day: {
                condition: { icon, text },
                daily_chance_of_rain,
                maxtemp_c,
                mintemp_c,
            },
        } = item;

        const maxTemperature = Math.round(maxtemp_c);
        const minTemperature = Math.round(mintemp_c);

        if (maxTemperature > maxTotal) maxTotal = maxTemperature;
        if (minTemperature < minTotal) minTotal = minTemperature;

        return {
            weekDay: DateUtils.getWeekDay(date),
            icon: icon,
            text: text,
            rainChance:
                daily_chance_of_rain > 0 ? `${daily_chance_of_rain}℅` : '',
            maxTemperature: maxTemperature,
            minTemperature: minTemperature,
        };
    });

    return {
        data: newData,
        max: maxTotal,
        min: minTotal,
    } as CityForecastListType;
};
