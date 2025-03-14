const geoLocationApiBaseUrl = 'https://geocoding-api.open-meteo.com/v1/';
const weatherApiBaseUrl = 'https://api.weatherapi.com/v1/';



export const config = {

    forecastDefaultAmountOfDays: 5,

    geoLocationApi: {
        baseUrl: geoLocationApiBaseUrl,
        search: geoLocationApiBaseUrl + 'search',
    },

    weatherApi: {
        baseUrl: weatherApiBaseUrl,
        forecast: weatherApiBaseUrl + 'forecast.json',

        /**
         * Ideally this would not be a static string
         *
         * Realistically I would set up an endpoint the UI can call that has secret env variables it can use
         * that way both the repo and the UI code will not contain any secret values
         */
        apiKey: '00e667692598462a9b9164103251403',
    },
};
