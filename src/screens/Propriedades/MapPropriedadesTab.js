import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { PropriedadesContext } from '../../context/PropriedadesProvider';

const MapProprideadesTap = () => {
    const [mapType, setMatType] = useState('standard');
    const [markers, setMarkers] = useState([]);
    const { propriedades } = useContext(PropriedadesContext);

    useEffect(() => {
        let m = [];
        propriedades.map((p) => {
            //console.log(s);
            m.push({
                key: p.uid,
                coords: {
                    latitude: Number(p.latitude),
                    longitude: Number(p.longitude),
                },
                title: p.nome,
                description: p.descricao,
            });
        });
        setMarkers(m);
    }, [propriedades]);

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                ref={(map) => (this.map = map)}
                style={styles.map}
                mapType={mapType}
                showsUserLocation={true}
                followsUserLocation={true}
                onPress={(e) => {
                    Alert.alert(
                        'Coordenadas',
                        'latitude= ' +
                        e.nativeEvent.coordinate.latitude +
                        ' longitude= ' +
                        e.nativeEvent.coordinate.longitude,
                    );
                }}
                initialRegion={{
                    latitude: -31.766108372781073,
                    longitude: -52.35215652734042,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}>
                {markers.map((marker) => {
                    return (
                        <Marker
                            key={marker.key}
                            coordinate={marker.coords}
                            title={marker.title}
                            description={marker.description}
                            draggable
                            image={marker.image}
                        />
                    );
                })}
            </MapView>
        </View>
    );
};
export default MapProprideadesTap;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});