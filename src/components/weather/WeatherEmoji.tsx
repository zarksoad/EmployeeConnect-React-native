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
  const {weatherEmoji, loading, error} = useWeather(lat, lon);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error loading weather data</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{weatherEmoji}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  emoji: {
    fontSize: 50,
  },
});

export default WeatherEmojiComponent;
