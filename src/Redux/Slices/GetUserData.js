import AsyncStorage from '@react-native-async-storage/async-storage';
export let UserId;
export const UserData = async () => {
  console.log('suuuuuuuuuuuuuuuuuuuuuuuuuu');
  
  const data = await AsyncStorage.getItem("userData");
  UserId=data&&JSON.parse(data).id;
  return data && JSON.parse(data) ;
};