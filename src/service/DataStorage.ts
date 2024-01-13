// DataStorage.js
import * as SecureStore from "expo-secure-store";

const KEY = "myAppData";

export const saveData = async (data: any) => {
  const serializedData = JSON.stringify(data);
  await SecureStore.setItemAsync(KEY, serializedData);
};

export const loadData = async () => {
  const serializedData = await SecureStore.getItemAsync(KEY);
  return serializedData ? JSON.parse(serializedData) : null;
};
