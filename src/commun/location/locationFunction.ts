import Geolocation from 'react-native-geolocation-service';

const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position.coords),
      error => reject(error),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
};
