import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'

import CreateMission from './CreateMission'

export default props => {
    const [modalVisibilty, setModalVisibility] = useState(false) 

    return (
        <View style={styles.container}>
            <CreateMission isVisible={modalVisibilty} onClose={() => setModalVisibility(false)} />
            <Text>Missoes</Text>
            <View style={styles.addButton}>
                <IconButton
                    icon='plus-circle'
                    size={50}
                    color='blue'
                    onPress={() => setModalVisibility(true)}
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