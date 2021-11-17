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
  const [zoomLevel, setZoomLevel] = useState(1);

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

  const setNewLocation = () => {
    setLocation((location) => {
      console.log(location);
      const last = location.slice(-1)[0];
      const newValue = {
        latitude: last.latitude + 0.005,
        longitude: last.longitude,
      };
      return [...location, newValue];
    });
  };
  return (
    <View style={styles.container}>
      <Button title="Change position" onPress={setNewLocation} />
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
        onRegionChangeComplete={(e) => {
          setZoomLevel(e.latitudeDelta);
        }}
      >
        {location.length > 1 && (
          <>
            <Circle
              center={location.slice(-1)[0]}
              radius={2000 * zoomLevel}
              strokeWidth={5}
              strokeColor="#ee7547"
              fillColor="#ffb73c"
            />
            <Polyline coordinates={location} strokeWidth={3} />
          </>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default App;
