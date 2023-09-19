import { DEFAULT_TIMEOUT, HTTP_METHOD } from '@/configs/serviceConfig';
import axios, { AxiosRequestConfig } from 'axios';

interface HttpRequestConfig extends AxiosRequestConfig {
    url: string;
    method?: string;
    headers?: Record<string, any>;
    data?: any;
}

export const httpRequest = async (
    {
        url = '',
        method = HTTP_METHOD.GET,
        headers = { 'content-type': 'application/json' },
        data = null || '',
    },
    timeoutMillisecond = Number(DEFAULT_TIMEOUT),
    options = {}
) => {
    const controller = new AbortController();
    const { signal } = controller;

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeoutMillisecond);

    try {
        const response = await axios({
            url,
            method,
            signal,
            body: data || null,
            headers: {
                ...headers,
                ...options,
            },
        } as HttpRequestConfig);

        return response.data;
    } catch (err: any) {
        if (err.name === 'AbortError') {
            console.error('請求超時或已取消');
        } else {
            console.error('請求失敗', err);
            // return err;
            // console.log(err.response.data.error.message);
        }
    } finally {
        clearTimeout(timeoutId);
    }
};
