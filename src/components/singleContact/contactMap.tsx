import React from 'react';
import {View} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_DOWNLOADS_TOKEN} from '@env';

MapboxGL.setAccessToken(`${MAPBOX_DOWNLOADS_TOKEN}`);

interface ContactMapProps {
  latitude: number;
  longitude: number;
}

const ContactMap: React.FC<ContactMapProps> = ({latitude, longitude}) => {
  return (
    <View style={{width: 150, height: 150, backgroundColor: 'lightgrey'}}>
      <MapboxGL.MapView style={{flex: 1}}>
        <MapboxGL.Camera
          centerCoordinate={[longitude, latitude]}
          zoomLevel={14}
          animationDuration={1000}
        />
        <MapboxGL.PointAnnotation
          id="contactLocation"
          coordinate={[longitude, latitude]}>
          <View
            style={{
              backgroundColor: 'red',
              width: 20,
              height: 20,
              borderRadius: 10,
            }}
          />
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>
    </View>
  );
};

export default ContactMap;
