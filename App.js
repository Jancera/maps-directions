import React, { useEffect, useState } from "react";
import { StyleSheet, View, PermissionsAndroid } from "react-native";
import MapView from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

import MapViewDirections from "react-native-maps-directions";

const App = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      await PermissionsAndroid.request(
        "android.permission.ACCESS_FINE_LOCATION",
      );
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
        },
        (error) => {
          console.log(error.code, error.message);
        },
      );
    })();
  }, []);

  const DESTINATION = {
    latitude: 37.404094980214204,
    longitude: -122.06176266074179,
  };
  const DESTINATION2 = {
    latitude: 37.43860733758064,
    longitude: -122.1129110455513,
  };
  const DESTINATION3 = {
    latitude: 37.389399376437815,
    longitude: -122.10134234279394,
  };

  return (
    <View style={styles.container}>
      <MapView
        onPress={(e) => {
          console.log(e.nativeEvent.coordinate);
        }}
        style={styles.map}
        initialRegion={{
          latitude: 37.42597730214824,
          longitude: -122.0856026405,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        loadingEnabled
      >
        <MapViewDirections
          origin={location}
          destination={DESTINATION3}
          apikey="AIzaSyBRgJOx1PSeTIunpdEDN8Ms_egglS9nafQ"
          strokeWidth={5}
          strokeColor="green"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default App;
