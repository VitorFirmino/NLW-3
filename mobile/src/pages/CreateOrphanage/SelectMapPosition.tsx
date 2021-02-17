import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import MapView, { Marker, MapEvent, LatLng } from 'react-native-maps'

import mapMarkerImg from '../../images/map-marker.png'


const SelectMapPosition: React.FC = () => {
    const navigation = useNavigation()
    const [position, setPosition] = useState<LatLng>()

    const handleNextStep = () => {
        navigation.navigate('OrphanageData', position)
    }

    const handleSelectMapPosition = (e: MapEvent) => {
        setPosition(e.nativeEvent.coordinate)
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle} onPress={handleSelectMapPosition}
                initialRegion={{ latitude: -9.3818723, longitude: -36.1545298, latitudeDelta: 0.022, longitudeDelta: 0.022 }}>

                { !!position && <Marker icon={mapMarkerImg} coordinate={position} /> }
            </MapView>

            { !!position && (
                <RectButton style={styles.nextButton} onPress={handleNextStep}>
                    <Text style={styles.nextButtonText}>Próximo</Text>
                </RectButton>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    position: 'relative'
},

mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
},

nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
},

nextButtonText: {
    fontFamily: 'nunito800',
    fontSize: 16,
    color: '#FFF',
}
})


export default SelectMapPosition;
