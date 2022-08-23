import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default props => {
    return (
        <View style={styles.container}>
            <Text>Shop</Text>
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