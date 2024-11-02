// weatherService.ts
import {API_WEATHER} from '@env';
import axios from 'axios';

// Define type for the API response structure
export interface WeatherData {
  weather: {icon: string}[];
}

export const fetchWeatherData = async (
  lat: number,
  lon: number,
): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_WEATHER}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
