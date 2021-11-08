import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import MapView, { Marker, Callout, Polygon } from "react-native-maps";

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

  const poly = [
    {
      latitude: 37.440996809186295,
      longitude: -122.10251212120055,
    },
    {
      latitude: 37.44424786944107,
      longitude: -122.06525556743145,
    },
    {
      latitude: 37.406559059108694,
      longitude: -122.0656116306781911,
    },
    {
      latitude: 37.4113168031456,
      longitude: -122.10595373064278,
    },
  ];

  const holes = [
    [
      {
        latitude: 37.431058810801524,
        longitude: -122.09361355751751,
      },
      {
        latitude: 37.43171774653013,
        longitude: -122.07801215350628,
      },
      {
        latitude: 37.41810362212148,
        longitude: -122.0850120484829,
      },
    ],
  ];

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
        {/*    {marker.length > 0 &&
          marker.map((m) => {
            return (
              <Marker
                coordinate={m}
                key={Math.random().toString()}
                title="First"
                description="This is the first marker"
              >
                <Callout style={styles.newMarker}>
                  <Text>First</Text>
                </Callout>
              </Marker>
            );
          })} */}
        <Polygon
          coordinates={poly}
          strokeWidth={5}
          strokeColor="red"
          fillColor="rgba(255,255,0,.2)"
          holes={holes}
        />
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
  newMarker: {
    height: 50,
    width: 50,
    backgroundColor: "yellow",
  },
});

export default App;
