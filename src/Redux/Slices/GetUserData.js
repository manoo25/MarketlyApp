import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserData = async () => {
  const data = await AsyncStorage.getItem("userData");
  return data && JSON.parse(data) ;
};