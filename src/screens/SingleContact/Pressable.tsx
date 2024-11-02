import React, {useEffect, useState} from 'react';
import {Pressable, Text, Alert, Linking} from 'react-native';
import {RootStackParamList} from '../../../App';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {checkOrRequestLocationPermission} from '../../commun/permisions/checkOrOpen';

export type MapRouteProp = RouteProp<RootStackParamList, 'MapPage'>;
export type MapRoutePageProp = NativeStackNavigationProp<
  RootStackParamList,
  'MapPage'
>;

export interface MapPageProps {
  route?: MapRouteProp;
  latitude: number;
  longitude: number;
}

const PressableMap: React.FC<MapPageProps> = ({latitude, longitude}) => {
  const navigation = useNavigation<MapRoutePageProp>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const checkInPermission = async () => {
    try {
      const resultPermission = await checkOrRequestLocationPermission();
      setHasPermission(resultPermission ?? false);
    } catch (error) {
      Alert.alert('Permission Error', 'Could not check location permission.');
      console.error(error);
      setHasPermission(false);
    }
  };

  useEffect(() => {
    checkInPermission();
  }, []);

  const navigateToMap = () => {
    navigation.navigate('MapPage');
  };

  if (hasPermission === null) {
    return <Text>Checking permission...</Text>;
  }

  return hasPermission ? (
    <Pressable onPress={navigateToMap}>
      <Text>Map</Text>
    </Pressable>
  ) : (
    <>
      <Text>Please allow Permissions in settings to activate the map</Text>
      <Pressable onPress={() => Linking.openSettings()}>
        <Text>Open Settings</Text>
      </Pressable>
    </>
  );
};

export default PressableMap;
