export const API_PREFIX = import.meta.env.VITE_API_PREFIX;
export const API_KEY = import.meta.env.VITE_API_KEY;

export const DEFAULT_TIMEOUT = import.meta.env.VITE_DEFAULT_TIMEOUT;
export const DEFAULT_LOCAL_STORAGE_TIMEOUT = Number(
    import.meta.env.VITE_DEFAULT_LOCAL_STORAGE_TIMEOUT
);

export const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export const SERVICE_URL_CONFIG = {
    Current: 'current.json',
    Forecast: 'forecast.json',
    Search: 'search.json',
};
