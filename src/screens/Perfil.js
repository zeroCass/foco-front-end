import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'

// import { AuthContext } from '../context/Auth'

export default props => {
    // const { state } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <Text>Pefil</Text>
            <Text>{}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})