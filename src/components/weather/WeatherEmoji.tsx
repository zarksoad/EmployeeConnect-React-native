import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useWeather} from '../../hooks/useWeather';

interface WeatherEmojiComponentProps {
  lat: number;
  lon: number;
}

const WeatherEmojiComponent: React.FC<WeatherEmojiComponentProps> = ({
  lat,
  lon,
}) => {
  const {weatherEmoji, weatherDescription, loading, error} = useWeather(
    lat,
    lon,
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error loading weather data</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{weatherDescription}</Text>
      <Text style={styles.emoji}>{weatherEmoji}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    color: 'black',
  },
  emoji: {
    fontSize: 50,
  },
  description: {
    fontSize: 20,
    color: 'black',
  },
});

export default WeatherEmojiComponent;
