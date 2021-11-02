import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";

const App = () => {
  const [location, setLocation] = useState(null);
  const [marker, setMarker] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleNewMarker = (coordinate) => {
    setMarker([...marker, coordinate]);
  };

  return (
    <View style={styles.container}>
      <MapView
        onPress={(e) => handleNewMarker(e.nativeEvent.coordinate)}
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
      >
        {marker.length > 0 &&
          marker.map((m) => {
            return (
              <Marker coordinate={m} key={Math.random().toString()} />
            );
          })}
      </MapView>
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
});

export default App;
