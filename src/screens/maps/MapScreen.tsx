import React, {useState} from 'react';
import {View, Text} from 'react-native';
import mapStyles from './map.style';
import {MAPBOX_DOWNLOADS_TOKEN} from '@env';
import MapboxGL, {MapView, PointAnnotation} from '@rnmapbox/maps';

MapboxGL.setAccessToken(`${MAPBOX_DOWNLOADS_TOKEN}`);

const MapPage = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  const onMapPress = async (event: any) => {
    const {geometry} = event;
    const {coordinates} = geometry;
    setSelectedCoordinates(coordinates);
  };

  return (
    <View style={mapStyles.container}>
      <MapView style={mapStyles.map} onPress={onMapPress}>
        {selectedCoordinates && (
          <PointAnnotation id="selectedPoint" coordinate={selectedCoordinates}>
            <View style={mapStyles.marker} />
          </PointAnnotation>
        )}
      </MapView>

      {selectedCoordinates && (
        <View style={mapStyles.coordinateContainer}>
          <Text>Longitude: {selectedCoordinates[0]}</Text>
          <Text>Latitude: {selectedCoordinates[1]}</Text>
        </View>
      )}
    </View>
  );
};

export default MapPage;
