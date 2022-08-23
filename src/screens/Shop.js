import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { TarefaContext } from '../context/Tarefa'

export default props => {
    const { state } = useContext(TarefaContext)
    
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