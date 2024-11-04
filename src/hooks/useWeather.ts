import {useEffect, useState} from 'react';
import {fetchWeatherData, WeatherData} from '../services/getWeather';

const weatherEmojis = {
  '01d': {emoji: '☀️', description: 'Clear sky'},
  '01n': {emoji: '🌙', description: 'Clear night'},
  '02d': {emoji: '🌤️', description: 'Few clouds'},
  '02n': {emoji: '☁️', description: 'Few clouds at night'},
  '03d': {emoji: '☁️', description: 'Scattered clouds'},
  '04d': {emoji: '☁️', description: 'Broken clouds'},
  '09d': {emoji: '🌧️', description: 'Shower rain'},
  '10d': {emoji: '🌦️', description: 'Rain'},
  '10n': {emoji: '🌧️', description: 'Rain at night'},
  '11d': {emoji: '🌩️', description: 'Thunderstorm'},
  '13d': {emoji: '❄️', description: 'Snow'},
  '50d': {emoji: '🌫️', description: 'Mist'},
} as const;

// Define a type for the keys of weatherEmojis
type WeatherIconCode = keyof typeof weatherEmojis;

export const useWeather = (lat: number, lon: number) => {
  const [weatherEmoji, setWeatherEmoji] = useState<string>('❓');
  const [weatherDescription, setWeatherDescription] =
    useState<string>('Loading...');
  const [weatherIconUrl, setWeatherIconUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);
      try {
        const data: WeatherData = await fetchWeatherData(lat, lon);
        const iconCode = data.weather[0].icon as WeatherIconCode;

        const weatherInfo = weatherEmojis[iconCode] || {
          emoji: '🌈',
          description: 'Unknown',
        };
        setWeatherEmoji(weatherInfo.emoji);
        setWeatherDescription(weatherInfo.description);
        setWeatherIconUrl(`http://openweathermap.org/img/wn/${iconCode}.png`);
      } catch (err) {
        setError(err as Error);
        setWeatherDescription('Unavailable');
      } finally {
        setLoading(false);
      }
    };
    getWeatherData();
  }, [lat, lon]);

  return {weatherEmoji, weatherDescription, weatherIconUrl, loading, error};
};
