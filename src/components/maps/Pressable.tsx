import {Pressable, Text} from 'react-native';
import MapComponent from './Map';
import {RootStackParamList} from '../../../App';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type MapRouteProp = RouteProp<RootStackParamList, 'ContactPage'>;
export type MapRoutePageProp = NativeStackNavigationProp<
  RootStackParamList,
  'MapPage'
>;

export interface MapPageProps {
  route: MapRouteProp;
}

const PressableMap: React.FC<MapPageProps> = ({route}) => {
  const navigation = useNavigation<MapRoutePageProp>();
  const navigateToMap = () => {
    navigation.navigate('MapPage');
  };

  return (
    <Pressable onPress={navigateToMap}>
      <Text>Map</Text>
    </Pressable>
  );
};

export default PressableMap;
