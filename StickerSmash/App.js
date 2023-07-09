import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      error: '',
    };
  }
  

  async componentDidMount() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      this.setState({ error: 'Location Services needed' });
      return;
    }

    

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 500, // Interval in milliseconds (change as needed)
        distanceInterval: 0.5, // Distance in meters (change as needed)
      },
      async (newLocation) => {
        const { coords } = newLocation;
        const region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.045,
        };
        this.setState({ region });
        await this.storeLocationInDB(coords); // Store the location in the database
      }
    );
  }


storeLocationInDB = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const data = JSON.stringify({ latitude, longitude });

    const apiUrl = 'http://192.168.1.11:3000/api/saveLocation';

    const response = await axios.post(apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Location data sent successfully:', response.data);
  } catch (error) {
    console.log('Error fetching location:', error);
  }
};

  
  render() {
    const { region, error } = this.state;

    return (
      <View style={styles.container}>
        {region ? (
          <MapView
            style={styles.map}
            initialRegion={region}
            region={region}
            showsUserLocation={true}
          >
            <Marker coordinate={region} />
          </MapView>
        ) : (
          <Text>{error ? error : 'Loading...'}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});


