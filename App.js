import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import MapView from "react-native-maps";

import * as Location from "expo-location";

const App = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  Location.watchPositionAsync(
    {
      timeInterval: 1000,
      accuracy: Location.LocationAccuracy.BestForNavigation,
    },
    (e) => {
      console.log(e);
    },
  );

  return (
    <View style={styles.container}>
      <MapView
        onPress={(e) => console.log(e)}
        style={styles.map}
        initialRegion={{
          latitude: 37.42597730214824,
          longitude: -122.0856026405,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        loadingEnabled
        mapType="terrain"
      ></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  map: {
    flex: 1,
  },
  newMarker: {
    height: 50,
    width: 50,
    backgroundColor: "yellow",
  },
});

export default App;
