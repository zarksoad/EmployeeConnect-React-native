import React, {useState, useEffect} from 'react';
import {View, Text, Alert, Button} from 'react-native';
import mapStyles from './map.style';
import {MAPBOX_DOWNLOADS_TOKEN} from '@env';
import MapboxGL, {MapView, Camera, PointAnnotation} from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import {checkOrRequestLocationPermission} from '../../commun/permisions/checkOrOpen';

MapboxGL.setAccessToken(`${MAPBOX_DOWNLOADS_TOKEN}`);

const MapPage = () => {
  const [userLocation, setUserLocation] = useState<number[] | null>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<
    number[] | null
  >(null);

  const fetchUserLocation = async () => {
    const hasPermission = await checkOrRequestLocationPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Location permission is needed to show your location on the map.',
      );
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setUserLocation([longitude, latitude]); // Mapbox uses [longitude, latitude]
      },
      error => Alert.alert('Location Error', 'Could not fetch location.'),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  const onMapPress = async (event: any) => {
    const {geometry} = event;
    const {coordinates} = geometry;
    setSelectedCoordinates(coordinates);
  };

  const saveCoordinates = () => {
    if (selectedCoordinates) {
      console.log('Coordinates saved:', selectedCoordinates);
      Alert.alert(
        'Coordinates saved',
        `Longitude: ${selectedCoordinates[0]}, Latitude: ${selectedCoordinates[1]}`,
      );
      // Here you could add logic to save the coordinates to your database or state.
    } else {
      Alert.alert(
        'Selection Required',
        'Please select a location on the map first.',
      );
    }
  };

  return (
    <View style={mapStyles.container}>
      <MapView style={mapStyles.map} onPress={onMapPress}>
        {userLocation && (
          <Camera
            centerCoordinate={userLocation}
            zoomLevel={14}
            animationMode="flyTo"
            animationDuration={2000}
          />
        )}

        {/* User's current location marker */}
        {userLocation && (
          <PointAnnotation id="userLocation" coordinate={userLocation}>
            <View style={mapStyles.userMarker} />
          </PointAnnotation>
        )}

        {/* Selected coordinates marker */}
        {selectedCoordinates && (
          <PointAnnotation id="selectedPoint" coordinate={selectedCoordinates}>
            <View style={mapStyles.marker} />
          </PointAnnotation>
        )}
      </MapView>

      {/* Displaying coordinates */}
      {selectedCoordinates && (
        <View style={mapStyles.coordinateContainer}>
          <Text>Longitude: {selectedCoordinates[0]}</Text>
          <Text>Latitude: {selectedCoordinates[1]}</Text>
        </View>
      )}

      {/* Button to save the selected location */}
      <Button title="Save Location" onPress={saveCoordinates} />
    </View>
  );
};

export default MapPage;
