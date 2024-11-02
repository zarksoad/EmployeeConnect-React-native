// WeatherIconComponent.tsx
import React from 'react';
import {View, Image, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {useWeather} from '../../hooks/useWeather';

interface WeatherIconComponentProps {
  lat: number;
  lon: number;
}

const WeatherIconComponent: React.FC<WeatherIconComponentProps> = ({
  lat,
  lon,
}) => {
  const {weatherIconUrl, loading, error} = useWeather(lat, lon);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error loading weather data</Text>;

  return (
    <View style={styles.container}>
      {weatherIconUrl ? (
        <Image source={{uri: weatherIconUrl}} style={styles.icon} />
      ) : (
        <Text>No icon available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default WeatherIconComponent;
