import AsyncStorage from '@react-native-async-storage/async-storage';

const ID_COUNTER_KEY = '@contact_id_counter';

export const getNextId = async (): Promise<number> => {
  try {
    const currentId = await AsyncStorage.getItem(ID_COUNTER_KEY);
    const newId = currentId ? parseInt(currentId) + 1 : 1;
    await AsyncStorage.setItem(ID_COUNTER_KEY, newId.toString());
    return newId;
  } catch (error) {
    console.error('Error retrieving or saving ID counter:', error);
    return 1;
  }
};
