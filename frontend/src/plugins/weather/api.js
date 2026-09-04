
/*
 * USES Open Mateo 
 */

const weatherCodes = {
    0:  'Clear sky',

    1:  'Mainly clear',
    2:  'Partly cloudy',
    3:  'Overcast',

    45: 'Fog',
    48: 'Rime fog',

    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',

    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',

    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',

    66: 'Light freezing rain',
    67: 'Heavy freezing rain',

    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',

    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',

    85: 'Slight snow showers',
    86: 'Heavy snow showers',

    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
};


export const getCurrentLocation = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
        position => resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }),
        reject
    );
});

export const defaultFields = [
    'temperature_2m',
    'weather_code',
    'is_day'
]

export const generateWeatherQuery = (options, position = null) => {
    const base = 'https://api.open-meteo.com/v1/forecast';

    const params = new URLSearchParams();

    if (position) {
        params.set('latitude', position.latitude.toFixed(2));
        params.set('longitude', position.longitude.toFixed(2));
    }

    if (options.current) {
        params.set('current', options.current.join(','));
    }

    return `${base}?${params}`;
};

export const requestWeather = async query => {
    const response = await fetch(query);

    if (!response.ok) {
        throw new Error(
            `Weather request failed: ${response.status}`
        );
    }

    return response.json();
};

export const getWeather = async (
        options = { current: defaultFields },
        position = null
    ) => {

    position ??= await getCurrentLocation();

    const query = generateWeatherQuery(options, position);

    return requestWeather(query);
};

export const decodeWeather = data => ({
    temperature: data.current.temperature_2m,
    condition: weatherCodes[data.current.weather_code] ?? 'Unknown',
    time: data.current.is_day ? 'day' : 'night',
});