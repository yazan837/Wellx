import { Button, StyleSheet } from "react-native";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useEffect } from "react";
import { loadData, saveData } from "../../src/service/DataStorage";
import * as BackgroundFetch from "expo-background-fetch";
import { fetchDataApi } from "../../src/service/api";
import { BACKGROUND_TASK_NAME } from "../../src/service/BackgroundTask";
import React from "react";

export default function TabOneScreen() {
  useEffect(() => {
    loadData().then((storedData) => {
      if (storedData) {
        console.log("Restored app state:", storedData);
      }
    });
    const backgroundTask = async () => {
      try {
        const page = 1;
        const data = await fetchDataApi(page);
        console.log("Data fetched in background task:", data);
        saveData(data);
        return BackgroundFetch.BackgroundFetchResult.NewData;
      } catch (error) {
        console.log("Background task error:", error);
        return null;
      }
    };
    const interval = setInterval(() => {
      BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
        minimumInterval: 900, // 15 minutes in seconds
      });
    }, 900000); // 15 minutes in milliseconds
    backgroundTask();
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <View>
        <Button
          title="Trigger Background Task"
          onPress={() => {
            BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
