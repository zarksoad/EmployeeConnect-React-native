import React, {useEffect, useState} from 'react';
import {Pressable, Text, Alert} from 'react-native';
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
  route: MapRouteProp;
}

const PressableMap: React.FC<MapPageProps> = () => {
  const navigation = useNavigation<MapRoutePageProp>();
  const [hasPermission, setHasPermission] = useState<
    boolean | null | undefined
  >(null);

  const checkInPermission = async () => {
    const resultPermission = await checkOrRequestLocationPermission();
    setHasPermission(resultPermission);
  };
  useEffect(() => {
    checkInPermission().catch(error => {
      Alert.alert('Permission Error', 'Could not check location permission.');
      console.error(error);
    });
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
    <Text>Please allow Permissions in setting to active the map</Text>
  );
};

export default PressableMap;
