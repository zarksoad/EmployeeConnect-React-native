// useWeather.ts
import {useEffect, useState} from 'react';
import {fetchWeatherData, WeatherData} from '../services/getWeather';

const weatherEmojis: {[key: string]: string} = {
  '01d': '☀️',
  '01n': '🌙',
  '02d': '🌤️',
  '02n': '☁️',
  '03d': '☁️',
  '04d': '☁️',
  '09d': '🌧️',
  '10d': '🌦️',
  '10n': '🌧️',
  '11d': '🌩️',
  '13d': '❄️',
  '50d': '🌫️',
};

interface UseWeather {
  weatherEmoji: string;
  weatherIconUrl: string;
  loading: boolean;
  error: Error | null;
}

export const useWeather = (lat: number, lon: number): UseWeather => {
  const [weatherEmoji, setWeatherEmoji] = useState<string>('❓');
  const [weatherIconUrl, setWeatherIconUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);
      try {
        const data: WeatherData = await fetchWeatherData(lat, lon);
        const iconCode = data.weather[0].icon;
        setWeatherEmoji(weatherEmojis[iconCode] || '🌈');
        setWeatherIconUrl(`http://openweathermap.org/img/wn/${iconCode}.png`);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    getWeatherData();
  }, [lat, lon]);

  return {weatherEmoji, weatherIconUrl, loading, error};
};
