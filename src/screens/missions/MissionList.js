import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { IconButton } from 'react-native-paper'


export default props => {

    const [missions, setMissions] = useState([])

    const addMission = (mission) => {
        console.log(mission)
    }

    return (
        <View style={styles.container}>
            <Text>Missoes</Text>
            <View style={styles.addButton}>
                <IconButton
                    icon='plus-circle'
                    size={50}
                    color='blue'
                    onPress={() => props.navigation.navigate('CreateMission', { addMission: addMission })}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})