import {
    API_PREFIX,
    API_KEY,
    HTTP_METHOD,
    SERVICE_URL_CONFIG,
} from '@/configs/serviceConfig';
import { httpRequest } from './httpRequest';

export default class ApiRequest {
    /**
     * Realtime API
     * @param data
     * @returns
     */
    static search(data: string) {
        return httpRequest({
            url: `${API_PREFIX}/${SERVICE_URL_CONFIG.Current}?key=${API_KEY}&q=${data}`,
            method: HTTP_METHOD.GET,
        });
    }

    /**
     * 查詢一天
     * Forecast API
     * @param data
     * @returns
     */
    static searchToday(data: string) {
        return httpRequest({
            url: `${API_PREFIX}/${SERVICE_URL_CONFIG.Forecast}?key=${API_KEY}&q=${data}&days=1&aqi=no&alerts=no`,
            method: HTTP_METHOD.GET,
        });
    }

    /**
     * 查詢特定天數
     * Forecast API
     * @param data
     * @returns
     */
    static searchDay(data: { city: string; day: string }) {
        const { city, day } = data;

        return httpRequest({
            url: `${API_PREFIX}/${SERVICE_URL_CONFIG.Forecast}?key=${API_KEY}&q=${city}&days=${day}&aqi=no&alerts=no`,
            method: HTTP_METHOD.GET,
        });
    }

    /**
     * 查詢輸入是否存在對應城市
     * Search/Autocomplete API
     * @param data
     * @returns
     */
    static searchExist(data: string) {
        return httpRequest({
            url: `${API_PREFIX}/${SERVICE_URL_CONFIG.Search}?key=${API_KEY}&q=${data}`,
            method: HTTP_METHOD.GET,
        });
    }
}
