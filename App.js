import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  PermissionsAndroid,
} from "react-native";
import MapView, { Circle, Polyline } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

const App = () => {
  const [location, setLocation] = useState([]);

  useEffect(() => {
    (async () => {
      await PermissionsAndroid.request(
        "android.permission.ACCESS_FINE_LOCATION",
      );
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation([position.coords]);
        },
        (error) => {
          console.log(error.code, error.message);
        },
      );
    })();
  }, []);

  let listener = null;
  const startTracking = () => {
    listener = Geolocation.watchPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { interval: 1000, distanceFilter: 0, fastestInterval: 0 },
    );
  };

  const stopTracking = () => {
    Geolocation.clearWatch(listener);
  };

  return (
    <View style={styles.container}>
      <Button title="start" onPress={startTracking} />
      <Button title="stop" onPress={stopTracking} />
      <MapView
        onPress={() => {}}
        style={styles.map}
        initialRegion={{
          latitude: 37.42597730214824,
          longitude: -122.0856026405,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        loadingEnabled
      ></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default App;
